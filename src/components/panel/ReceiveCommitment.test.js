// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { act, renderHook, screen } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import StoreProvider, { globalStoreActions } from "../StoreProvider";
import ReceiveCommitment from "./ReceiveCommitment";

describe("ReceiveCommitment tests", () => {
  test("Receive button should be enabled when the canEdit state is true", async () => {
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <ReceiveCommitment />
          {children}
        </StoreProvider>
      </PortalProvider>
    );

    const { result, rerender } = renderHook(
      () => ({
        globalStoreActions: globalStoreActions(),
      }),
      { wrapper }
    );

    // Set canEdit to true - button should be enabled (positive test)
    act(() => {
      result.current.globalStoreActions.setCanEdit(true);
    });
    const receiveButton = screen.getByRole("button", { name: /receive/i });
    expect(receiveButton).toBeEnabled();

    // Receive button should be disabled when canEdit is false (viewer role).
    rerender();
    act(() => {
      result.current.globalStoreActions.setCanEdit(false);
    });
    expect(receiveButton).toBeDisabled();
  });
});
