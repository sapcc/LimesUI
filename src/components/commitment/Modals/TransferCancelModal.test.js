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
import { render, fireEvent, screen } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components/index";
import TransferCancelModal from "./TransferCancelModal";

describe("TransferCancelModal", () => {
  const mockProps = {
    commitment: {
      id: "commitment-123",
      name: "Test Commitment",
    },
    title: "Transfer Commitment",
    startCommitmentTransfer: jest.fn(),
    onModalClose: jest.fn(),
  };

  test("should render the modal with the correct content", () => {
    render(
      <PortalProvider>
        <TransferCancelModal {...mockProps} />
      </PortalProvider>
    );
    expect(screen.getByText("Transfer Commitment")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("should call the startCommitmentTransfer function when the confirm button is clicked", () => {
    render(
      <PortalProvider>
        <TransferCancelModal {...mockProps} />
      </PortalProvider>
    );
    fireEvent.click(screen.getByText("Confirm"));
    expect(mockProps.startCommitmentTransfer).toHaveBeenCalledWith(null, mockProps.commitment, "");
  });

  test("should call the onModalClose function when the cancel button is clicked", () => {
    render(
      <PortalProvider>
        <TransferCancelModal {...mockProps} />
      </PortalProvider>
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockProps.onModalClose).toHaveBeenCalled();
  });
});
