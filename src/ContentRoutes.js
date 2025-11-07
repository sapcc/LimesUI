// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Container, LoadingIndicator, Message } from "@cloudoperators/juno-ui-components";
import { HashRouter, Routes, Route } from "react-router";
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
            <Route index element={<Overview {...parsedData} canEdit={canEdit} />}></Route>
            <Route path="/:currentArea" element={<Overview {...parsedData} canEdit={canEdit} />}>
              <Route path="edit/:categoryName/:resourceName" element={<PanelManager {...parsedData} />}>
                <Route path=":subRoute" element={<PanelManager {...parsedData} />} />
              </Route>
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
