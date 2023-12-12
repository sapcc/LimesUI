import React from "react";
import { renderHook, act } from "@testing-library/react";
import StoreProvider, {
  createCommitmentStore,
  createCommitmentStoreActions,
} from "../../components/StoreProvider";

const currentAZ = ["qa-de-1", "unknown"];
describe("createCommitmentStore", () => {
  describe("setCurrentAZ", () => {
    it("examples a basic test", () => {
      const wrapper = ({ children }) => (
        <StoreProvider>{children}</StoreProvider>
      );
      const store = renderHook(
        () => ({
          commitmentStore: createCommitmentStore(),
          commitmentActions: createCommitmentStoreActions(),
        }),
        { wrapper }
      );

      act(() => {
        store.result.current.commitmentActions.setCurrentAZ(currentAZ[0]);
      });

      expect(
        store.result.current.commitmentStore.currentAZ
      ).toEqual(currentAZ[0]);
    });
  });
});
