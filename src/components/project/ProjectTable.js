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
} from "@cloudoperators/juno-ui-components";
import ProjectQuotaDetails from "./ProjectQuotaDetails";

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
  const [filteredProjects, setFilteredProjects] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [input, setInput] = React.useState(null);

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

  // Refreshes our filtered data.
  // Filter exsists => only set the projects to filter, not all projects.
  React.useEffect(() => {
    const chunkedProjects = chunkProjects(projects);
    if (input) {
      filterProjects(input);
    } else {
      setFilteredProjects(chunkedProjects);
    }
  }, [projects, input]);

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

  // Change the displayed projects corresponding to its filtered string
  // The show commitment state will be transferred to filtered projects.
  function filterProjects(input) {
    const regex = new RegExp(input.trim(), "i");
    let filteredProjects = [];
    const filtered = projects.filter((project) => {
      const filterName = scope.isCluster() ? project.metadata.fullName : project.metadata.name;
      return regex.exec(filterName) || regex.exec(project.metadata.id);
    });
    filteredProjects.push(filtered);
    const chunkedProjects = chunkProjects(filteredProjects[0]);
    setFilteredProjects(chunkedProjects);
  }

  function handleCommitmentTransfer(project) {
    setTransferProject(project);
  }

  return projects ? (
    <>
      <ContentAreaToolbar className={`p-0 sticky ${subRoute ? "top-8" : "top-24"} z-[100]`}>
        <Stack className="w-full mb-7" direction="horizontal" distribution="between">
          <Stack gap="1">
            <SearchInput
              onChange={(e) => {
                setInput(e.target.value);
                setCurrentPage(0);
                filterProjects(e.target.value);
              }}
              onClear={() => {
                setInput(null);
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
            onPressNext={() => {
              currentPage < filteredProjects.length - 1 && setCurrentPage(currentPage + 1);
            }}
            onPressPrevious={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
            pages={filteredProjects.length}
            onKeyPress={(e) => {
              e.preventDefault();
              const value = Number(e.target.value) - 1;
              value < filteredProjects.length && value >= 0 && setCurrentPage(value);
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
            const az = resource.per_az.filter((az) => {
              const azName = az[0];
              return azName === currentAZ;
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
                az={az[0]}
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
