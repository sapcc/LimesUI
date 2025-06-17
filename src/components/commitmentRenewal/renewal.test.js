/**
 * Copyright 2025 SAP SE
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
import CommitmentRenewal from "./CommitmentRenewal";
import moment from "moment";
import StoreProvider, { createCommitmentStoreActions, projectStore, projectStoreActions } from "../StoreProvider";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import { act, fireEvent, renderHook, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { inconsistentInfoText, renewableInfoText, missingRole } from "./CommitmentRenewal";
import RenewalManager from "./RenewalManager";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });
queryClient.setQueryDefaults(["renewCommitment"], {
  queryFn: () => {
    return;
  },
});

describe("Renewal Manger", () => {
  test("Expect matching commitments to be displayed", async () => {
    const now = moment().utc();
    const expireWithinTimeframe = now.add(2, "months").unix();
    const expireOutsideTimeFrame = now.add(1, "year").unix();
    // Commitment 1 -> renewable; 2 -> not displayed; 3 -> inconsistent;
    const commitments = [
      {
        id: 1,
        service_type: "service_1",
        resource_name: "resource_1",
        availability_zone: "az_1",
        amount: 1,
        duration: "1 year",
        expires_at: expireWithinTimeframe,
      },
      {
        id: 2,
        service_type: "service_2",
        resource_name: "resource_2",
        availability_zone: "az_2",
        amount: 1024,
        unit: "MiB",
        duration: "1 year",
        expires_at: expireOutsideTimeFrame,
      },
      {
        id: 3,
        service_type: "service_3",
        resource_name: "resource_3",
        availability_zone: "az_3",
        amount: 1024,
        unit: "MiB",
        duration: "1 year",
        confirm_by: now,
        expires_at: expireWithinTimeframe,
      },
    ];
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <RenewalManager canEdit={true} />
            {children}
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );
    const { result } = renderHook(
      () => ({
        commitmentStoreActions: createCommitmentStoreActions(),
        projectStore: projectStore(),
        projectStoreActions: projectStoreActions(),
      }),
      { wrapper }
    );
    act(() => {
      result.current.projectStoreActions.setCommitments(commitments);
    });
    await waitFor(() => {
      expect(screen.queryByText("resource_1")).toBeInTheDocument();
      expect(screen.queryByText("resource_2")).not.toBeInTheDocument();
      expect(screen.queryByText("resource_3")).toBeInTheDocument();
    });
  });
});

describe("Commitment renewal tests", () => {
  test("Expect renewable and inconsistent commitments", async () => {
    const now = moment().utc();
    const expire = now.add(2, "months").unix();

    const renewableCommitments = [
      {
        id: 1,
        service_type: "service_1",
        resource_name: "resource_1",
        availability_zone: "az_1",
        amount: 1,
        duration: "1 year",
        expires_at: expire,
      },
      {
        id: 2,
        service_type: "service_2",
        resource_name: "resource_2",
        availability_zone: "az_2",
        amount: 1024,
        unit: "MiB",
        duration: "1 year",
        expires_at: expire,
      },
    ];
    const inconsistentCommitments = [
      {
        id: 3,
        service_type: "service_3",
        resource_name: "resource_3",
        availability_zone: "az_1",
        amount: 3,
        duration: "1 year",
        transfer_status: "unlisted",
        reason: "in transfer",
        expires_at: expire,
      },
      {
        id: 4,
        service_type: "service_4",
        resource_name: "resource_4",
        availability_zone: "az_1",
        amount: 4,
        duration: "1 year",
        reason: "pending",
        confirm_by: now.unix(),
      },
    ];

    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <CommitmentRenewal canEdit={true} renewable={renewableCommitments} inconsistent={inconsistentCommitments} />
            {children}
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );
    await waitFor(() => {
      return renderHook(() => ({ commitmentStoreActions: createCommitmentStoreActions() }), { wrapper });
    });
    const renewCommitmentBtn1 = screen.getByTestId("renew1");
    const renewCommitmentBtn2 = screen.getByTestId("renew2");

    // check modal of the first commitment
    fireEvent.click(renewCommitmentBtn1);
    const cancelModal1 = screen.getByTestId("modalCancel");
    const modalContent1 = screen.getByTestId("renewResource");
    expect(modalContent1.textContent).toEqual("resource_1");
    fireEvent.click(cancelModal1);

    // check modal of the second commitment
    fireEvent.click(renewCommitmentBtn2);
    const cancelModal2 = screen.getByTestId("modalCancel");
    const modalContent2 = screen.getByTestId("renewResource");
    expect(modalContent2.textContent).toEqual("resource_2");
    fireEvent.click(cancelModal2);

    // there should be no renewal for inconsistencies
    expect(screen.queryByTestId("renew3")).not.toBeInTheDocument();
    expect(screen.queryByTestId("renew4")).not.toBeInTheDocument();
    // but their values should be visible
    expect(screen.queryByText("resource_3")).toBeInTheDocument();
    expect(screen.queryByText("resource_4")).toBeInTheDocument();

    // renew all applicable commitments (ID: 1 and 2)
    const renewMultipleBtn = screen.getByTestId("renewMultiple");
    fireEvent.click(renewMultipleBtn);
    const cancelModal3 = screen.getByTestId("modalCancel");
    expect(screen.getByText("About to renew: 2 commitments")).toBeInTheDocument();
    fireEvent.click(cancelModal3);

    // filter for a category
    const renewSel = screen.getByTestId("renewSelect");
    fireEvent.click(renewSel);
    const renewOpt = screen.getByTestId("service_2");
    // now service_1 should be filtered out
    fireEvent.click(renewOpt);
    await waitFor(() => {
      expect(screen.queryByTestId("renew1")).not.toBeInTheDocument();
    });
    // and renew all categories displays one commitment
    const renewMultipleBtn2 = screen.getByTestId("renewMultiple");
    fireEvent.click(renewMultipleBtn2);
    const cancelModal4 = screen.getByTestId("modalCancel");
    expect(screen.getByText("About to renew: 1 commitment")).toBeInTheDocument();
    fireEvent.click(cancelModal4);
  });

  test("Inconistencies but no renewables", async () => {
    const now = moment().utc();
    const expire = now.add(2, "months").unix();
    const inconsistentCommitments = [
      {
        id: 3,
        service_type: "service_3",
        resource_name: "resource_3",
        availability_zone: "az_1",
        amount: 3,
        duration: "1 year",
        transfer_status: "unlisted",
        reason: "in transfer",
        expires_at: expire,
      },
      {
        id: 4,
        service_type: "service_4",
        resource_name: "resource_4",
        availability_zone: "az_1",
        amount: 4,
        duration: "1 year",
        reason: "pending",
        confirm_by: now.unix(),
      },
    ];
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <CommitmentRenewal canEdit={true} inconsistent={inconsistentCommitments} />
            {children}
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );
    await waitFor(() => {
      return renderHook(() => ({ commitmentStoreActions: createCommitmentStoreActions() }), { wrapper });
    });
    expect(screen.getByText(renewableInfoText)).toBeInTheDocument();
    expect(screen.getByText(inconsistentInfoText)).toBeInTheDocument();
  });

  test("Renewables but no inconistencies", async () => {
    const now = moment().utc();
    const expire = now.add(2, "months").unix();
    const renewableCommitments = [
      {
        id: 1,
        service_type: "service_1",
        resource_name: "resource_1",
        availability_zone: "az_1",
        amount: 1,
        duration: "1 year",
        expires_at: expire,
      },
      {
        id: 2,
        service_type: "service_2",
        resource_name: "resource_2",
        availability_zone: "az_2",
        amount: 1024,
        unit: "MiB",
        duration: "1 year",
        expires_at: expire,
      },
    ];
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <CommitmentRenewal canEdit={true} renewable={renewableCommitments} />
            {children}
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );
    await waitFor(() => {
      return renderHook(() => ({ commitmentStoreActions: createCommitmentStoreActions() }), { wrapper });
    });

    expect(screen.queryByTestId("infoHint")).toBeInTheDocument();
  });
  test("Missing access role", async () => {
    const now = moment().utc();
    const expire = now.add(2, "months").unix();
    const renewableCommitments = [
      {
        id: 1,
        service_type: "service_1",
        resource_name: "resource_1",
        availability_zone: "az_1",
        amount: 1,
        duration: "1 year",
        expires_at: expire,
      },
      {
        id: 2,
        service_type: "service_2",
        resource_name: "resource_2",
        availability_zone: "az_2",
        amount: 1024,
        unit: "MiB",
        duration: "1 year",
        expires_at: expire,
      },
    ];
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <CommitmentRenewal canEdit={false} renewable={renewableCommitments} />
            {children}
          </QueryClientProvider>
        </StoreProvider>
      </PortalProvider>
    );
    await waitFor(() => {
      return renderHook(() => ({ commitmentStoreActions: createCommitmentStoreActions() }), { wrapper });
    });

    expect(screen.getByText(missingRole)).toBeInTheDocument();
    expect(screen.queryByTestId("infoHint")).toBeInTheDocument();
    const renewCommitmentBtn1 = screen.getByTestId("renew1");
    expect(renewCommitmentBtn1).toBeDisabled();
  });
});
