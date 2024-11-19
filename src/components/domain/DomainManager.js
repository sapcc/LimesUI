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
import { useQuery } from "@tanstack/react-query";
import { clusterStore, clusterStoreActions } from "../StoreProvider";
import ProjectsPerDomain from "./ProjectsPerDomain";

const DomainManager = (props) => {
  const {
    serviceType,
    currentCategory,
    currentResource,
    currentAZ,
    subRoute,
    setMaxQuota,
  } = props;
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
        domains={domainData}
        currentCategory={currentCategory}
        currentAZ={currentAZ}
        subRoute={subRoute}
        setMaxQuota={setMaxQuota}
      />
    )
  );
};

export default DomainManager;
