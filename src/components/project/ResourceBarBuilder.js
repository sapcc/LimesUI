import React from "react";
import ResourceBar from "../ResourceBar";
import { Unit, valueWithUnit } from "../../lib/unit";

const ResourceBarBuilder = (props) => {
  const {
    unit: unitName,
    usage,
    commitment,
    quota,
    parentQuota,
    tracksQuota,
    isPanelView,
    showEdit,
  } = { ...props };
  const unit = new Unit(unitName || "");
  const commitmentOrQuota = commitment > 0 ? commitment : quota;
  const capacity = tracksQuota ? commitmentOrQuota : parentQuota;
  const showCommitmentOrUsage =
    usage > commitment && commitment > 0 ? commitment : usage;
  const extraFillLabel = usage >= commitment ? usage - commitment : "0";
  const extraCapacityValue = quota - commitment;

  return (
    <ResourceBar
      fillLabel={valueWithUnit(showCommitmentOrUsage, unit)}
      capacityLabel={valueWithUnit(capacity, unit)}
      extraFillLabel={valueWithUnit(extraFillLabel, unit)}
      extraCapacityLabel={valueWithUnit(extraCapacityValue, unit)}
      fill={usage}
      capacity={capacity}
      commitment={commitment}
      extraCapacityValue={extraCapacityValue}
      labelIsUsageOnly={tracksQuota}
      canEdit={showEdit || isPanelView}
      showsCapacity={false}
    />
  );
};

export default ResourceBarBuilder;
