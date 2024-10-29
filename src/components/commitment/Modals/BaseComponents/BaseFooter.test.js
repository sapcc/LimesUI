import React from "react";
import BaseFooter from "./BaseFooter";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "@cloudoperators/juno-ui-components";
import { PortalProvider } from "@cloudoperators/juno-ui-components";

const UseExampleCmp = ({ guardFns, actionFn, disabled = false }) => {
  return (
    <PortalProvider>
      <Modal
        className="max-h-full"
        title="testCmp"
        open={true}
        modalFooter={
          <BaseFooter
            disabled={disabled}
            guardFns={guardFns}
            actionFn={actionFn}
          />
        }
      ></Modal>
    </PortalProvider>
  );
};

describe("test Footer", () => {
  test("function execution", () => {
    console.log = jest.fn();
    const guardFns = [
      () => {
        return true;
      },
    ];
    const actionFn = () => {
      console.log("actioned");
    };
    render(<UseExampleCmp guardFns={guardFns} actionFn={actionFn} />);
    const button = screen.getByTestId(/modalConfirm/i);
    fireEvent.click(button);
    expect(console.log).toBeCalledWith("actioned");
  });

  test("negative function execution", () => {
    console.log = jest.fn();
    const guardFns = [
      () => {
        return false;
      },
    ];
    const actionFn = () => {
      console.log("actioned");
    };
    render(<UseExampleCmp guardFns={guardFns} actionFn={actionFn} />);
    const button = screen.getByTestId(/modalConfirm/i);
    fireEvent.click(button);
    expect(console.log).not.toBeCalledWith("actioned");
  });

  test("no props and cancel modal", () => {
    render(<UseExampleCmp />);
    const confirm = screen.getByTestId(/modalConfirm/i);
    const close = screen.getByTestId(/modalCancel/i);
    fireEvent.click(confirm);
    expect(confirm).toBeInTheDocument();
    fireEvent.click(close);
    expect(close).toBeInTheDocument();
  });

  test("no action fn input", () => {
    const guardFns = [
      () => {
        return true;
      },
    ];
    render(<UseExampleCmp guardFns={guardFns} />);
    const confirm = screen.getByTestId(/modalConfirm/i);
    fireEvent.click(confirm);
    expect(confirm).toBeInTheDocument();
  });

  test("guardFns contain no function", () => {
    const guardFns = [true];
    render(<UseExampleCmp guardFns={guardFns} />);
    const confirm = screen.getByTestId(/modalConfirm/i);
    fireEvent.click(confirm);
    expect(confirm).toBeInTheDocument();
  });

  test("invalid guardFn input", () => {
    console.log = jest.fn();
    const guardFns = [false];
    const actionFn = () => {
      console.log("actioned");
    };
    render(<UseExampleCmp guardFns={guardFns} actionFn={actionFn} />);
    const button = screen.getByTestId(/modalConfirm/i);
    fireEvent.click(button);
    expect(console.log).not.toHaveBeenCalled();
  });

  test("disabled confirm button", () => {
    console.log = jest.fn();
    const guardFns = [
      () => {
        return true;
      },
    ];
    const actionFn = () => {
      console.log("actioned");
    };
    render(
      <UseExampleCmp guardFns={guardFns} actionFn={actionFn} disabled={true} />
    );
    const button = screen.getByTestId(/modalConfirm/i);
    fireEvent.click(button);
    expect(console.log).not.toHaveBeenCalled();
  });
});
