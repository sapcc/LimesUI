// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Stack, TextInput } from "@cloudoperators/juno-ui-components";
import { createUnit } from "../../lib/unit";

const InputWithUnit = (props) => {
  const {
    unit = createUnit(""),
    inputRef = { current: "" },
    onChange = () => {},
    invalid = false,
    errorText = "",
    ...textInputProps
  } = props;
  const inputValue = inputRef.current;
  const [displayValue, setDisplayValue] = React.useState(inputValue);

  function handleChange(e) {
    if (inputRef) {
      inputRef.current = e.target.value;
      setDisplayValue(e.target.value);
    }
    onChange(e);
  }

  function getUnitConversion(input) {
    if (!unit) return input;
    const parsed = unit.parse(input);
    if (parsed?.error) {
      return 0;
    }
    return unit.format(input);
  }

  return (
    <Stack direction="vertical">
      <TextInput
        data-testid="inputWithUnit"
        value={displayValue}
        onChange={handleChange}
        errortext={invalid && errorText}
        {...textInputProps}
      />
      {unit && !unit.isStandardUnit && (
        <div data-testid="inputWithUnitInfo" className="mt-1 whitespace-nowrap text-xs text-sap-grey-4">
          {`Amount: ${getUnitConversion(displayValue)}`}
        </div>
      )}
    </Stack>
  );
};

export default InputWithUnit;
