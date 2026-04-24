// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import InputWithUnit from "./InputWithUnit";
import { fireEvent, render, screen } from "@testing-library/react";
import { createUnit } from "../../lib/unit";

describe("InputWithUnit", () => {
  test("should react to value changes with standard unit", () => {
    const inputRef = { current: "" };
    const handleInput = jest.fn(() => {});
    const unit = new createUnit("GiB");
    render(<InputWithUnit inputRef={inputRef} onChange={() => handleInput()} unit={unit} />);
    const input = screen.getByTestId("inputWithUnit");
    fireEvent.change(input, { target: { value: "2 GiB" } });
    expect(handleInput).toHaveBeenCalled();
    expect(screen.queryByTestId("inputWithUnitInfo")).not.toBeInTheDocument();
  });
  test("should react to value changes with non standard unit", () => {
    const inputRef = { current: "" };
    const handleInput = jest.fn(() => {});
    const unit = new createUnit("128 GiB");

    render(<InputWithUnit inputRef={inputRef} onChange={() => handleInput()} unit={unit} />);
    const input = screen.getByTestId("inputWithUnit");
    fireEvent.change(input, { target: { value: 2 } });
    expect(screen.getByTestId("inputWithUnitInfo")).toBeInTheDocument();
    expect(handleInput).toHaveBeenCalled();
    expect(inputRef.current).toEqual("2");
  });
});
