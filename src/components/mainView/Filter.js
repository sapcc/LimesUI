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
import DebouncedSearchInput from "../shared/DebouncedSearchInput";

const Filter = (props) => {
  const { searchTerm, filterOptions, selectedFilters, onChange, onDelete, onClearAll } = props;
  const [selectedFilterName, setSelectedFilterName] = React.useState("");
  const [selectedFilterValue, setSelectedFilterValue] = React.useState("");
  const comboBoxOptions = selectedFilterName ? filterOptions[selectedFilterName] || [] : [];
  const selectedValuesForType = selectedFilters.filter((f) => f.name === selectedFilterName).map((f) => f.value);

  const availableOptions = comboBoxOptions.filter((opt) => !selectedValuesForType.includes(opt));

  const handleValueChange = React.useCallback(
    (value) => {
      setSelectedFilterValue(value);
      if (selectedFilterName !== "" && value !== "") {
        onChange({
          name: selectedFilterName,
          value: value,
        });
      }
      setTimeout(() => {
        setSelectedFilterValue("");
      }, 0);
    },
    [selectedFilterName, setSelectedFilterName, onChange]
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
            <SelectOption value="category">Category</SelectOption>
            <SelectOption value="resource">Resource</SelectOption>
          </Select>
          <ComboBox
            disabled={!selectedFilterName}
            className="w-80"
            value={selectedFilterValue}
            onChange={(value) => handleValueChange(value)}
          >
            {availableOptions.map((value) => (
              <ComboBoxOption key={value} value={value} />
            ))}
          </ComboBox>
        </Stack>
        <Button label="Clear all" onClick={onClearAll} />
        <Stack className="ml-auto" gap="2">
          <DebouncedSearchInput
            styling="w-64"
            initialValue={searchTerm}
            onChange={(value) => onChange({ name: "searchTerm", value: value })}
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

export default Filter;
