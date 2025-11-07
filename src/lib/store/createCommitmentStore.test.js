// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { renderHook, act } from "@testing-library/react";
import StoreProvider, { createCommitmentStore, createCommitmentStoreActions } from "../../components/StoreProvider";

const currentAZ = ["qa-de-1", "unknown"];
describe("createCommitmentStore", () => {
  describe("setCurrentAZ", () => {
    it("examples a basic test", () => {
      const wrapper = ({ children }) => <StoreProvider>{children}</StoreProvider>;
      const store = renderHook(
        () => ({
          commitmentStore: createCommitmentStore(),
          commitmentActions: createCommitmentStoreActions(),
        }),
        { wrapper }
      );

      act(() => {
        store.result.current.commitmentActions.setCurrentAZ(currentAZ.name);
      });

      expect(store.result.current.commitmentStore.currentAZ).toEqual(currentAZ.name);
    });
  });
});
