import React from "react";
import { act, render, renderHook, screen, waitFor } from "@testing-library/react";
import { globalStoreActions } from "../StoreProvider";
import { Scope } from "../../lib/scope";
import StoreProvider from "../StoreProvider";
import Marketplace from "./Marketplace";

describe("Marketplace tests", () => {
  const base = [
    {
      id: "commitment-1",
      transfer_token: "testToken",
      amount: 100,
      availability_zone: "az_1",
      duration: "1 year",
      expires_at: "0",
      unit: "Gib",
    },
    {
      id: "commitment-2",
      transfer_token: "testToken",
      amount: 123,
      availability_zone: "az_2",
      duration: "2 years",
      expires_at: "0",
    },
  ];

  test("expect correct table values", () => {
    const commitments = [...base];
    const publicCommitmentQuery = {
      data: { commitments: [...commitments] },
      isLoading: false,
      isError: false,
      error: null,
    };

    commitments.push({
      id: "commitment-3",
      amount: 3,
      availability_zone: "az_3",
      duration: "3 years",
      expires_at: "0",
    });

    render(
      <StoreProvider>
        <Marketplace
          projectCommitments={commitments}
          publicCommitmentQuery={publicCommitmentQuery}
          transferCommitment={jest.fn()}
        />
      </StoreProvider>
    );

    expect(screen.getByText("100 Gib")).toBeInTheDocument();
    expect(screen.getByText("1 year")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("2 years")).toBeInTheDocument();
    expect(screen.queryByText("3 years")).not.toBeInTheDocument();
  });

  test("correct actions for each UI view level", async () => {
    const commitments = [...base];
    const publicCommitments = [...commitments];
    publicCommitments.push({
      id: "commitment-3",
      amount: 3,
      availability_zone: "az_3",
      duration: "3 years",
      expires_at: "0",
    });

    const publicCommitmentQuery = {
      data: { commitments: publicCommitments },
      isLoading: false,
      isError: false,
      error: null,
    };

    const wrapper = ({ children }) => (
      <StoreProvider>
        <Marketplace
          projectCommitments={commitments}
          publicCommitmentQuery={publicCommitmentQuery}
          transferCommitment={jest.fn()}
        />
        {children}
      </StoreProvider>
    );

    // Cluster level
    const scope = new Scope({ projectID: null, domainID: null });
    const { result, rerender } = await waitFor(() => {
      return renderHook(
        () => ({
          globalStoreActions: globalStoreActions(),
        }),
        {
          wrapper,
        }
      );
    });
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });
    expect(screen.getAllByTitle(/more/i).length).toBe(3);

    // Domain level
    rerender();
    const domainScope = new Scope({ projectID: null, domainID: "456" });
    act(() => {
      result.current.globalStoreActions.setScope(domainScope);
    });
    expect(screen.getAllByTestId("mp-receive").length).toBe(3);

    // Project level
    rerender();
    const projectScope = new Scope({ projectID: "123", domainID: "456" });
    act(() => {
      result.current.globalStoreActions.setScope(projectScope);
    });
    expect(screen.getAllByTestId("mp-cancel").length).toBe(2);
    expect(screen.queryAllByTestId("mp-receive").length).toBe(1);
  });
});
