/**
 * Copyright 2024 SAP SE
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
import TransferModal from "./TransferModal";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { initialCommitmentObject } from "../../../lib/constants";

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
