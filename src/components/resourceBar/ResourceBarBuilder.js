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
    parentQuota,
    tracksQuota,
    isPanelView,
    // Displays bars either blue or purple if usage > commitments.
    editableResource,
    isAZ,
    // Determines if NoQuota bars are the same size as filledBars.
    equallySized,
  } = { ...props };
  const { scope } = globalStore();
  const unit = new Unit(unitName || "");

  // fillLabel: displays commitment or current usage.
  const showCommitmentOrUsage =
    usage > commitment && commitment > 0 ? commitment : usage;

  // capacityLabel: displays commitments, quota or parentQuota (on usageOnly resources)
  const commitmentOrQuota = commitment > 0 ? commitment : quota;
  const capacity = tracksQuota ? commitmentOrQuota : parentQuota;

  // ExtraBar: displays values that exceed that exceed the commitment
  // The sum bar can display the second bar without completely filling the first bar.
  let extraFillValue;
  if (usageBurstSum > 0) {
    extraFillValue = usageBurstSum;
  } else {
    extraFillValue = usage >= commitment ? usage - commitment : "0";
  }
  let extraCapacityValue = quota - commitment;
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
      usageLabel={scope.isCluster() ? "capacity used" : "quota used"}
      fill={usage}
      capacity={capacity || 1}
      commitment={commitment}
      extraFillValue={extraFillValue}
      // Providing 1 enables the bar to be filled completely if commitments > quota
      extraCapacityValue={extraCapacityValue || 1}
      canEdit={editableResource || isPanelView}
      showsCapacity={false}
      isAZ={isAZ}
      equallySized={equallySized}
    />
  );
};

export default ResourceBarBuilder;
