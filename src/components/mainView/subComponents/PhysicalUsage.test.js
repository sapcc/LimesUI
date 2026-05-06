// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import PhysicalUsage from "./PhysicalUsage";
import { render, screen } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components/index";

describe("renders for snapshot_capacity resource", () => {
  test("should display physical usage when physical_usage is present", () => {
    const props = {
      resource: {
        name: "snapshot_capacity",
        usage: 100,
        physical_usage: 150,
      },
      unit: "GiB",
    };

    render(
      <PortalProvider>
        <PhysicalUsage {...props} />
      </PortalProvider>
    );

    const physicalUsageText = screen.getByText("Physical Usage: 150 GiB");
    const boxElement = physicalUsageText.closest(".bg-theme-warning");
    expect(boxElement).toBeInTheDocument();
  });

  test("should not display physical usage for non-snapshot_capacity resources", () => {
    const props = {
      resource: {
        name: "other_resource",
        usage: 100,
        physical_usage: 150,
      },
      unit: "GiB",
    };

    render(
      <PortalProvider>
        <PhysicalUsage {...props} />
      </PortalProvider>
    );

    expect(screen.queryByText(/Physical Usage:/)).not.toBeInTheDocument();
  });
});
