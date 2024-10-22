import React from "react";
import useLimesGetRequest from "./useLimesGetRequest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

const queryClient = new QueryClient();
queryClient.setQueryDefaults(["example"], {
  queryFn: async () => {
    return { commitment: { amount: 10 } };
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("test useLimesGetRequest", () => {
  beforeEach(() => {
    queryClient.clear();
  });
  test("should fetch data", async () => {
    const { result } = renderHook(
      () => useLimesGetRequest({ queryKey: "example" }),
      {
        wrapper,
      }
    );
    await waitFor(() => {
      expect(result.current.data).not.toBe(undefined);
      expect(result.current.data.commitment.amount).toEqual(10);
    });
  });

  test("valid manual fetch", async () => {
    const { result } = renderHook(
      () =>
        useLimesGetRequest({
          queryKey: "example",
          queryOpts: { enabled: false },
          shouldRefetch: true,
        }),
      {
        wrapper,
      }
    );
    await waitFor(() => {
      expect(result.current.data).not.toBe(undefined);
      expect(result.current.data.commitment.amount).toEqual(10);
    });
  });

  test("invalid manual fetch", async () => {
    const { result } = renderHook(
      () =>
        useLimesGetRequest({
          queryKey: "example",
          queryOpts: { enabled: false },
        }),
      {
        wrapper,
      }
    );
    await waitFor(() => {
      expect(result.current.data).toBe(undefined);
    });
  });

  test("disabled query cache on request", async () => {
    const { result: result1, unmount } = renderHook(
      () =>
        useLimesGetRequest({
          queryKey: "example",
          queryOpts: { gcTime: 0 },
        }),
      {
        wrapper,
      }
    );
    await waitFor(() => {
      expect(result1.current.data).not.toBe(undefined);
      expect(result1.current.data.commitment.amount).toEqual(10);
      unmount();
    });
    const { result: result2 } = renderHook(
      () =>
        useLimesGetRequest({
          queryKey: "example",
          queryOpts: { enabled: false },
        }),
      {
        wrapper,
      }
    );

    await waitFor(() => {
      expect(result2.current.data).toBe(undefined);
    });
  });
});
