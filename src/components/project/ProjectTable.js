// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { PanelType } from "../../lib/constants";
import { chunkProjects, getCurrentResource, tracksQuota } from "../../lib/utils";
import { useGlobalStore, domainStoreActions, createCommitmentStoreActions } from "../StoreProvider";
import DebouncedSearchInput from "../shared/DebouncedSearchInput";
import useSortTableData from "../../hooks/useSortTable";
import ProjectTableDetails from "./ProjectTableDetails";
import {
  Stack,
  Pagination,
  ContentAreaToolbar,
  DataGrid,
  DataGridRow,
  LoadingIndicator,
  Button,
  Select,
  SelectOption,
  IntroBox,
} from "@cloudoperators/juno-ui-components";
import ProjectQuotaDetails from "./ProjectQuotaDetails";
import { TransferStatus } from "../../lib/constants";
import { labelTypes, matchAZLabel } from "../shared/LimesBadges";

const projectTableHeadCells = [
  {
    key: "projectName",
    label: "ProjectName",
    sortValueFn: (project) => project.metadata?.fullName ?? project.metadata?.name,
    sortStrategy: "text",
  },
  {
    key: "resourceBar",
    label: "Status",
  },
  {
    key: "labels",
    label: "Labels",
  },
  {
    key: "Actions",
    label: "Actions",
  },
];

const quotaTableHeadCells = [
  {
    key: "projectName",
    label: "ProjectName",
    sortValueFn: (project) => project.metadata?.fullName ?? project.metadata?.name,
    sortStrategy: "text",
  },
  {
    key: "projectUsage",
    label: "Usage",
  },
  {
    key: "projectQuota",
    label: "Quota",
  },
  {
    key: "projectMaxQuota",
    label: "Max-Quota",
  },
  {
    key: "Actions",
    label: "Actions",
  },
];

