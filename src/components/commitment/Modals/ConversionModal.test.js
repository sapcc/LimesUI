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
        from: 2,
        to: 1,
        target_service: "targetServiceA",
        target_resource: "targetResourceC",
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

// Categories for tests without units (unitless resources)
const categoriesUnitless = {
  targetServiceA: {
    serviceType: "targetServiceA",
    resources: [{ name: "targetResourceA", unit: "" }],
  },
  targetServiceB: {
    serviceType: "targetServiceB",
    resources: [{ name: "targetResourceB", unit: "" }],
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
            categories={categoriesUnitless}
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

    // An empty conversion list leads to a disabled input
    const emptyConversionResult = { data: { conversions: [] } };
    cleanup();
    render(
      <StoreProvider>
        <PortalProvider>
          <ConversionModal
            title="Convert Commitment"
            subText="Convert"
            commitment={commitment}
            categories={categoriesUnitless}
            conversionResults={emptyConversionResult}
            onModalClose={() => {}}
            onConvert={onConvert}
          />
        </PortalProvider>
      </StoreProvider>
    );
    expect(screen.getByTestId("conversionSelect")).toBeDisabled();
  });

  test("disable input field if the commitment amount does not fit the conversion ratio", async () => {
    const commitment = { ...initialCommitmentObject };
    commitment.amount = 2;
    commitment.duration = "1 year";
    commitment.resource_name = "resourceA";

    render(
      <StoreProvider>
        <PortalProvider>
          <ConversionModal
            title="Convert Commitment"
            subText="Convert"
            commitment={commitment}
            categories={categoriesUnitless}
            conversionResults={conversionResults}
            onModalClose={() => {}}
            onConvert={() => {}}
          />
        </PortalProvider>
      </StoreProvider>
    );

    const targetInput = screen.getByTestId("conversionSelect");
    const conversionInput = screen.getByTestId("conversionInput");
    const confirmInput = screen.getByTestId("confirmInput");
    const confirmButton = screen.getByTestId("modalConfirm");

    // Select a conversion with ratio (3:2). Commitment does not fit.
    fireEvent.click(targetInput);
    const nonFittingOption = screen.getByTestId("targetResourceA");
    fireEvent.click(nonFittingOption);

    await waitFor(() => {
      expect(conversionInput).toBeDisabled();
    });
    await waitFor(() => {
      expect(screen.getByText(/insufficient amount for conversion/i)).toBeInTheDocument();
    });
    expect(confirmInput).toBeDisabled();
    expect(confirmButton).toBeDisabled();

    // Select a conversion ratio (1:3). Commitment fits.
    fireEvent.click(targetInput);
    const fittingOption = screen.getByTestId("targetResourceB");
    fireEvent.click(fittingOption);
    await waitFor(() => {
      expect(screen.getByText(/target amount: 6/i)).toBeInTheDocument();
    });
    expect(confirmInput).not.toBeDisabled();
    expect(confirmButton).not.toBeDisabled();
  });

  test("fallback to API provided values when target unit can not be determined", async () => {
    const onConvert = jest.fn();
    const commitment = { ...initialCommitmentObject };
    commitment.amount = 10;
    commitment.duration = "1 year";
    commitment.resource_name = "resourceA";
    // No categories or resources are provided.
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
    fireEvent.click(targetInput);
    const conversion1 = screen.getByTestId("targetResourceA");
    fireEvent.click(conversion1);

    // Without categories the target unit is null. Bare numbers from the API are displayed
    await waitFor(() => {
      expect(screen.getByText(/target amount: 6/i)).toBeInTheDocument();
    });
    // Conversion ratio should also show bare numbers
    expect(screen.getByText(/3 : 2/i)).toBeInTheDocument();
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
            categories={categoriesUnitless}
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

    // Non-fitting conversion amount.
    fireEvent.change(conversionInput, { target: { value: 2 } });
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid amount./i)).toBeInTheDocument();
    });

    // Value: 0 should not disable the input field - only a insufficient commitment amount should.
    fireEvent.change(conversionInput, { target: { value: 0 } });
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid amount./i)).toBeInTheDocument();
    });
    expect(conversionInput).not.toBeDisabled();
    expect(confirmInput).toBeDisabled();

    // Fitting conversion amount.
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
    const categoriesWithUnit = {
      targetServiceA: {
        serviceType: "targetServiceA",
        resources: [{ name: "targetResourceA", unit: "GiB" }],
      },
    };

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
            categories={categoriesWithUnit}
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
      expect(screen.getByText(/target amount: 4 GiB/i)).toBeInTheDocument(); // 4096 * (1 / 1024)
    });
    expect(conversionInput).toHaveValue("4 GiB");
    expect(screen.getByText("1 GiB : 1 GiB")).toBeInTheDocument();

    // Handle a unit format error
    fireEvent.change(conversionInput, { target: { value: "4096" } });
    await waitFor(() => {
      expect(screen.getByText(/syntax/i)).toBeInTheDocument();
    });
    expect(conversionInput).not.toBeDisabled();
    expect(confirmInput).toBeDisabled();

    // Invalid conversion amount (4095 is not divisible by 1024)
    fireEvent.change(conversionInput, { target: { value: "4095 MiB" } });
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid amount./i)).toBeInTheDocument();
    });

    // Valid conversion amount (4096 is divisible by 1024)
    fireEvent.change(conversionInput, { target: { value: "4096 MiB" } });
    await waitFor(() => {
      expect(screen.getByText(/target amount: 4 GiB/i)).toBeInTheDocument();
    });
    fireEvent.change(confirmInput, { target: { value: "convert" } });
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(onConvert).toHaveBeenCalled();
    });
  });

  test("conversion with non standard unit", async () => {
    // Converting a commitment with unit: 64 GiB to another resource with unit: 128 GiB and a conversion ratio of (2:1)
    const categoriesWithNonStandardUnit = {
      targetServiceA: {
        serviceType: "targetServiceA",
        resources: [{ name: "targetResourceC", unit: "128 GiB" }],
      },
    };

    const onConvert = jest.fn((commitment, payload) => {
      expect(commitment.amount).toEqual(5);
      expect(payload.commitment.target_service).toEqual("targetServiceA");
      expect(payload.commitment.target_resource).toEqual("targetResourceC");
      expect(payload.commitment.source_amount).toEqual(4);
      expect(payload.commitment.target_amount).toEqual(2);
    });

    const commitment = { ...initialCommitmentObject };
    commitment.amount = 5;
    commitment.unit = "64 GiB";
    commitment.duration = "1 year";
    commitment.resource_name = "resourceC";
    render(
      <StoreProvider>
        <PortalProvider>
          <ConversionModal
            title="Convert Commitment"
            subText="Convert"
            commitment={commitment}
            categories={categoriesWithNonStandardUnit}
            conversionResults={conversionResults}
            onModalClose={() => {}}
            onConvert={onConvert}
          />
        </PortalProvider>
      </StoreProvider>
    );
    expect(screen.getByText("320 GiB")).toBeInTheDocument(); // source amount: 5 * 64 GiB

    const targetInput = screen.getByTestId("conversionSelect");
    const conversionInput = screen.getByTestId("conversionInput");
    const confirmInput = screen.getByTestId("confirmInput");
    const confirmButton = screen.getByTestId("modalConfirm");
    fireEvent.click(targetInput);
    const conversion1 = screen.getByTestId("targetResourceC");
    fireEvent.click(conversion1);
    await waitFor(() => {
      expect(screen.getByText(/target amount: 256 GiB \(2 \* 128 GiB\)/i)).toBeInTheDocument(); // 4 * 64 GiB will be converted
    });

    // Check the pre-determined conversion amount
    expect(conversionInput).toHaveValue("4");

    // Unit formatting for non-standard unit shows the ratio of "2" instead of "64 GiB"
    expect(screen.getByText(/2 : 1/i)).toBeInTheDocument();

    // Invalid conversion amount
    fireEvent.change(conversionInput, { target: { value: 6 } });
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid amount./i)).toBeInTheDocument();
    });

    // Return to a valid conversion amount.
    fireEvent.change(conversionInput, { target: { value: 4 } });
    await waitFor(() => {
      expect(screen.getByText(/target amount: 256 GiB \(2 \* 128 GiB\)/i)).toBeInTheDocument();
    });
    fireEvent.change(confirmInput, { target: { value: "convert" } });
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(onConvert).toHaveBeenCalled();
    });
  });

  test("conversion with rounding: flavor to hw_version memory with non-standard unit", async () => {
    // Converting a flavor-based resource (unitless) to hw_version memory (128 GiB unit)
    const conversionResults = {
      data: {
        conversions: [
          {
            from: 3,
            to: 2,
            target_service: "serviceA",
            target_resource: "hw_version_2150_ram",
          },
        ],
      },
    };
    const categories = {
      serviceA: {
        serviceType: "serviceA",
        resources: [
          { name: "hw_version_2150_ram", unit: "128 GiB" },
          { name: "flavor_1234", unit: "" },
        ],
      },
    };
    const onConvert = jest.fn((commitment, payload) => {
      expect(commitment.amount).toEqual(10);
      expect(payload.commitment.target_service).toEqual("serviceA");
      expect(payload.commitment.target_resource).toEqual("hw_version_2150_ram");
      expect(payload.commitment.source_amount).toEqual(7);
      expect(payload.commitment.target_amount).toEqual(4); // floor(7 * 2 / 3) = floor(4.66) = 4
    });
    const commitment = { ...initialCommitmentObject };
    commitment.amount = 10;
    commitment.unit = ""; // unitless flavor resource
    commitment.duration = "1 year";
    commitment.resource_name = "flavor_1234";
    render(
      <StoreProvider>
        <PortalProvider>
          <ConversionModal
            title="Convert Commitment"
            subText="Convert"
            commitment={commitment}
            categories={categories}
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
    const conversionOption = screen.getByTestId("RAM (2150)");
    fireEvent.click(conversionOption);

    // Conversion with rounding allows any amount to convert. The initial value should be the full commitment amount (10)
    await waitFor(() => {
      expect(conversionInput).toHaveValue("10");
    });
    await waitFor(() => {
      expect(screen.getByText(/target amount: 768 GiB \(6 \* 128 GiB\)/i)).toBeInTheDocument(); // floor(10 * 2 / 3) = 6
    });

    // Change source amount - should still be valid
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

  test("conversion with unit change only: MiB to GiB", async () => {
    // Converting memory from MiB to GiB with ratio (1024:1)
    const unitConversionResults = {
      data: {
        conversions: [
          {
            from: 1024,
            to: 1,
            target_service: "serviceA",
            target_resource: "ram_category_x",
          },
        ],
      },
    };
    const categories = {
      serviceA: {
        serviceType: "serviceA",
        resources: [{ name: "ram_category_x", unit: "GiB" }],
      },
    };
    const onConvert = jest.fn((commitment, payload) => {
      expect(commitment.amount).toEqual(4096); // 4096 MiB
      expect(payload.commitment.target_service).toEqual("serviceA");
      expect(payload.commitment.target_resource).toEqual("ram_category_x");
      expect(payload.commitment.source_amount).toEqual(2048); // 2048 MiB
      expect(payload.commitment.target_amount).toEqual(2); // 2 GiB
    });
    const commitment = { ...initialCommitmentObject };
    commitment.amount = 4096; // 4096 MiB = 4 GiB
    commitment.unit = "MiB";
    commitment.duration = "1 year";
    commitment.resource_name = "ram";
    render(
      <StoreProvider>
        <PortalProvider>
          <ConversionModal
            title="Convert Commitment"
            subText="Convert"
            commitment={commitment}
            categories={categories}
            conversionResults={unitConversionResults}
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
    const conversionOption = screen.getByTestId("ram_category_x");
    fireEvent.click(conversionOption);

    // Initial value should be the maximum convertible amount: floor(4096/1024) * 1024 = 4096 MiB
    await waitFor(() => {
      expect(conversionInput).toHaveValue("4 GiB"); // 4096 MiB formatted as GiB
    });
    await waitFor(() => {
      expect(screen.getByText(/target amount: 4 GiB/i)).toBeInTheDocument();
    });

    // Change to 2 GiB (2048 MiB)
    fireEvent.change(conversionInput, { target: { value: "2 GiB" } });
    await waitFor(() => {
      expect(screen.getByText(/target amount: 2 GiB/i)).toBeInTheDocument();
    });

    // Invalid amount (not divisible by 1024)
    fireEvent.change(conversionInput, { target: { value: "1500 MiB" } });
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid amount./i)).toBeInTheDocument();
    });

    // Enter a valid conversion amount again
    fireEvent.change(conversionInput, { target: { value: "2 GiB" } });
    await waitFor(() => {
      expect(screen.getByText(/target amount: 2 GiB/i)).toBeInTheDocument();
    });

    fireEvent.change(confirmInput, { target: { value: "convert" } });
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(onConvert).toHaveBeenCalled();
    });
  });
});
