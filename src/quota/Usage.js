import React from "react";
import { AppShellProvider, Icon, Stack, Spinner } from "juno-ui-components";
import StoreProvider, {
  apiStore,
  apiStoreActions,
  projectStore,
  projectStoreActions,
  globalStoreActions,
} from "../components/StoreProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import styles from "../styles.scss";
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
  const urlPath = getBaseURL();

  React.useEffect(() => {
    if (!data) return;
    setProjectData(restructureReport(data.project));
  }, [data]);

  React.useEffect(() => {
    if (!projectData) return;
    console.log(projectData);
    switch (quotaProject) {
      case "compute":
        setDisplayLabel(
          getQuotaFromResources(projectData, "compute", [
            "instances",
            "cores",
            "ram",
          ])
        );
        break;
      case "block_storage":
        setDisplayLabel(
          getQuotaFromResources(projectData, "volumev2", [
            "volumes",
            "snapshots",
            "capacity",
          ])
        );
        break;
      case "lbaas2":
        setDisplayLabel(
          getQuotaFromResources(projectData, "loadbalancing", [
            "loadbalancers",
            "listeners",
            "pools",
            "l7policies",
          ])
        );
        break;
      case "networking":
        setDisplayLabel(
          getQuotaFromResources(projectData, "networking", [
            "floating_ips",
            "networks",
            "subnets",
            "routers",
            "security_groups",
          ])
        );
        break;
      case "shared_filesystem_storage":
        setDisplayLabel(
          getQuotaFromResources(projectData, "sharev2", [
            "share_capacity",
            "shares",
            "share_snapshots",
            "share_networks",
            "snapshot_capacity",
          ])
        );
        break;
      case "dns_service":
        setDisplayLabel(
          getQuotaFromResources(projectData, "dns", ["zones", "recordsets"])
        );
        break;
      case "keppel":
        setDisplayLabel(
          getQuotaFromResources(projectData, "keppel", ["images"])
        );
        break;
      case "object_storage":
        setDisplayLabel(
          getQuotaFromResources(projectData, "object-store", ["capacity"])
        );
        break;
      default:
        setDisplayLabel(null);
        break;
    }
  }, [projectData]);

  return isError ? (
    <>{console.log(error)}</>
  ) : isLoading ? (
    <Spinner variant="primary" size="small"/>
  ) : (
    displayLabel && (
      <a href={urlPath}>
        <Stack
          direction="horizontal"
          className={"text-[#888888] hover:text-[#555555]"}
        >
          <Icon icon="monitorHeart" size="16px" />
          &nbsp;
          <div className="text-xs hover:underline">
            Remaining Quota: {displayLabel}
          </div>
        </Stack>
      </a>
    )
  );
};

const App = (props) => {
  const { queryClient } = props;
  const { apiReady } = apiStore();
  const { token } = apiStore();
  const { setGlobalAPI } = apiStoreActions();

  React.useEffect(() => {
    setGlobalAPI({
      endpoint: props.endpoint || props.currentHost || "",
      // Token will be directly provided by elektra.
      token: props.token || "",
      projectID: props.projectID || projectID || "",
      domainID: props.domainID || "",
    });
  }, []);

  return (
    token && (
      <QueryClientProvider client={queryClient}>
        <AsyncWorker mockAPI={props.mockAPI} />
        {apiReady && <QuotaUsage {...props} />}
      </QueryClientProvider>
    )
  );
};

const Usage = (props) => {
  const queryClient = new QueryClient();
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
