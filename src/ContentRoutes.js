import React from "react";
import { Container, LoadingIndicator, Message } from "juno-ui-components";
import { HashRouter, Routes, Route } from "react-router-dom";
import Overview from "./components/mainView/Overview";
import PanelManager from "./components/panel/PanelManager";

const ContentRoutes = (props) => {
  const { queryResult, parsedData, canEdit } = props;
  const { isLoading, isError, error } = queryResult;

  return isError ? (
    <Message>{error.message}</Message>
  ) : (
    <Container px={false}>
      {parsedData && !isLoading ? (
        <HashRouter>
          <Routes>
            <Route
              index
              element={<Overview {...parsedData} canEdit={canEdit} />}
            ></Route>
            <Route
              path="/:currentArea"
              element={<Overview {...parsedData} canEdit={canEdit} />}
            >
              <Route
                path="edit/:categoryName/:resourceName"
                element={<PanelManager {...parsedData} />}
              />
            </Route>
          </Routes>
        </HashRouter>
      ) : (
        <LoadingIndicator className={"m-auto"} />
      )}
    </Container>
  );
};

export default ContentRoutes;
