// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import UpdateDurationModal from "./UpdateDurationModal";
import { act, renderHook, screen, fireEvent, waitFor } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import StoreProvider, { createCommitmentStore, createCommitmentStoreActions } from "../../StoreProvider";
import { initialCommitmentObject } from "../../../lib/constants";

const commitment = { ...initialCommitmentObject };

describe("check update duration modal", () => {
  const update = jest.fn((commitment, payload) => {
    expect(commitment.duration).toBe("1 year");
    expect(payload.duration).toBe("2 years");
  });
  let store;

  beforeEach(async () => {
    const confirmedCommitment = { ...commitment };
    confirmedCommitment.id = 1;
    confirmedCommitment.amount = 10;
    confirmedCommitment.duration = "1 year";
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <UpdateDurationModal
            title="Update Commitment Duration"
            subText="Update"
            commitment={confirmedCommitment}
            onModalClose={() => {}}
            onUpdate={update}
          />
          {children}
        </StoreProvider>
      </PortalProvider>
    );
    store = await waitFor(() => {
      return renderHook(
        () => ({
          commitmentStore: createCommitmentStore(),
          commitmentStoreActions: createCommitmentStoreActions(),
        }),
        { wrapper }
      );
    });
  });
  test("duration update", async () => {
    act(() => {
      store.result.current.commitmentStoreActions.addValidDuration({
        id: 1,
        durations: ["2 years", "3 years"],
      });
    });
    const input = screen.getByTestId(/updateDurationInput/i);
    const confirmInput = screen.getByTestId(/confirmInput/i);
    const confirmButton = screen.getByTestId(/modalConfirm/i);
    fireEvent.click(input);
    const inputVal = screen.getByTestId("2 years");
    await waitFor(() => {
      expect(screen.queryByTestId("1 year")).toBeFalsy();
    });
    fireEvent.click(inputVal);
    fireEvent.change(confirmInput, { target: { value: "update" } });
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(update).toHaveBeenCalled();
    });
  });
});
