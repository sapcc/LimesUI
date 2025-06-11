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
import { screen, fireEvent, renderHook, waitFor } from "@testing-library/react";
import ProjectTable from "./ProjectTable";
import { PortalProvider } from "@cloudoperators/juno-ui-components/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StoreProvider from "../StoreProvider";
import {
  globalStoreActions,
  createCommitmentStore,
  createCommitmentStoreActions,
  clusterStoreActions,
  domainStoreActions,
  projectStoreActions,
} from "../StoreProvider";

const mockProps = {
  serviceType: "Service1",
  currentResource: { name: "Resource1" },
  currentCategory: "Category1",
  currentAZ: "AZ1",
  projects: [],
  sortProjectProps: { projectsAreSortable: true, setProjectsAreSortable: jest.fn() },
  mergeOps: {},
};

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });
queryClient.setQueryDefaults(["commitmentData"], {
  queryFn: () => {
    return;
  },
});

describe("ProjectTable", () => {
  test("renders DataGrid with correct table headers", async () => {
    const expectedHeaders = ["ProjectName", "Status", "Labels", "Actions"];

    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <ProjectTable {...mockProps} />
            {children}
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );
    await waitFor(() => {
      return renderHook(
        () => ({
          globalStoreActions: globalStoreActions(),
          clusterStoreActions: clusterStoreActions(),
          domainStoreActions: domainStoreActions(),
          projectStoreActions: projectStoreActions(),
          commitmentStore: createCommitmentStore(),
          commitmentStoreActions: createCommitmentStoreActions(),
        }),
        { wrapper }
      );
    });

    expectedHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test("handles filtering projects by name and label", async () => {
    const mockProjects = [
      {
        metadata: { id: "1", name: "Project1", fullName: "domain1/Project1" },
        categories: {
          [mockProps.currentCategory]: {
            resources: [
              {
                name: mockProps.currentResource.name,
                per_az: [{ name: mockProps.currentAZ, pending_commitments: { "1 year": 10 } }],
              },
            ],
          },
        },
      },
      {
        metadata: { id: "2", name: "Project2", fullName: "domain2/Project2" },
        categories: {
          [mockProps.currentCategory]: {
            resources: [{ name: mockProps.currentResource.name, per_az: [{ name: mockProps.currentAZ }] }],
          },
        },
      },
    ];
    mockProps.projects = mockProjects;

    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <ProjectTable {...mockProps} />
            {children}
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );

    await waitFor(() => {
      return renderHook(
        () => ({
          globalStoreActions: globalStoreActions(),
          clusterStoreActions: clusterStoreActions(),
          domainStoreActions: domainStoreActions(),
          projectStoreActions: projectStoreActions(),
          commitmentStore: createCommitmentStore(),
          commitmentStoreActions: createCommitmentStoreActions(),
        }),
        { wrapper }
      );
    });

    // Simulate selecting a label
    const filter = screen.getByTestId("Filter");
    fireEvent.click(filter);
    const option = screen.getByText("pending");
    fireEvent.click(option);
    await waitFor(() => {
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(screen.queryByText("domain2/Project2")).not.toBeInTheDocument();
    });

    // Simulate project search by name
    fireEvent.change(screen.getByTestId("Search"), { target: { value: "project1" } });
    expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
    expect(screen.queryByText("domain2/Project2")).not.toBeInTheDocument();

    // Clear the select filter
    fireEvent.click(filter);
    const option2 = screen.getByText("any");
    fireEvent.click(option2);
    await waitFor(() => {
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(screen.queryByText("domain2/Project2")).not.toBeInTheDocument();
    });

    // Clear the name filter
    fireEvent.change(screen.getByTestId("Search"), { target: { value: "" } });
    expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
    expect(screen.queryByText("domain2/Project2")).toBeInTheDocument();
  });
});
