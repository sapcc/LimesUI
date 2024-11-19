/**
 * Copyright 2024 SAP SE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { Container, LoadingIndicator, Message } from "@cloudoperators/juno-ui-components";
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
              >
                <Route
                  path=":subRoute"
                  element={<PanelManager {...parsedData} />}
                />
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
