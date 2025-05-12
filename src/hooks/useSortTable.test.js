import React from "react";
import useSortTableData from "./useSortTable";
import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";

describe("useSortTableData", () => {
  test("should sort numerical data in ascending order", () => {
    const items = [
      { id: 1, value: 3 },
      { id: 2, value: 1 },
      { id: 3, value: 2 },
    ];

    const { result } = renderHook(() => useSortTableData(items));
    act(() => {
      result.current.requestSort("value", null, "numeric");
    });

    expect(result.current.items).toEqual([
      { id: 2, value: 1 },
      { id: 3, value: 2 },
      { id: 1, value: 3 },
    ]);
  });

  test("should sort text data in ascending order", () => {
    const items = [
      { id: 1, value: "banana" },
      { id: 2, value: "apple" },
      { id: 3, value: "cherry" },
    ];

    const { result } = renderHook(() => useSortTableData(items));
    act(() => {
      result.current.requestSort("value", null, "text");
    });

    expect(result.current.items).toEqual([
      { id: 2, value: "apple" },
      { id: 1, value: "banana" },
      { id: 3, value: "cherry" },
    ]);
  });

  test("should throw an error when sort strategy is missing", () => {
    console.error = jest.fn();
    const items = [
      { id: 1, value: 3 },
      { id: 2, value: 1 },
      { id: 3, value: 2 },
    ];

    const { result } = renderHook(() => useSortTableData(items));
    expect(() => {
      act(() => {
        result.current.requestSort("value", null, null);
      });
    }).toThrow("Missing sort strategy for key: value");
  });

  test("should render TableSortHeader with sortable columns", () => {
    const items = [
      { id: 1, value: "banana" },
      { id: 3, value: "cherry" },
      { id: 2, value: "apple" },
    ];

    const { result } = renderHook(() => useSortTableData(items));
    render(<result.current.TableSortHeader value="Value" identifier="value" sortStrategy="text" />);
    const icon = screen.getByTestId("tableSort-Value");

    fireEvent.click(icon);
    expect(result.current.items).toEqual([
      { id: 2, value: "apple" },
      { id: 1, value: "banana" },
      { id: 3, value: "cherry" },
    ]);

    fireEvent.click(icon);
    expect(result.current.items).toEqual([
      { id: 3, value: "cherry" },
      { id: 1, value: "banana" },
      { id: 2, value: "apple" },
    ]);
  });
});
