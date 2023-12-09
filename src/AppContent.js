import React from "react";
import Overview from "./components/Overview";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Container, LoadingIndicator, Message } from "juno-ui-components";
import { HashRouter, Routes, Route } from "react-router-dom";
import PanelManager from "./components/project/PanelManager";
import { limesStore, limesStoreActions } from "./components/StoreProvider";

const AppContent = (props) => {
  const { projectData } = limesStore();
  const { refetchProjectAPI } = limesStore();
  const { setRefetchProjectAPI } = limesStoreActions();
  const { commitments } = limesStore();
  const { setProjectData } = limesStoreActions();
  const { restructureReport } = limesStoreActions();
  const { setCommitments } = limesStoreActions();
  const projectQueryResult = useQuery({
    queryKey: ["projectData"],
  });
  const commitQueryResult = useQuery({
    queryKey: ["commitmentData"],
  });
  const {
    data: projectAPIData,
    isLoading: projectIsLoading,
    isError: projectIsError,
    error,
  } = projectQueryResult;
  const { data: commitmentAPIData, isLoading: commitmenIsLoading } =
    commitQueryResult;

  React.useEffect(() => {
    if (!refetchProjectAPI) return;
    setRefetchProjectAPI(false);
    projectQueryResult.refetch();
  }, [refetchProjectAPI]);

  React.useEffect(() => {
    // Initial Commitment-API data fetch.
    if (!projectAPIData) return;
    setProjectData(restructureReport(projectAPIData));
  }, [projectAPIData]);

  React.useEffect(() => {
    if (!commitmentAPIData) return;
    setCommitments(commitmentAPIData.commitments);
  }, [commitmentAPIData]);

  return projectIsError ? (
    <Message>{error.message}</Message>
  ) : (
    <Container px={false}>
      {projectData &&
      commitments &&
      !projectIsLoading &&
      !commitmenIsLoading ? (
        <HashRouter>
          <Routes>
            <Route
              index
              element={<Overview {...projectData} canEdit={props.canEdit} />}
            ></Route>
            <Route
              path="/:currentArea"
              element={<Overview {...projectData} canEdit={props.canEdit} />}
            >
              {props.canEdit && (
                <Route
                  path="edit/:categoryName/:resourceName"
                  element={<PanelManager {...projectData} />}
                />
              )}
            </Route>
          </Routes>
        </HashRouter>
      ) : (
        <LoadingIndicator className={"m-auto"} />
      )}
    </Container>
  );
};

export default AppContent;
