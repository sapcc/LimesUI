// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { useQuery } from "@tanstack/react-query";
import useClusterAPI from "./hooks/useClusterAPI";
import { LoadingIndicator, Message } from "@cloudoperators/juno-ui-components";
import {
  createCommitmentStore,
  createCommitmentStoreActions,
  globalStoreActions,
  projectStore,
  projectStoreActions,
} from "./components/StoreProvider";
import ContentRoutes from "./ContentRoutes";

const AppResourceContent = (props) => {
  const { projectData } = projectStore();
  const { refetchProjectAPI } = projectStore();
  const { setRefetchProjectAPI } = projectStoreActions();
  const { refetchCommitmentAPI } = createCommitmentStore();
  const { setRefetchCommitmentAPI } = createCommitmentStoreActions();
  const { setCurrentProject } = createCommitmentStoreActions();
  const { commitments } = projectStore();
  const { setCommitmentIsFetching } = createCommitmentStoreActions();
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
    isFetching: commitmentIsFetching,
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
    setCommitmentIsFetching(commitmentIsFetching);
  }, [commitmentIsFetching]);

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
  ) : commitmentLoads || !cluster.data ? (
    <LoadingIndicator className={"m-auto"} />
  ) : (
    commitments && <ContentRoutes queryResult={projectQueryResult} parsedData={projectData} canEdit={props.canEdit} />
  );
};

export default AppResourceContent;
