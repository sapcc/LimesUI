import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  clusterStore,
  clusterStoreActions,
  globalStoreActions,
} from "../components/StoreProvider";

// Used accross all views to display PAYG Availability content.
const useClusterAPI = ({ isDetail }) => {
  const { clusterData } = clusterStore();
  const { setClusterData } = clusterStoreActions();
  const { receiveCapacity } = globalStoreActions();
  const { refetchClusterAPI } = clusterStore();
  const { setRefetchClusterAPI } = clusterStoreActions();
  const clusterQueryResult = useQuery({
    queryKey: ["clusterData", isDetail],
  });
  const {
    data: clusterAPIData,
    isLoading,
    isError,
    error,
  } = clusterQueryResult;

  React.useEffect(() => {
    // Initial Commitment-API data fetch.
    if (!clusterAPIData) return;
    setClusterData(receiveCapacity(clusterAPIData.cluster));
  }, [clusterAPIData]);

  React.useEffect(() => {
    if (!refetchClusterAPI) return;
    setRefetchClusterAPI(false);
    clusterQueryResult.refetch();
  }, [refetchClusterAPI]);

  return { cluster: { data: clusterData, isLoading, isError, error } };
};

export default useClusterAPI;
