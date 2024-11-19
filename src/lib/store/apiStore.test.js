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
  apiStore,
  apiStoreActions,
} from "../../components/StoreProvider";

const token = "TestToken";
describe("apiStore", () => {
  let store;
  beforeEach(() => {
    const wrapper = ({ children }) => <StoreProvider>{children}</StoreProvider>;
    store = renderHook(
      () => ({
        apiStore: apiStore(),
        apiStoreActions: apiStoreActions(),
      }),
      { wrapper }
    );
  });
  test("token definition", () => {
    act(() => {
      store.result.current.apiStoreActions.setToken(token);
    });
    expect(store.result.current.apiStore.token).toEqual(token);
  });

  test("api Ready", () => {
    act(() => {
      store.result.current.apiStoreActions.setApiReady(true);
    });
    expect(store.result.current.apiStore.apiReady).toBe(true);
  });
});
