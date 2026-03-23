// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { PortalProvider } from "@cloudoperators/juno-ui-components/index";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import MarketplaceModal from "./MarketplaceModal";
import * as store from "../../StoreProvider";

const mockGlobalStore = (isDomain, isProject) => {
  let scopeData = {};
  if (isProject) {
    scopeData = { domainID: "d-1", projectID: "p-1" };
  } else if (isDomain) {
    scopeData = { domainID: "d-1" };
  }
  return jest.fn(() => scopeData);
};

const mockDomainStore = (projects) => {
  return jest.fn(() => projects);
};

describe("MarketplaceModal", () => {
  const mockProps = {
    action: jest.fn(),
    title: "Marketplace Commitment",
    subText: "Receive",
    onModalClose: jest.fn(),
    commitment: {
      id: "commitment-1",
      transfer_token: "testToken",
      amount: 100,
      availability_zone: "az_1",
      duration: "1 month",
      expires_at: "0",
      unit: "Gib",
    },
  };

  afterEach(() => {
    jest.restoreAllMocks();
    mockProps.action.mockClear();
    mockProps.onModalClose.mockClear();
  });

  test("should render the modal with the correct commitment content", () => {
    jest.spyOn(store, "useGlobalStore").mockImplementation(mockGlobalStore(false, true));
    jest.spyOn(store, "useDomainStore").mockImplementation(mockDomainStore([]));

    render(
      <PortalProvider>
        <MarketplaceModal {...mockProps} />
      </PortalProvider>
    );
    expect(screen.getByText("Marketplace Commitment")).toBeInTheDocument();
    expect(screen.getByText("az_1")).toBeInTheDocument();
    expect(screen.getByText("100 Gib")).toBeInTheDocument();
    expect(screen.getByText("1 month")).toBeInTheDocument();
    expect(screen.getByText("1970-01-01")).toBeInTheDocument();
  });

  test("should call the action function when the confirm button is clicked", () => {
    jest.spyOn(store, "useGlobalStore").mockImplementation(mockGlobalStore(false, true));
    jest.spyOn(store, "useDomainStore").mockImplementation(mockDomainStore([]));

    render(
      <PortalProvider>
        <MarketplaceModal {...mockProps} />
      </PortalProvider>
    );

    const confirmInput = screen.getByTestId(/confirmInput/i);
    fireEvent.change(confirmInput, { target: { value: "receive" } });
    fireEvent.click(screen.getByText("Confirm"));
    expect(mockProps.action).toHaveBeenCalled();
  });

  test("should call the close function when the cancel button is clicked", async () => {
    jest.spyOn(store, "useGlobalStore").mockImplementation(mockGlobalStore(false, true));
    jest.spyOn(store, "useDomainStore").mockImplementation(mockDomainStore([]));

    render(
      <PortalProvider>
        <MarketplaceModal {...mockProps} />
      </PortalProvider>
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockProps.onModalClose).toHaveBeenCalled();
  });

  test("Cluster level: should provide the correct target projects", async () => {
    const projects = [
      { metadata: { id: 3, fullName: "bDomain/aProject" } },
      { metadata: { id: 2, fullName: "aDomain/cProject" } },
      { metadata: { id: 1, fullName: "aDomain/bProject" } },
    ];
    jest.spyOn(store, "useGlobalStore").mockImplementation(mockGlobalStore(false, false));
    jest.spyOn(store, "useDomainStore").mockImplementation(mockDomainStore(projects));

    mockProps.action = jest.fn((targetProject, commitment, transfer_token) => {
      expect(targetProject).toEqual({ metadata: { id: 1, fullName: "aDomain/bProject" } });
      expect(transfer_token).toEqual("testToken");
      expect(commitment.amount).toEqual(100);
    });

    render(
      <PortalProvider>
        <MarketplaceModal {...mockProps} />
      </PortalProvider>
    );

    const selectElement = screen.getByTestId("targetProjectSelect");
    fireEvent.click(selectElement);
    const options = screen.getAllByTestId("selectOption");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("aDomain/bProject");
    expect(options[1]).toHaveTextContent("aDomain/cProject");
    expect(options[2]).toHaveTextContent("bDomain/aProject");
    fireEvent.click(options[0]);

    await waitFor(() => {
      expect(screen.getByTestId("targetProjectSelect")).toBeInTheDocument();
    });

    let confirmButton = screen.getByTestId(/modalConfirm/i);
    let confirmInput = screen.getByTestId(/confirmInput/i);
    fireEvent.change(confirmInput, { target: { value: "receive" } });
    fireEvent.click(confirmButton);
    expect(mockProps.action).toHaveBeenCalled();
  });

  test("Domain level: should provide the correct target projects", async () => {
    const projects = [
      { metadata: { id: 3, name: "cProject" } },
      { metadata: { id: 2, name: "bProject" } },
      { metadata: { id: 1, name: "aProject" } },
    ];
    jest.spyOn(store, "useGlobalStore").mockImplementation(mockGlobalStore(true, false));
    jest.spyOn(store, "useDomainStore").mockImplementation(mockDomainStore(projects));

    mockProps.action = jest.fn((targetProject, commitment, transfer_token) => {
      expect(targetProject).toEqual({ metadata: { id: 1, name: "aProject" } });
      expect(transfer_token).toEqual("testToken");
      expect(commitment.amount).toEqual(100);
    });

    render(
      <PortalProvider>
        <MarketplaceModal {...mockProps} />
      </PortalProvider>
    );

    const selectElement = screen.getByTestId("targetProjectSelect");
    fireEvent.click(selectElement);
    const options = screen.getAllByTestId("selectOption");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("aProject");
    expect(options[1]).toHaveTextContent("bProject");
    expect(options[2]).toHaveTextContent("cProject");
    fireEvent.click(options[0]);

    await waitFor(() => {
      expect(screen.getByTestId("targetProjectSelect")).toBeInTheDocument();
    });

    let confirmButton = screen.getByTestId(/modalConfirm/i);
    let confirmInput = screen.getByTestId(/confirmInput/i);
    fireEvent.change(confirmInput, { target: { value: "receive" } });
    fireEvent.click(confirmButton);
    expect(mockProps.action).toHaveBeenCalled();
  });

  test("should filter projects based on search input", async () => {
    const projects = [
      { metadata: { id: 1, name: "alphaProject" } },
      { metadata: { id: 2, name: "betaProject" } },
      { metadata: { id: 3, name: "gammaProject" } },
      { metadata: { id: 4, name: "alphaTest" } },
    ];
    jest.spyOn(store, "useGlobalStore").mockImplementation(mockGlobalStore(true, false));
    jest.spyOn(store, "useDomainStore").mockImplementation(mockDomainStore(projects));

    render(
      <PortalProvider>
        <MarketplaceModal {...mockProps} />
      </PortalProvider>
    );

    const selectElement = screen.getByTestId("targetProjectSelect");
    fireEvent.click(selectElement);

    // Initially all 4 projects should be visible
    let options = screen.getAllByTestId("selectOption");
    expect(options).toHaveLength(4);

    const searchInput = screen.getByTestId("Search");
    fireEvent.change(searchInput, { target: { value: "alpha" } });

    // After filtering, only projects containing "alpha" should be visible
    await waitFor(() => {
      const filteredOptions = screen.getAllByTestId("selectOption");
      expect(filteredOptions).toHaveLength(2);
      expect(filteredOptions[0]).toHaveTextContent("alphaProject");
      expect(filteredOptions[1]).toHaveTextContent("alphaTest");
    });

    fireEvent.change(searchInput, { target: { value: "" } });

    await waitFor(() => {
      const allOptions = screen.getAllByTestId("selectOption");
      expect(allOptions).toHaveLength(4);
    });
  });

  test("should paginate projects correctly", async () => {
    const projects = Array.from({ length: 75 }, (_, i) => ({
      metadata: { id: i + 1, name: `project${String(i + 1).padStart(3, "0")}` },
    }));
    jest.spyOn(store, "useGlobalStore").mockImplementation(mockGlobalStore(true, false));
    jest.spyOn(store, "useDomainStore").mockImplementation(mockDomainStore(projects));

    render(
      <PortalProvider>
        <MarketplaceModal {...mockProps} />
      </PortalProvider>
    );

    fireEvent.click(screen.getByTestId("targetProjectSelect"));

    // Page 1: 50 projects
    expect(screen.getAllByTestId("selectOption")).toHaveLength(50);
    expect(screen.getByTestId("Pagination")).toBeInTheDocument();

    // Page 2: 25 projects
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      expect(screen.getAllByTestId("selectOption")).toHaveLength(25);
    });
  });
});
