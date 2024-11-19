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
    const previousMonthSelect = screen.getByLabelText(
      /Go to the Previous Month/i
    );
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
    fireEvent.click(selectedDate)
    expect(screen.queryByText(/Selected date must be today or in the future/i)).not.toBe(null)
  });
});
