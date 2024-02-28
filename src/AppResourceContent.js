import React from "react";
import Overview from "./components/mainView/Overview";
import { useQuery } from "@tanstack/react-query";
import { Container, LoadingIndicator, Message } from "juno-ui-components";
import { HashRouter, Routes, Route } from "react-router-dom";
import PanelManager from "./components/panel/PanelManager";
import {
  globalStoreActions,
  projectStore,
  projectStoreActions,
} from "./components/StoreProvider";

const AppResourceContent = (props) => {
  const { projectData } = projectStore();
  const { refetchProjectAPI } = projectStore();
  const { setRefetchProjectAPI } = projectStoreActions();
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
    setProjectData(restructureReport(projectAPIData.project));
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

export default AppResourceContent;
