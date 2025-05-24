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
import ResourceBar from "./ResourceBar";
import { Unit } from "../../lib/unit";
import { globalStore } from "../StoreProvider";

const ResourceBarBuilder = (props) => {
  const {
    unit: unitName,
    usage,
    usageBurstSum,
    quotaForLeftBar,
    quotaForRightBar,
    commitment,
    isPanelView,
    // Displays bars either blue or purple if usage > commitments.
    editableResource,
    isAZ,
    // Determines if NoQuota bars are the same size as filledBars.
    equallySized,
    // bar should display quota(cluster scope) or capacity (project/domain scope)
    clusterQuotaView
  } = { ...props };
  const { scope } = globalStore();
  const unit = new Unit(unitName || "");
  const clusterView = clusterQuotaView ? false : scope.isCluster();

  // fillLabel: displays commitment or current usage.
  const showCommitmentOrUsage = usage;

  // capacityLabel: displays commitments, quota or usage (on usageOnly resources)
  const capacity = quotaForLeftBar;

  // ExtraBar: displays values that exceed the commitment
  // The sum bar can display the second bar without completely filling the first bar.
  let extraFillValue = usageBurstSum;

  let extraCapacityValue = quotaForRightBar;

  // isPanelView is used, because tracksQuota check is not accessible from EditPanel (gets prop passed from Category)
  return (
    <ResourceBar
      fillLabel={unit.format(showCommitmentOrUsage)}
      capacityLabel={unit.format(capacity)}
      extraFillLabel={unit.format(extraFillValue)}
      extraCapacityLabel={unit.format(extraCapacityValue, unit)}
      usageLabel={clusterView ? "capacity used" : "quota used"}
      fill={usage}
      capacity={capacity}
      commitment={commitment ?? 0}
      extraFillValue={extraFillValue}
      // Providing 1 enables the bar to be filled completely if commitments > quota
      extraCapacityValue={extraCapacityValue || 1}
      canEdit={editableResource || isPanelView}
      showsCapacity={clusterView}
      isAZ={isAZ}
      // No Quota and Quota bars have the same size within the Edit Panel Tables.
      equallySized={equallySized}
    />
  );
};

export default ResourceBarBuilder;
