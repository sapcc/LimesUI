// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import {
  Button,
  ComboBox,
  ComboBoxOption,
  Pill,
  Select,
  SelectOption,
  Stack,
} from "@cloudoperators/juno-ui-components/index";
import { t } from "../../lib/utils";
import DebouncedSearchInput from "../shared/DebouncedSearchInput";

export const SEARCH_TERM = "searchTerm";

const BaseFilter = (props) => {
  const { filterTypes, searchTerm, filterValues, selectedFilters, onFilterChange, onDelete, onClearAll } = props;
  const [selectedFilterName, setSelectedFilterName] = React.useState("");
  const [selectedFilterValue, setSelectedFilterValue] = React.useState("");
  const boxOptions = filterValues[selectedFilterName] || [];

  const handleValueChange = React.useCallback(
    (value) => {
      setSelectedFilterValue(value);
      if (selectedFilterName !== "" && value !== "") {
        const filterExists = selectedFilters.some(
          (filter) => filter.name === selectedFilterName && filter.value === value
        );
        if (!filterExists) {
          onFilterChange({
            name: selectedFilterName,
            value: value,
          });
        }
      }
      setTimeout(() => {
        setSelectedFilterValue("");
      }, 0);
    },
    [selectedFilterName, selectedFilters, onFilterChange]
  );

  return (
    <Stack direction="vertical" className="mb-2" gap="2">
      <Stack alignment="start" gap="1">
        <Stack gap="1">
          <Select
            className="w-48"
            label="Filter"
            value={selectedFilterName}
            onChange={(value) => setSelectedFilterName(value)}
          >
            {Object.values(filterTypes).map(({ key, label }) => (
              <SelectOption key={key} value={key}>
                {label}
              </SelectOption>
            ))}
          </Select>
          <ComboBox
            disabled={!selectedFilterName}
            className="w-80"
            value={selectedFilterValue}
            onChange={(value) => handleValueChange(value)}
          >
            {boxOptions.map((value) => (
              <ComboBoxOption key={value} value={value}>
                {t(value)}
              </ComboBoxOption>
            ))}
          </ComboBox>
        </Stack>
        <Button label="Clear all" onClick={onClearAll} />
        <Stack className="ml-auto" gap="2">
          <DebouncedSearchInput
            styling="w-64"
            initialValue={searchTerm}
            onChange={(value) => onFilterChange({ name: SEARCH_TERM, value: value })}
            delay={300}
          />
        </Stack>
      </Stack>
      <Stack gap="2" wrap={true}>
        {selectedFilters?.map((filter) => (
          <Pill
            key={`${filter.name}:${filter.value}`}
            closeable
            pillKey={filter.name}
            pillValue={filter.value}
            onClose={() => onDelete(filter)}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default BaseFilter;
