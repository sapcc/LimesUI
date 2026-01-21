// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { chunkProjects, getCurrentResource, tracksQuota } from "../../lib/utils";
import { PanelType } from "../../lib/constants";
import { globalStore, domainStoreActions, createCommitmentStoreActions } from "../StoreProvider";
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
const filterOpts = Object.freeze({
  Any: "any",
});

// Display the project details in DomainView
const ProjectTable = (props) => {
  const { serviceType, currentResource, currentCategory, currentTab, projects, subRoute, sortProjectProps, mergeOps } =
    props;
  const resourceTracksQuota = tracksQuota(currentResource);
  const { scope } = globalStore();
  const [selectedProject, setSelectedProject] = React.useState({ id: "", showCommitments: false });
  const { setSortedProjects } = domainStoreActions();
  const { setTransferFromAndToProject } = createCommitmentStoreActions();
  const { setTransferProject } = createCommitmentStoreActions();
  const { setCurrentProject } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();
  const [filteredProjects, setFilteredProjects] = React.useState(chunkProjects(projects));
  const labelFilter = React.useRef(filterOpts.Any);
  const nameFilter = React.useRef("");
  const [currentPage, setCurrentPage] = React.useState(0);

  if (!resourceTracksQuota && subRoute) return;

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

  // Tailwind only accepts complete class names as string, otherwise it won't create the corresponding CSS.
  const colSpan = "col-span-4";

  function updateShowCommitments(index) {
    const project = filteredProjects[currentPage][index];
    const projectID = filteredProjects[currentPage][index].metadata.id;
    setCurrentProject(project);

    if (projectID == selectedProject.id) {
      // A click on the same (active) project disables it. Otherwise it enables it.
      setSelectedProject({ id: projectID, showCommitments: !selectedProject.showCommitments });
    } else {
      setSelectedProject({ id: projectID, showCommitments: true });
    }
  }

  const { availableLabels, projectsPerLabel } = React.useMemo(() => {
    if (subRoute) {
      return { availableLabels: [], projectsPerLabel: new Map() };
    }
    const uniqueLabels = new Set([filterOpts.Any]);
    const matchingProjects = new Map();

    projects.forEach((project) => {
      project.categories[currentCategory]?.resources[0]?.per_az.forEach((az) => {
        if (az.name !== currentTab) return;
        const matchingLabels = Object.values(labelTypes).filter((type) => matchAZLabel(az, type));
        if (matchingLabels.length > 0) {
          matchingLabels.forEach((label) => {
            uniqueLabels.add(label);
            if (!matchingProjects.has(label)) {
              matchingProjects.set(label, []);
            }
            matchingProjects.get(label).push(project);
          });
        }
      });
    });

    return { availableLabels: Array.from(uniqueLabels).sort(), projectsPerLabel: matchingProjects };
  }, [currentTab]);

  function getProjectsToFilter() {
    const projectsToFilter =
      labelFilter.current == filterOpts.Any ? projects : projectsPerLabel.get(labelFilter.current) || [];
    return projectsToFilter;
  }

  // Change the displayed projects corresponding to its filtered string
  // The show commitment state will be transferred to filtered projects.
  function filterProjectsByName(projects) {
    const regex = new RegExp(nameFilter.current.trim(), "i");
    const filteredProjects = projects.filter((project) => {
      const filterName = scope.isCluster() ? project.metadata.fullName : project.metadata.name;
      const projectID = project.metadata.id;
      const matchesNameOrID = regex.exec(filterName) || regex.exec(projectID);
      return matchesNameOrID;
    });
    setFilteredProjects(chunkProjects(filteredProjects));
  }

  function filterProjectsPerNameOrLabel() {
    const projectsToFilter = getProjectsToFilter();
    if (nameFilter.current === "") {
      setFilteredProjects(chunkProjects(projectsToFilter));
    } else {
      filterProjectsByName(projectsToFilter);
    }
    setCurrentPage(0);
  }
  React.useEffect(() => {
    filterProjectsPerNameOrLabel();
  }, [projects, currentTab]);

  function handleCommitmentTransfer(project) {
    setTransferProject(project);
    setTransferFromAndToProject(TransferStatus.START);
  }

  return projects ? (
    <>
      <ContentAreaToolbar className={`p-0 sticky ${subRoute ? "top-8" : "top-24"} z-[100]`}>
        <Stack className="w-full mb-7" direction="horizontal" distribution="between">
          <Stack gap="1">
            {!subRoute && (
              <Select
                data-testid="Filter"
                className="w-40"
                width="auto"
                label="Filter"
                placeholder={labelFilter.current}
                onChange={(label) => {
                  labelFilter.current = label;
                  filterProjectsPerNameOrLabel();
                }}
              >
                {Object.values(availableLabels).map((label) => (
                  <SelectOption data-testid={`filter-${label}`} key={label}>{label}</SelectOption>
                ))}
              </Select>
            )}
            <SearchInput
              data-testid="Search"
              value={nameFilter.current}
              onChange={(e) => {
                nameFilter.current = e.target.value;
                filterProjectsPerNameOrLabel();
              }}
              onClear={() => {
                nameFilter.current = "";
                filterProjectsPerNameOrLabel();
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
        {filteredProjects.length > 0 &&
          filteredProjects[currentPage].map((project, index) => {
            const { categories } = project;
            const { resources } = Object.values(categories)[0];
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
                colSpan={colSpan}
                mergeOps={mergeOps}
              />
            ) : (
              subRoute && (
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
    </>
  ) : (
    <LoadingIndicator className={"m-auto"} />
  );
};

export default ProjectTable;
