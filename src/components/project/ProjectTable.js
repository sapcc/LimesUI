// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { PanelType } from "../../lib/constants";
import { chunkProjects, getCurrentResource, tracksQuota } from "../../lib/utils";
import { globalStore, domainStoreActions, createCommitmentStoreActions } from "../StoreProvider";
import useDebounce from "../shared/useDebounce";
import ProjectTableDetails from "./ProjectTableDetails";
import {
  Stack,
  SearchInput,
  Pagination,
  ContentAreaToolbar,
  DataGrid,
  DataGridHeadCell,
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
  const { scope } = globalStore();
  const { setSortedProjects } = domainStoreActions();
  const { setTransferFromAndToProject, setTransferProject, setCurrentProject, setToast } =
    createCommitmentStoreActions();
  const [selectedProject, setSelectedProject] = React.useState({ id: "", showCommitments: false });
  const [currentPage, setCurrentPage] = React.useState(0);
  const [nameFilter, setNameFilter] = React.useState("");
  const debouncedNameFilter = useDebounce(nameFilter);
  const [selectedLabelFilter, setSelectedLabelFilter] = React.useState(labelTypes.ANY);
  const [selectedDurationFilter, setSelectedDurationFilter] = React.useState(labelTypes.ANY);
  const filterNeedsUpdate = React.useRef(false);
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

  const { projectsPerLabel, validLabels, validDurations } = React.useMemo(() => {
    if (subRoute) {
      return { projectsPerLabel: new Map(), validLabels: new Set(), validDurations: new Set() };
    }

    const projectsPerLabel = new Map();
    const validDurations = new Set();
    projects.forEach((project) => {
      project.categories[currentCategory]?.resources[0]?.per_az?.forEach((az) => {
        if (az.name !== currentTab) return;
        const matchingLabels = Object.values(labelTypes).filter((type) => matchAZLabel(az, type));
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
        const resource = project.categories[currentCategory]?.resources[0];
        const az = resource?.per_az?.find((az) => az.name === currentTab);
        const commitments = az?.committed || {};
        return commitments[effectiveDurationFilter] > 0;
      });
    }

    if (debouncedNameFilter.trim() !== "") {
      const searchTerm = debouncedNameFilter.toLowerCase();
      const isCluster = scope.isCluster();
      result = result.filter((project) => {
        const filterName = isCluster ? project.metadata.fullName : project.metadata.name;
        const projectID = project.metadata.id;
        return filterName.toLowerCase().includes(searchTerm) || projectID.toLowerCase().includes(searchTerm);
      });
    }

    return chunkProjects(result);
  }, [
    scope,
    projects,
    currentCategory,
    currentTab,
    debouncedNameFilter,
    projectsPerLabel,
    effectiveLabelFilter,
    effectiveDurationFilter,
  ]);

  // Defer page reset until after debounce completes to avoid sluggish input.
  // Otherwise, setCurrentPage(0) would cause an immediate re-render on keystroke.
  React.useEffect(() => {
    setCurrentPage(0);
  }, [debouncedNameFilter]);

  // Sync filter state when it becomes invalid for the current tab.
  React.useEffect(() => {
    filterNeedsUpdate.current = true;
    if (!validLabels.has(selectedLabelFilter)) {
      setSelectedLabelFilter(labelTypes.ANY);
    }
    if (!validDurations.has(selectedDurationFilter)) {
      setSelectedDurationFilter(labelTypes.ANY);
    }
  }, [validLabels, validDurations, selectedLabelFilter, selectedDurationFilter]);

  // Subcomponent handlers
  function updateShowCommitments(index) {
    const project = filteredProjects[currentPage][index];
    const projectID = filteredProjects[currentPage][index].metadata.id;
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
              <SearchInput
                data-testid="Search"
                value={nameFilter}
                onChange={(e) => {
                  setNameFilter(e.target.value);
                }}
                onClear={() => {
                  setNameFilter("");
                }}
              />
              {!subRoute && (
                <Button
                  disabled={!sortProjectProps.projectsAreSortable}
                  onClick={() => {
                    setToast(null);
                    setSortedProjects();
                    sortProjectProps.setProjectsAreSortable(false);
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
            pages={filteredProjects.length}
            onKeyPress={(page) => {
              if (isNaN(page)) return;
              setCurrentPage(page - 1);
            }}
            variant="input"
          />
        </Stack>
      </ContentAreaToolbar>
      {filteredProjects.length === 0 && <IntroBox text="No projects found" />}
      {filteredProjects.length > 0 && (
        <DataGrid columns={headCells.length} gridColumnTemplate={gridColumSize}>
          <DataGridRow>
            {headCells.map((headCell) => (
              <DataGridHeadCell
                key={headCell.key}
                className={`p-0 sticky ${subRoute ? "top-[6.5rem]" : "top-40"} z-[100]`}
              >
                {headCell.label}
              </DataGridHeadCell>
            ))}
          </DataGridRow>
          {filteredProjects[currentPage]?.map((project, index) => {
            const { categories } = project;
            const { resources } = categories[currentCategory] ?? { resources: [] };
            const resource = getCurrentResource(resources, currentResource.name);
            const showCommitments = project.metadata.id === selectedProject.id && selectedProject.showCommitments;
            const az = resource?.per_az.find((az) => {
              return az.name === currentTab;
            });
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
