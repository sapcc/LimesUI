// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { screen, fireEvent, render, waitFor, cleanup } from "@testing-library/react";
import TableExport from "./TableExport";
import { PortalProvider } from "@cloudoperators/juno-ui-components/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Scope } from "../../lib/scope";
import { labelTypes } from "../shared/LimesBadges";

let capturedBlob = null;
const mockCreateObjectURL = jest.fn((blob) => {
  capturedBlob = blob;
  return "blob:mock-url";
});
const mockRevokeObjectURL = jest.fn();
global.URL.createObjectURL = mockCreateObjectURL;
global.URL.revokeObjectURL = mockRevokeObjectURL;
// JSDOM navigation fix
HTMLAnchorElement.prototype.click = jest.fn(() => {});

const mockDomainData = {
  metadata: {
    id: "domain-1",
    name: "TestDomain",
  },
};

jest.mock("../StoreProvider", () => ({
  default: ({ children }) => children,
  useDomainStore: (selector) => {
    const state = {
      domainData: mockDomainData,
    };
    return selector ? selector(state) : state;
  },
}));

const createMockScope = (type = "domain") => {
  switch (type) {
    case "cluster":
      return new Scope({});
    case "domain":
      return new Scope({ domainID: "domain-1" });
    default:
      return new Scope({});
  }
};

const createMockProjects = () => [
  {
    metadata: {
      id: "project-1",
      name: "Project1",
      fullName: "domain1/Project1",
      domainID: "domain-1",
      domainName: "Domain1",
    },
  },
  {
    metadata: {
      id: "project-2",
      name: "Project2",
      fullName: "domain1/Project2",
      domainID: "domain-1",
      domainName: "Domain1",
    },
  },
];

const createMockProjectResourceAZMap = () => {
  const map = new Map();
  map.set("project-1", {
    resource: {
      name: "resource-1",
      usage: 10,
      quota: 100,
      commitmentSum: 5,
      per_az: [
        { name: "az-1", usage: 5, committed: { "1 year": 5 }, quota: 50 },
        { name: "az-2", usage: 5, quota: 50 },
      ],
    },
  });
  map.set("project-2", {
    resource: {
      name: "resource-1",
      usage: 20,
      quota: 200,
      commitmentSum: 10,
      per_az: [
        { name: "az-1", usage: 10, committed: { "1 year": 10 }, quota: 100 },
        { name: "az-2", usage: 10, quota: 100 },
      ],
    },
  });
  return map;
};

const defaultProps = {
  scope: createMockScope("domain"),
  labelFilter: labelTypes.ANY,
  service: "service-1",
  currentResource: {
    name: "resource-1",
    unit: "",
    commitment_config: {
      durations: { "1 year": "1 year" },
    },
  },
  projects: createMockProjects(),
  filteredProjects: createMockProjects(),
  projectResourceAZMap: createMockProjectResourceAZMap(),
  isCustomSort: false,
};

