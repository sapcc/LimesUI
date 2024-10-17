import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@cloudoperators/juno-ui-components";
import useConfirmInput from "./useConfirmInput";

const UseExampleCmp = ({ subText, disabled = false }) => {
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({
    confirmationText: subText,
  });

  function onInputConfirm() {
    return checkInput();
  }

  return (
    <>
      <ConfirmInput subText={subText} disabled={disabled} {...inputProps} />
      <Button
        data-testid="confirmButton"
        label="confirm"
        onClick={() => {
          onInputConfirm();
        }}
      />
    </>
  );
};

describe("check hook", () => {
  test("invalid inputs", () => {
    render(<UseExampleCmp subText="testInput" />);
    const input = screen.getByTestId(/confirmInput/i);
    const confirmButton = screen.getByTestId(/confirmButton/i);
    expect(input).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "123" } });
    fireEvent.click(confirmButton);
    const errorText = screen.getByText(
      /Please enter the highlighted term above./i
    );
    expect(errorText).toBeInTheDocument();
  });

  test("valid inputs", () => {
    render(<UseExampleCmp subText="testInput" />);
    const input = screen.getByTestId(/confirmInput/i);
    const confirmButton = screen.getByTestId(/confirmButton/i);
    expect(input).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "testInput" } });
    fireEvent.click(confirmButton);
    const error = screen.queryByText(
      /Please enter the highlighted term above./i
    );
    expect(error).toBeNull();
  });

  test("enabled input", () => {
    render(<UseExampleCmp subText="testInput" />);
    const input = screen.getByTestId(/confirmInput/i);
    expect(input).not.toBeDisabled();
  });

  test("disabled input", () => {
    render(<UseExampleCmp subText="testInput" disabled={true} />);
    const input = screen.getByTestId(/confirmInput/i);
    expect(input).toBeDisabled();
  });
});
