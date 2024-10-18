import React from "react";
import UpdateDurationModal from "./UpdateDurationModal";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import { initialCommitmentObject } from "../../../../lib/constants";

const resource = {
  commitment_config: { durations: ["1 year", "2 years", "3 years"] },
};
const commitment = { ...initialCommitmentObject };

describe("check update duration modal", () => {
  const update = jest.fn((commitment, payload) => {
    expect(commitment.duration).toBe("1 year");
    expect(payload.duration).toBe("2 years");
  });

  beforeEach(() => {
    const confirmedCommitment = { ...commitment };
    confirmedCommitment.amount = 10;
    confirmedCommitment.duration = "1 year";
    waitFor(() => {
      render(
        <PortalProvider>
          <UpdateDurationModal
            title="Update Commitment Duration"
            subText="Update"
            resource={resource}
            commitment={confirmedCommitment}
            onModalClose={() => {}}
            onUpdate={update}
          />
        </PortalProvider>
      );
    });
  });
  test("duration update", () => {
    const input = screen.getByTestId(/updateDurationInput/i);
    const confirmInput = screen.getByTestId(/confirmInput/i);
    const confirmButton = screen.getByTestId(/modalConfirm/i);
    fireEvent.click(input);
    const inputVal = screen.getByTestId("2 years");
    expect(screen.queryByTestId("1 year")).toBeFalsy();
    fireEvent.click(inputVal);
    fireEvent.change(confirmInput, { target: { value: "update" } });
    fireEvent.click(confirmButton);
    expect(update).toHaveBeenCalled();
  });
});