// Display the project details in DomainView
const ProjectTable = (props) => {
  const { serviceType, currentResource, currentCategory, currentTab, projects, subRoute, sortProjectProps, mergeOps } =
    props;
  const resourceTracksQuota = tracksQuota(currentResource);
  const { durations = {} } = currentResource?.commitment_config ?? {};
  const scope = useGlobalStore((state) => state.scope);
  const { setSortedProjects } = domainStoreActions();
  const { setTransferFromAndToProject, setTransferProject, setCurrentProject, setToast } =
    createCommitmentStoreActions();
  const [selectedProject, setSelectedProject] = React.useState({ id: "", showCommitments: false });
  const [currentPage, setCurrentPage] = React.useState(0);
  // Use state for the debounced filter value only - the input component manages its own state
  const [nameFilter, setNameFilter] = React.useState("");
  const [selectedLabelFilter, setSelectedLabelFilter] = React.useState(labelTypes.ANY);
  const [selectedDurationFilter, setSelectedDurationFilter] = React.useState(labelTypes.ANY);
  const durationFilterValues = React.useMemo(() => {
    return [labelTypes.ANY, ...Object.values(durations)];
  }, [durations]);

  if (!resourceTracksQuota && subRoute) return null;

  let headCells;
  let gridColumSize;
  switch (subRoute) {
    case PanelType.quota.name:
      gridColumSize = "25% 20% 20% 20% 15%";
      headCells = quotaTableHeadCells;
      break;
    default:
      gridColumSize = scope.isDomain() ? "25% 35% 20% 20%" : "25% 30% 20% 25%";
      headCells = projectTableHeadCells;
  }

  // Pre-compute resource and az data for all projects once to avoid redundant lookups
  const projectResourceAZMap = React.useMemo(() => {
    if (!projects) return new Map();
    const map = new Map();
    projects.forEach((project) => {
      const { resources } = project.categories[currentCategory] ?? { resources: [] };
      const resource = getCurrentResource(resources, currentResource.name);
      const az = resource?.per_az?.find((az) => az.name === currentTab);
      map.set(project.metadata.id, { resource, az });
    });
    return map;
  }, [projects, currentCategory, currentResource.name, currentTab]);

  const { projectsPerLabel, validLabels, validDurations } = React.useMemo(() => {
    if (subRoute) {
      return { projectsPerLabel: new Map(), validLabels: new Set(), validDurations: new Set() };
    }

    const projectsPerLabel = new Map();
    const validDurations = new Set();
    projects.forEach((project) => {
      const { az } = projectResourceAZMap.get(project.metadata.id);
      const matchingLabels = az ? Object.values(labelTypes).filter((type) => matchAZLabel(az, type)) : [];
      if (matchingLabels.length > 0) {
        matchingLabels.forEach((label) => {
          if (!projectsPerLabel.has(label)) {
            projectsPerLabel.set(label, []);
          }
          projectsPerLabel.get(label).push(project);
        });
      }

      const commitments = az?.committed || {};
      Object.values(durations).forEach((duration) => {
        if (commitments[duration]) {
          validDurations.add(duration);
        }
      });
    });

    const validLabels = new Set();
    Object.values(labelTypes).forEach((label) => {
      if (projectsPerLabel.has(label)) {
        validLabels.add(label);
      }
    });

    return { projectsPerLabel, validLabels, validDurations };
  }, [subRoute, projects, currentCategory, currentTab]);

  // The helper variables are a tradeoff to avoid multiple calculations of the project filter logic while still ensuring that the filters reset when they become invalid.
  // 1. The Tab changes; validLabels/validDurations change; project filter would run
  // 2. The useEffect resets selectedLabelFilter/selectedDurationFilter; project filter would run again
  //    However, since the effective filter was already "any", the value doesn't change; project filter doesn't run again
  const effectiveLabelFilter = React.useMemo(
    () => (validLabels.has(selectedLabelFilter) ? selectedLabelFilter : labelTypes.ANY),
    [validLabels, selectedLabelFilter]
  );
  const effectiveDurationFilter = React.useMemo(
    () => (validDurations.has(selectedDurationFilter) ? selectedDurationFilter : labelTypes.ANY),
    [validDurations, selectedDurationFilter]
  );

  const filteredProjects = React.useMemo(() => {
    if (!projects) return [];

    let result = effectiveLabelFilter === labelTypes.ANY ? projects : projectsPerLabel.get(effectiveLabelFilter) || [];

    if (effectiveDurationFilter !== labelTypes.ANY) {
      result = result.filter((project) => {
        const { az } = projectResourceAZMap.get(project.metadata.id);
        const commitments = az?.committed || {};
        return commitments[effectiveDurationFilter] > 0;
      });
    }

    const searchTerm = nameFilter.toLowerCase().trim();
    if (searchTerm !== "") {
      const isCluster = scope.isCluster();
      result = result.filter((project) => {
        const filterName = isCluster ? project.metadata.fullName : project.metadata.name;
        const projectID = project.metadata.id;
        return filterName.toLowerCase().includes(searchTerm) || projectID.toLowerCase().includes(searchTerm);
      });
    }

    return result;
  }, [
    scope,
    projects,
    currentCategory,
    currentTab,
    nameFilter,
    projectsPerLabel,
    effectiveLabelFilter,
    effectiveDurationFilter,
  ]);

  const { items: sortedProjectData, TableSortHeader, sortConfig, resetSort } = useSortTableData(filteredProjects);
  const paginatedProjects = React.useMemo(() => {
    return chunkProjects(sortedProjectData);
  }, [sortedProjectData]);

  // Reset to first page when filter changes
  React.useEffect(() => {
    setCurrentPage(0);
  }, [nameFilter]);

  // Sync filter state when it becomes invalid for the current tab.
  React.useEffect(() => {
    if (!validLabels.has(selectedLabelFilter)) {
      setSelectedLabelFilter(labelTypes.ANY);
    }
    if (!validDurations.has(selectedDurationFilter)) {
      setSelectedDurationFilter(labelTypes.ANY);
    }
  }, [validLabels, validDurations, selectedLabelFilter, selectedDurationFilter]);

  // Subcomponent handlers
  function updateShowCommitments(index) {
    const project = paginatedProjects[currentPage][index];
    const projectID = paginatedProjects[currentPage][index].metadata.id;
    setCurrentProject(project);

    // A click on the same (active) project disables it. Otherwise it enables it.
    if (projectID === selectedProject.id) {
      setSelectedProject({ id: projectID, showCommitments: !selectedProject.showCommitments });
    } else {
      setSelectedProject({ id: projectID, showCommitments: true });
    }
  }

  function handleCommitmentTransfer(project) {
    setTransferProject(project);
    setTransferFromAndToProject(TransferStatus.START);
  }

  return !projects ? (
    <LoadingIndicator className={"m-auto"} />
  ) : (
    <>
      <ContentAreaToolbar className={`p-0 sticky ${subRoute ? "top-8" : "top-24"} z-[100]`}>
        <Stack className="w-full mb-7 flex-wrap" direction="horizontal" distribution="between">
          <Stack gap="1" className="flex-wrap">
            {!subRoute && (
              <Stack gap="1">
                <Select
                  data-testid="Filter"
                  className="w-40"
                  label="Filter"
                  value={selectedLabelFilter}
                  onChange={(label) => {
                    setSelectedLabelFilter(label);
                    setSelectedDurationFilter(labelTypes.ANY);
                  }}
                >
                  {Object.values(labelTypes).map((label) => {
                    return (
                      <SelectOption
                        data-testid={`filter-${label}`}
                        key={label}
                        disabled={!validLabels.has(label) && label !== labelTypes.ANY}
                        value={label}
                      />
                    );
                  })}
                </Select>
                {selectedLabelFilter === labelTypes.COMMITTED && (
                  <Select
                    data-testid="durationFilter"
                    className="w-30"
                    label="Duration"
                    value={selectedDurationFilter}
                    onChange={(value) => {
                      setSelectedDurationFilter(value);
                    }}
                  >
                    {durationFilterValues.map((duration) => {
                      return (
                        <SelectOption
                          data-testid={`filter-[${duration}]`}
                          key={duration}
                          disabled={!validDurations.has(duration) && duration !== labelTypes.ANY}
                          value={duration}
                        />
                      );
                    })}
                  </Select>
                )}
              </Stack>
            )}
            <Stack gap="1">
              <DebouncedSearchInput onChange={(value) => setNameFilter(value)} delay={300} />
              {!subRoute && (
                <Button
                  disabled={Object.keys(sortConfig).length === 0 && !sortProjectProps.projectsAreSortable}
                  onClick={() => {
                    setToast(null);
                    resetSort();
                    sortProjectProps.setProjectsAreSortable(false);
                    setSortedProjects();
                  }}
                  className={"m-auto mt-0"}
                >
                  Sort
                </Button>
              )}
            </Stack>
          </Stack>
          <Pagination
            currentPage={currentPage + 1}
            onPressPrevious={(page) => {
              setCurrentPage(page - 1);
            }}
            onPressNext={(page) => {
              setCurrentPage(page - 1);
            }}
            pages={paginatedProjects.length}
            onKeyPress={(page) => {
              if (isNaN(page)) return;
              setCurrentPage(page - 1);
            }}
            variant="input"
          />
        </Stack>
      </ContentAreaToolbar>
      {paginatedProjects.length === 0 && <IntroBox text="No projects found" />}
      {paginatedProjects.length > 0 && (
        <DataGrid columns={headCells.length} gridColumnTemplate={gridColumSize}>
          <DataGridRow>
            {headCells.map((headCell) => (
              <TableSortHeader
                key={headCell.key}
                identifier={headCell.key}
                value={headCell.label}
                sortValueFn={headCell.sortValueFn}
                sortStrategy={headCell.sortStrategy}
                className={`p-0 sticky ${subRoute ? "top-[6.5rem]" : "top-40"} z-[100]`}
              >
                {headCell.label}
              </TableSortHeader>
            ))}
          </DataGridRow>
          {paginatedProjects[currentPage]?.map((project, index) => {
            const { resource, az } = projectResourceAZMap.get(project.metadata.id);
            const showCommitments = project.metadata.id === selectedProject.id && selectedProject.showCommitments;

            return !subRoute && resource ? (
              <ProjectTableDetails
                key={project.metadata.id}
                index={index}
                showCommitments={showCommitments}
                updateShowCommitments={updateShowCommitments}
                handleCommitmentTransfer={handleCommitmentTransfer}
                serviceType={serviceType}
                currentCategory={currentCategory}
                project={project}
                resource={resource}
                tracksQuota={resourceTracksQuota}
                az={az}
                currentTab={currentTab}
                mergeOps={mergeOps}
              />
            ) : (
              subRoute && resource && (
                <ProjectQuotaDetails
                  key={project.metadata.id}
                  serviceType={serviceType}
                  project={project}
                  resource={resource}
                />
              )
            );
          })}
        </DataGrid>
      )}
    </>
  );
};

export default ProjectTable;
