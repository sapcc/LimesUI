// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Badge } from "@cloudoperators/juno-ui-components";
import { Unit, valueWithUnit } from "../../lib/unit";
import { uncommittedUsage, getUnusedCommitmentRatio } from "../../lib/utils";

export const labelTypes = Object.freeze({
  ANY: "any",
  PENDING: "pending",
  PLANNED: "planned",
  COMMITTED: "committed",
  UNDERUTILIZED: "underutilized",
  UNCOMMITTED: "uncommitted",
  EMPTY: "empty",
  NONEMPTY: "non-empty",
});

const DomainBadges = (props) => {
  const { resource, az } = props;
  const { quota } = resource;
  if (quota === 0) return;
  const underutilizedRatio = matchAZLabel(az, labelTypes.UNDERUTILIZED);
  return (
    <span>
      {underutilizedRatio > 0 && (
        <Badge variant="info">
          {" "}
          <b>
            {underutilizedRatio} % {labelTypes.UNDERUTILIZED}
          </b>
        </Badge>
      )}
      {matchAZLabel(az, labelTypes.UNCOMMITTED) && (
        <Badge variant="info">
          {" "}
          <b>{labelTypes.UNCOMMITTED}</b>
        </Badge>
      )}
    </span>
  );
};

const ProjectBadges = (props) => {
  const { az, unit: unitName } = props;
  if (!matchAZLabel(az, labelTypes.PLANNED) && !matchAZLabel(az, labelTypes.PENDING)) {
    return;
  }

  const unit = new Unit(unitName);
  const pending = az.pending_commitments;
  const planned = az.planned_commitments;

  let pendingAmount = 0;
  for (const duration in pending) {
    pendingAmount += pending[duration];
  }

  let plannedAmount = 0;
  for (const duration in planned) {
    plannedAmount += planned[duration];
  }

  return (
    <span>
      {pending && (
        <Badge variant="info">
          {" "}
          <b>
            + {props.displayValues && valueWithUnit(pendingAmount, unit)} {labelTypes.PENDING}
          </b>
        </Badge>
      )}
      {planned && (
        <Badge variant="info" className={`${pending && "ml-1"}`}>
          {" "}
          <b>
            + {props.displayValues && valueWithUnit(plannedAmount, unit)} {labelTypes.PLANNED}
          </b>
        </Badge>
      )}
    </span>
  );
};

export function matchAZLabel(az, label) {
  switch (label) {
    case labelTypes.PLANNED:
      return az.hasOwnProperty("planned_commitments");
    case labelTypes.PENDING:
      return az.hasOwnProperty("pending_commitments");
    case labelTypes.UNDERUTILIZED:
      return getUnusedCommitmentRatio(az.commitmentSum, az.usage);
    case labelTypes.COMMITTED:
      return az.commitmentSum > 0;
    case labelTypes.UNCOMMITTED:
      return uncommittedUsage(az.commitmentSum, az.usage);
    case labelTypes.EMPTY:
      return az.commitmentSum === 0 && az.usage === 0;
    case labelTypes.NONEMPTY:
      return az.commitmentSum > 0 || az.usage > 0;
    default:
      return false;
  }
}

export { DomainBadges, ProjectBadges };
