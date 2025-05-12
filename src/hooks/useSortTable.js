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
import { useState } from "react";
import { DataGridHeadCell, Icon, Stack } from "@cloudoperators/juno-ui-components/index";

const useSortTableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config || {});

  const sortedItems = React.useMemo(() => {
    if (Object.keys(sortConfig).length === 0) return items;
    const [[key, data]] = Object.entries(sortConfig);
    const { direction, sortRule } = data;

    return [...items].sort((a, b) => {
      let aValue = sortRule ? sortRule(a) : a[key];
      let bValue = sortRule ? sortRule(b) : b[key];

      if (aValue < bValue) {
        return direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [items, sortConfig]);

  const requestSort = (key, sortRule) => {
    setSortConfig((currentConfig) => {
      const currentDirection = currentConfig[key]?.direction;
      const direction = currentDirection === "ascending" ? "descending" : "ascending";
      const newConfig = { [key]: { direction, sortRule } };
      return newConfig;
    });
  };

  const TableSortHeader = (headerProps) => {
    const { value = "", identifier = "", sortRule = null } = headerProps;
    const direction = sortConfig[identifier]?.direction;
    const isIdentifierInItems =
      sortRule ||
      items.some((item) => {
        return item[identifier];
      });

    return (
      <DataGridHeadCell>
        {isIdentifierInItems ? (
          <Stack>
            {value}
            <Icon
              onClick={() => {
                requestSort(identifier, sortRule);
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
