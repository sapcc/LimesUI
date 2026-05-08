// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components/index";
import TransferCancelModal from "./TransferCancelModal";
import { TransferType } from "../../../lib/constants";

describe("TransferCancelModal", () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      commitment: {
        id: "commitment-123",
        name: "Test Commitment",
      },
      title: "Transfer Commitment",
      startCommitmentTransfer: jest.fn().mockResolvedValue(undefined),
      onModalClose: jest.fn(),
    };
  });

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

  test("should call the startCommitmentTransfer function when the confirm button is clicked", async () => {
    render(
      <PortalProvider>
        <TransferCancelModal {...mockProps} />
      </PortalProvider>
    );
    fireEvent.click(screen.getByTestId("modalConfirm"));
    await waitFor(() => {
      expect(mockProps.startCommitmentTransfer).toHaveBeenCalledWith(null, mockProps.commitment, TransferType.NONE);
    });
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
