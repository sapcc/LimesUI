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
  const [projectsUpdated, setProjectsUpdated] = React.useState(false);
  const projectQueries = useQueries({
    queries: domains.map((domain) => {
      return {
        queryKey: ["projectsInDomain", serviceType, resourceName, domain.id],
      };
    }),
  });
  const isLoading = projectQueries.some((query) => query.isLoading);
  const { setRefetchProjectAPI } = projectStoreActions();
  const { refetchProjectAPI } = projectStore();
  const sortProjects = React.useRef(true);

  // Cluster level: Add projects to fetched domains.
  React.useEffect(() => {
    if (isLoading) return;
    const restructucturedProjects = projectQueries.map((query) => {
      return query.data.projects.map((projects) => {
        return restructureReport(projects);
      });
    });
    setProjectsUpdated(true);
    setProjectsToDomain(restructucturedProjects);
  }, [isLoading]);

  // Domain level: Flatten the nested array of projects over all domains.
  React.useEffect(() => {
    if (!projectsUpdated) return;
    const flattendProjects = domains.flatMap((domain) =>
      domain.projects?.map((project) => {
        project.metadata.domainID = domain.id;
        project.metadata.domainName = domain.name;
        project.metadata.fullName = domain.name + "/" + project.metadata.name;
        return project;
      })
    );
    setProjects(flattendProjects, sortProjects.current);
    sortProjects.current = true;
  }, [projectsUpdated]);

  React.useEffect(() => {
    if (!refetchProjectAPI) return;
    setRefetchProjectAPI(false);
    sortProjects.current = false;
    projectQueries.forEach((query) => {
      query.refetch();
    });
  }, [refetchProjectAPI]);

  return projects && !isLoading ? (
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