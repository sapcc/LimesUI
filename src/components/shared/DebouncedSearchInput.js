// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@cloudoperators/juno-ui-components";

const DebouncedSearchInput = ({ onChange, initialValue = "", delay = 300, styling = "" }) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const debounceHandler = setTimeout(() => {
      onChange(inputValue);
    }, delay);

    return () => {
      clearTimeout(debounceHandler);
    };
  }, [inputValue, delay]);

  return (
    <SearchInput
      className={styling}
      data-testid="Search"
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
      onClear={() => {
        setInputValue("");
      }}
    />
  );
};

export default DebouncedSearchInput;
