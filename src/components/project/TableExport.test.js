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

  test("all commitments option is always shown in modal", async () => {
    renderTableExport();
    fireEvent.click(screen.getByTestId("tableExportButton"));

    await waitFor(() => {
      expect(screen.getByTestId("exportAllCommitmentsOption")).toBeInTheDocument();
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

  test("export with formatted values is available when all commitments export is enabled", async () => {
    renderTableExport();
    fireEvent.click(screen.getByTestId("tableExportButton"));

    // unit format option not visible initially (resource with no unit)
    expect(document.getElementById("exportWithFormattedValuesOptionCheckBox")).not.toBeInTheDocument();

    // enable all commitments export, unit format option should appear
    fireEvent.click(document.getElementById("exportAllCommitmentsOptionCheckBox"));
    await waitFor(() => {
      expect(document.getElementById("exportAllCommitmentsOptionCheckBox")).toBeChecked();
      expect(document.getElementById("exportWithFormattedValuesOptionCheckBox")).toBeInTheDocument();
    });

    // activate unit format option
    fireEvent.click(document.getElementById("exportWithFormattedValuesOptionCheckBox"));
    await waitFor(() => {
      expect(document.getElementById("exportWithFormattedValuesOptionCheckBox")).toBeChecked();
    });

    // disable all commitments export, unit format option should disappear
    fireEvent.click(document.getElementById("exportAllCommitmentsOptionCheckBox"));
    await waitFor(() => {
      expect(document.getElementById("exportAllCommitmentsOptionCheckBox")).not.toBeChecked();
      expect(document.getElementById("exportWithFormattedValuesOptionCheckBox")).not.toBeInTheDocument();
    });

    // re-enable all commitments export, unit format should be reset to unchecked
    fireEvent.click(document.getElementById("exportAllCommitmentsOptionCheckBox"));
    await waitFor(() => {
      expect(document.getElementById("exportAllCommitmentsOptionCheckBox")).toBeChecked();
      expect(document.getElementById("exportWithFormattedValuesOptionCheckBox")).not.toBeChecked();
    });
  });

  test("current AZ and include commitments options are disabled when all commitments export is enabled", async () => {
    renderTableExport();

    fireEvent.click(screen.getByTestId("tableExportButton"));

    await waitFor(() => {
      expect(screen.getByText("Export project view")).toBeInTheDocument();
    });

    const currentAZCheckbox = document.getElementById("exportWithCurrentAZOptionCheckBox");
    const commitmentsCheckbox = document.getElementById("exportWithCommitmentsOptionCheckBox");

    // initially both options are enabled
    expect(screen.getByTestId("exportWithCurrentAZOption")).not.toHaveClass("text-theme-disabled");
    expect(screen.getByTestId("exportWithCommitmentsOption")).not.toHaveClass("text-theme-disabled");

    // check both options
    fireEvent.click(currentAZCheckbox);
    await waitFor(() => {
      expect(currentAZCheckbox).toBeChecked();
    });

    fireEvent.click(commitmentsCheckbox);
    await waitFor(() => {
      expect(commitmentsCheckbox).toBeChecked();
    });

    // enable all commitments export, both should be disabled and unchecked
    fireEvent.click(document.getElementById("exportAllCommitmentsOptionCheckBox"));
    await waitFor(() => {
      expect(document.getElementById("exportAllCommitmentsOptionCheckBox")).toBeChecked();
    });

    await waitFor(() => {
      // current AZ option disabled and unchecked
      expect(screen.getByTestId("exportWithCurrentAZOption")).toHaveClass("text-theme-disabled");
      expect(currentAZCheckbox).not.toBeChecked();
      expect(currentAZCheckbox).toBeDisabled();

      // commitments option disabled and unchecked
      expect(screen.getByTestId("exportWithCommitmentsOption")).toHaveClass("text-theme-disabled");
      expect(commitmentsCheckbox).not.toBeChecked();
      expect(commitmentsCheckbox).toBeDisabled();
    });

    // disable all commitments export, both should be re-enabled but remain unchecked (state was reset)
    fireEvent.click(document.getElementById("exportAllCommitmentsOptionCheckBox"));
    await waitFor(() => {
      expect(document.getElementById("exportAllCommitmentsOptionCheckBox")).not.toBeChecked();
    });

    await waitFor(() => {
      // current AZ option re-enabled but unchecked
      expect(screen.getByTestId("exportWithCurrentAZOption")).not.toHaveClass("text-theme-disabled");
      expect(currentAZCheckbox).not.toBeChecked();
      expect(currentAZCheckbox).not.toBeDisabled();

      // commitments option re-enabled but unchecked
      expect(screen.getByTestId("exportWithCommitmentsOption")).not.toHaveClass("text-theme-disabled");
      expect(commitmentsCheckbox).not.toBeChecked();
      expect(commitmentsCheckbox).not.toBeDisabled();
    });
  });

  test("displays error message when export fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    // Create a Map with a custom get method that throws an error during export
    const errorMap = new Map();
    errorMap.get = () => {
      throw new Error("Export data retrieval failed");
    };

    renderTableExport({ projectResourceAZMap: errorMap });
    fireEvent.click(screen.getByTestId("tableExportButton"));

    await waitFor(() => {
      expect(screen.getByText("Export project view")).toBeInTheDocument();
    });

    const modalExportButton = screen.getByTestId("tableExportModalExportButton");
    fireEvent.click(modalExportButton);

    await waitFor(() => {
      expect(screen.getByText(/Failed to perform the export/)).toBeInTheDocument();
    });
    expect(screen.getByText(/Export data retrieval failed/)).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });

  test("displays error message when commitment queries fail", async () => {
    jest.useFakeTimers();
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    queryClient.setQueryDefaults(["commitmentData"], {
      queryFn: () => Promise.reject(new Error("Network error")),
    });

    renderTableExport();
    fireEvent.click(screen.getByTestId("tableExportButton"));
    await waitFor(() => {
      expect(screen.getByText("Export project view")).toBeInTheDocument();
    });

    fireEvent.click(document.getElementById("exportWithCommitmentsOptionCheckBox"));
    await waitFor(() => {
      expect(document.getElementById("exportWithCommitmentsOptionCheckBox")).toBeChecked();
    });

    const modalExportButton = screen.getByTestId("tableExportModalExportButton");
    fireEvent.click(modalExportButton);

    // Advance timers to skip through retry delays
    await jest.runAllTimersAsync();

    await waitFor(() => {
      expect(screen.getByText(/Failed to load commitments for some projects/)).toBeInTheDocument();
    });

    // Verify that the export button is active and displays the "Retry" text.
    expect(modalExportButton).toHaveTextContent("Retry");
    expect(modalExportButton).not.toBeDisabled();

    consoleErrorSpy.mockRestore();
    jest.useRealTimers();
  });
});
