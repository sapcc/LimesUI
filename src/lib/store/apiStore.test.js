// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { renderHook, act } from "@testing-library/react";
import StoreProvider, { useApiStore, apiStoreActions } from "../../components/StoreProvider";

const token = "TestToken";
describe("apiStore", () => {
  let store;
  beforeEach(() => {
    const wrapper = ({ children }) => <StoreProvider>{children}</StoreProvider>;
    store = renderHook(
      () => ({
        apiStore: useApiStore(),
        apiStoreActions: apiStoreActions(),
      }),
      { wrapper }
    );
  });
  test("token definition", () => {
    act(() => {
      store.result.current.apiStoreActions.setToken(token);
    });
    expect(store.result.current.apiStore.globalAPI.token).toEqual(token);
  });

  test("api Ready", () => {
    act(() => {
      store.result.current.apiStoreActions.setApiReady(true);
    });
    expect(store.result.current.apiStore.globalAPI.apiReady).toBe(true);
  });
});
