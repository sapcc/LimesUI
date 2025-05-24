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
import { unusedCommitments, uncommittedUsage } from "../../lib/utils";
import { Unit, valueWithUnit } from "../../lib/unit";

const DomainBadges = (props) => {
  const { resource, az } = props;
  const { quota } = resource;
  if (quota == 0) return;
  return (
    <span>
      {unusedCommitments(az.commitmentSum, az.usage) && (
        <Badge variant="info">
          {" "}
          <b>unused</b>
        </Badge>
      )}
      {uncommittedUsage(az.commitmentSum, az.usage) && (
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
          <b>+ {props.displayValues && valueWithUnit(pendingAmount, unit)} pending</b>
        </Badge>
      )}
      {planned && (
        <Badge variant="info" className={`${pending && "ml-1"}`}>
          {" "}
          <b>+ {props.displayValues && valueWithUnit(plannedAmount, unit)} planned</b>
        </Badge>
      )}
    </span>
  );
};

export { DomainBadges, ProjectBadges };
