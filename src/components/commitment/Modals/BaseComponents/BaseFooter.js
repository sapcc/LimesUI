// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Button, ButtonRow, ModalFooter } from "@cloudoperators/juno-ui-components";

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
