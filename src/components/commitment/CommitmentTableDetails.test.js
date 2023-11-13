import React from "react";
import {
  fireEvent,
  render,
  screen,
  renderHook,
  act,
  waitFor,
} from "@testing-library/react";
import CommitmentTableDetails from "./CommitmentTableDetails";
import { initialCommitmentObject } from "../../lib/store/store";
import useStore from "../../lib/store/store";

const { result } = renderHook(() => useStore());
const durations = ["1 year", "2 years", "3 years"];
const commitment = { ...initialCommitmentObject };

describe("CheckCommitedState", () => {
  test("Check Commited display", async () => {
    const confirmedCommitment = { ...commitment };
    confirmedCommitment.amount = 1003;
    confirmedCommitment.requested_at = 1696636800;
    confirmedCommitment.confirmed_at = 1696636800;
    render(
      <CommitmentTableDetails
        commitment={confirmedCommitment}
        durations={durations}
      />
    );
    const commitedField = screen.getByDisplayValue(
      new RegExp(confirmedCommitment.amount, "i")
    );
    expect(commitedField).toBeInTheDocument();
  });
});

describe("EditCommitments", () => {
  beforeEach(() => {
    render(
      <CommitmentTableDetails commitment={commitment} durations={durations} />
    );
  });

  test("Check default InputValue", () => {
    const input = screen.getByDisplayValue(commitment.amount);
    expect(input).toBeInTheDocument();
  });

  test("Change Input, then cancel", async () => {
    const value = "500";
    const input = screen.getByDisplayValue(commitment.amount);
    await act(async () => {
      fireEvent.change(input, { target: { value: value } });
    });
    expect(input.value).toEqual(value);

    const close = screen.getByText(/cancel/i);
    await act(async () => {
      fireEvent.click(close);
    });
    expect(result.current.commitment.amount).toEqual(commitment.amount);
  });

  test("Check dropdown", () => {
    const input = screen.getByText(/select/i);
    fireEvent.click(input);
    const year1 = screen.getByText(new RegExp(durations[0], "i"));
    fireEvent.click(year1);
    expect(year1.textContent).toEqual(durations[0]);
  });
});
