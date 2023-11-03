import React, { useEffect } from "react";
import Overview from "./components/Overview";
import { useQuery } from "@tanstack/react-query";
import { Container } from "juno-ui-components";
import { fetchProjectData } from "./lib/apiClient";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import data from "./lib/limes_data_newApi.json";
import commitmentData from "./lib/limes_commitment_api.json";
import EditPanel from "./components/project/EditPanel";
import useStore from "./lib/store/store";

// This is your starting point of tour application
const AppContent = (props) => {
  //const projectData = useQuery({ queryKey: ['projectData'], queryFn: fetchProjectData })
  const projectData = { data: data };
  const setCommitments = useStore((state) => state.setCommitments);
  const commitments = useStore((state) => state.commitments);
  const formatData = useStore((state) => state.restructureReport);
  const formattedData = formatData(projectData);

  React.useEffect(() => {
    // Initial Commitment-API data fetch.
    setCommitments(commitmentData.commitments);
  }, []);

  return (
    <Container>
      {projectData?.data &&
        commitments &&
        (console.log(formatData(projectData)) || console.log(commitments) || (
          <HashRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Overview {...formattedData} canEdit={props.canEdit} />
                }
              >
                {" "}
              </Route>
              <Route
                path="/:currentArea/*"
                element={
                  <Overview {...formattedData} canEdit={props.canEdit} />
                }
              >
                {" "}
              </Route>
              {props.canEdit && (
                <Route
                  path="/:currentArea/edit/:categoryName/:resourceName"
                  element={
                    <>
                      <Overview {...formattedData} canEdit={props.canEdit} />
                      <EditPanel {...formattedData} />
                    </>
                  }
                />
              )}
            </Routes>
          </HashRouter>
        ))}
    </Container>
  );
};

export default AppContent;
