import React from "react";
import ProjectTable from "./ProjectTable";
import { useQuery } from "@tanstack/react-query";
import { resourceHasParent } from "../../lib/utils";
import { projectStore, projectStoreActions } from "../StoreProvider";
import {
  globalStoreActions,
  domainStoreActions,
  domainStore,
} from "../StoreProvider";
import { LoadingIndicator } from "juno-ui-components";

const ProjectManager = (props) => {
  const { serviceType, currentCategory, currentResource, currentAZ } = props;
  const resourceName = resourceHasParent(currentResource)
    ? null
    : currentResource.name;
  const { refetchProjectAPI } = projectStore();
  const { setRefetchProjectAPI } = projectStoreActions();
  const { projects } = domainStore();
  const { setProjects } = domainStoreActions();
  const { restructureReport } = globalStoreActions();
  const projectsQueryResult = useQuery({
    queryKey: ["projectsInDomain", serviceType, resourceName],
  });
  const { data: projectsInDomain, isLoading } = projectsQueryResult;
  const sortProjects = React.useRef(true);

  // Fetch project data.
  // Only one project should show commitments at the same time. A variable gets added to the projects.
  React.useEffect(() => {
    if (!projectsInDomain) return;
    const projects = projectsInDomain.projects.map((project) => {
      return restructureReport(project);
    });
    setProjects(projects, sortProjects.current);
    sortProjects.current = true;
  }, [projectsInDomain]);

  React.useEffect(() => {
    if (!refetchProjectAPI) return;
    setRefetchProjectAPI(false);
    sortProjects.current = false;
    projectsQueryResult.refetch();
  }, [refetchProjectAPI]);

  return !isLoading && projects ? (
    <ProjectTable
      serviceType={serviceType}
      currentCategory={currentCategory}
      currentResource={currentResource}
      currentAZ={currentAZ}
      projects={projects}
    />
  ) : (
    <LoadingIndicator className={`m-auto`} />
  );
};

export default ProjectManager;