describe("TableExport", () => {
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: 0 },
      },
    });
    queryClient.setQueryDefaults(["commitmentData"], {
      queryFn: () => Promise.resolve({ commitments: [] }),
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    queryClient.clear();
  });

  const renderTableExport = (props = {}) => {
    const renderResult = render(
      <PortalProvider>
        <QueryClientProvider client={queryClient}>
          <TableExport {...defaultProps} {...props} />
        </QueryClientProvider>
      </PortalProvider>
    );
    return {
      rerender: (newProps = {}) =>
        renderResult.rerender(
          <PortalProvider>
            <QueryClientProvider client={queryClient}>
              <TableExport {...defaultProps} {...newProps} />
            </QueryClientProvider>
          </PortalProvider>
        ),
    };
  };

  test("opens modal when Export button is clicked", async () => {
    renderTableExport();
    const exportButton = screen.getByTestId("tableExportButton");
    fireEvent.click(exportButton);

    await waitFor(() => {
      expect(screen.getByText("Export project view")).toBeInTheDocument();
    });
  });

  test("displays export options in modal", async () => {
    renderTableExport();
    fireEvent.click(screen.getByTestId("tableExportButton"));

    await waitFor(() => {
      expect(screen.getByTestId("exportWithCommitmentsOption")).toBeInTheDocument();
      expect(screen.getByTestId("exportWithCurrentFilterOption")).toHaveClass("text-theme-disabled");
      expect(screen.queryByTestId("exportWithFormattedValuesOption")).not.toBeInTheDocument();
    });
  });

  test("shows unit format option when resource has unit", async () => {
    renderTableExport({
      currentResource: {
        name: "resource-1",
        unit: "GiB",
      },
    });
    fireEvent.click(screen.getByTestId("tableExportButton"));

    await waitFor(() => {
      expect(screen.getByTestId("exportWithFormattedValuesOption")).toBeInTheDocument();
    });
  });

  test("filter option is disabled when no filter/sort, enabled when filter or sort is active", async () => {
    const allProjects = createMockProjects();
    const { rerender } = renderTableExport();
    fireEvent.click(screen.getByTestId("tableExportButton"));

    await waitFor(() => {
      expect(screen.getByTestId("exportWithCurrentFilterOption")).toHaveClass("text-theme-disabled");
    });

    rerender({ isCustomSort: true });
    await waitFor(() => {
      expect(screen.getByTestId("exportWithCurrentFilterOption")).not.toHaveClass("text-theme-disabled");
    });

    rerender({ projects: allProjects, filteredProjects: [allProjects[0]], isCustomSort: false });
    await waitFor(() => {
      expect(screen.getByTestId("exportWithCurrentFilterOption")).not.toHaveClass("text-theme-disabled");
    });
  });

  test("cluster admin option shown only for cluster scope, hidden for domain scope", async () => {
    const { rerender } = renderTableExport({ scope: createMockScope("cluster") });
    fireEvent.click(screen.getByTestId("tableExportButton"));

    await waitFor(() => {
      expect(screen.getByTestId("exportClusterAdminOption")).toBeInTheDocument();
    });

    rerender({ scope: createMockScope("domain") });
    await waitFor(() => {
      expect(screen.queryByTestId("exportClusterAdminOption")).not.toBeInTheDocument();
    });
  });

  test("creates blob with correct type for Excel", async () => {
    renderTableExport();
    fireEvent.click(screen.getByTestId("tableExportButton"));

    await waitFor(() => {
      expect(screen.getByText("Export project view")).toBeInTheDocument();
    });

    const modalExportButton = screen.getByTestId("tableExportModalExportButton");
    fireEvent.click(modalExportButton);

    await waitFor(() => {
      expect(capturedBlob).not.toBeNull();
    });

    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(capturedBlob).toBeInstanceOf(Blob);
    expect(capturedBlob.type).toBe("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  });

  test("cluster admin checkbox automatic checkbox unselects", async () => {
    renderTableExport({ scope: createMockScope("cluster") });
    fireEvent.click(screen.getByTestId("tableExportButton"));

    expect(document.getElementById("exportWithFormattedValuesOptionCheckBox")).not.toBeInTheDocument();

    // Select export with commitments
    const checkBox = document.getElementById("exportWithCommitmentsOptionCheckBox");
    fireEvent.click(checkBox);
    await waitFor(() => {
      expect(checkBox).toBeChecked();
    });

    // Select export all commitments - should unselect commitments
    fireEvent.click(document.getElementById("exportClusterAdminOptionCheckBox"));
    await waitFor(() => {
      expect(document.getElementById("exportClusterAdminOptionCheckBox")).toBeChecked();
      expect(document.getElementById("exportWithCommitmentsOptionCheckBox")).not.toBeChecked();
    });

    // Unit format option should now be visible, select it
    fireEvent.click(document.getElementById("exportWithFormattedValuesOptionCheckBox"));
    await waitFor(() => {
      expect(document.getElementById("exportWithFormattedValuesOptionCheckBox")).toBeChecked();
    });

    // Unselect all commitments export
    fireEvent.click(document.getElementById("exportClusterAdminOptionCheckBox"));
    await waitFor(() => {
      expect(document.getElementById("exportClusterAdminOptionCheckBox")).not.toBeChecked();
    });

    // Select all commitments again - unit format should be reset to unchecked
    fireEvent.click(document.getElementById("exportClusterAdminOptionCheckBox"));
    await waitFor(() => {
      expect(document.getElementById("exportClusterAdminOptionCheckBox")).toBeChecked();
      expect(document.getElementById("exportWithFormattedValuesOptionCheckBox")).not.toBeChecked();
    });
  });
});
