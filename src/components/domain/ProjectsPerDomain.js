import React from "react";
import { useQueries } from "@tanstack/react-query";
import {
  globalStoreActions,
  clusterStoreActions,
  domainStore,
  domainStoreActions,
  projectStore,
  projectStoreActions,
} from "../StoreProvider";
import ProjectTable from "../project/ProjectTable";
import { LoadingIndicator } from "juno-ui-components";

const ProjectsPerDomain = (props) => {
  // Fetch project data for all domains
  const { domains, serviceType, currentCategory, resource, currentAZ } = props;
  const resourceName = resource.name;
  const { restructureReport } = globalStoreActions();
  const { setProjectsToDomain } = clusterStoreActions();
  const { projects } = domainStore();
  const { setProjects } = domainStoreActions();
  const projectQueries = useQueries({
    queries: domains.map((domain) => {
      return {
        queryKey: ["projectsInDomain", serviceType, resourceName, domain.id],
      };
    }),
  });
  const isLoading = projectQueries.some((query) => query.isLoading);
  // Refetches change the fetchStatus not the loading status.
  const isFetching = projectQueries.some((query) => query.isFetching);
  const { setRefetchProjectAPI } = projectStoreActions();
  const { refetchProjectAPI } = projectStore();
  const sortProjects = React.useRef(true);
  // Required check for rendering. This is a fail save.
  // If not present: Projects might get pushed to panel table with the availability zones of the predecessor causing a crash.
  // For Example: Opening a resource with only "any" AZ and then quickly opening a resource which has different AZs.
  const projectsUpdated = React.useRef(false);

  // Cluster level: Add projects to fetched domains.
  React.useEffect(() => {
    if (isFetching) return;
    projectsUpdated.current = false;
    const restructucturedProjects = projectQueries.map((query) => {
      return query.data.projects.map((projects) => {
        return restructureReport(projects);
      });
    });
    setProjectsToDomain(restructucturedProjects);
    // Flat the projects within the domains in order to pass them to the project table.
    const flattendProjects = domains.flatMap((domain) =>
      domain.projects?.map((project) => {
        project.metadata.domainID = domain.id;
        project.metadata.domainName = domain.name;
        project.metadata.fullName = domain.name + "/" + project.metadata.name;
        return project;
      })
    );
    setProjects(flattendProjects, sortProjects.current);
    projectsUpdated.current = true;
  }, [isFetching]);

  React.useEffect(() => {
    if (!refetchProjectAPI) return;
    setRefetchProjectAPI(false);
    sortProjects.current = false;
    projectQueries.forEach((query) => {
      query.refetch();
    });
  }, [refetchProjectAPI]);

  return projects && !isLoading && projectsUpdated.current ? (
    <ProjectTable
      serviceType={serviceType}
      currentCategory={currentCategory}
      currentAZ={currentAZ}
      projects={projects}
    />
  ) : (
    <LoadingIndicator className={`m-auto`} />
  );
};

export default ProjectsPerDomain;
