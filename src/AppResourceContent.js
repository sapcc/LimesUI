import React from "react";
import { useQuery } from "@tanstack/react-query";
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

  // TODO: This is quick fix. Not checking the commitment API state caused commitments not showing for a while.
  // This will be rewritten more neatly when I'm back from holiday.
  // IMPORTANT: QA Elektra has issues. The UI will show CORS errors. I tested this successfully in eu-de-1
  // Contact the UI team if we keep seeing CORS error in console.
  return commitmentIsError ? (
    <Message>{commitmentError.message}</Message>
  ) : commitments && !commitmentIsLoading ? (
    <ContentRoutes
      queryResult={projectQueryResult}
      parsedData={projectData}
      canEdit={props.canEdit}
    />
  ) : (
    <LoadingIndicator className={"m-auto"} />
  );
};

export default AppResourceContent;
