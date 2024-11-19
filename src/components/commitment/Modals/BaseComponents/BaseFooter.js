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
import {
  Button,
  ButtonRow,
  ModalFooter,
} from "@cloudoperators/juno-ui-components";

const BaseFooter = (props) => {
  const {
    disabled = false,
    onModalClose = () => {},
    variant = "primary",
    guardFns = [() => {}],
    actionFn = () => {
      return;
    },
  } = props;

  function onConfirm() {
    for (const guardFn of guardFns) {
      if (typeof guardFn !== "function") return;
      if (!guardFn()) {
        return;
      }
    }
    actionFn();
  }

  return (
    <ModalFooter className="justify-end">
      <ButtonRow>
        <Button
          data-testid="modalConfirm"
          label="Confirm"
          disabled={disabled}
          variant={variant}
          onClick={() => onConfirm()}
        />
        <Button
          data-testid="modalCancel"
          data-cy="modalCancel"
          label="Cancel"
          variant="subdued"
          onClick={() => onModalClose()}
        />
      </ButtonRow>
    </ModalFooter>
  );
};

export default BaseFooter;
