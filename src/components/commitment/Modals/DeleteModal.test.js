import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import { initialCommitmentObject } from "../../../lib/constants";
import DeleteModal from "./DeleteModal";

describe("test delete modal", () => {
  const onDelete = jest.fn((commitment) => {
    expect(commitment.amount).toEqual(10);
    expect(commitment.duration).toEqual("1 year");
  });

  const onCancel = jest.fn(() => {});

  beforeEach(() => {
    const confirmedCommitment = { ...initialCommitmentObject };
    confirmedCommitment.amount = 10;
    confirmedCommitment.duration = "1 year";
    render(
      <PortalProvider>
        <DeleteModal
          action={onDelete}
          commitment={confirmedCommitment}
          onModalClose={onCancel}
          subText="Delete"
          title="Delete Commitment"
        />
      </PortalProvider>
    );
  });

  afterEach(() => {
    onDelete.mockClear();
    onCancel.mockClear();
  });
  test("delete commitment", async () => {
    const confirmButton = screen.getByTestId(/modalConfirm/i);
    const confirmInput = screen.getByTestId(/confirmInput/i);
    expect(screen.getByText(/amount/i)).toBeInTheDocument();
    fireEvent.change(confirmInput, { target: { value: "delete" } });
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(onDelete).toHaveBeenCalled();
    });
  });
  test("unsuccessful and cancel", async () => {
    const confirmButton = screen.getByTestId(/modalConfirm/i);
    const closeButton = screen.getByTestId(/modalCancel/i);
    const confirmInput = screen.getByTestId(/confirmInput/i);
    expect(screen.getByText(/amount/i)).toBeInTheDocument();
    fireEvent.change(confirmInput, { target: { value: "wrongInput" } });
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(onDelete).not.toHaveBeenCalled();
    });
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(onCancel).toHaveBeenCalled();
    });
  });
});
