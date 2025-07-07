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
import { AppShell, AppShellProvider, Icon, Stack, Spinner } from "@cloudoperators/juno-ui-components";
import StoreProvider, {
  apiStore,
  apiStoreActions,
  projectStore,
  projectStoreActions,
  globalStoreActions,
} from "../components/StoreProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import styles from "../styles.css";
import { getBaseURL } from "../lib/scope";
import AsyncWorker from "../AsyncWorker";
import getQuotaFromResources from "./quota";

// Provided from Elektra: Region/Domain/Project/Plugin_name/Token(Openstack)
// Region: eu-de-1
// Domain: monsoon3 or the ID
// Project: cc-demo or the ID
// plugin_name: compute | networking .... => names come from Elektra plugin directory.

const QuotaUsage = (props) => {
  const { quotaProject } = props;
  const { projectData } = projectStore();
  const { setProjectData } = projectStoreActions();
  const { restructureReport } = globalStoreActions();
  const projectQueryResult = useQuery({
    queryKey: ["projectData"],
  });
  const { data, isLoading, isError, error } = projectQueryResult;
  const [displayLabel, setDisplayLabel] = React.useState(null);
  const [service, setService] = React.useState({ type: null, resources: [] });
  const urlPath = getBaseURL();
  const stackDistribution = props.quotaAlign != "" ? props.quotaAlign : "end";

  React.useEffect(() => {
    // Determine the availability of the project first.
    // Otherwise the loading indicator will be displayed on each elektra plugin.
    if (!quotaProject) return;
    switch (quotaProject) {
      case "compute":
        setService({
          type: "compute",
          resources: ["instances", "cores", "ram"],
        });
        break;
      case "block_storage":
        setService({
          type: "volumev2",
          resources: ["volumes", "snapshots", "capacity"],
        });
        break;
      case "lbaas2":
        setService({
          type: "loadbalancing",
          resources: ["loadbalancers", "listeners", "pools", "l7policies"],
        });
        break;
      case "networking":
        setService({
          type: "networking",
          resources: ["floating_ips", "networks", "subnets", "routers", "security_groups"],
        });
        break;
      case "shared_filesystem_storage":
        setService({
          type: "sharev2",
          resources: ["share_capacity", "shares", "share_snapshots", "share_networks", "snapshot_capacity"],
        });
        break;
      case "dns_service":
        setService({
          type: "dns",
          resources: ["zones", "recordsets"],
        });
        break;
      case "keppel":
        setService({
          type: "keppel",
          resources: ["images"],
        });
        break;
      case "object_storage":
        setService({
          type: "object-store",
          resources: ["capacity"],
        });
        break;
      default:
        setDisplayLabel(null);
        break;
    }
  }, [quotaProject]);

  React.useEffect(() => {
    if (!data) return;
    setProjectData(restructureReport(data.project));
  }, [data]);

  React.useEffect(() => {
    if (!projectData || !service.type) return;
    setDisplayLabel(getQuotaFromResources(projectData, service.type, service.resources));
  }, [projectData, service]);

  return !service.type ? (
    <></>
  ) : isError ? (
    <>{console.log(error)}</>
  ) : isLoading ? (
    <Spinner variant="primary" size="small" />
  ) : (
    displayLabel && (
      <Stack direction="horizontal" distribution={stackDistribution} gap="1">
        <Stack className={"text-[#888888]"} direction="horizontal" distribution="start" alignment="center" gap="1">
          <Icon icon="monitorHeart" size="16px" />
          <div className="text-xs whitespace-nowrap">Remaining Quota:</div>
        </Stack>
        <a href={urlPath}>
          <Stack
            className="hover:underline  text-[#888888] hover:text-[#555555]"
            direction="horizontal"
            distribution="start"
            alignment="start"
          >
            <div className="text-xs text-justify">{displayLabel}</div>
          </Stack>
        </a>
      </Stack>
    )
  );
};

const App = (props) => {
  const { queryClient } = props;
  const { apiReady } = apiStore();
  const { token } = apiStore();
  const { setToken } = apiStoreActions();
  const { setGlobalAPI } = apiStoreActions();
  const [tokenError, setTokenError] = React.useState(false);

  async function getToken() {
    // set to empty string to fetch local test data in dev mode
    if (!window[props.getTokenFuncName]) {
      setTokenError(true);
      setToken(props.token);
      return;
    }
    const token = await window[props.getTokenFuncName]();
    setToken(token.authToken);
  }

  React.useEffect(() => {
    getToken();
  }, []);

  React.useEffect(() => {
    if (token) {
      setTokenError(false);
    }
  }, [token]);

  async function getToken() {
    // set to empty string to fetch local test data in dev mode
    if (!window[props.getTokenFuncName]) {
      setToken(props.token);
      return;
    }
    const token = await window[props.getTokenFuncName]();
    setToken(token.authToken);
  }

  React.useEffect(() => {
    getToken();
  }, []);

  React.useEffect(() => {
    setGlobalAPI({
      endpoint: props.endpoint || props.currentHost || "",
      // Token needs to be fetched from Elektra.
      projectID: props.projectID || projectID || "",
      domainID: props.domainID || "",
    });
  }, []);

  return tokenError ? (
    <>{console.log("Failed to fetch a token. Please provide a token as property or provide a getTokenFunc.")}</>
  ) : (
    <QueryClientProvider client={queryClient}>
      <AsyncWorker mockAPI={props.mockAPI} />
      <AppShell embedded={true}>{apiReady && <QuotaUsage {...props} />}</AppShell>
    </QueryClientProvider>
  );
};

const Usage = (props) => {
  const queryClient = new QueryClient();

  // HardCut: don't render the component if no domain/project ID's are provided
  // This plugin is only available on project level.
  // Return null on cluster/domain level to ensure local development without errors.
  if (!props.projectID || !props.domainID) return null;

  return (
    <AppShellProvider theme={`${props.theme ? props.theme : "theme-dark"}`}>
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <StoreProvider>
        <App {...props} queryClient={queryClient} />
      </StoreProvider>
    </AppShellProvider>
  );
};

export default Usage;
