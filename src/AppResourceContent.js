// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { useQuery } from "@tanstack/react-query";
import useClusterAPI from "./hooks/useClusterAPI";
import { LoadingIndicator, Message } from "@cloudoperators/juno-ui-components";
import {
  useProjectStore,
  createCommitmentStoreActions,
  globalStoreActions,
  projectStoreActions,
  useCreateCommitmentStore,
} from "./components/StoreProvider";
import ContentRoutes from "./ContentRoutes";

const AppResourceContent = (props) => {
  const projectData = useProjectStore((state) => state.projectData);
  const refetchProjectAPI = useProjectStore((state) => state.refetchProjectAPI);
  const { setRefetchProjectAPI } = projectStoreActions();
  const refetchCommitmentAPI = useCreateCommitmentStore((state) => state.refetchCommitmentAPI);
  const { setRefetchCommitmentAPI } = createCommitmentStoreActions();
  const { setCurrentProject } = createCommitmentStoreActions();
  const commitments = useProjectStore((state) => state.commitments);
  const { setProjectData } = projectStoreActions();
  const { restructureReport } = globalStoreActions();
  const { setCommitments } = projectStoreActions();
  const { cluster } = useClusterAPI({ isDetail: true });
  const projectQueryResult = useQuery({
    queryKey: ["projectData"],
  });
  const commitQueryResult = useQuery({
    queryKey: ["commitmentData"],
  });
  const { data: projectAPIData } = projectQueryResult;
  const {
    data: commitmentAPIData,
    isLoading: commitmentLoads,
    isError: commitmentIsError,
    error: commitmentError,
  } = commitQueryResult;

  React.useEffect(() => {
    if (!refetchProjectAPI) return;
    setRefetchProjectAPI(false);
    projectQueryResult.refetch();
  }, [refetchProjectAPI]);

  React.useEffect(() => {
    if (!refetchCommitmentAPI) return;
    setRefetchCommitmentAPI(false);
    commitQueryResult.refetch();
  }, [refetchCommitmentAPI]);

  React.useEffect(() => {
    // Initial Commitment-API data fetch.
    if (!projectAPIData) return;
    setProjectData(restructureReport(projectAPIData.project));
  }, [projectAPIData]);

  // Need to set the current project to serve the transfer commitment API.
  React.useEffect(() => {
    if (!projectData) return;
    setCurrentProject(projectData);
  }, [projectData]);

  React.useEffect(() => {
    if (!commitmentAPIData) return;
    setCommitments(commitmentAPIData.commitments);
  }, [commitmentAPIData]);

  return commitmentIsError ? (
    <Message>{commitmentError.message}</Message>
  ) : cluster.isError ? (
    <Message>{cluster.error.message}</Message>
  ) : commitmentLoads || !cluster.data || !commitments ? (
    <LoadingIndicator className={"m-auto"} />
  ) : (
    <ContentRoutes queryResult={projectQueryResult} parsedData={projectData} canEdit={props.canEdit} />
  );
};

export default AppResourceContent;
