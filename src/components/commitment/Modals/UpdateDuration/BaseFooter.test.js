import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "@cloudoperators/juno-ui-components";
import BaseFooter from "./BaseFooter";

const UseExampleCmp = ({ guardFns, actionFn, disabled = false }) => {
  return (
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
    const button = screen.getByText(/confirm/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(console.log).toBeCalledWith("actioned");
  });

  test("invalid guardFn input", () => {
    console.log = jest.fn();
    const guardFns = [false];
    const actionFn = () => {
      console.log("actioned");
    };
    render(<UseExampleCmp guardFns={guardFns} actionFn={actionFn} />);
    const button = screen.getByText(/confirm/i);
    expect(button).toBeInTheDocument();
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
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(console.log).not.toHaveBeenCalled();
  });
});
