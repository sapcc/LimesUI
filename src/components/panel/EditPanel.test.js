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
import EditPanel from "./EditPanel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, screen, waitFor } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import { Scope } from "../../lib/scope";
import StoreProvider, {
  globalStoreActions,
  clusterStoreActions,
  domainStoreActions,
  createCommitmentStore,
  createCommitmentStoreActions,
} from "../StoreProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
queryClient.setQueryDefaults(["getConversions"], {
  queryFn: () => {
    return;
  },
});

describe("EditPanel tests", () => {
  test("AZ selection state", async () => {
    const scope = new Scope({ projectID: "123", domainID: "456" });
    const resource = {
      name: "testResource",
      quota: 500,
      capacity: 0,
      totalCommitments: 10,
      usagePerCommitted: 5,
      usagePerQuota: 0,
      per_az: [["az1", { projects_usage: 10 }]],
    };
    resource.per_az.commitmentSum = 10;

    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <EditPanel serviceType="testService" currentResource={resource} tracksQuota={true} />
            {children}
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );
    const { result } = await waitFor(() => {
      return renderHook(
        () => ({
          globalStoreActions: globalStoreActions(),
          clusterStoreActions: clusterStoreActions(),
          domainStoreActions: domainStoreActions(),
          commitmentStore: createCommitmentStore(),
          commitmentStoreActions: createCommitmentStoreActions(),
        }),
        { wrapper }
      );
    });
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });

    const selectedAZ = screen.getByTestId("tab/az1");
    expect(selectedAZ).toHaveAttribute("aria-selected", "true");
  });
});
