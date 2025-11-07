// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import TransferTokenModal from "./TransferTokenModal";
import { render, screen } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import { initialCommitmentObject } from "../../../lib/constants";

describe("test transfer token modal", () => {
  test("should display commitment transfer token", () => {
    const confirmedCommitment = { ...initialCommitmentObject };
    confirmedCommitment.transfer_token = "EXAMPLE_TOKEN";
    render(
      <PortalProvider>
        <TransferTokenModal title="Transfer Commitment" subText="Transfer" commitment={confirmedCommitment} />
      </PortalProvider>
    );
    expect(screen.getByText("EXAMPLE_TOKEN")).toBeInTheDocument();
  });
});
