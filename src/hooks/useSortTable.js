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
import { t } from "../lib/utils";
import { DataGridHeadCell, Icon, Stack } from "@cloudoperators/juno-ui-components/index";

const useSortTableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config || {});

  console.log(sortConfig)

  const sortedItems = React.useMemo(() => {
    if (Object.keys(sortConfig).length === 0) return items;
    const [[key, direction]] = Object.entries(sortConfig);

    return [...items].sort((a, b) => {
      if (t(a[key]) < t(b[key])) {
        return direction === "ascending" ? -1 : 1;
      }
      if (t(a[key]) > t(b[key])) {
        return direction === "descending" ? -1 : 1;
      }
      return 0;
    });
  }, [items, sortConfig]);

  const requestSort = (key) => {
    setSortConfig((currentConfig) => {
      const currentDirection = currentConfig[key];
      let direction = "ascending";
      if (currentDirection === "ascending") {
        direction = "descending";
      }
      const newConfig = { [key]: direction };
      return newConfig;
    });
  };

  const TableSortHeader = (headerProps) => {
    const { value = "", identifier = "" } = headerProps;
    const direction = sortConfig[identifier];
    const isIdentifierInItems = items.some((item) => {
      return item[identifier];
    });

    return (
      <DataGridHeadCell>
        {isIdentifierInItems ? (
          <Stack>
            {value}
            <Icon
              onClick={() => {
                requestSort(identifier);
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
