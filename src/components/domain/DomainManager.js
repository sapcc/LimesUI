// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { clusterStore, clusterStoreActions } from "../StoreProvider";
import ProjectsPerDomain from "./ProjectsPerDomain";

const DomainManager = (props) => {
  const { serviceType, currentCategory, currentResource, currentTab, subRoute, sortProjectProps, mergeOps } = props;
  const { domainData } = clusterStore();
  const { setDomainData } = clusterStoreActions();
  const domainQueryResult = useQuery({ queryKey: ["domains", "", ""] });
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
        domains={domainData}
        currentCategory={currentCategory}
        currentTab={currentTab}
        subRoute={subRoute}
        sortProjectProps={sortProjectProps}
        mergeOps={mergeOps}
      />
    )
  );
};

export default DomainManager;
