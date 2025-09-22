import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
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
    render(<TransferCancelModal {...mockProps} />);
    expect(screen.getByText("Transfer Commitment")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("should call the startCommitmentTransfer function when the confirm button is clicked", () => {
    render(<TransferCancelModal {...mockProps} />);
    fireEvent.click(screen.getByText("Confirm"));
    expect(mockProps.startCommitmentTransfer).toHaveBeenCalledWith(null, mockProps.commitment, "");
  });

  test("should call the onModalClose function when the cancel button is clicked", () => {
    render(<TransferCancelModal {...mockProps} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockProps.onModalClose).toHaveBeenCalled();
  });
});
