// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { screen, fireEvent, render, waitFor, cleanup } from "@testing-library/react";
import ProjectTable from "./ProjectTable";
import { PortalProvider } from "@cloudoperators/juno-ui-components/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StoreProvider from "../StoreProvider";
import { labelTypes } from "../shared/LimesBadges";

const mockProps = {
  serviceType: "Service1",
  currentResource: {
    name: "Resource1",
    commitment_config: {
      durations: { "1 year": "1 year", "2 years": "2 years" },
    },
  },
  currentCategory: "Category1",
  currentTab: "AZ1",
  projects: [],
  sortProjectProps: { projectsAreSortable: true, setProjectsAreSortable: jest.fn() },
  mergeOps: {},
};

const defaultProject1Config = [
  {
    name: "AZ1",
    pending_commitments: { "1 year": 10 },
    committed: { "1 year": 10 },
    commitmentSum: 10,
  },
  {
    name: "AZ2",
    commitmentSum: 0,
    usage: 0,
  },
];

const defaultProject2Config = [
  {
    name: "AZ1",
    commitmentSum: 0,
    usage: 0,
  },
  {
    name: "AZ2",
    commitmentSum: 0,
    usage: 0,
  },
];

describe("ProjectTable", () => {
  let queryClient;

  beforeEach(() => {
    // Create a fresh QueryClient for each test to prevent memory leaks
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: 0 },
      },
    });
    queryClient.setQueryDefaults(["commitmentData"], {
      queryFn: () => {
        return;
      },
    });
  });

  afterEach(() => {
    cleanup();
    queryClient.clear();
  });

  function getMockProjects(project1Config = defaultProject1Config, project2Config = defaultProject2Config) {
    return [
      {
        metadata: { id: "1", name: "Project1", fullName: "domain1/Project1" },
        categories: {
          [mockProps.currentCategory]: {
            resources: [
              {
                name: mockProps.currentResource.name,
                per_az: project1Config,
              },
            ],
          },
        },
      },
      {
        metadata: { id: "2", name: "Project2", fullName: "domain2/Project2" },
        categories: {
          [mockProps.currentCategory]: {
            resources: [
              {
                name: mockProps.currentResource.name,
                per_az: project2Config,
              },
            ],
          },
        },
      },
    ];
  }

  test("renders DataGrid with correct table headers", async () => {
    const props = { ...mockProps, projects: getMockProjects() };
    const expectedHeaders = ["ProjectName", "Status", "Labels", "Actions"];

    render(
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <ProjectTable {...props} />
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );

    await waitFor(() => {
      expectedHeaders.forEach((header) => {
        expect(screen.getByText(header)).toBeInTheDocument();
      });
    });
  });

  test("handles filtering projects by name and label", async () => {
    const props = { ...mockProps, projects: getMockProjects() };

    render(
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <ProjectTable {...props} />
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );

    const filter = screen.getByTestId("Filter");

    // Show projects with commitments only
    fireEvent.click(filter);
    const committedOpt = screen.getByTestId(`filter-${labelTypes.COMMITTED}`);
    fireEvent.click(committedOpt);
    await waitFor(() => {
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(screen.queryByText("domain2/Project2")).not.toBeInTheDocument();
    });

    // Show projects with pending commitments only
    fireEvent.click(filter);
    const option = screen.getByTestId(`filter-${labelTypes.PENDING}`);
    fireEvent.click(option);
    await waitFor(() => {
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(screen.queryByText("domain2/Project2")).not.toBeInTheDocument();
    });

    // Simulate project search by name
    fireEvent.change(screen.getByTestId("Search"), { target: { value: "project1" } });
    await waitFor(() => {
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(screen.queryByText("domain2/Project2")).not.toBeInTheDocument();
    });

    // Search with leading and trailing whitespace should still find the project (trimmed)
    fireEvent.change(screen.getByTestId("Search"), { target: { value: "  project1  " } });
    await waitFor(() => {
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(screen.queryByText("domain2/Project2")).not.toBeInTheDocument();
    });

    // Clear the select filter
    fireEvent.click(filter);
    const anyOpt = screen.getByText("any");
    fireEvent.click(anyOpt);

    // Search with only whitespace should show all projects (treated as empty search)
    fireEvent.change(screen.getByTestId("Search"), { target: { value: "   " } });
    await waitFor(() => {
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(screen.getByText("domain2/Project2")).toBeInTheDocument();
    });

    // Reset to normal search for remaining tests
    fireEvent.change(screen.getByTestId("Search"), { target: { value: "project1" } });
    await waitFor(() => {
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(screen.queryByText("domain2/Project2")).not.toBeInTheDocument();
    });

    // Re-apply pending filter for remaining tests
    fireEvent.click(filter);
    const pendingOpt2 = screen.getByTestId(`filter-${labelTypes.PENDING}`);
    fireEvent.click(pendingOpt2);

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
    await waitFor(() => {
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(screen.queryByText("domain2/Project2")).toBeInTheDocument();
    });

    // enforce an empty list
    fireEvent.change(screen.getByTestId("Search"), { target: { value: "invalidSearchName" } });
    await waitFor(() => {
      expect(screen.queryByText("domain1/Project1")).not.toBeInTheDocument();
      expect(screen.queryByText("domain2/Project2")).not.toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId("Search"), { target: { value: "" } });

    // Filter with "empty" filter option
    fireEvent.click(filter);
    const emptyOpt = screen.getByTestId(`filter-${labelTypes.EMPTY}`);
    fireEvent.click(emptyOpt);
    await waitFor(() => {
      expect(filter).toHaveTextContent("empty");
      expect(screen.queryByText("domain1/Project1")).not.toBeInTheDocument();
      expect(screen.getByText("domain2/Project2")).toBeInTheDocument();
    });

    // Filter with "non-empty" filter option
    fireEvent.click(filter);
    const nonEmptyOpt = screen.getByTestId(`filter-${labelTypes.NONEMPTY}`);
    fireEvent.click(nonEmptyOpt);
    await waitFor(() => {
      expect(filter).toHaveTextContent("non-empty");
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(screen.queryByText("domain2/Project2")).not.toBeInTheDocument();
    });
  });

  test("duration filter shows correct duration set", async () => {
    const props = {
      ...mockProps,
      projects: getMockProjects(),
      currentTab: "AZ1",
    };

    const { rerender } = render(
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <ProjectTable {...props} />
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );

    const filter = screen.getByTestId("Filter");
    expect(screen.queryByTestId("durationFilter")).not.toBeInTheDocument();

    // Select "committed" filter
    fireEvent.click(filter);
    const committedOpt = screen.getByTestId(`filter-${labelTypes.COMMITTED}`);
    fireEvent.click(committedOpt);

    // Duration filter should be visible after the committed filter is applied
    const durationFilter = await screen.findByTestId("durationFilter");
    expect(durationFilter).toBeInTheDocument();

    // Check the duration values - AZ1 has a 1 year commitment but no 2 year commitment
    expect(screen.getByTestId("filter-[any]")).toBeInTheDocument();
    expect(screen.getByTestId("filter-[1 year]")).toBeInTheDocument();
    expect(screen.getByTestId("filter-[2 years]")).toBeInTheDocument();

    // A click on the 2 year duration would not apply the filter.
    fireEvent.click(screen.getByTestId("filter-[2 years]"));
    await waitFor(() => {
      expect(durationFilter).toHaveTextContent("any");
    });

    // Switch to AZ2 which has no commitments
    const newProps = { ...props, currentTab: "AZ2" };
    rerender(
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <ProjectTable {...newProps} />
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );

    // Duration filter should be hidden after filter resets to "any"
    await waitFor(() => {
      expect(screen.queryByTestId("durationFilter")).not.toBeInTheDocument();
    });
  });

  test("duration filter shows the correct projects when a duration is selected", async () => {
    // Update the projects with a config that includes a 2 year commitment and verify that the 2 year duration becomes selectable and can be applied.
    const project1Config = [
      {
        name: "AZ1",
        pending_commitments: { "1 year": 10 },
        committed: { "1 year": 10, "2 years": 5 },
        commitmentSum: 15,
      },
      {
        name: "AZ2",
      },
    ];

    const project2Config = [
      {
        name: "AZ1",
        pending_commitments: { "1 year": 10 },
        committed: { "1 year": 10 },
        commitmentSum: 15,
      },
      {
        name: "AZ2",
      },
    ];

    const props = {
      ...mockProps,
      projects: getMockProjects(project1Config, project2Config),
      currentAZ: "AZ1",
    };

    render(
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <ProjectTable {...props} />
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );

    const filter = screen.getByTestId("Filter");
    fireEvent.click(filter);
    const committedOpt = screen.getByTestId(`filter-${labelTypes.COMMITTED}`);
    fireEvent.click(committedOpt);
    const durationFilter = await screen.findByTestId("durationFilter");
    expect(durationFilter).toBeInTheDocument();
    fireEvent.click(durationFilter);
    fireEvent.click(screen.getByTestId("filter-[2 years]"));

    await waitFor(() => {
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(screen.queryByText("domain2/Project2")).not.toBeInTheDocument();
    });

    fireEvent.click(durationFilter);
    fireEvent.click(screen.getByTestId("filter-[1 year]"));

    await waitFor(() => {
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(screen.getByText("domain2/Project2")).toBeInTheDocument();
    });
  });

  test("maintains filter selection when switching between tabs with same valid filters", async () => {
    const project1Config = [
      {
        name: "AZ1",
        committed: { "1 year": 10 },
        commitmentSum: 10,
      },
      {
        name: "AZ2",
        committed: { "1 year": 10 },
        commitmentSum: 10,
      },
    ];

    const props = { ...mockProps, projects: getMockProjects(project1Config, project1Config), currentTab: "AZ1" };

    const { rerender } = render(
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <ProjectTable {...props} />
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );

    // Select "committed" filter on AZ1
    const filter = screen.getByTestId("Filter");
    fireEvent.click(filter);
    const committedOpt = screen.getByTestId(`filter-${labelTypes.COMMITTED}`);
    fireEvent.click(committedOpt);

    // Wait for the filter to be applied - verify project is shown
    await waitFor(() => {
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(filter).toHaveTextContent("committed");
    });

    // Switch to AZ2 which also has committed projects
    const newProps = { ...props, currentTab: "AZ2" };
    rerender(
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <ProjectTable {...newProps} />
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );

    // Filter should remain "committed" since it's valid in AZ2
    await waitFor(() => {
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(filter).toHaveTextContent("committed");
    });
  });

  test("duration filter correctly finds resource by name instead of using first resource", async () => {
    // This test verifies the bug fix where the duration filter was incorrectly using resources[0]
    // instead of finding the correct resource by name using getCurrentResource.
    // The project has two resources: Resource0 (first, no commitments) and Resource1 (second, has commitments)
    // When filtering for Resource1's commitments, the project should be found.
    const projectWithMultipleResources = [
      {
        metadata: { id: "1", name: "Project1", fullName: "domain1/Project1" },
        categories: {
          Category1: {
            resources: [
              {
                name: "Resource0",
                per_az: [
                  {
                    name: "AZ1",
                    commitmentSum: 0,
                    usage: 0,
                  },
                ],
              },
              {
                name: "Resource1",
                per_az: [
                  {
                    name: "AZ1",
                    committed: { "1 year": 10 },
                    commitmentSum: 10,
                  },
                ],
              },
            ],
          },
        },
      },
    ];

    const props = {
      ...mockProps,
      currentResource: {
        name: "Resource1",
        commitment_config: {
          durations: { "1 year": "1 year" },
        },
      },
      projects: projectWithMultipleResources,
      currentTab: "AZ1",
    };

    render(
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <ProjectTable {...props} />
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );

    const filter = screen.getByTestId("Filter");

    // Select "committed" filter
    fireEvent.click(filter);
    const committedOpt = screen.getByTestId(`filter-${labelTypes.COMMITTED}`);
    fireEvent.click(committedOpt);

    // Duration filter should be visible
    const durationFilter = await screen.findByTestId("durationFilter");
    expect(durationFilter).toBeInTheDocument();

    // Select "1 year" duration filter
    fireEvent.click(durationFilter);
    fireEvent.click(screen.getByTestId("filter-[1 year]"));

    // The project should still be visible because Resource1 (the correct resource) has the commitment
    await waitFor(() => {
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
    });
  });

  test("resets filter to 'any' and hides duration filter when switching to tab without committed projects", async () => {
    const props = { ...mockProps, projects: getMockProjects(), currentTab: "AZ1" };

    const { rerender } = render(
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <ProjectTable {...props} />
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );

    const filter = screen.getByTestId("Filter");
    expect(screen.queryByTestId("durationFilter")).not.toBeInTheDocument();

    // Select "committed" filter on AZ1
    fireEvent.click(filter);
    const committedOpt = screen.getByTestId(`filter-${labelTypes.COMMITTED}`);
    fireEvent.click(committedOpt);
    const durationFilter = screen.getByTestId("durationFilter");

    // Wait for the filter to be applied - verify project is shown
    await waitFor(() => {
      expect(durationFilter).toBeInTheDocument();
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(filter).toHaveTextContent("committed");
    });

    // Switch to AZ2 which has no committed projects
    const newProps = { ...props, currentTab: "AZ2" };
    rerender(
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <ProjectTable {...newProps} />
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );

    // Filter should reset to "any" and show all projects
    await waitFor(() => {
      expect(screen.getByText("domain1/Project1")).toBeInTheDocument();
      expect(durationFilter).not.toBeInTheDocument();
      expect(screen.queryByTestId("Filter")).toBeInTheDocument();
      expect(filter).toHaveTextContent("any");
    });
  });
});
