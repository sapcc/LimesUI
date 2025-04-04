/**
 * Copyright 2024 SAP SE
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
import { Stack, TextInput } from "@cloudoperators/juno-ui-components";

// This implementation style does not create a new instance of the component on every render. It rather passes back the component definition.
// More details: https://dev.to/droopytersen/new-react-hooks-pattern-return-a-component-31bh
const useConfirmInput = ({ confirmationText }) => {
  const inputRef = React.useRef("");
  const [invalidInput, setInvalidInput] = React.useState(false);

  function onInput(e) {
    setInvalidInput(false);
    inputRef.current = e.target.value;
  }

  function checkInput() {
    if (inputRef.current.toLowerCase() !== confirmationText.toLowerCase()) {
      setInvalidInput(true);
      return false;
    }
    return true;
  }

  let inputProps = {
    subText: confirmationText,
    invalidInput,
    onInput,
  };

  return {
    ConfirmInput,
    inputProps,
    invalidInput,
    checkInput,
  };
};

export default useConfirmInput;

const ConfirmInput = (props) => {
  const { disabled = false, subText, invalidInput, onInput } = { ...props };
  return (
    <Stack direction="vertical" alignment="center" className="mb-1 mt-1">
      <div>
        <Stack className={"mt-5"}>
          To confirm, type:&nbsp;
          <span className="font-semibold">{subText}</span>
        </Stack>
        <Stack>
          <TextInput
            data-testid="confirmInput"
            width="auto"
            disabled={disabled}
            errortext={invalidInput && "Please enter the highlighted term above."}
            onChange={(e) => onInput(e)}
          />
        </Stack>
      </div>
    </Stack>
  );
};
