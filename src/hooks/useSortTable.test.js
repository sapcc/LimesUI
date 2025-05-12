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

  test("should sort with a provided sort rule", () => {
    const items = [
      { id: 1, value: 3 },
      { id: 2, value: 1 },
      { id: 3, value: 2 },
    ];

    const sortRule = (item) => {
      switch (item.id) {
        case 1:
          item.value = 1;
          break;
        case 2:
          item.value = 2;
          break;
        case 3:
          item.value = 3;
          break;
        default:
          return 0;
      }
      return item.value;
    };
    const { result } = renderHook(() => useSortTableData(items));
    act(() => {
      result.current.requestSort("value", sortRule, "numeric");
    });

    expect(result.current.items).toEqual([
      { id: 1, value: 1 },
      { id: 2, value: 2 },
      { id: 3, value: 3 },
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

  test("should render header with sortable columns", () => {
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
