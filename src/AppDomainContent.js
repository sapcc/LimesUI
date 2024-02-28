import React from "react";
import { useQuery } from "@tanstack/react-query";
import PanelManager from "./components/panel/PanelManager";
import {
  domainStore,
  domainStoreActions,
  globalStoreActions,
} from "./components/StoreProvider";
import Overview from "./components/mainView/Overview";
import { Container, LoadingIndicator, Message } from "juno-ui-components";
import { HashRouter, Routes, Route } from "react-router-dom";

const AppDomainContent = (props) => {
  const { domainData } = domainStore();
  const { refetchDomainAPI } = domainStore();
  const { setRefetchDomainAPI } = domainStoreActions();
  const { setDomainData } = domainStoreActions();
  const { restructureReport } = globalStoreActions();
  const domainQueryResult = useQuery({
    queryKey: ["domainData"],
  });
  const {
    data: domainAPIData,
    isLoading: domainIsLoading,
    isError: domainIsError,
    error,
  } = domainQueryResult;

  React.useEffect(() => {
    // Initial Commitment-API data fetch.
    if (!domainAPIData) return;
    setDomainData(restructureReport(domainAPIData.domain));
  }, [domainAPIData]);

  React.useEffect(() => {
    console.log(refetchDomainAPI)
    if (!refetchDomainAPI) return;
    setRefetchDomainAPI(false);
    domainQueryResult.refetch();
  }, [refetchDomainAPI]);

  return domainIsError ? (
    <Message>{error.message}</Message>
  ) : (
    <Container px={false}>
      {domainData && !domainIsLoading ? (
        <HashRouter>
          <Routes>
            <Route
              index
              element={<Overview {...domainData} canEdit={props.canEdit} />}
            ></Route>
            <Route
              path="/:currentArea"
              element={<Overview {...domainData} canEdit={props.canEdit} />}
            >
              {props.canEdit && (
                <Route
                  path="edit/:categoryName/:resourceName"
                  element={<PanelManager {...domainData} />}
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

export default AppDomainContent;
