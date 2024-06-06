import React from "react";
import { Badge } from "juno-ui-components";
import { unusedCommitments, uncommittedUsage } from "../../lib/utils";
import { Unit, valueWithUnit } from "../../lib/unit";

const DomainBadges = (props) => {
  const { resource, az } = props;
  const { quota } = resource;
  if (quota == 0) return;
  return (
    <span>
      {unusedCommitments(az.commitmentSum, az[1].usage) && (
        <Badge variant="info">
          {" "}
          <b>unused</b>
        </Badge>
      )}
      {uncommittedUsage(az.commitmentSum, az[1].usage) && (
        <Badge variant="info">
          {" "}
          <b>uncommitted</b>
        </Badge>
      )}
    </span>
  );
};

const ProjectBadges = (props) => {
  const { az, unit: unitName } = props;
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
            + {unit.name != "" && valueWithUnit(pendingAmount, unit)} pending
          </b>
        </Badge>
      )}
      {planned && (
        <Badge variant="info" className={`${pending && "ml-1"}`}>
          {" "}
          <b>
            + {unit.name != "" && valueWithUnit(plannedAmount, unit)} planned
          </b>
        </Badge>
      )}
    </span>
  );
};

export { DomainBadges, ProjectBadges };
