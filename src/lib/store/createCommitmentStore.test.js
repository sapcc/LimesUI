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
