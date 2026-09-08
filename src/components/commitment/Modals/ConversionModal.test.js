// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import ConversionModal from "./ConversionModal";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { initialCommitmentObject } from "../../../lib/constants";
import StoreProvider from "../../StoreProvider";

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

const conversionResultWithUnit = {
  data: {
    conversions: [
      {
        from: 1024,
        to: 1,
        target_service: "targetServiceA",
        target_resource: "targetResourceA",
      },
    ],
  },
};

describe("test conversion modal", () => {
  test("successful conversion of maximum amount", async () => {
    const onConvert = jest.fn((commitment, payload) => {
      expect(payload.commitment.target_service).toEqual("targetServiceA");
      expect(payload.commitment.target_resource).toEqual("targetResourceA");
      expect(commitment.amount).toEqual(10);
      expect(payload.commitment.target_amount).toEqual(6);
    });
    const commitment = { ...initialCommitmentObject };
    commitment.amount = 10;
    commitment.duration = "1 year";
    commitment.resource_name = "resourceA";
    render(
      <StoreProvider>
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
      </StoreProvider>
    );
    const targetInput = screen.getByTestId("conversionSelect");
    const confirmInput = screen.getByTestId("confirmInput");
    const confirmButton = screen.getByTestId("modalConfirm");
    expect(targetInput).not.toBeDisabled();
    await waitFor(() => {
      expect(confirmButton).toBeDisabled();
    });
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

    // an empty conversion list leads to a disabled input
    const emptyConversionResult = { data: { conversions: [] } };
    cleanup();
    render(
      <StoreProvider>
        <PortalProvider>
          <ConversionModal
            title="Convert Commitment"
            subText="Convert"
            commitment={commitment}
            conversionResults={emptyConversionResult}
            onModalClose={() => {}}
            onConvert={onConvert}
          />
        </PortalProvider>
      </StoreProvider>
    );
    expect(screen.getByTestId("conversionSelect")).toBeDisabled();
  });
  test("successful conversion of custom amount", async () => {
    const onConvert = jest.fn((commitment, payload) => {
      expect(commitment.amount).toEqual(10);
      expect(payload.commitment.source_amount).toEqual(3);
      expect(payload.commitment.target_amount).toEqual(2);
    });
    const commitment = { ...initialCommitmentObject };
    commitment.amount = 10;
    commitment.duration = "1 year";
    commitment.resource_name = "resourceA";
    render(
      <StoreProvider>
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
      </StoreProvider>
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
      expect(screen.getByText(/please enter a valid amount./i)).toBeInTheDocument();
    });
    fireEvent.change(conversionInput, { target: { value: 3 } });
    await waitFor(() => {
      expect(screen.getByText(/target amount: 2/i)).toBeInTheDocument();
    });
    fireEvent.change(confirmInput, { target: { value: "convert" } });
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(onConvert).toHaveBeenCalled();
    });
  });

  test("conversion with unit", async () => {
    const onConvert = jest.fn((commitment, payload) => {
      expect(commitment.amount).toEqual(4096);
      expect(payload.commitment.target_service).toEqual("targetServiceA");
      expect(payload.commitment.target_resource).toEqual("targetResourceA");
      expect(payload.commitment.source_amount).toEqual(4096);
      expect(payload.commitment.target_amount).toEqual(4);
    });
    const commitment = { ...initialCommitmentObject };
    commitment.amount = 4096;
    commitment.unit = "MiB";
    commitment.duration = "1 year";
    commitment.resource_name = "resourceA";
    render(
      <StoreProvider>
        <PortalProvider>
          <ConversionModal
            title="Convert Commitment"
            subText="Convert"
            commitment={commitment}
            conversionResults={conversionResultWithUnit}
            onModalClose={() => {}}
            onConvert={onConvert}
          />
        </PortalProvider>
      </StoreProvider>
    );
    expect(screen.getByText("4 GiB")).toBeInTheDocument();

    const targetInput = screen.getByTestId("conversionSelect");
    const conversionInput = screen.getByTestId("conversionInput");
    const confirmInput = screen.getByTestId("confirmInput");
    const confirmButton = screen.getByTestId("modalConfirm");
    fireEvent.click(targetInput);
    const conversion1 = screen.getByTestId("targetResourceA");
    fireEvent.click(conversion1);
    await waitFor(() => {
      expect(screen.getByText(/target amount: 4 MiB/i)).toBeInTheDocument(); // 4096 * (1 / 1024)
    });
    expect(conversionInput).toHaveValue("4 GiB");
    expect(screen.getByText("1 GiB : 1 MiB")).toBeInTheDocument();

    // invalid conversion amount (4095 is not divisible by 1024)
    fireEvent.change(conversionInput, { target: { value: "4095 MiB" } });
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid amount./i)).toBeInTheDocument();
    });
    fireEvent.change(conversionInput, { target: { value: "4096 MiB" } });
    await waitFor(() => {
      expect(screen.getByText(/target amount: 4 MiB/i)).toBeInTheDocument();
    });
    fireEvent.change(confirmInput, { target: { value: "convert" } });
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(onConvert).toHaveBeenCalled();
    });
  });

  test("conversion with non standard unit", async () => {
    const onConvert = jest.fn((commitment, payload) => {
      expect(commitment.amount).toEqual(5);
      expect(payload.commitment.target_service).toEqual("targetServiceA");
      expect(payload.commitment.target_resource).toEqual("targetResourceA");
      expect(payload.commitment.source_amount).toEqual(3);
      expect(payload.commitment.target_amount).toEqual(2);
    });
    const commitment = { ...initialCommitmentObject };
    commitment.amount = 5;
    commitment.unit = "128 GiB";
    commitment.duration = "1 year";
    commitment.resource_name = "resourceA";
    render(
      <StoreProvider>
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
      </StoreProvider>
    );
    expect(screen.getByText("640 GiB")).toBeInTheDocument();
    const targetInput = screen.getByTestId("conversionSelect");
    const conversionInput = screen.getByTestId("conversionInput");
    const confirmInput = screen.getByTestId("confirmInput");
    const confirmButton = screen.getByTestId("modalConfirm");
    fireEvent.click(targetInput);
    const conversion1 = screen.getByTestId("targetResourceA");
    fireEvent.click(conversion1);
    await waitFor(() => {
      expect(screen.getByText(/target amount: 256 GiB \(2 \* 128 GiB\)/i)).toBeInTheDocument(); // 2 * 128 GiB will be converted
    });
    expect(conversionInput).toHaveValue("3");
    // invalid conversion amount
    fireEvent.change(conversionInput, { target: { value: 6 } });
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid amount./i)).toBeInTheDocument();
    });
    fireEvent.change(conversionInput, { target: { value: 3 } });
    await waitFor(() => {
      expect(screen.getByText(/target amount: 256 GiB \(2 \* 128 GiB\)/i)).toBeInTheDocument();
    });
    fireEvent.change(confirmInput, { target: { value: "convert" } });
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(onConvert).toHaveBeenCalled();
    });
  });

  test("complex conversion", async () => {
    // target allows any source amount with rounding down the target amount.
    // Note: hwVersionScaleRx requires a digit after "215" (e.g., hw_version_2150_ram)
    const complexConversionResults = {
      data: {
        conversions: [
          {
            from: 3,
            to: 2,
            target_service: "compute",
            target_resource: "hw_version_2150_ram",
          },
        ],
      },
    };
    const categories = {
      compute: {
        serviceType: "compute",
        resources: [
          { name: "hw_version_2150_ram", unit: "128 GiB" },
          { name: "ram", unit: "GiB" },
        ],
      },
    };
    const onConvert = jest.fn((commitment, payload) => {
      expect(commitment.amount).toEqual(10);
      expect(payload.commitment.target_service).toEqual("compute");
      expect(payload.commitment.target_resource).toEqual("hw_version_2150_ram");
      expect(payload.commitment.source_amount).toEqual(7);
      expect(payload.commitment.target_amount).toEqual(4); // floor(7 * 2 / 3) = floor(4.66) = 4
    });
    const commitment = { ...initialCommitmentObject };
    commitment.amount = 10;
    commitment.duration = "1 year";
    commitment.resource_name = "cores";
    render(
      <StoreProvider>
        <PortalProvider>
          <ConversionModal
            title="Convert Commitment"
            subText="Convert"
            commitment={commitment}
            categories={categories}
            conversionResults={complexConversionResults}
            onModalClose={() => {}}
            onConvert={onConvert}
          />
        </PortalProvider>
      </StoreProvider>
    );
    const targetInput = screen.getByTestId("conversionSelect");
    const conversionInput = screen.getByTestId("conversionInput");
    const confirmInput = screen.getByTestId("confirmInput");
    const confirmButton = screen.getByTestId("modalConfirm");

    fireEvent.click(targetInput);
    const conversionOption = screen.getByTestId("RAM (2150)");
    fireEvent.click(conversionOption);

    // Complex conversion allows any amount, so initial value should be full commitment amount (10)
    await waitFor(() => {
      expect(conversionInput).toHaveValue("10");
    });
    await waitFor(() => {
      expect(screen.getByText(/target amount: 768 GiB \(6 \* 128 GiB\)/i)).toBeInTheDocument(); // floor(10 * 2 / 3) = 6
    });

    // Change source amount - should still be valid for complex conversion
    fireEvent.change(conversionInput, { target: { value: 7 } });
    await waitFor(() => {
      expect(screen.getByText(/target amount: 512 GiB \(4 \* 128 GiB\)/i)).toBeInTheDocument(); // floor(7 * 2 / 3) = 4
    });
    expect(screen.queryByText(/please enter a valid amount./i)).not.toBeInTheDocument();

    // Amount that would round to 0 should be invalid
    fireEvent.change(conversionInput, { target: { value: 1 } });
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid amount./i)).toBeInTheDocument(); // floor(1 * 2 / 3) = 0
    });

    // Enter a valid amount again
    fireEvent.change(conversionInput, { target: { value: 7 } });
    await waitFor(() => {
      expect(screen.getByText(/target amount: 512 GiB \(4 \* 128 GiB\)/i)).toBeInTheDocument();
    });

    fireEvent.change(confirmInput, { target: { value: "convert" } });
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(onConvert).toHaveBeenCalled();
    });
  });
});
