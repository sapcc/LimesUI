import React from "react";
import { SelectOption } from "@cloudoperators/juno-ui-components";
import { parseCommitmentDuration } from "../../lib/parseCommitmentDurations";

// Defines the Select content of the commitment duration during its creation. The following states can occur:
// reservation only: Commitment durations with < 1 year
// rebate: Commitment durations with >= 1 year
// Only returns the duration if reservation only commitments are not available.
const CommitmentDurationInputLabel = ({
  index = "",
  allowedDurations = [],
  commitmentDuration = "",
}) => {
  const hasReservationActive = React.useMemo(() => {
    let hasReservationActive = false;
    for (const allowedDuration of allowedDurations) {
      if (
        parseCommitmentDuration(allowedDuration) <
        parseCommitmentDuration("1 year")
      ) {
        hasReservationActive = true;
        break;
      }
    }
    return hasReservationActive;
  }, [allowedDurations]);

  const label = React.useMemo(() => {
    const isRabate =
      parseCommitmentDuration(commitmentDuration) >=
      parseCommitmentDuration("1 year");

    const label = !hasReservationActive
      ? ""
      : isRabate
      ? "rabate"
      : "reserved only";
    return label;
  }, [commitmentDuration]);

  return (
    <SelectOption
      data-testid={`commitmentSelectOption/${index}`}
      data-cy={`commitmentSelectOption/${index}`}
    >
      <span key={commitmentDuration} label={label}>
        <div className="text-left">{commitmentDuration}</div>
        {hasReservationActive && <div className="text-xs">{label}</div>}
      </span>
    </SelectOption>
  );
};

export default CommitmentDurationInputLabel;
