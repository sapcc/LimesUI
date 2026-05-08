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
  const executionLock = React.useRef(false);
  const [isExecuting, setIsExecuting] = React.useState(false);

  async function onConfirm() {
    if (executionLock.current) return;
    executionLock.current = true;
    setIsExecuting(true);
    for (const guardFn of guardFns) {
      if (typeof guardFn !== "function") {
        executionLock.current = false;
        setIsExecuting(false);
        return;
      }
      if (!guardFn()) {
        executionLock.current = false;
        setIsExecuting(false);
        return;
      }
    }
    try {
      await actionFn();
    } finally {
      executionLock.current = false;
      setIsExecuting(false);
    }
  }

  return (
    <ModalFooter className="justify-end">
      <ButtonRow>
        <Button
          data-testid="modalConfirm"
          label="Confirm"
          disabled={disabled || isExecuting}
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
