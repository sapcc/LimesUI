import React from "react";
import Overview from "./components/Overview";
import { useQuery } from "@tanstack/react-query";
import { Container, LoadingIndicator, Message } from "juno-ui-components";
import { fetchProjectData } from "./lib/apiClient";
import { HashRouter, Routes, Route } from "react-router-dom";
import EditPanel from "./components/project/EditPanel";
import useStore from "./lib/store/store";

const AppContent = (props) => {
  const refetchProjectAPI = useStore((state) => state.refetchProjectAPI);
  const setRefetchProjectAPI = useStore((state) => state.setRefetchProjectAPI);
  const projectQueryResult = useQuery({
    queryKey: ["projectData", props.mockAPI],
    queryFn: fetchProjectData,
  });
  const commitQueryResult = useQuery({
    queryKey: ["commitmentData", props.mockAPI],
    queryFn: fetchProjectData,
  });
  const {
    data: projectAPIData,
    isLoading: projectIsLoading,
    isError: projectIsError,
    error
  } = projectQueryResult;
  const { data: commitmentAPIData, isLoading: commitmenIsLoading } =
    commitQueryResult;
  const setCommitments = useStore((state) => state.setCommitments);
  const commitments = useStore((state) => state.commitments);
  const formatData = useStore((state) => state.restructureReport);
  const setProjectData = useStore((state) => state.setProjectData);
  const projectData = useStore((state) => state.projectData);

  React.useEffect(() => {
    if (!refetchProjectAPI) return;
    setRefetchProjectAPI(false);
    projectQueryResult.refetch();
  }, [refetchProjectAPI]);

  React.useEffect(() => {
    // Initial Commitment-API data fetch.
    if (!projectAPIData) return;
    setProjectData(formatData(projectAPIData));
  }, [projectAPIData]);

  React.useEffect(() => {
    if (!commitmentAPIData) return;
    setCommitments(commitmentAPIData.commitments);
  }, [commitmentAPIData]);

  return (
    <>
      {projectIsError ? (
        <Message>{error.message}</Message>
      ) : (
        <Container>
          {projectData &&
          commitments &&
          !projectIsLoading &&
          !commitmenIsLoading ? (
            <HashRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Overview {...projectData} canEdit={props.canEdit} />
                  }
                >
                  {" "}
                </Route>
                <Route
                  path="/:currentArea/*"
                  element={
                    <Overview {...projectData} canEdit={props.canEdit} />
                  }
                >
                  {" "}
                </Route>
                {props.canEdit && (
                  <Route
                    path="/:currentArea/edit/:categoryName/:resourceName"
                    element={
                      <>
                        <Overview {...projectData} canEdit={props.canEdit} />
                        <EditPanel {...projectData} />
                      </>
                    }
                  />
                )}
              </Routes>
            </HashRouter>
          ) : (
            <LoadingIndicator />
          )}
        </Container>
      )}
    </>
  );
};

export default AppContent;
