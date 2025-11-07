// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import ForbidAutogrowth from "./ForbidAutogrowth";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useMutation } from "@tanstack/react-query";
import { projectStoreActions } from "../../StoreProvider";
import { PortalProvider } from "@cloudoperators/juno-ui-components/index";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

jest.mock("../../StoreProvider", () => ({
  projectStoreActions: jest.fn(),
}));

describe("ForbidAutogrowth", () => {
  let props;
  let mutation;

  beforeEach(() => {
    mutation = {
      mutate: jest.fn(),
      isLoading: false,
      isError: false,
      error: null,
      reset: jest.fn(),
    };

    useMutation.mockReturnValue(mutation);

    projectStoreActions.mockReturnValue({
      setRefetchProjectAPI: jest.fn(),
    });

    props = {
      resource: {
        name: "test-resource",
        forbid_autogrowth: false,
        max_quota: 100,
        unit: "GB",
      },
      serviceType: "test-service",
      editMode: true,
    };
  });

  test("should open modal on switch click", () => {
    const { getByTestId, getByText } = render(
      <PortalProvider>
        <ForbidAutogrowth {...props} />
      </PortalProvider>
    );

    const switchElement = getByTestId("forbidAutogrowthSwitch");
    fireEvent.click(switchElement);

    expect(getByTestId("forbidAutogrowthSwitch")).toHaveAttribute("aria-checked", "true");
    expect(getByTestId("forbidAutogrowthConfirmText")).toBeInTheDocument();

    const decline = getByText("No");
    fireEvent.click(decline);
    expect(getByTestId("forbidAutogrowthSwitch")).toHaveAttribute("aria-checked", "false");
  });

  test("should call the mutation function on confirm", async () => {
    const { getByTestId, getByText } = render(
      <PortalProvider>
        <ForbidAutogrowth {...props} />
      </PortalProvider>
    );

    const switchElement = getByTestId("forbidAutogrowthSwitch");
    fireEvent.click(switchElement);

    const confirmButton = getByText("Yes");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mutation.mutate).toHaveBeenCalledWith(
        {
          payload: {
            project: {
              services: [
                {
                  type: "test-service",
                  resources: [
                    {
                      name: "test-resource",
                      forbid_autogrowth: true,
                    },
                  ],
                },
              ],
            },
          },
        },
        { onSuccess: expect.any(Function) }
      );
    });
  });

  it("should display an error message if the mutation fails", async () => {
    mutation.isError = true;
    mutation.error = { message: "Error message" };

    const { getByTestId } = render(
      <PortalProvider>
        <ForbidAutogrowth {...props} />
      </PortalProvider>
    );

    const switchElement = getByTestId("forbidAutogrowthSwitch");
    fireEvent.click(switchElement);

    await waitFor(() => {
      expect(getByTestId("forbidAutgrowthError")).toBeInTheDocument();
    });
  });
});
