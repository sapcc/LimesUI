import React from "react";
import { useQuery } from "@tanstack/react-query";
import useClusterAPI from "./hooks/useClusterAPI";
import { LoadingIndicator, Message } from "juno-ui-components";
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
  const { commitments } = projectStore();
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
    isLoading: commitmentIsLoading,
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

  React.useEffect(() => {
    if (!commitmentAPIData) return;
    setCommitments(commitmentAPIData.commitments);
  }, [commitmentAPIData]);

  return commitmentIsError ? (
    <Message>{commitmentError.message}</Message>
  ) : cluster.isError ? (
    <Message>{cluster.error.message}</Message>
  ) : commitmentIsLoading || cluster.isLoading ? (
    <LoadingIndicator className={"m-auto"} />
  ) : (
    commitments && (
      <ContentRoutes
        queryResult={projectQueryResult}
        parsedData={projectData}
        canEdit={props.canEdit}
      />
    )
  );
};

export default AppResourceContent;
