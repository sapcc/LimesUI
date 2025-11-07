// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { useState } from "react";
import { DataGridHeadCell, Icon, Stack } from "@cloudoperators/juno-ui-components/index";

const sorters = {
  text: (a, b) => a.localeCompare(b),
  numeric: (a, b) => a - b,
};

const useSortTableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config || {});

  const sortedItems = React.useMemo(() => {
    if (Object.keys(sortConfig).length === 0) return items;
    const [[key, data]] = Object.entries(sortConfig);
    const { direction, sortValueFn, sortStrategy } = data;
    if (!sortStrategy) {
      throw new Error(`Missing sort strategy for key: ${key}`);
    }
    const sorter = sorters[sortStrategy];

    return [...items].sort((a, b) => {
      let aValue = sortValueFn ? sortValueFn(a) : a[key];
      let bValue = sortValueFn ? sortValueFn(b) : b[key];
      const comparison = sorter(aValue, bValue);
      return direction === "ascending" ? comparison : -comparison;
    });
  }, [items, sortConfig]);

  const requestSort = (key, sortValueFn, sortStrategy) => {
    setSortConfig((currentConfig) => {
      const currentDirection = currentConfig[key]?.direction;
      const direction = currentDirection === "ascending" ? "descending" : "ascending";
      const newConfig = { [key]: { direction, sortValueFn, sortStrategy } };
      return newConfig;
    });
  };

  const TableSortHeader = (headerProps) => {
    const { value = "", identifier = "", sortValueFn = null, sortStrategy = null } = headerProps;
    const direction = sortConfig[identifier]?.direction;
    const isSortableColumn =
      sortValueFn ||
      items.some((item) => {
        return item[identifier];
      });

    return (
      <DataGridHeadCell>
        {isSortableColumn ? (
          <Stack>
            {value}
            <Icon
              data-testid={`tableSort-${value}`}
              onClick={() => {
                requestSort(identifier, sortValueFn, sortStrategy);
              }}
              title={direction ?? "sort"}
              icon={
                direction === "ascending" ? "expandLess" : direction === "descending" ? "expandMore" : "chevronRight"
              }
            />
          </Stack>
        ) : (
          <>{value}</>
        )}
      </DataGridHeadCell>
    );
  };
  return { items: sortedItems, requestSort, sortConfig, TableSortHeader };
};

export default useSortTableData;
