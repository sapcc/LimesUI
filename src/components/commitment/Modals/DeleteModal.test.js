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
