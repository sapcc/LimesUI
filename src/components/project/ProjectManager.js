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
import ProjectTable from "./ProjectTable";
import { useQuery } from "@tanstack/react-query";
import { projectStore, projectStoreActions } from "../StoreProvider";
import { globalStoreActions, domainStoreActions, domainStore } from "../StoreProvider";
import { LoadingIndicator } from "@cloudoperators/juno-ui-components";

const ProjectManager = (props) => {
  const { serviceType, currentCategory, currentResource, currentTab, subRoute, sortProjectProps, mergeOps } = props;
  const { enableSortActivities } = sortProjectProps;
  const resourceName = currentResource.name;
  const { refetchProjectAPI } = projectStore();
  const { setRefetchProjectAPI } = projectStoreActions();
  const { projects } = domainStore();
  const { setProjects } = domainStoreActions();
  const { restructureReport } = globalStoreActions();
  const projectsQueryResult = useQuery({
    queryKey: ["projectsInDomain", serviceType, resourceName],
  });
  const { data: projectsInDomain, isLoading } = projectsQueryResult;
  const projectsUpdated = React.useRef(false);
  const sortProjects = React.useRef(true);
  const refetchTriggered = React.useRef(false);

  // Fetch project data.
  // Only one project should show commitments at the same time. A variable gets added to the projects.
  React.useEffect(() => {
    if (!projectsInDomain) return;
    projectsUpdated.current = false;
    const projects = projectsInDomain.projects.map((project) => {
      return restructureReport(project);
    });
    setProjects(projects, sortProjects.current);
    if (projects?.length > 0 && refetchTriggered.current) {
      refetchTriggered.current = false;
      enableSortActivities();
    }
    projectsUpdated.current = true;
    sortProjects.current = true;
  }, [projectsInDomain]);

  React.useEffect(() => {
    if (!refetchProjectAPI) return;
    setRefetchProjectAPI(false);
    sortProjects.current = false;
    refetchTriggered.current = true;
    projectsQueryResult.refetch();
  }, [refetchProjectAPI]);

  return !isLoading && projects && projectsUpdated.current ? (
    <ProjectTable
      serviceType={serviceType}
      currentCategory={currentCategory}
      currentResource={currentResource}
      currentTab={currentTab}
      projects={projects}
      subRoute={subRoute}
      sortProjectProps={sortProjectProps}
      mergeOps={mergeOps}
    />
  ) : (
    <LoadingIndicator className={`m-auto`} />
  );
};

export default ProjectManager;
