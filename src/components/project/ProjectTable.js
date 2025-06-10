/**
 * Copyright 2024 SAP SE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { chunkProjects, getCurrentResource, tracksQuota } from "../../lib/utils";
import { PanelType } from "../../lib/constants";
import { globalStore, domainStoreActions, createCommitmentStoreActions, domainStore } from "../StoreProvider";
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
  None: "none",
});

// Display the project details in DomainView
const ProjectTable = (props) => {
  const { serviceType, currentResource, currentCategory, currentAZ, projects, subRoute, mergeOps } = props;
  const resourceTracksQuota = tracksQuota(currentResource);
  const { scope } = globalStore();
  const { previousProject } = domainStore();
  const { setPreviousProject } = domainStoreActions();
  const { setShowCommitments } = domainStoreActions();
  const { setSortedProjects } = domainStoreActions();
  const { setTransferProject } = createCommitmentStoreActions();
  const { setCurrentProject } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();
  const [filteredProjects, setFilteredProjects] = React.useState(chunkProjects(projects));
  const labelFilter = React.useRef(filterOpts.None);
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
    const projects = [...filteredProjects];
    const project = filteredProjects[currentPage][index];
    const projectID = filteredProjects[currentPage][index].metadata.id;
    const previousProjectID = previousProject?.metadata?.id;
    setCurrentProject(project);
    // Disable the last clicked project
    if (previousProject && projectID != previousProjectID) {
      setShowCommitments(previousProjectID, false);
    }
    // A click on the same (active) project disables it. Otherwise it enables it.
    setShowCommitments(projectID, !project.showCommitments);

    // Track the previous project.
    setPreviousProject(project);
    setFilteredProjects(projects);
  }

  const { availableLabels, projectsPerLabel } = React.useMemo(() => {
    if (subRoute) {
      return { availableLabels: [], projectsPerLabel: new Map() };
    }
    const uniqueLabels = new Set([filterOpts.None]);
    const matchingProjects = new Map();

    projects.forEach((project) => {
      project.categories[currentCategory].resources[0].per_az.forEach((az) => {
        if (az.name !== currentAZ) return;
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

    return { availableLabels: Array.from(uniqueLabels), projectsPerLabel: matchingProjects };
  }, [currentAZ]);

  function getProjectsToFilter() {
    const projectsToFilter =
      labelFilter.current == filterOpts.None ? projects : projectsPerLabel.get(labelFilter.current) || [];
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
  }, [currentAZ]);

  function handleCommitmentTransfer(project) {
    setTransferProject(project);
  }

  return projects ? (
    <>
      <ContentAreaToolbar className={`p-0 sticky ${subRoute ? "top-8" : "top-24"} z-[100]`}>
        <Stack className="w-full mb-7" direction="horizontal" distribution="between">
          <Stack gap="1">
            {!subRoute && (
              <Select
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
                  <SelectOption key={label}>{label}</SelectOption>
                ))}
              </Select>
            )}
            <SearchInput
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
                onClick={() => {
                  setToast(null);
                  setSortedProjects(projects);
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
            const az = resource.per_az.find((az) => {
              return az.name === currentAZ;
            });
            return !subRoute ? (
              <ProjectTableDetails
                key={project.metadata.id}
                index={index}
                showCommitments={filteredProjects[currentPage][index].showCommitments}
                updateShowCommitments={updateShowCommitments}
                handleCommitmentTransfer={handleCommitmentTransfer}
                serviceType={serviceType}
                currentCategory={currentCategory}
                project={project}
                resource={resource}
                tracksQuota={resourceTracksQuota}
                az={az}
                currentAZ={currentAZ}
                colSpan={colSpan}
                mergeOps={mergeOps}
              />
            ) : (
              <ProjectQuotaDetails
                key={project.metadata.id}
                serviceType={serviceType}
                project={project}
                resource={resource}
              />
            );
          })}
      </DataGrid>
    </>
  ) : (
    <LoadingIndicator className={"m-auto"} />
  );
};

export default ProjectTable;
