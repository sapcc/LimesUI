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
