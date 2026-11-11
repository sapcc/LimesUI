// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import moment from "moment";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import { initialCommitmentObject } from "../../../lib/constants";
import CommitmentModal, { getWarningText } from "./CommitmentModal";
import { FACTOR, SOURCE, REASON } from "../../../lib/commitmentSize";

// If debugging is necessary, use screen.debug(undefined, Infinity) to get the complete componenent log.
// Mock resource with usage/quota data for oversized commitment warning tests
const mockResource = {
  name: "test-resource",
  per_az: [
    { name: "az1", usage: 100, quota: 500 },
    { name: "az2", usage: 50, quota: 200 },
  ],
};

describe("test commitment creation modal", () => {
  test("no capacity commitment creation with no minConfirm date should be 60 seconds in the future", async () => {
    Date.now = jest.fn(() => new Date("2024-01-01T00:00:00.000Z"));
    const onConfirm = jest.fn((confirm_by) => {
      expect(confirm_by).toEqual(moment(new Date("2024-01-01T00:01:00.000Z")).utc().unix());
    });
    const onClose = jest.fn(() => {});
    const newCommitment = { ...initialCommitmentObject };
    newCommitment.amount = 10;
    newCommitment.duration = "1 year";

    const renderModal = (publicCommitmentQuery = { data: null }) => (
      <PortalProvider>
        <CommitmentModal
          title="Confirm commitment creation"
          subText="Commit"
          currentTab={"az1"}
          canConfirm={false}
          minConfirmDate={null}
          commitment={newCommitment}
          resource={mockResource}
          action={onConfirm}
          onModalClose={onClose}
          publicCommitmentQuery={publicCommitmentQuery}
        />
      </PortalProvider>
    );

    const { rerender } = render(renderModal());
    const confirmInput = screen.getByTestId(/confirmInput/i);
    const confirmButton = screen.getByTestId(/modalConfirm/i);
    expect(screen.getByText(/az1/i)).toBeInTheDocument();
    expect(screen.getByText(/az1/i)).toBeInTheDocument();
    expect(screen.getByText(/activation date/i)).toBeInTheDocument();
    expect(screen.queryByTestId("marketplaceInfo")).not.toBeInTheDocument();
    expect(screen.getByTestId("noCapacityWarning")).toBeInTheDocument();
    fireEvent.change(confirmInput, { target: { value: "commit" } });
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalled();
    });

    // Rerender with marketplace commitments

    // Marketplace commitments with a matching AZ should display the marketplace info
    rerender(
      renderModal({
        data: {
          commitments: [
            { id: "commitment-1", availability_zone: "az1" },
            { id: "commitment-2", availability_zone: "az2" },
          ],
        },
      })
    );
    expect(screen.getByTestId("marketplaceInfo")).toBeInTheDocument();

    // Marketplace commitments without a matching AZ should not display the marketplace info
    rerender(
      renderModal({ data: { commitments: [{ id: "commitment-1", availability_zone: "az+" }, { id: "commitment-2" }] } })
    );
    expect(screen.queryByTestId("marketplaceInfo")).not.toBeInTheDocument();
  });
  test("same day commit", async () => {
    Date.now = jest.fn(() => new Date("2024-01-01T00:00:00.000Z"));
    const onConfirm = jest.fn((confirm_by) => {
      expect(confirm_by).toEqual(moment(new Date("2024-01-01T00:00:00.000Z")).utc().unix());
    });
    const onClose = jest.fn(() => {});
    const newCommitment = { ...initialCommitmentObject };
    newCommitment.amount = 10;
    newCommitment.duration = "1 year";
    render(
      <PortalProvider>
        <CommitmentModal
          title="Confirm commitment creation"
          subText="Commit"
          currentTab={"az1"}
          canConfirm={true}
          minConfirmDate={moment(new Date("2024-01-01T00:00:00.000Z")).utc().unix()}
          commitment={newCommitment}
          resource={mockResource}
          action={onConfirm}
          onModalClose={onClose}
          publicCommitmentQuery={{ data: null }}
        />
      </PortalProvider>
    );
    const confirmInput = screen.getByTestId(/confirmInput/i);
    const confirmButton = screen.getByTestId(/modalConfirm/i);
    expect(screen.getByText(/activation date/i)).toBeInTheDocument();
    expect(screen.getByText(/2024-01-01/i)).toBeInTheDocument();
    expect(screen.getByText(/January 2024/i)).toBeInTheDocument();
    fireEvent.change(confirmInput, { target: { value: "commit" } });
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalled();
    });
  });
  test("create commitment in the future", async () => {
    Date.now = jest.fn(() => new Date("2024-01-01T00:00:00.000Z"));
    const onConfirm = jest.fn((confirm_by) => {
      expect(confirm_by).toEqual(moment(new Date("2024-01-31T00:00:00.000Z")).utc().unix());
    });
    const onClose = jest.fn(() => {});
    const newCommitment = { ...initialCommitmentObject };
    newCommitment.amount = 10;
    newCommitment.duration = "1 year";
    render(
      <PortalProvider>
        <CommitmentModal
          title="Confirm commitment creation"
          subText="Commit"
          currentTab={"az1"}
          canConfirm={true}
          minConfirmDate={moment(new Date("2024-01-02T00:00:00.000Z")).utc().unix()}
          commitment={newCommitment}
          resource={mockResource}
          action={onConfirm}
          onModalClose={onClose}
          publicCommitmentQuery={{ data: null }}
        />
      </PortalProvider>
    );
    const confirmInput = screen.getByTestId(/confirmInput/i);
    const confirmButton = screen.getByTestId(/modalConfirm/i);
    expect(screen.getByText(/az1/i)).toBeInTheDocument();
    expect(screen.getByText(/activation date/i)).toBeInTheDocument();
    expect(screen.getByText(/2024-01-02/i)).toBeInTheDocument();
    expect(screen.getByText(/January 2024/i)).toBeInTheDocument();
    screen.getByLabelText(/Tuesday, January 2nd, 2024/i);
    const calendarDay = screen.getByLabelText(/Wednesday, January 31st, 2024/i);
    fireEvent.click(calendarDay);
    expect(screen.getByText("2024-01-31")).toBeInTheDocument();
    fireEvent.change(confirmInput, { target: { value: "wrongInput" } });
    fireEvent.click(confirmButton);
    expect(onConfirm).not.toHaveBeenCalled();
    fireEvent.change(confirmInput, { target: { value: "commit" } });
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalled();
    });
  });

  test("open and close calendar", () => {
    Date.now = jest.fn(() => new Date("2024-01-01T00:00:00.000Z"));
    const onConfirm = jest.fn((confirm_by) => {
      expect(confirm_by).toEqual(moment(new Date("2024-01-01T00:00:00.000Z")).utc().unix());
    });
    const onClose = jest.fn(() => {});
    const newCommitment = { ...initialCommitmentObject };
    newCommitment.amount = 10;
    newCommitment.duration = "1 year";
    render(
      <PortalProvider>
        <CommitmentModal
          title="Confirm commitment creation"
          subText="Commit"
          currentTab={"az1"}
          canConfirm={true}
          commitment={newCommitment}
          resource={mockResource}
          action={onConfirm}
          onModalClose={onClose}
          publicCommitmentQuery={{ data: null }}
        />
      </PortalProvider>
    );
    expect(screen.queryByText(/January 2024/i)).toBe(null);
    act(() => {
      screen.getByRole("checkbox").click();
    });
    expect(screen.getByText("Notificaton")).toBeInTheDocument();
    expect(screen.getByText(/January 2024/i)).toBeInTheDocument();
  });

  const baseValue = 100;
  test.each([
    {
      name: "usage already covered by commitments",
      amount: baseValue * FACTOR.MAX_USAGE_RATIO - baseValue + 1,
      az: { usage: baseValue, commitmentSum: baseValue },
      warningText: getWarningText(REASON.COVERED, SOURCE.COVERED, baseValue),
    },
    {
      name: "large amount relative to usage",
      amount: baseValue * FACTOR.MAX_USAGE_RATIO + 1,
      az: { usage: baseValue },
      warningText: getWarningText(REASON.LARGE, SOURCE.USAGE, baseValue),
    },
    {
      name: "small amount relative to usage",
      amount: baseValue * FACTOR.SMALL,
      az: { usage: baseValue },
      warningText: getWarningText(REASON.SMALL, SOURCE.USAGE, baseValue),
    },
    {
      name: "large amount relative to resource commitments",
      amount: baseValue * FACTOR.LARGE,
      commitmentSum: baseValue,
      az: { usage: 0, commitmentSum: 0 },
      warningText: getWarningText(REASON.LARGE, SOURCE.COMMITMENTS, baseValue),
    },
    {
      name: "large amount relative to quota",
      amount: baseValue * FACTOR.LARGE,
      az: { quota: baseValue },
      warningText: getWarningText(REASON.LARGE, SOURCE.QUOTA, baseValue),
    },
  ])(
    "$name displays a formatted warning and requires acknowledgement",
    async ({ amount, az, commitmentSum = 0, warningText }) => {
      const onConfirm = jest.fn();
      const onClose = jest.fn();
      const newCommitment = {
        ...initialCommitmentObject,
        amount,
        duration: "1 year",
      };
      const resource = {
        name: "test-resource",
        commitmentSum,
        per_az: [{ name: "az1", ...az }],
      };

      render(
        <PortalProvider>
          <CommitmentModal
            title="Confirm commitment creation"
            subText="Commit"
            currentTab="az1"
            canConfirm={true}
            commitment={newCommitment}
            resource={resource}
            action={onConfirm}
            onModalClose={onClose}
            publicCommitmentQuery={{ data: null }}
          />
        </PortalProvider>
      );

      expect(screen.getByTestId("commitmentWarning")).toHaveTextContent(warningText);

      const confirmInput = screen.getByTestId(/confirmInput/i);
      const confirmButton = screen.getByTestId(/modalConfirm/i);
      const acknowledgeCheckbox = screen.getByTestId("commitmentWarningAcknowledgeCheckbox");

      expect(acknowledgeCheckbox).not.toBeChecked();
      expect(confirmButton).toBeEnabled();

      // Correct text still requires acknowledgement.
      fireEvent.change(confirmInput, { target: { value: "commit" } });
      fireEvent.click(confirmButton);
      expect(onConfirm).not.toHaveBeenCalled();
      expect(screen.getByTestId("acknowledgementError")).toBeInTheDocument();

      fireEvent.click(acknowledgeCheckbox);
      expect(acknowledgeCheckbox).toBeChecked();
      expect(screen.queryByTestId("acknowledgementError")).not.toBeInTheDocument();

      // Incorrect text is rejected on confirmation.
      fireEvent.change(confirmInput, { target: { value: "wrongInput" } });
      fireEvent.click(confirmButton);
      expect(onConfirm).not.toHaveBeenCalled();

      // Restore correct text and confirm.
      fireEvent.change(confirmInput, { target: { value: "commit" } });
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(onConfirm).toHaveBeenCalledTimes(1);
      });
    }
  );
});
