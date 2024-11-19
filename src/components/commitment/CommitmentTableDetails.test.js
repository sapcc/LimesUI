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
import { fireEvent, screen, renderHook, waitFor } from "@testing-library/react";
import CommitmentTableDetails from "./CommitmentTableDetails";
import { initialCommitmentObject } from "../../lib/constants";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import StoreProvider, {
  createCommitmentStore,
  createCommitmentStoreActions,
} from "../StoreProvider";

const durations = ["1 year", "2 years", "3 years"];
const commitment = { ...initialCommitmentObject };

const selectErrors = console.error.bind(console);

describe("CheckCommitedState", () => {
  beforeAll(() => {
    // Junos select requires one string. Because we format the text of our subtexts, a proptype error will be fired.
    // The contents will still be processed by the library, which is why the prop type error gets disabled here.
    console.error = (errormessage) => {
      const suppressedError = errormessage.toString();
      const match = new RegExp("Warning: Failed .+ type").exec(
        suppressedError
      )[0];
      !match && selectErrors(errormessage);
    };
  });
  afterAll(() => {
    console.error = selectErrors;
  });

  test("Check Commited display", async () => {
    const confirmedCommitment = { ...commitment };
    confirmedCommitment.amount = 1003;
    confirmedCommitment.requested_at = 1696636800;
    confirmedCommitment.confirmed_at = 1696636800;
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <CommitmentTableDetails
            commitment={confirmedCommitment}
            durations={durations}
          />
          {children}
        </StoreProvider>
      </PortalProvider>
    );
    await waitFor(() => {
      renderHook(
        () => ({
          commitmentStore: createCommitmentStore(),
          commitmentStoreActions: createCommitmentStoreActions(),
        }),
        { wrapper }
      );
    });
    const commitedField = screen.getByDisplayValue(confirmedCommitment.amount);
    expect(commitedField).toBeInTheDocument();
  });
});

describe("EditCommitments", () => {
  let store;
  beforeEach(async () => {
    console.error = (errormessage) => {
      const suppressedError = errormessage.toString();
      const match = new RegExp("Warning: Failed .+ type").exec(
        suppressedError
      )[0];
      !match && selectErrors(errormessage);
    };
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <CommitmentTableDetails
            commitment={commitment}
            durations={durations}
          />
          {children}
        </StoreProvider>
      </PortalProvider>
    );
    store = await waitFor(() => {
      return renderHook(
        () => ({
          commitmentStore: createCommitmentStore(),
          commitmentStoreActions: createCommitmentStoreActions(),
        }),
        { wrapper }
      );
    });
  });

  afterAll(() => {
    console.error = selectErrors;
  });

  test("Check default InputValue", () => {
    const input = screen.getByDisplayValue(commitment.amount);
    expect(input).toBeInTheDocument();
  });

  test("Change Input, then cancel", () => {
    const value = "500";
    const input = screen.getByDisplayValue(commitment.amount);
    fireEvent.change(input, { target: { value: value } });
    expect(input.value).toEqual(value);
    const close = screen.getByText(/cancel/i);
    fireEvent.click(close);
    expect(store.result.current.commitmentStore.commitment.amount).toEqual(
      commitment.amount
    );
  });

  test("Check dropdown", async () => {
    const input = screen.getByText(/select/i);
    fireEvent.click(input);
    const year1 = screen.getByText(new RegExp(durations[0], "i"));
    fireEvent.click(year1);
    await waitFor(() => {
      expect(year1.textContent).toEqual(durations[0]);
    });
  });
});
