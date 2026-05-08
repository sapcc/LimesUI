// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import BaseFooter from "./BaseFooter";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { Modal } from "@cloudoperators/juno-ui-components";
import { PortalProvider } from "@cloudoperators/juno-ui-components";

const UseExampleCmp = ({ guardFns, actionFn, disabled = false }) => {
  return (
    <PortalProvider>
      <Modal
        className="max-h-full"
        title="testCmp"
        open={true}
        modalFooter={<BaseFooter disabled={disabled} guardFns={guardFns} actionFn={actionFn} />}
      ></Modal>
    </PortalProvider>
  );
};

describe("test Footer", () => {
  test("function execution", async () => {
    console.log = jest.fn();
    const guardFns = [
      () => {
        return true;
      },
    ];
    const actionFn = jest.fn().mockResolvedValue(undefined);
    render(<UseExampleCmp guardFns={guardFns} actionFn={actionFn} />);
    const button = screen.getByTestId(/modalConfirm/i);
    await act(async () => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      expect(actionFn).toHaveBeenCalled();
    });
  });

  test("negative function execution", async () => {
    const actionFn = jest.fn().mockResolvedValue(undefined);
    const guardFns = [
      () => {
        return false;
      },
    ];
    render(<UseExampleCmp guardFns={guardFns} actionFn={actionFn} />);
    const button = screen.getByTestId(/modalConfirm/i);
    await act(async () => {
      fireEvent.click(button);
    });
    expect(actionFn).not.toHaveBeenCalled();
  });

  test("no props and cancel modal", async () => {
    render(<UseExampleCmp />);
    const confirm = screen.getByTestId(/modalConfirm/i);
    const close = screen.getByTestId(/modalCancel/i);
    await act(async () => {
      fireEvent.click(confirm);
    });
    expect(confirm).toBeInTheDocument();
    fireEvent.click(close);
    expect(close).toBeInTheDocument();
  });

  test("no action fn input", async () => {
    const guardFns = [
      () => {
        return true;
      },
    ];
    render(<UseExampleCmp guardFns={guardFns} />);
    const confirm = screen.getByTestId(/modalConfirm/i);
    await act(async () => {
      fireEvent.click(confirm);
    });
    expect(confirm).toBeInTheDocument();
  });

  test("guardFns contain no function", async () => {
    const guardFns = [true];
    render(<UseExampleCmp guardFns={guardFns} />);
    const confirm = screen.getByTestId(/modalConfirm/i);
    await act(async () => {
      fireEvent.click(confirm);
    });
    expect(confirm).toBeInTheDocument();
  });

  test("invalid guardFn input", async () => {
    const actionFn = jest.fn().mockResolvedValue(undefined);
    const guardFns = [false];
    render(<UseExampleCmp guardFns={guardFns} actionFn={actionFn} />);
    const button = screen.getByTestId(/modalConfirm/i);
    await act(async () => {
      fireEvent.click(button);
    });
    expect(actionFn).not.toHaveBeenCalled();
  });

  test("disabled confirm button", async () => {
    const actionFn = jest.fn().mockResolvedValue(undefined);
    const guardFns = [
      () => {
        return true;
      },
    ];
    render(<UseExampleCmp guardFns={guardFns} actionFn={actionFn} disabled={true} />);
    const button = screen.getByTestId(/modalConfirm/i);
    fireEvent.click(button);
    expect(actionFn).not.toHaveBeenCalled();
  });

  test("multiple rapid clicks only trigger action once", async () => {
    let resolveAction;
    const actionFn = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolveAction = resolve;
      });
    });
    const guardFns = [() => true];
    render(<UseExampleCmp guardFns={guardFns} actionFn={actionFn} />);
    const button = screen.getByTestId(/modalConfirm/i);

    // Simulate rapid multiple clicks
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    // Action should only be called once despite multiple clicks
    expect(actionFn).toHaveBeenCalledTimes(1);
    await act(async () => {
      resolveAction();
    });
  });
});
