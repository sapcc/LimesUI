import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  clusterStore,
  clusterStoreActions,
  globalStoreActions,
} from "./components/StoreProvider";
import ContentRoutes from "./ContentRoutes";

const AppClusterContent = (props) => {
  const { clusterData } = clusterStore();
  const { setClusterData } = clusterStoreActions();
  const { restructureReport } = globalStoreActions();
  const { refetchClusterAPI } = clusterStore();
  const { setRefetchClusterAPI } = clusterStoreActions();
  const clusterQueryResult = useQuery({
    queryKey: ["clusterData"],
  });
  const { data: clusterAPIData } = clusterQueryResult;

  React.useEffect(() => {
    // Initial Commitment-API data fetch.
    if (!clusterAPIData) return;
    setClusterData(restructureReport(clusterAPIData.cluster));
  }, [clusterAPIData]);

  React.useEffect(() => {
    if (!refetchClusterAPI) return;
    setRefetchClusterAPI(false);
    clusterQueryResult.refetch();
  }, [refetchClusterAPI]);

  return (
    <ContentRoutes
      queryResult={clusterQueryResult}
      parsedData={clusterData}
      canEdit={props.canEdit}
    />
  );
};

export default AppClusterContent;
