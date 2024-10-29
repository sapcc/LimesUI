import React from "react";
import TransferModal from "./TransferModal";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { initialCommitmentObject } from "../../../lib/constants";

describe("test transfer modal", () => {
  const onCancel = jest.fn(() => {});

  test("project level: transfer whole commitment", () => {
    const onTransfer = jest.fn((transferProject, commitment) => {
      expect(transferProject).toBeFalsy();
      expect(commitment.amount).toEqual(10);
      expect(commitment.duration).toEqual("1 year");
    });
    const confirmedCommitment = { ...initialCommitmentObject };
    confirmedCommitment.amount = 10;
    confirmedCommitment.duration = "1 year";
    render(
      <PortalProvider>
        <TransferModal
          title="Transfer Commitment"
          subText="Transfer"
          onModalClose={onCancel}
          onTransfer={onTransfer}
          commitment={confirmedCommitment}
          isProjectView={true}
        />
      </PortalProvider>
    );
    const confirmButton = screen.getByTestId(/modalConfirm/i);
    const confirmInput = screen.getByTestId(/confirmInput/i);
    expect(screen.getByText(/amount/i)).toBeInTheDocument();
    expect(screen.getByText(10)).toBeInTheDocument();
    expect(screen.getByText("1 year")).toBeInTheDocument();
    fireEvent.change(confirmInput, { target: { value: "wrongInput" } });
    expect(onTransfer).not.toHaveBeenCalled();
    fireEvent.change(confirmInput, { target: { value: "transfer" } });
    fireEvent.click(confirmButton);
    expect(onTransfer).toHaveBeenCalled();
  });

  test("domain/cluster level: transfer part of a commitment", () => {
    const onTransfer = jest.fn((transferProject, commitment) => {
      expect(transferProject).toBeTruthy();
      expect(commitment.amount).toEqual(5);
      expect(commitment.duration).toEqual("1 year");
    });
    const confirmedCommitment = { ...initialCommitmentObject };
    confirmedCommitment.amount = 10;
    confirmedCommitment.duration = "1 year";
    render(
      <PortalProvider>
        <TransferModal
          title="Transfer Commitment"
          subText="Transfer"
          onModalClose={onCancel}
          onTransfer={onTransfer}
          commitment={confirmedCommitment}
          isProjectView={false}
          currentProject={{ metadata: { name: "sourceProject" } }}
          transferProject={{ metadata: { name: "targetProject" } }}
        />
      </PortalProvider>
    );
    const confirmButton = screen.getByTestId(/modalConfirm/i);
    const confirmInput = screen.getByTestId(/confirmInput/i);
    expect(screen.getByText(/amount/i)).toBeInTheDocument();
    expect(screen.getByText(10)).toBeInTheDocument();
    expect(screen.getByText("1 year")).toBeInTheDocument();
    expect(screen.getByText("sourceProject")).toBeInTheDocument();
    expect(screen.getByText("targetProject")).toBeInTheDocument();
    act(() => {
      screen.getByRole("checkbox").click();
    });
    const splitInput = screen.getByTestId(/splitInput/i);
    fireEvent.change(splitInput, { target: { value: 5 } });
    fireEvent.change(confirmInput, { target: { value: "transfer" } });
    fireEvent.click(confirmButton);
    expect(onTransfer).toHaveBeenCalled();
  });
});
