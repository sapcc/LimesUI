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
import StoreProvider, {
  createCommitmentStore,
  createCommitmentStoreActions,
} from "../../StoreProvider";
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
    if (resourceName === "instances_hana_resourceA") {
      return ["conversionA", "conversionB"];
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
  test("should return values on hana resources", async () => {
    const { result } = await waitFor(() => {
      return renderHook(
        () => ({
          commitmentStore: createCommitmentStore(),
          commitmentStoreActions: createCommitmentStoreActions(),
          conversions: useGetConversions({
            serviceType: "serviceA",
            resourceName: "instances_hana_resourceA",
          }),
        }),
        {
          wrapper,
        }
      );
    });
    expect(result.current.conversions.data).toEqual([
      "conversionA",
      "conversionB",
    ]);
    expect(result.current.commitmentStore.showConversionOption).toBe(true);
  });
  test("should not return values on non hana resources", async () => {
    const { result } = await waitFor(() => {
      return renderHook(
        () => ({
          commitmentStore: createCommitmentStore(),
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
    });
    expect(result.current.conversions.data).toBe(undefined);
    expect(result.current.commitmentStore.showConversionOption).toBe(false);
  });

  test("should set a toast on failed request", async () => {
    const { result } = await waitFor(() => {
      return renderHook(
        () => ({
          commitmentStore: createCommitmentStore(),
          commitmentStoreActions: createCommitmentStoreActions(),
          conversions: useGetConversions({
            serviceType: "serviceA",
            resourceName: "instances_hana_resourceB",
          }),
        }),
        {
          wrapper,
        }
      );
    });
    expect(result.current.commitmentStore.showConversionOption).toBe(false);
    expect(result.current.commitmentStore.toast.message).toEqual(
      "Error: failed to fetch content"
    );
  });
});
