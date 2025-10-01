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
import { PortalProvider } from "@cloudoperators/juno-ui-components/index";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import MarketplaceModal from "./MarketplaceModal";

const storeProviderPath = "../../StoreProvider";

function mockGlobalStore(isCluster, isDomain, isProject) {
  return jest.fn(() => ({
    scope: {
      isCluster: jest.fn(() => isCluster),
      isDomain: jest.fn(() => isDomain),
      isProject: jest.fn(() => isProject),
    },
  }));
}

function mockDomainStore(projects) {
  return jest.fn(() => ({
    projects,
  }));
}

jest.mock("../../StoreProvider", () => {
  return {
    globalStore: jest.fn(),
    domainStore: jest.fn(),
  };
});

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

  test("should render the modal with the correct commitment content", () => {
    const mockGlobalStoreInstance = mockGlobalStore(false, false, true);
    const mockDomainStoreInstance = mockDomainStore([]);
    require(storeProviderPath).globalStore.mockImplementation(mockGlobalStoreInstance);
    require(storeProviderPath).domainStore.mockImplementation(mockDomainStoreInstance);
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
    const mockGlobalStoreInstance = mockGlobalStore(false, false, true);
    const mockDomainStoreInstance = mockDomainStore([]);
    require(storeProviderPath).globalStore.mockImplementation(mockGlobalStoreInstance);
    require(storeProviderPath).domainStore.mockImplementation(mockDomainStoreInstance);
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

  test("should call the close function when the cancel button is clicked", () => {
    const mockGlobalStoreInstance = mockGlobalStore(false, false, true);
    const mockDomainStoreInstance = mockDomainStore([]);
    require(storeProviderPath).globalStore.mockImplementation(mockGlobalStoreInstance);
    require(storeProviderPath).domainStore.mockImplementation(mockDomainStoreInstance);
    render(
      <PortalProvider>
        <MarketplaceModal {...mockProps} />
      </PortalProvider>
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockProps.onModalClose).toHaveBeenCalled();
  });

  test("Cluster level: should provide the correct target projects", async () => {
    const mockGlobalStoreInstance = mockGlobalStore(true, false, false);
    const mockDomainStoreInstance = mockDomainStore([
      { metadata: { id: 3, fullName: "bDomain/aProject" } },
      { metadata: { id: 2, fullName: "aDomain/cProject" } },
      { metadata: { id: 1, fullName: "aDomain/bProject" } },
    ]);
    require(storeProviderPath).globalStore.mockImplementation(mockGlobalStoreInstance);
    require(storeProviderPath).domainStore.mockImplementation(mockDomainStoreInstance);
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
    await waitFor(() => {
      expect(options).toHaveLength(3);
      expect(options[0]).toHaveTextContent("aDomain/bProject");
      expect(options[1]).toHaveTextContent("aDomain/cProject");
      expect(options[2]).toHaveTextContent("bDomain/aProject");
    });
    fireEvent.click(options[0]);
    let confirmButton = screen.getByTestId(/modalConfirm/i);
    let confirmInput = screen.getByTestId(/confirmInput/i);
    fireEvent.change(confirmInput, { target: { value: "receive" } });
    fireEvent.click(confirmButton);
    expect(mockProps.action).toHaveBeenCalled();
  });

  test("Domain level: should provide the correct target projects", async () => {
    const mockGlobalStoreInstance = mockGlobalStore(false, true, false);
    const mockDomainStoreInstance = mockDomainStore([
      { metadata: { id: 3, name: "cProject" } },
      { metadata: { id: 2, name: "bProject" } },
      { metadata: { id: 1, name: "aProject" } },
    ]);
    require(storeProviderPath).globalStore.mockImplementation(mockGlobalStoreInstance);
    require(storeProviderPath).domainStore.mockImplementation(mockDomainStoreInstance);
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
    await waitFor(() => {
      expect(options).toHaveLength(3);
      expect(options[0]).toHaveTextContent("aProject");
      expect(options[1]).toHaveTextContent("bProject");
      expect(options[2]).toHaveTextContent("cProject");
    });
    fireEvent.click(options[0]);
    let confirmButton = screen.getByTestId(/modalConfirm/i);
    let confirmInput = screen.getByTestId(/confirmInput/i);
    fireEvent.change(confirmInput, { target: { value: "receive" } });
    fireEvent.click(confirmButton);
    expect(mockProps.action).toHaveBeenCalled();
  });
});
