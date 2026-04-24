// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { useCreateCommitmentStore, createCommitmentStoreActions, globalStoreActions } from "../../StoreProvider";
import { initialCommitmentObject } from "../../../lib/constants";
import { act, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Scope } from "../../../lib/scope";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import StoreProvider from "../../StoreProvider";
import Actions from "./Actions";

describe("test Action Operation", () => {
  test("should render delete action", async () => {
    const commitment = { ...initialCommitmentObject };
    commitment.amount = 10;
    commitment.duration = "1 year";
    commitment.confirmed_at = "123";
    commitment.can_be_deleted = true;
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <Actions commitment={commitment} />
          {children}
        </StoreProvider>
      </PortalProvider>
    );

    renderHook(
      () => ({
        commitmentStore: useCreateCommitmentStore(),
        commitmentStoreActions: createCommitmentStoreActions(),
      }),
      {
        wrapper,
      }
    );
    expect(screen.queryByText(/committed/i)).not.toBe(null);
    const contextMenu = await waitFor(() => {
      return screen.getByTitle(/more/i);
    });
    userEvent.click(contextMenu);
    await waitFor(() => {
      expect(screen.queryByText("Delete")).not.toBe(null);
    });
  });

  test("should render conversion action", async () => {
    const commitment = { ...initialCommitmentObject };
    commitment.resource_name = "instances_hana_resourceA";
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <Actions commitment={commitment} />
          {children}
        </StoreProvider>
      </PortalProvider>
    );
    const { result } = renderHook(
      () => ({
        commitmentStore: useCreateCommitmentStore(),
        commitmentStoreActions: createCommitmentStoreActions(),
      }),
      {
        wrapper,
      }
    );
    act(() => {
      result.current.commitmentStoreActions.setShowConversionOption(true);
    });
    const contextMenu = await waitFor(() => {
      return screen.getByTitle(/more/i);
    });
    await waitFor(() => {
      userEvent.click(contextMenu);
      expect(screen.queryByText(/convert/i)).not.toBe(null);
    });
  });

  test("should render transfer action", async () => {
    const commitment = { ...initialCommitmentObject };
    commitment.confirmed_at = "123";
    const scope = new Scope({ projectID: "123", domainID: "456" });
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <Actions commitment={commitment} />
          {children}
        </StoreProvider>
      </PortalProvider>
    );
    const { result, rerender } = renderHook(
      () => ({
        commitmentStore: useCreateCommitmentStore(),
        commitmentStoreActions: createCommitmentStoreActions(),
        globalStoreActions: globalStoreActions(),
      }),
      {
        wrapper,
      }
    );
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });

    const contextMenu = await waitFor(() => {
      return screen.getByTitle(/more/i);
    });

    userEvent.click(contextMenu);
    await waitFor(() => {
      expect(screen.queryByText(/transfer/i)).not.toBe(null);
    });

    rerender();
    commitment.transfer_status = "public";
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });
    userEvent.click(contextMenu);
    await waitFor(() => {
      expect(screen.queryByText(/transferring/i)).not.toBe(null);
      expect(screen.queryByText(/cancel transfer/i)).not.toBe(null);
    });
  });
  test("should remove cancel transfer action when transfer completes", async () => {
    const commitment = { ...initialCommitmentObject };
    commitment.confirmed_at = "123";
    commitment.transfer_status = "unlisted";
    commitment.transfer_token = "test_token_123";
    const scope = new Scope({ projectID: "123", domainID: "456" });
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <Actions commitment={commitment} />
          {children}
        </StoreProvider>
      </PortalProvider>
    );
    const { result, rerender } = renderHook(
      () => ({
        commitmentStore: useCreateCommitmentStore(),
        commitmentStoreActions: createCommitmentStoreActions(),
        globalStoreActions: globalStoreActions(),
      }),
      {
        wrapper,
      }
    );
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });

    const contextMenu = await waitFor(() => {
      return screen.getByTitle(/more/i);
    });

    // Verify cancel transfer is shown when commitment is in transfer
    userEvent.click(contextMenu);
    await waitFor(() => {
      expect(screen.queryByText(/transferring/i)).not.toBe(null);
      expect(screen.queryByText(/cancel transfer/i)).not.toBe(null);
    });

    // transfer completion
    delete commitment.transfer_status;
    delete commitment.transfer_token;
    rerender();
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });

    // Verify cancel transfer is removed
    userEvent.click(contextMenu);
    await waitFor(() => {
      expect(screen.queryByText(/^transfer$/i)).not.toBe(null);
      expect(screen.queryByText(/cancel transfer/i)).toBe(null);
    });
  });

  test("should render duration update action", async () => {
    const commitment = { ...initialCommitmentObject };
    commitment.duration = "1 year";
    const resource = {
      commitment_config: { durations: ["1 year", "2 years", "3 years"] },
    };
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <Actions commitment={commitment} resource={resource} />
          {children}
        </StoreProvider>
      </PortalProvider>
    );
    renderHook(
      () => ({
        commitmentStore: useCreateCommitmentStore(),
        commitmentStoreActions: createCommitmentStoreActions(),
      }),
      {
        wrapper,
      }
    );
    const contextMenu = await waitFor(() => {
      return screen.getByTitle(/more/i);
    });
    userEvent.click(contextMenu);
    await waitFor(() => {
      expect(screen.queryByText(/edit/i)).not.toBe(null);
    });
  });
});
