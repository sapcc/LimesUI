// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Scope } from "../../lib/scope";
import StoreProvider from "../StoreProvider";
import Marketplace from "./Marketplace";
import { PortalProvider } from "@cloudoperators/juno-ui-components/index";

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
          scope={new Scope({ projectID: "123", domainID: "456" })}
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

  test("correct actions for each UI view level", () => {
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

    const renderMarketplace = (scope) => (
      <StoreProvider>
        <Marketplace
          scope={scope}
          projectCommitments={commitments}
          publicCommitmentQuery={publicCommitmentQuery}
          transferCommitment={jest.fn()}
        />
      </StoreProvider>
    );

    // Cluster level
    const clusterScope = new Scope({ projectID: null, domainID: null });
    const { rerender } = render(renderMarketplace(clusterScope));
    expect(screen.getAllByTitle(/more/i).length).toBe(3);

    // Domain level
    const domainScope = new Scope({ projectID: null, domainID: "456" });
    rerender(renderMarketplace(domainScope));
    expect(screen.getAllByTestId("mp-receive").length).toBe(3);

    // Project level
    rerender();
    const projectScope = new Scope({ projectID: "123", domainID: "456" });
    rerender(renderMarketplace(projectScope));
    expect(screen.getAllByTestId("mp-cancel").length).toBe(2);
    expect(screen.queryAllByTestId("mp-receive").length).toBe(1);
  });

  test("admin action items", async () => {
    const commitments = [...base];
    commitments[0].transfer_status = "public";
    commitments[1].transfer_status = "public";
    const publicCommitments = [...commitments];

    const publicCommitmentQuery = {
      data: { commitments: publicCommitments },
      isLoading: false,
      isError: false,
      error: null,
    };

    render(
      <StoreProvider>
        <PortalProvider>
          <Marketplace
            scope={new Scope({ projectID: null, domainID: null })}
            projectCommitments={commitments}
            publicCommitmentQuery={publicCommitmentQuery}
            transferCommitment={jest.fn()}
          />
        </PortalProvider>
      </StoreProvider>
    );

    const contextMenus = screen.getAllByTitle(/more/i);
    expect(contextMenus.length).toBe(2);
    const actions = contextMenus[0];
    userEvent.click(actions);

    await waitFor(() => {
      expect(screen.queryByText("Cancel transfer")).not.toBe(null);
      expect(screen.queryByText("Delete")).not.toBe(null);
      expect(screen.queryByText("Receive")).not.toBe(null);
      expect(screen.queryByText("Transferring")).not.toBe(null);
      expect(screen.queryByText("Convert")).toBe(null);
    });
  });
});
