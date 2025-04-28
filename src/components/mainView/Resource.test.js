/**
 * Copyright 2025 SAP SE
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
import Resource from "./Resource";
import { Scope } from "../../lib/scope";
import { MemoryRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { act, renderHook, screen, waitFor } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import StoreProvider, { globalStore, globalStoreActions } from "../StoreProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
queryClient.setQueryDefaults(["maxQuota"], {
  queryFn: () => {},
});

describe("Resource tests", () => {
  test("display correct edit option for resource", async () => {
    let scope = new Scope({ projectID: "123", domainID: "456" });
    const res = {
      name: "testResource",
      quota: 500,
      capacity: 0,
      totalCommitments: 10,
      usagePerCommitted: 5,
      usagePerQuota: 0,
      editableResource: false,
      per_az: [["az1", { projects_usage: 10 }]],
    };
    const forwardProps = {
      area: "testArea",
      canEdit: true,
      categoryName: "testCategory",
      serviceType: "testService",
    };
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>
              <Resource key={res.name} resource={res} {...forwardProps} tracksQuota={true} />
              {children}
            </MemoryRouter>
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );
    const { result, rerender } = await waitFor(() => {
      return renderHook(
        () => ({
          globalStore: globalStore(),
          globalStoreActions: globalStoreActions(),
        }),
        { wrapper }
      );
    });
    // Project level
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });
    expect(screen.getByTestId("maxQuotaEdit")).toBeInTheDocument();
    // resource does not allow commitments
    res.editableResource = true;
    rerender();
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });
    expect(screen.queryByTestId("maxQuotaEdit")).not.toBeInTheDocument();
    expect(screen.getByTestId("edit/testResource")).toBeInTheDocument();
    expect(screen.queryByTestId("setMaxQuotaPanel")).not.toBeInTheDocument();

    // Domain level
    scope = new Scope({ domainID: "456" });
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });
    expect(screen.getByTestId("setMaxQuotaPanel")).toBeInTheDocument();

    // Cluster level
    scope = new Scope({});
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });
    expect(screen.getByTestId("setMaxQuotaPanel")).toBeInTheDocument();
  });
});
