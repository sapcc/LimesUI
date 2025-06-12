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
import { Badge } from "@cloudoperators/juno-ui-components";
import { Unit, valueWithUnit } from "../../lib/unit";
import { uncommittedUsage, unusedCommitments } from "../../lib/utils";

export const labelTypes = Object.freeze({
  PLANNED: "planned",
  PENDING: "pending",
  UNUSED: "unused",
  UNCOMMITTED: "uncommitted",
});

const DomainBadges = (props) => {
  const { resource, az } = props;
  const { quota } = resource;
  if (quota == 0) return;
  return (
    <span>
      {matchAZLabel(az, labelTypes.UNUSED) && (
        <Badge variant="info">
          {" "}
          <b>{labelTypes.UNUSED}</b>
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
    case labelTypes.UNUSED:
      return unusedCommitments(az.commitmentSum, az.usage);
    case labelTypes.UNCOMMITTED:
      return uncommittedUsage(az.commitmentSum, az.usage);
    default:
      return false;
  }
}

export { DomainBadges, ProjectBadges };
