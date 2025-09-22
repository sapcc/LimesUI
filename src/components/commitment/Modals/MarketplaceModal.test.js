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
import { render, fireEvent, screen } from "@testing-library/react";
import MarketplaceModal from "./MarketplaceModal";

describe("MarketplaceModal", () => {
  const mockProps = {
    action: jest.fn(),
    title: "Marketplace Commitment",
    subText: "Receive",
    onModalClose: jest.fn(),
    commitment: {
      id: "commitment-1",
      amount: 100,
      availability_zone: "az_1",
      duration: "1 month",
      expires_at: "0",
      unit: "Gib",
    },
  };

  it("should render the modal with the correct content", () => {
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

  it("should call the action function when the confirm button is clicked", () => {
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

  it("should call the onModalClose function when the cancel button is clicked", () => {
    render(
      <PortalProvider>
        <MarketplaceModal {...mockProps} />
      </PortalProvider>
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockProps.onModalClose).toHaveBeenCalled();
  });
});
