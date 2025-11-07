// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { PortalProvider, Select } from "@cloudoperators/juno-ui-components";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CommitmentDurationInputLabel from "./CommitmentDurationInputLabel";

describe("test duration input label", () => {
  const selectErrors = console.error.bind(console);
  beforeAll(() => {
    // Junos select requires one string. Because we format the text of our subtexts, a proptype error will be fired.
    // The contents will still be processed by the library, which is why the prop type error gets disabled here.
    console.error = (errormessage) => {
      const suppressedError = errormessage.toString();
      const match = new RegExp("Warning: Failed .+ type").exec(suppressedError)[0];
      !match && selectErrors(errormessage);
    };
  });
  afterAll(() => {
    console.error = selectErrors;
  });

  test("listener should receive label prop", async () => {
    const duration = "1 year";
    const allowedDurations = ["3 days", "1 year"];
    const handleSelect = jest.fn((event) => {
      const { label = "" } = event?.props;
      expect(label).toEqual("rebate");
    });
    render(
      <PortalProvider>
        <Select data-testid="selectID" onChange={(e) => handleSelect(e)}>
          <CommitmentDurationInputLabel
            key={duration}
            index={1}
            allowedDurations={allowedDurations}
            commitmentDuration={duration}
          />
        </Select>
      </PortalProvider>
    );
    const select = screen.getByTestId("selectID");
    fireEvent.click(select);
    await waitFor(() => {
      expect(screen.queryByText(/rebate/i)).not.toBe(null);
    });
    const targetDuration = screen.getByTestId(/commitmentSelectOption\/1/i);
    fireEvent.click(targetDuration);
    await waitFor(() => {
      expect(handleSelect).toHaveBeenCalled();
    });
  });

  test("< 1 year commitment should display reservation text", async () => {
    const duration = "3 days";
    const allowedDurations = ["3 days", "3 years"];
    render(
      <PortalProvider>
        <Select data-testid="selectID">
          <CommitmentDurationInputLabel
            key={duration}
            allowedDurations={allowedDurations}
            commitmentDuration={duration}
          />
        </Select>
      </PortalProvider>
    );
    const select = screen.getByTestId("selectID");
    fireEvent.click(select);
    await waitFor(() => {
      expect(screen.queryByText(/reserved only/i)).not.toBe(null);
    });
  });
  test("> 1 year commitment should display rebate text", async () => {
    const duration = "1 year";
    const allowedDurations = ["3 days", "3 years"];
    render(
      <PortalProvider>
        <Select data-testid="selectID">
          <CommitmentDurationInputLabel
            key={duration}
            allowedDurations={allowedDurations}
            commitmentDuration={duration}
          />
        </Select>
      </PortalProvider>
    );
    const select = screen.getByTestId("selectID");
    fireEvent.click(select);
    await waitFor(() => {
      expect(screen.queryByText(/rebate/i)).not.toBe(null);
    });
  });
  test("no allowed duration < 1 year should not display any labels", async () => {
    const duration = "1 year";
    const allowedDurations = ["1 year", "3 years"];
    render(
      <PortalProvider>
        <Select data-testid="selectID">
          <CommitmentDurationInputLabel
            key={duration}
            allowedDurations={allowedDurations}
            commitmentDuration={duration}
          />
        </Select>
      </PortalProvider>
    );
    const select = screen.getByTestId("selectID");
    fireEvent.click(select);
    await waitFor(() => {
      expect(screen.queryByText(/1 year/i)).not.toBe(null);
      expect(screen.queryByText(/reserved only/i)).toBe(null);
      expect(screen.queryByText(/rebate/i)).toBe(null);
    });
  });
});
