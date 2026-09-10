// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import BaseModal, { useModalError } from "./BaseModal";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components";

const renderBaseModal = (props = {}, children = null) => {
  return render(
    <PortalProvider>
      <BaseModal title="Test Modal" open={true} {...props}>
        {children || <div data-testid="modalContent">Modal Content</div>}
      </BaseModal>
    </PortalProvider>
  );
};

// Helper component that uses the context to trigger errors
const ErrorTrigger = ({ errorMessage }) => {
  const { setError } = useModalError();
  return (
    <button data-testid="triggerError" onClick={() => setError(errorMessage)}>
      Trigger Error
    </button>
  );
};

describe("BaseModal", () => {
  test("renders modal with children", () => {
    renderBaseModal();
    expect(screen.getByTestId("modalContent")).toBeInTheDocument();
  });

  test("does not display error message initially", () => {
    renderBaseModal();
    expect(screen.queryByTestId("modalError")).not.toBeInTheDocument();
  });

  test("displays error when setError is called via context", async () => {
    const errorMessage = "API Error: Something went wrong";
    renderBaseModal({}, <ErrorTrigger errorMessage={errorMessage} />);

    expect(screen.queryByTestId("modalError")).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByTestId("triggerError"));
    });

    expect(screen.getByTestId("modalError")).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test("error is dismissible", async () => {
    const errorMessage = "Dismissible Error";
    renderBaseModal({}, <ErrorTrigger errorMessage={errorMessage} />);

    // Trigger the error
    await act(async () => {
      fireEvent.click(screen.getByTestId("triggerError"));
    });
    expect(screen.getByTestId("modalError")).toBeInTheDocument();

    // Find and click the dismiss button within the error message
    const errorElement = screen.getByTestId("modalError");
    const dismissButton = errorElement.querySelector("button");
    await act(async () => {
      fireEvent.click(dismissButton);
    });

    expect(screen.queryByTestId("modalError")).not.toBeInTheDocument();
  });
});

describe("useModalError", () => {
  test("throws error when used outside BaseModal", () => {
    // Suppress console.error for this test since we expect an error
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<ErrorTrigger errorMessage="test" />);
    }).toThrow("useModalError must be used within a BaseModal");

    consoleSpy.mockRestore();
  });
});
