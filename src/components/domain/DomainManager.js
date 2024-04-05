import React from "react";
import { useQuery } from "@tanstack/react-query";
import { clusterStore, clusterStoreActions } from "../StoreProvider";
import ProjectsPerDomain from "./ProjectsPerDomain";

const DomainManager = (props) => {
  const { serviceType, currentCategory, currentResource, parentResource, currentAZ } = props;
  const { domainData } = clusterStore();
  const { setDomainData } = clusterStoreActions();
  const domainQueryResult = useQuery({
    queryKey: ["domains", "", ""],
  });
  const { data: domainAPIData, isLoading } = domainQueryResult;

  React.useEffect(() => {
    if (!domainAPIData) {
      return;
    }
    setDomainData(domainAPIData.domains);
  }, [domainAPIData]);

  return (
    domainData &&
    !isLoading && (
      <ProjectsPerDomain
        serviceType={serviceType}
        resource={currentResource}
        parentResource={parentResource}
        domains={domainData}
        currentCategory={currentCategory}
        currentAZ={currentAZ}
      />
    )
  );
};

export default DomainManager;
