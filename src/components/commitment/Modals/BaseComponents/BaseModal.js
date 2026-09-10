// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Modal, Message } from "@cloudoperators/juno-ui-components";

// Context to share error state between BaseModal and BaseFooter
const ModalErrorContext = React.createContext(null);

export const useModalError = () => {
  const context = React.useContext(ModalErrorContext);
  if (!context) {
    throw new Error("useModalError must be used within a BaseModal");
  }
  return context;
};

/**
 * BaseModal - A wrapper around Juno Modal that provides built-in error display.
 * Manages error state internally via context, which BaseFooter can access.
 * When an error occurs, it displays a dismissible Message component
 * at the top of the modal content.
 */
const BaseModal = (props) => {
  const { children, ...modalProps } = props;
  const [error, setError] = React.useState(null);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  const contextValue = React.useMemo(() => ({ error, setError, clearError }), [error, clearError]);

  return (
    <ModalErrorContext.Provider value={contextValue}>
      <Modal {...modalProps}>
        {error && (
          <Message
            className={"overflow-x-scroll"}
            data-testid="modalError"
            variant="error"
            dismissible={true}
            onDismiss={clearError}
            text={error}
          />
        )}
        {children}
      </Modal>
    </ModalErrorContext.Provider>
  );
};

export default BaseModal;
