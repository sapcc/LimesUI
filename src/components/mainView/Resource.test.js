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
import { tracksQuota } from "../../lib/utils";

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

describe("Resource bar test", () => {
  let actions;
  beforeEach(() => {
    const wrapper = ({ children }) => <StoreProvider>{children}</StoreProvider>;
    const store = renderHook(
      () => ({
        globalStoreActions: globalStoreActions(),
      }),
      { wrapper }
    );
    actions = store.result.current.globalStoreActions;
  });
  test("resources with quota tracking", async () => {
    let scope = new Scope({ projectID: "123", domainID: "456" });
    function getProjectData(committed = null, usage = 50, quota = 150) {
      return {
        project: {
          id: "123",
          services: [
            {
              type: "testType",
              resources: [
                {
                  name: "testResource",
                  area: "testArea",
                  commitment_config: {
                    durations: ["1 year", "2 years", "3 years"],
                  },
                  per_az: {
                    "zone-a": {
                      usage: usage / 2,
                      quota: quota / 3,
                      committed,
                    },
                    "zone-b": {
                      usage: usage / 2,
                      quota: quota / 3,
                      committed,
                    },
                    "zone-c": {
                      usage: 0,
                      quota: quota / 3,
                    },
                  },
                  quota: quota,
                  usage: usage,
                },
              ],
            },
          ],
        },
      };
    }
    const committed = {
      "1 year": 10,
    };

    const forwardProps = {
      area: "testArea",
      canEdit: true,
      categoryName: "testCategory",
      serviceType: "testService",
    };

    let res = actions.restructureReport(getProjectData().project).categories.testType.resources[0];

    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>
              <Resource key={res.name} resource={res} {...forwardProps} tracksQuota={tracksQuota(res)} />
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

    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });

    // Resourcebar values without commitments
    expect(screen.getByText("50/150")).toBeInTheDocument();
    expect(screen.queryAllByText("25/50").length).toEqual(2);
    expect(screen.getByText("0/50")).toBeInTheDocument();

    // Resourebar values with commitments
    res = actions.restructureReport(getProjectData(committed).project).categories.testType.resources[0];
    rerender();
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });
    // sumbar values (left and right)
    expect(screen.getByText("20/20")).toBeInTheDocument();
    expect(screen.getByText("30/130")).toBeInTheDocument();
    // zone-a and zone-b (left and right)
    expect(screen.queryAllByText("10/10").length).toEqual(2);
    expect(screen.queryAllByText("15/40").length).toEqual(2);
    // zone-c does not contain commitments and displays the basic bar layout.
    expect(screen.getByText("0/50")).toBeInTheDocument();

    // Sumbar (left) is not filled completely (usage < commitments)
    res = actions.restructureReport(getProjectData(committed, 10).project).categories.testType.resources[0];
    rerender();
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });
    // sumbar values (left and right)
    expect(screen.getByText("10/20")).toBeInTheDocument();
    expect(screen.getByText("0/130")).toBeInTheDocument();
    // zone-a and zone-b (left and right)
    expect(screen.queryAllByText("5/10").length).toEqual(2);
    expect(screen.queryAllByText("0/40").length).toEqual(2);
    // zone-c
    expect(screen.getByText("0/50")).toBeInTheDocument();

    // Missing quota (Detect errors in limes capacity assignment at UI level)
    res = actions.restructureReport(getProjectData(committed, 10, 0).project).categories.testType.resources[0];
    rerender();
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });
    // sumbar values (left and right)
    expect(screen.getByText("10/20")).toBeInTheDocument();
    expect(screen.getByText("0/-20")).toBeInTheDocument();
    // zone-a and zone-b (left and right)
    expect(screen.queryAllByText("5/10").length).toEqual(2);
    expect(screen.queryAllByText("0/-10").length).toEqual(2);
    // zone-c
    expect(screen.getByText(/no quota/i)).toBeInTheDocument();
  });

  test("usage only resources", async () => {
    let scope = new Scope({ projectID: "123", domainID: "456" });
    function getProjectData(committed = null) {
      return {
        project: {
          id: "123",
          services: [
            {
              type: "testType",
              resources: [
                {
                  name: "testResource",
                  area: "testArea",
                  commitment_config: {
                    durations: ["1 year", "2 years", "3 years"],
                  },
                  per_az: {
                    "zone-a": {
                      usage: 50,
                      committed,
                    },
                    "zone-b": {
                      usage: 50,
                      committed,
                    },
                    "zone-c": {
                      usage: 0,
                    },
                  },
                  usage: 100,
                },
              ],
            },
          ],
        },
      };
    }
    const committed = {
      "1 year": 5,
    };

    const forwardProps = {
      area: "testArea",
      canEdit: true,
      categoryName: "testCategory",
      serviceType: "testService",
    };

    let res = actions.restructureReport(getProjectData().project).categories.testType.resources[0];

    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>
              <Resource key={res.name} resource={res} {...forwardProps} tracksQuota={tracksQuota(res)} />
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

    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });

    // Resourcebar values without commitments
    expect(screen.getByText("100/100")).toBeInTheDocument();
    expect(screen.queryAllByText("50/50").length).toEqual(2);
    expect(screen.getByText(/no quota/i)).toBeInTheDocument();

    // Resourebar values with commitments
    res = actions.restructureReport(getProjectData(committed).project).categories.testType.resources[0];
    rerender();
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });

    // sumbar values (left and right)
    expect(screen.getByText("10/10")).toBeInTheDocument();
    expect(screen.getByText("90/90")).toBeInTheDocument();
    // zone-a and zone-b (left and right)
    expect(screen.queryAllByText("5/5").length).toEqual(2);
    expect(screen.queryAllByText("45/45").length).toEqual(2);
    // zone-c
    expect(screen.getByText(/no quota/i)).toBeInTheDocument();
  });

  test("cluster level capacity values", async () => {
    let scope = new Scope({});
    function getClusterData(committed = null, capacity = 150) {
      return {
        cluster: {
          id: "123",
          services: [
            {
              type: "testType",
              resources: [
                {
                  name: "testResource",
                  area: "testArea",
                  commitment_config: {
                    durations: ["1 year", "2 years", "3 years"],
                  },
                  per_az: {
                    "zone-a": {
                      capacity: (capacity * 2) / 3,
                      usage: 50,
                      committed,
                    },
                    "zone-b": {
                      capacity: capacity / 3,
                      usage: 50,
                      committed,
                    },
                    "zone-c": {
                      capacity: 0,
                      usage: 0,
                    },
                  },
                  capacity: capacity,
                  domains_quota: 300,
                  usage: 100,
                },
              ],
            },
          ],
        },
      };
    }

    const committed = {
      "1 year": 10,
    };

    const forwardProps = {
      area: "testArea",
      canEdit: true,
      categoryName: "testCategory",
      serviceType: "testService",
    };

    let res = actions.receiveCapacity(getClusterData().cluster).categories.testType.resources[0];

    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>
              <Resource key={res.name} resource={res} {...forwardProps} tracksQuota={tracksQuota(res)} />
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

    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });

    // Resourcebar values without commitments
    expect(screen.getByText("100/150")).toBeInTheDocument();
    expect(screen.getByText("50/100")).toBeInTheDocument();
    expect(screen.getByText("50/50")).toBeInTheDocument();
    expect(screen.getByText(/no capacity/i)).toBeInTheDocument();

    // Resourcebar values with commitments
    res = actions.receiveCapacity(getClusterData(committed).cluster).categories.testType.resources[0];
    rerender();
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });

    // sumbar values (left and right)
    expect(screen.getByText("20/20")).toBeInTheDocument();
    expect(screen.getByText("80/130")).toBeInTheDocument();
    // zone-a and zone-b (left and right)
    expect(screen.queryAllByText("10/10").length).toEqual(2);
    expect(screen.getByText("40/90")).toBeInTheDocument();
    expect(screen.getByText("40/40")).toBeInTheDocument();
    // zone-c
    expect(screen.getByText(/no capacity/i)).toBeInTheDocument();

    // Missing capacity (Detect errors in limes capacity assignment at UI level)
    res = actions.receiveCapacity(getClusterData(committed, 0).cluster).categories.testType.resources[0];
    rerender();
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });
    // sumbar values (left and right)
    expect(screen.getByText("20/20")).toBeInTheDocument();
    expect(screen.getByText("80/-20")).toBeInTheDocument();
    // zone-a and zone-b (left and right)
    expect(screen.queryAllByText("10/10").length).toEqual(2);
    expect(screen.queryAllByText("40/-10").length).toEqual(2);
    // zone-c
    expect(screen.getByText(/no capacity/i)).toBeInTheDocument();
  });
});
