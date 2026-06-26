// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import moment from "moment";
import { fireEvent, render, screen } from "@testing-library/react";
import CommitmentCalendar from "./CommitmentCalendar";

const UseExampleCmp = () => {
  const startDate = moment()._d;
  const [selectedDate, setSelectedDate] = React.useState(startDate);
  return (
    <CommitmentCalendar
      startDate={startDate}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      currentDayCommit={() => {}}
    />
  );
};

describe("test Commitment Calendar", () => {
  test("should display correct month and select a desired month", () => {
    Date.now = jest.fn(() => new Date("2024-01-01T00:00:00.000Z"));
    render(<UseExampleCmp />);
    expect(screen.getByText(/January 2024/i)).toBeInTheDocument();
    const selectedDate = screen.getByLabelText(/selected/i);
    const firstDate = screen.getByLabelText(/Monday, January 1st, 2024/i);
    expect(firstDate).toEqual(selectedDate);
    const desiredDate = screen.getByLabelText(/Tuesday, January 2nd, 2024/i);
    fireEvent.click(desiredDate);
    const newSelectedDate = screen.getByLabelText(/selected/i);
    expect(newSelectedDate).toEqual(desiredDate);
  });

  test("should display previous and next month", () => {
    Date.now = jest.fn(() => new Date("2024-01-01T00:00:00.000Z"));
    render(<UseExampleCmp />);
    expect(screen.getByText(/January 2024/i)).toBeInTheDocument();
    const previousMonthSelect = screen.getByLabelText(/Go to the Previous Month/i);
    fireEvent.click(previousMonthSelect);
    expect(screen.getByText(/December 2023/i)).toBeInTheDocument();
    const nextMonthSelect = screen.getByLabelText(/Go to the Next Month/i);
    fireEvent.click(nextMonthSelect);
    expect(screen.getByText(/January 2024/i)).toBeInTheDocument();
    fireEvent.click(nextMonthSelect);
    expect(screen.getByText(/February 2024/i)).toBeInTheDocument();
  });

  test("no selected date should display an error", () => {
    Date.now = jest.fn(() => new Date("2024-01-01T00:00:00.000Z"));
    render(<UseExampleCmp />);
    expect(screen.getByText(/January 2024/i)).toBeInTheDocument();
    const selectedDate = screen.getByLabelText(/selected/i);
    fireEvent.click(selectedDate);
    expect(screen.queryByText(/Selected date must be today or in the future/i)).not.toBe(null);
  });

  test("selected date should be midnight UTC regardless of timezone", () => {
    const originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;

    // Simulate UTC-5 timezone
    Date.prototype.getTimezoneOffset = jest.fn(() => 300);

    // Use Unix epoch as start date (1970-01-01)
    const startDate = moment.utc(0).startOf("day");
    const targetDate = startDate.clone().add(2, "days");
    Date.now = jest.fn(() => startDate.valueOf());
    
    let capturedDate = null;
    render(
      <CommitmentCalendar
        startDate={startDate.toDate()}
        selectedDate={null}
        setSelectedDate={(date) => (capturedDate = date)}
        currentDayCommit={() => {}}
      />
    );

    // Click on the target date (Saturday, January 3rd, 1970)
    const targetDateLabel = targetDate.format("dddd, MMMM Do, YYYY");
    fireEvent.click(screen.getByLabelText(new RegExp(targetDateLabel, "i")));

    expect(capturedDate).not.toBeNull();
    expect(capturedDate.toISOString()).toBe("1970-01-03T00:00:00.000Z");
    Date.prototype.getTimezoneOffset = originalGetTimezoneOffset;
  });
});
