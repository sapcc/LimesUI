// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import TransferModal from "./TransferModal";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { initialCommitmentObject, TransferType } from "../../../lib/constants";

describe("test transfer modal", () => {
  const onCancel = jest.fn(() => {});

  test("project level: transfer whole commitment", async () => {
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
    await waitFor(() => {
      expect(onTransfer).not.toHaveBeenCalled();
    });
    fireEvent.change(confirmInput, { target: { value: "transfer" } });
    fireEvent.click(confirmButton);
    expect(onTransfer).toHaveBeenCalled();
  });

  test("Cluster/Domain level: transfer part of a commitment", () => {
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

  test("check marketplace options", async () => {
    let isProjectView = false;
    let transferProject = { metadata: { name: "targetProject" } };
    const confirmedCommitment = { ...initialCommitmentObject };
    confirmedCommitment.amount = 10;
    confirmedCommitment.duration = "1 year";
    let onTransfer = jest.fn((transferProject, commitment, publicationType) => {
      expect(publicationType).toEqual(TransferType.UNLISTED);
      expect(transferProject).toBeTruthy();
      expect(commitment.amount).toEqual(10);
      expect(commitment.duration).toEqual("1 year");
    });
    const { unmount: unmountMoveAction } = render(
      <PortalProvider>
        <TransferModal
          title="Transfer Commitment"
          subText="Transfer"
          commitment={confirmedCommitment}
          onTransfer={onTransfer}
          isProjectView={isProjectView}
          currentProject={{ metadata: { name: "sourceProject" } }}
          transferProject={transferProject}
        />
      </PortalProvider>
    );

    // Cluster/Domain level: Execute a private transfer with the move action
    let confirmButton = screen.getByTestId(/modalConfirm/i);
    let confirmInput = screen.getByTestId(/confirmInput/i);
    expect(screen.queryByTestId("publicationSelect")).not.toBeInTheDocument();
    expect(screen.queryByText(/marketplace/i)).not.toBeInTheDocument();
    fireEvent.change(confirmInput, { target: { value: "transfer" } });
    fireEvent.click(confirmButton);
    expect(onTransfer).toHaveBeenCalled();
    unmountMoveAction();

    // Cluster/Domain level: Transfers to the marketplace, private transfers are performed using the move action.
    transferProject = null;
    onTransfer = jest.fn((transferProject, commitment, publicationType) => {
      expect(publicationType).toEqual(TransferType.PUBLIC);
      expect(transferProject).toBeFalsy();
      expect(commitment.amount).toEqual(10);
      expect(commitment.duration).toEqual("1 year");
    });
    const { unmount: unmountMarketPlaceAction } = render(
      <PortalProvider>
        <TransferModal
          title="Transfer Commitment"
          subText="Transfer"
          commitment={confirmedCommitment}
          onTransfer={onTransfer}
          isProjectView={isProjectView}
          currentProject={{ metadata: { name: "sourceProject" } }}
          transferProject={transferProject}
        />
      </PortalProvider>
    );
    confirmButton = screen.getByTestId(/modalConfirm/i);
    confirmInput = screen.getByTestId(/confirmInput/i);
    expect(screen.queryByTestId("publicationSelect")).not.toBeInTheDocument();
    expect(screen.queryByText(/marketplace/i)).toBeInTheDocument();
    fireEvent.change(confirmInput, { target: { value: "transfer" } });
    fireEvent.click(confirmButton);
    expect(onTransfer).toHaveBeenCalled();
    unmountMarketPlaceAction();

    // Project level: Contains the selection between private and public transfers.
    isProjectView = true;
    onTransfer = jest.fn((transferProject, commitment, publicationType) => {
      expect(publicationType).toEqual(TransferType.UNLISTED);
      expect(transferProject).toBeFalsy();
      expect(commitment.amount).toEqual(10);
      expect(commitment.duration).toEqual("1 year");
    });
    const { rerender } = render(
      <PortalProvider>
        <TransferModal
          title="Transfer Commitment"
          subText="Transfer"
          commitment={confirmedCommitment}
          onTransfer={onTransfer}
          isProjectView={isProjectView}
          currentProject={{ metadata: { name: "sourceProject" } }}
          transferProject={transferProject}
        />
      </PortalProvider>
    );
    let selectElement = screen.getByTestId("publicationSelect");
    await waitFor(() => {
      expect(selectElement).toHaveTextContent("Private");
    });
    expect(screen.queryByTestId("publicationSelect")).toBeInTheDocument();
    confirmButton = screen.getByTestId(/modalConfirm/i);
    confirmInput = screen.getByTestId(/confirmInput/i);
    fireEvent.change(confirmInput, { target: { value: "transfer" } });
    fireEvent.click(confirmButton);
    expect(onTransfer).toHaveBeenCalled();

    onTransfer = jest.fn((transferProject, commitment, publicationType) => {
      expect(publicationType).toEqual(TransferType.PUBLIC);
      expect(transferProject).toBeFalsy();
      expect(commitment.amount).toEqual(10);
      expect(commitment.duration).toEqual("1 year");
    });
    rerender(
      <PortalProvider>
        <TransferModal
          title="Transfer Commitment"
          subText="Transfer"
          commitment={confirmedCommitment}
          onTransfer={onTransfer}
          isProjectView={isProjectView}
          currentProject={{ metadata: { name: "sourceProject" } }}
          transferProject={transferProject}
        />
      </PortalProvider>
    );
    expect(screen.queryByTestId("publicationSelect")).toBeInTheDocument();
    selectElement = screen.getByTestId("publicationSelect");
    confirmButton = screen.getByTestId(/modalConfirm/i);
    confirmInput = screen.getByTestId(/confirmInput/i);
    fireEvent.mouseDown(selectElement);
    const marketplaceOption = screen.getByText("Marketplace");
    fireEvent.click(marketplaceOption);
    fireEvent.change(confirmInput, { target: { value: "transfer" } });
    fireEvent.click(confirmButton);
    expect(onTransfer).toHaveBeenCalled();
  });
});
