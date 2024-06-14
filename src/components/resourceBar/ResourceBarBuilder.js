import React from "react";
import ResourceBar from "./ResourceBar";
import { Unit, valueWithUnit } from "../../lib/unit";
import { globalStore } from "../StoreProvider";

const ResourceBarBuilder = (props) => {
  const {
    unit: unitName,
    usage,
    usageBurstSum,
    commitment,
    quota,
    tracksQuota,
    isPanelView,
    // Displays bars either blue or purple if usage > commitments.
    editableResource,
    isAZ,
    // Determines if NoQuota bars are the same size as filledBars.
    equallySized,
    clusterQuotaView,
  } = { ...props };
  const { scope } = globalStore();
  const unit = new Unit(unitName || "");

  // fillLabel: displays commitment or current usage.
  const showCommitmentOrUsage =
    usage > commitment && commitment > 0 ? commitment : usage;

  // capacityLabel: displays commitments, quota or usage (on usageOnly resources)
  const commitmentOrQuota = commitment > 0 ? commitment : quota;
  const noQuotaResourceValue = commitment > 0 ? commitment : usage;
  const capacity = tracksQuota ? commitmentOrQuota : noQuotaResourceValue;

  // ExtraBar: displays values that exceed the commitment
  // The sum bar can display the second bar without completely filling the first bar.
  let extraFillValue;
  if (usageBurstSum > 0) {
    extraFillValue = usageBurstSum;
  } else {
    extraFillValue = usage >= commitment ? usage - commitment : "0";
  }
  const quotaOrUsage = tracksQuota ? quota : usage;
  let extraCapacityValue = quotaOrUsage - commitment;
  if (extraCapacityValue < 0) {
    extraCapacityValue = 0;
  }

  // isPanelView is used, because tracksQuota check is not accessible from EditPanel (gets prop passed from Category)
  return (
    <ResourceBar
      fillLabel={valueWithUnit(showCommitmentOrUsage, unit)}
      capacityLabel={valueWithUnit(capacity, unit)}
      extraFillLabel={valueWithUnit(extraFillValue, unit)}
      extraCapacityLabel={valueWithUnit(extraCapacityValue, unit)}
      usageLabel={
        scope.isCluster() && !clusterQuotaView ? "capacity used" : "quota used"
      }
      fill={usage}
      capacity={capacity}
      commitment={commitment}
      extraFillValue={extraFillValue}
      // Providing 1 enables the bar to be filled completely if commitments > quota
      extraCapacityValue={extraCapacityValue || 1}
      canEdit={editableResource || isPanelView}
      showsCapacity={scope.isCluster() && !clusterQuotaView}
      isAZ={isAZ}
      // No Quota and Quota bars have the same size within the Edit Panel Tables.
      equallySized={equallySized}
    />
  );
};

export default ResourceBarBuilder;
