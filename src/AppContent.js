import React from "react";
import Overview from "./components/Overview";
import { useQuery } from "@tanstack/react-query";
import { Container, LoadingIndicator } from "juno-ui-components";
import { fetchProjectData } from "./lib/apiClient";
import { HashRouter, Routes, Route } from "react-router-dom";
import EditPanel from "./components/project/EditPanel";
import useStore from "./lib/store/store";

//import projectAPIData from "./lib/limes_data_newApi.json";
//import commitmentData from "./lib/limes_commitment_api.json";

// This is your starting point of tour application
const AppContent = (props) => {
  const refetchProjectAPI = useStore((state) => state.refetchProjectAPI);
  const setRefetchProjectAPI = useStore((state) => state.setRefetchProjectAPI);
  const projectQueryResult = useQuery({
    queryKey: ["projectData"],
    queryFn: fetchProjectData,
  });
  const commitQueryResult = useQuery({
    queryKey: ["commitmentData"],
    queryFn: fetchProjectData,
  });
  const projectAPIData = projectQueryResult.data;
  const projectIsLoading = projectQueryResult.isLoading;
  const commitmentAPIData = commitQueryResult.data;
  const commitmenIsLoading = commitQueryResult.isLoading;
  const setCommitments = useStore((state) => state.setCommitments);
  const commitments = useStore((state) => state.commitments);
  const formatData = useStore((state) => state.restructureReport);
  const setProjectData = useStore((state) => state.setProjectData);
  const projectData = useStore((state) => state.projectData);

  React.useEffect(() => {
    if (!refetchProjectAPI) return;
    projectQueryResult.refetch();
    setRefetchProjectAPI(false);
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
    <Container>
      {projectData &&
      commitments &&
      !projectIsLoading &&
      !commitmenIsLoading ? (
        console.log(projectData) ||
        console.log(commitments) || (
          <HashRouter>
            <Routes>
              <Route
                path="/"
                element={<Overview {...projectData} canEdit={props.canEdit} />}
              >
                {" "}
              </Route>
              <Route
                path="/:currentArea/*"
                element={<Overview {...projectData} canEdit={props.canEdit} />}
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
        )
      ) : (
        <LoadingIndicator />
      )}
    </Container>
  );
};

export default AppContent;
