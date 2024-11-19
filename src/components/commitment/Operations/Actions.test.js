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
import {
  createCommitmentStore,
  createCommitmentStoreActions,
  globalStoreActions,
} from "../../StoreProvider";
import { initialCommitmentObject } from "../../../lib/constants";
import {
  act,
  fireEvent,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
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

    await waitFor(() => {
      return renderHook(
        () => ({
          commitmentStore: createCommitmentStore(),
          commitmentStoreActions: createCommitmentStoreActions(),
        }),
        {
          wrapper,
        }
      );
    });
    expect(screen.queryByText(/committed/i)).not.toBe(null);
    const contextMenu = await waitFor(() => {
      return screen.getByTitle(/more/i);
    });
    fireEvent.click(contextMenu);
    await waitFor(() => {
      expect(screen.queryByTitle(/delete/i)).not.toBe(null);
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
    const { result } = await waitFor(() => {
      return renderHook(
        () => ({
          commitmentStore: createCommitmentStore(),
          commitmentStoreActions: createCommitmentStoreActions(),
        }),
        {
          wrapper,
        }
      );
    });
    act(() => {
      result.current.commitmentStoreActions.setShowConversionOption(true);
    });
    const contextMenu = await waitFor(() => {
      return screen.getByTitle(/more/i);
    });
    fireEvent.click(contextMenu);
    await waitFor(() => {
      expect(screen.queryByTitle(/convert/i)).not.toBe(null);
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
    const { result } = await waitFor(() => {
      return renderHook(
        () => ({
          commitmentStore: createCommitmentStore(),
          commitmentStoreActions: createCommitmentStoreActions(),
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
    const contextMenu = await waitFor(() => {
      return screen.getByTitle(/more/i);
    });
    fireEvent.click(contextMenu);
    await waitFor(() => {
      expect(screen.queryByTitle(/transfer/i)).not.toBe(null);
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
    await waitFor(() => {
      return renderHook(
        () => ({
          commitmentStore: createCommitmentStore(),
          commitmentStoreActions: createCommitmentStoreActions(),
        }),
        {
          wrapper,
        }
      );
    });
    const contextMenu = await waitFor(() => {
      return screen.getByTitle(/more/i);
    });
    fireEvent.click(contextMenu);
    await waitFor(() => {
      expect(screen.queryByTitle(/edit/i)).not.toBe(null);
    });
  });
});
