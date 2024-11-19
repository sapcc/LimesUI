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
