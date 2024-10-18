import React from "react";
import {
  fireEvent,
  screen,
  renderHook,
  act,
  waitFor,
} from "@testing-library/react";
import CommitmentTableDetails from "./CommitmentTableDetails";
import { initialCommitmentObject } from "../../lib/constants";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import StoreProvider, {
  createCommitmentStore,
  createCommitmentStoreActions,
} from "../StoreProvider";

const durations = ["1 year", "2 years", "3 years"];
const commitment = { ...initialCommitmentObject };

describe("CheckCommitedState", () => {
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
    waitFor(() => {
      renderHook(
        () => ({
          commitmentStore: createCommitmentStore(),
          commitmentStoreActions: createCommitmentStoreActions(),
        }),
        { wrapper }
      );
    });
    const commitedField = screen.getByDisplayValue(
      new RegExp(confirmedCommitment.amount, "i")
    );
    expect(commitedField).toBeInTheDocument();
  });
});

describe("EditCommitments", () => {
  let store;
  beforeEach(() => {
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <CommitmentTableDetails
            commitment={commitment}
            durations={durations}
          />
          ;{children}
        </StoreProvider>
      </PortalProvider>
    );
    store = waitFor(() => {
      return renderHook(
        () => ({
          commitmentStore: createCommitmentStore(),
          commitmentStoreActions: createCommitmentStoreActions(),
        }),
        { wrapper }
      );
    });
  });

  test("Check default InputValue", () => {
    const input = screen.getByDisplayValue(commitment.amount);
    expect(input).toBeInTheDocument();
  });

  test("Change Input, then cancel", () => {
    const value = "500";
    const input = screen.getByDisplayValue(commitment.amount);
    act(() => {
      fireEvent.change(input, { target: { value: value } });
    });
    expect(input.value).toEqual(value);

    const close = screen.getByText(/cancel/i);
    act(() => {
      fireEvent.click(close);
    });
    waitFor(() => {
      expect(store.result.current.commitmentStore.commitment.amount).toEqual(
        commitment.amount
      );
    });
  });

  test("Check dropdown", () => {
    const input = screen.getByText(/select/i);
    fireEvent.click(input);
    const year1 = screen.getByText(new RegExp(durations[0], "i"));
    fireEvent.click(year1);
    expect(year1.textContent).toEqual(durations[0]);
  });
});
