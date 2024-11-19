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
import ConversionModal from "./ConversionModal";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { initialCommitmentObject } from "../../../lib/constants";

const conversionResults = {
  data: {
    conversions: [
      {
        from: 3,
        to: 2,
        target_service: "targetServiceA",
        target_resource: "targetResourceA",
      },
      {
        from: 1,
        to: 3,
        target_service: "targetServiceB",
        target_resource: "targetResourceB",
      },
    ],
  },
};

describe("test conversion modal", () => {
  test("successful conversion of maximum amount", async () => {
    const onConvert = jest.fn((commitment, payload) => {
      expect(commitment.amount).toEqual(10);
      expect(payload.commitment.target_amount).toEqual(6);
    });
    const commitment = { ...initialCommitmentObject };
    commitment.amount = 10;
    commitment.duration = "1 year";
    commitment.resource_name = "resourceA";
    render(
      <PortalProvider>
        <ConversionModal
          title="Convert Commitment"
          subText="Convert"
          commitment={commitment}
          conversionResults={conversionResults}
          onModalClose={() => {}}
          onConvert={onConvert}
        />
      </PortalProvider>
    );
    const targetInput = screen.getByTestId("conversionSelect");
    const confirmInput = screen.getByTestId("confirmInput");
    const confirmButton = screen.getByTestId("modalConfirm");
    await waitFor(() => {
        expect(confirmButton).toBeDisabled();
    })
    fireEvent.click(targetInput);
    const conversion2 = screen.getByTestId("targetResourceB");
    fireEvent.click(conversion2);
    await waitFor(() => {
      expect(screen.getByText(/target amount: 30/i)).toBeInTheDocument();
    });
    fireEvent.click(targetInput);
    const conversion1 = screen.getByTestId("targetResourceA");
    fireEvent.click(conversion1);
    await waitFor(() => {
      expect(screen.getByText(/target amount: 6/i)).toBeInTheDocument();
    });
    fireEvent.change(confirmInput, { target: { value: "convert" } });
    fireEvent.click(confirmButton);
    expect(onConvert).toHaveBeenCalled();
  });
  test("successful conversion of custom amount", async () => {
    const onConvert = jest.fn((commitment, payload) => {
      expect(commitment.amount).toEqual(10);
      expect(payload.commitment.target_amount).toEqual(2);
    });
    const commitment = { ...initialCommitmentObject };
    commitment.amount = 10;
    commitment.duration = "1 year";
    commitment.resource_name = "resourceA";
    render(
      <PortalProvider>
        <ConversionModal
          title="Convert Commitment"
          subText="Convert"
          commitment={commitment}
          conversionResults={conversionResults}
          onModalClose={() => {}}
          onConvert={onConvert}
        />
      </PortalProvider>
    );
    const targetInput = screen.getByTestId("conversionSelect");
    const conversionInput = screen.getByTestId("conversionInput");
    const confirmInput = screen.getByTestId("confirmInput");
    const confirmButton = screen.getByTestId("modalConfirm");
    fireEvent.click(targetInput);
    const conversion1 = screen.getByTestId("targetResourceA");
    fireEvent.click(conversion1);
    await waitFor(() => {
      expect(screen.getByText(/target amount: 6/i)).toBeInTheDocument();
    });
    fireEvent.change(conversionInput, { target: { value: 2 } });
    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid amount./i)
      ).toBeInTheDocument();
    });
    fireEvent.change(conversionInput, { target: { value: 3 } });
    await waitFor(() => {
      expect(screen.getByText(/target amount: 2/i)).toBeInTheDocument();
    });
    fireEvent.change(confirmInput, { target: { value: "convert" } });
    fireEvent.click(confirmButton);
    expect(onConvert).toHaveBeenCalled();
  });
});
