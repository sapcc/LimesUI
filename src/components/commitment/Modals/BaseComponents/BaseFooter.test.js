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
        modalFooter={<BaseFooter disabled={disabled} guardFns={guardFns} actionFn={actionFn} />}
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
    expect(console.log).toHaveBeenCalledWith("actioned");
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
    expect(console.log).not.toHaveBeenCalledWith("actioned");
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
    render(<UseExampleCmp guardFns={guardFns} actionFn={actionFn} disabled={true} />);
    const button = screen.getByTestId(/modalConfirm/i);
    fireEvent.click(button);
    expect(console.log).not.toHaveBeenCalled();
  });
});
