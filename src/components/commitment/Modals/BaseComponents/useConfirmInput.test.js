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
