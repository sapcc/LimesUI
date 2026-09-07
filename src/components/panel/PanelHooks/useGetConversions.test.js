// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import StoreProvider, { useCreateCommitmentStore, createCommitmentStoreActions } from "../../StoreProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useGetConversions from "./useGetConversions";
import { renderHook, waitFor } from "@testing-library/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 0,
      retry: 0,
    },
  },
});

queryClient.setQueryDefaults(["getConversions"], {
  queryFn: ({ queryKey }) => {
    const { resourceName } = queryKey[1];
    if (resourceName === "resourceA") {
      return { conversions: ["conversionA", "conversionB"] };
    } else if (resourceName === "resourceB") {
      return { conversions: [] };
    } else {
      throw new Error("failed to fetch content");
    }
  },
});

const wrapper = ({ children }) => (
  <StoreProvider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </StoreProvider>
);

describe("test useGetConversions", () => {
  beforeEach(() => {
    queryClient.clear();
  });
  test("should return conversions and set showConversionOption to true", async () => {
    const { result } = renderHook(
      () => ({
        commitmentStore: useCreateCommitmentStore(),
        commitmentStoreActions: createCommitmentStoreActions(),
        conversions: useGetConversions({
          serviceType: "serviceA",
          resourceName: "resourceA",
        }),
      }),
      {
        wrapper,
      }
    );
    await waitFor(() => {
      expect(result.current.conversions.data).toEqual({ conversions: ["conversionA", "conversionB"] });
    });
    expect(result.current.commitmentStore.showConversionOption).toBe(true);
  });
  test("should set showConversionOption to false when no conversions available", async () => {
    const { result } = renderHook(
      () => ({
        commitmentStore: useCreateCommitmentStore(),
        commitmentStoreActions: createCommitmentStoreActions(),
        conversions: useGetConversions({
          serviceType: "serviceA",
          resourceName: "resourceB",
        }),
      }),
      {
        wrapper,
      }
    );
    await waitFor(() => {
      expect(result.current.conversions.data).toEqual({ conversions: [] });
    });
    expect(result.current.commitmentStore.showConversionOption).toBe(false);
  });

  test("should set a toast on failed request", async () => {
    const { result } = renderHook(
      () => ({
        commitmentStore: useCreateCommitmentStore(),
        commitmentStoreActions: createCommitmentStoreActions(),
        conversions: useGetConversions({
          serviceType: "serviceA",
          resourceName: "resourceC",
        }),
      }),
      {
        wrapper,
      }
    );
    await waitFor(() => {
      expect(result.current.commitmentStore.toast.message).toEqual("Error: failed to fetch content");
    });
    expect(result.current.commitmentStore.showConversionOption).toBe(false);
  });
});
