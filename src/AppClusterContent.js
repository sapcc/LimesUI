import React from "react";
import { useQuery } from "@tanstack/react-query";
import PanelManager from "./components/panel/PanelManager";
import {
  clusterStore,
  clusterStoreActions,
  globalStoreActions,
} from "./components/StoreProvider";
import Overview from "./components/mainView/Overview";
import { Container, LoadingIndicator, Message } from "juno-ui-components";
import { HashRouter, Routes, Route } from "react-router-dom";

const AppClusterContent = (props) => {
  const { clusterData } = clusterStore();
  const { setClusterData } = clusterStoreActions();
  const { restructureReport } = globalStoreActions();
  const { refetchClusterAPI } = clusterStore();
  const { setRefetchClusterAPI } = clusterStoreActions();
  const clusterQueryResult = useQuery({
    queryKey: ["clusterData"],
  });
  const {
    data: clusterAPIData,
    isLoading: clusterIsLoading,
    isError: clusterIsError,
    error,
  } = clusterQueryResult;

  React.useEffect(() => {
    // Initial Commitment-API data fetch.
    if (!clusterAPIData) return;
    setClusterData(restructureReport(clusterAPIData.cluster));
  }, [clusterAPIData]);

  React.useEffect(() => {
    if (!refetchClusterAPI) return;
    setRefetchClusterAPI(false);
    clusterQueryResult.refetch();
  }, [refetchClusterAPI]);

  return clusterIsError ? (
    <Message>{error.message}</Message>
  ) : (
    <Container px={false}>
      {clusterData && !clusterIsLoading ? (
        <HashRouter>
          <Routes>
            <Route
              index
              element={<Overview {...clusterData} canEdit={props.canEdit} />}
            ></Route>
            <Route
              path="/:currentArea"
              element={<Overview {...clusterData} canEdit={props.canEdit} />}
            >
              {props.canEdit && (
                <Route
                  path="edit/:categoryName/:resourceName"
                  element={<PanelManager {...clusterData} />}
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

export default AppClusterContent;
