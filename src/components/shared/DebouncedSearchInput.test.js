// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import DebouncedSearchInput from "./DebouncedSearchInput";

describe("DebouncedSearchInput", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should initialize with initialValue", () => {
    const onChange = jest.fn();
    render(<DebouncedSearchInput onChange={onChange} initialValue="initial" />);

    const input = screen.getByRole("searchbox");
    expect(input.value).toBe("initial");

    // do not call onChange on initial render.
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  test("should debounce the input value update", () => {
    const onChange = jest.fn();
    render(<DebouncedSearchInput onChange={onChange} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");

    // OnChange should be called immediately
    expect(onChange).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("test");
  });

  test("should reset debounce timer on subsequent typing", () => {
    const onChange = jest.fn();
    render(<DebouncedSearchInput onChange={onChange} delay={300} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "t" } });
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: "test" } });

    // Advance by another 200ms for a total of 400ms.
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(onChange).not.toHaveBeenCalled();

    // Advance by another 100ms. This triggers the debounced update after 300ms.
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("test");
  });

  test("should use custom delay", () => {
    const onChange = jest.fn();
    render(<DebouncedSearchInput onChange={onChange} delay={500} />);
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(onChange).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("test");
  });
});
