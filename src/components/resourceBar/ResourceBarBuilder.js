// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import ResourceBar, { getAppliedBarColors } from "./ResourceBar";
import ResourceInfo from "./ResourceInfo";
import { Stack } from "@cloudoperators/juno-ui-components/index";
import { Unit } from "../../lib/unit";
import { getBarLabel, getEmptyBarLabel, hasAnyBarValues } from "./resourceBarUtils";
import useResourceBarValues, { ResourceBarType } from "../../hooks/useResourceBarValues";

const barConainer = `
  min-w-full 
  gap-1
`;
const extraBaseStyle = `bg-theme-background-lvl-4`;
const extraFillStyle = `bg-sap-purple-2`;

const ResourceBarBuilder = (props) => {
  const { scope, categoryName, resource, az, unit: unitName, barType, isEditableResource } = { ...props };
  const { showToolTip = false, displayResourceInfo = false } = { ...props };
  const unit = new Unit(unitName || "");
  const isGranular = barType === ResourceBarType.granular;
  const currentResource = isGranular ? az : resource;
  const { leftBar, rightBar } = useResourceBarValues(currentResource, barType);
  const hasLeftBar = hasAnyBarValues(leftBar);
  const hasRightBar = hasAnyBarValues(rightBar);
  const isEmptyBar = !hasLeftBar && !hasRightBar;

  const paygStyle = { base: hasLeftBar && extraBaseStyle, filled: isEditableResource && extraFillStyle };
  function getResourceBarLabel(bar) {
    if (isEmptyBar) {
      return getEmptyBarLabel(resource, isGranular);
    }

    const hideLabelInfo = bar === rightBar && hasLeftBar;
    const barLabel = !hideLabelInfo && getBarLabel(currentResource);
    return (
      <span className={`progress-bar-label font-bold ${isGranular && "text-xs"}`}>
        {unit.format(bar.utilized) + "/" + unit.format(bar.available)} {<span className="font-normal">{barLabel}</span>}
      </span>
    );
  }

  function getResourceBarToolTip(bar) {
    let barBackGround;
    let toolTipContent;
    if (bar === rightBar) {
      barBackGround = getAppliedBarColors(bar, paygStyle);
      toolTipContent = isEditableResource ? "Pay as you go" : "Usage";
    } else {
      barBackGround = getAppliedBarColors(bar);
      toolTipContent = "Committed usage";
    }
    return (
      <span className="flex justify-center gap-1">
        <span className={`size-3 m-auto ${barBackGround} block`} />
        <>{toolTipContent}</>
      </span>
    );
  }

  return (
    <>
      <Stack distribution="between" className={`${barConainer}`}>
        {hasLeftBar && (
          <ResourceBar
            barValues={leftBar}
            barLabel={getResourceBarLabel(leftBar)}
            variant={isGranular ? "small" : "large"}
            containerWidth={70}
            toolTip={showToolTip && getResourceBarToolTip(leftBar)}
          />
        )}
        <ResourceBar
          barValues={rightBar}
          barLabel={getResourceBarLabel(rightBar)}
          variant={isGranular ? "small" : "large"}
          containerWidth={hasLeftBar ? 30 : 100}
          styles={paygStyle}
          isEmptyBar={isEmptyBar}
          toolTip={showToolTip && getResourceBarToolTip(rightBar)}
        />
      </Stack>
      {displayResourceInfo && (
        <ResourceInfo
          scope={scope}
          categoryName={categoryName}
          isEmptyBar={isEmptyBar}
          isGranular={isGranular}
          resource={resource}
          isEditableResource={isEditableResource}
          az={az}
          leftBar={leftBar}
          rightBar={rightBar}
          unit={unit}
        />
      )}
    </>
  );
};

export default ResourceBarBuilder;
