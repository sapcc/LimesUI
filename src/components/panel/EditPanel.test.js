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
import moment from "moment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, fireEvent, renderHook, screen, waitFor } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import { Scope } from "../../lib/scope";
import StoreProvider, {
  globalStoreActions,
  projectStoreActions,
  clusterStoreActions,
  domainStoreActions,
  createCommitmentStore,
  createCommitmentStoreActions,
} from "../StoreProvider";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });
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

  test("Commitment merging", async () => {
    const now = moment().utc() - 1;
    const scope = new Scope({ projectID: "123", domainID: "456" });
    const resource = {
      name: "testResource",
      commitment_config: { durations: ["1 year", "3 years"] },
      quota: 500,
      capacity: 0,
      totalCommitments: 10,
      usagePerCommitted: 5,
      usagePerQuota: 0,
      per_az: [["az_1", { projects_usage: 10 }]],
    };
    const commitments = [
      {
        id: 1,
        duration: "1 year",
        service_type: "testService",
        resource_name: "testResource",
        availability_zone: "az_1",
        amount: 1,
        unit: "MiB",
        duration: "1 year",
        confirmed_at: now,
      },
      {
        id: 2,
        duration: "3 years",
        service_type: "testService",
        resource_name: "testResource",
        availability_zone: "az_1",
        amount: 2,
        unit: "MiB",
        duration: "1 year",
        confirmed_at: now,
      },
      {
        id: 3,
        duration: "3 years",
        service_type: "testService",
        resource_name: "testResource",
        availability_zone: "az_1",
        amount: 4,
        unit: "MiB",
        duration: "1 year",
        confirm_by: now,
      },
    ];
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
          projectStoreActions: projectStoreActions(),
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
      result.current.projectStoreActions.setCommitments(commitments);
    });

    expect(screen.getByText("1 MiB")).toBeInTheDocument();
    const selectedAZ = screen.getByTestId("tab/az_1");
    expect(selectedAZ).toHaveAttribute("aria-selected", "true");

    // Check existence of the merge buttons
    const mergeToggle = screen.getByTestId("mergeToggle");
    const mergeAction = screen.getByTestId("mergeAction");

    // Select only one commitment - Modal button should be disabled
    fireEvent.click(mergeToggle);
    expect(screen.getByTestId("mergeSelect-1")).toBeInTheDocument();
    expect(screen.getByTestId("mergeSelect-2")).toBeInTheDocument();
    const checkboxes = screen.queryAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    await waitFor(() => {
      expect(mergeAction).toBeDisabled();
    });

    // not active commitment cannot be merged
    expect(screen.queryByTestId("mergeSelect-3")).not.toBeInTheDocument();

    // Choose 2 commitments and merge them, select one commitment twice to ensure only one entry is added to the list
    fireEvent.click(checkboxes[1]); // select
    fireEvent.click(checkboxes[1]); // unselect
    fireEvent.click(checkboxes[1]); // select
    await waitFor(() => {
      expect(mergeAction).toBeEnabled();
    });
    fireEvent.click(mergeAction);
    expect(screen.getByTestId("mergeModal")).toBeInTheDocument();
    expect(screen.getByText("3 MiB")).toBeInTheDocument();
  });
});
