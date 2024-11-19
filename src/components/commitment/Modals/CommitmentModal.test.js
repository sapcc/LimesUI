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
import moment from "moment";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import { initialCommitmentObject } from "../../../lib/constants";
import CommitmentModal from "./CommitmentModal";

// If debugging is necessary, use screen.debug(undefined, Infinity) to get the complete componenent log.
describe("test commitment creation modal", () => {
  test("no capacity commitment creation with no minConfirm date should be 60 seconds in the future", () => {
    Date.now = jest.fn(() => new Date("2024-01-01T00:00:00.000Z"));
    const onConfirm = jest.fn((confirm_by) => {
      expect(confirm_by).toEqual(
        moment(new Date("2024-01-01T00:01:00.000Z")).utc().unix()
      );
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
          az={"az1"}
          canConfirm={false}
          minConfirmDate={null}
          commitment={newCommitment}
          action={onConfirm}
          onModalClose={onClose}
        />
      </PortalProvider>
    );
    const confirmInput = screen.getByTestId(/confirmInput/i);
    const confirmButton = screen.getByTestId(/modalConfirm/i);
    expect(screen.getByText(/az1/i)).toBeInTheDocument();
    expect(screen.getByText(/az1/i)).toBeInTheDocument();
    expect(screen.getByText(/activation date/i)).toBeInTheDocument();
    expect(screen.getByTestId(/noCapacityWarning/i)).toBeInTheDocument();
    fireEvent.change(confirmInput, { target: { value: "commit" } });
    fireEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalled();
  });
  test("same day commit", () => {
    Date.now = jest.fn(() => new Date("2024-01-01T00:00:00.000Z"));
    const onConfirm = jest.fn((confirm_by) => {
      expect(confirm_by).toEqual(
        moment(new Date("2024-01-01T00:00:00.000Z")).utc().unix()
      );
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
          az={"az1"}
          canConfirm={true}
          minConfirmDate={moment(new Date("2024-01-01T00:00:00.000Z"))
            .utc()
            .unix()}
          commitment={newCommitment}
          action={onConfirm}
          onModalClose={onClose}
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
    expect(onConfirm).toHaveBeenCalled();
  });
  test("create commitment in the future", () => {
    Date.now = jest.fn(() => new Date("2024-01-01T00:00:00.000Z"));
    const onConfirm = jest.fn((confirm_by) => {
      expect(confirm_by).toEqual(
        moment(new Date("2024-01-31T00:00:00.000Z")).utc().unix()
      );
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
          az={"az1"}
          canConfirm={true}
          minConfirmDate={moment(new Date("2024-01-02T00:00:00.000Z"))
            .utc()
            .unix()}
          commitment={newCommitment}
          action={onConfirm}
          onModalClose={onClose}
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
    expect(onConfirm).toHaveBeenCalled();
  });

  test("open and close calendar", () => {
    Date.now = jest.fn(() => new Date("2024-01-01T00:00:00.000Z"));
    const onConfirm = jest.fn((confirm_by) => {
      expect(confirm_by).toEqual(
        moment(new Date("2024-01-01T00:00:00.000Z")).utc().unix()
      );
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
          az={"az1"}
          canConfirm={true}
          commitment={newCommitment}
          action={onConfirm}
          onModalClose={onClose}
        />
      </PortalProvider>
    );
    expect(screen.queryByText(/January 2024/i)).toBe(null);
    act(() => {
      screen.getByRole("checkbox").click();
    });
    expect(screen.getByText(/January 2024/i)).toBeInTheDocument();
  });
});
