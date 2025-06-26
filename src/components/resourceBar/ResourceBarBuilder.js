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
import ResourceBar, { getAppliedBarColors } from "./ResourceBar";
import { Unit } from "../../lib/unit";
import useResourceBarValues, { ResourceBarType } from "../../hooks/useResourceBarValues";
import { Stack } from "@cloudoperators/juno-ui-components/index";
import { getBarLabel, locateAnyAZ, getEmptyBarLabel, hasAnyBarValues } from "./resourceBarUtils";
import ResourceInfo from "./ResourceInfo";

const barConainer = `
  min-w-full 
  gap-1
`;
const extraBaseStyle = `bg-theme-background-lvl-4`;
const extraFillStyle = `bg-sap-purple-2`;

const ResourceBarBuilder = (props) => {
  const { resource, az, unit: unitName, barType, isEditableResource } = { ...props };
  const { showToolTip = false, displayResourceInfo = false } = { ...props };
  const currentResource = az ? az : resource;
  const unit = new Unit(unitName || "");
  const { leftBar, rightBar } = useResourceBarValues(currentResource, barType);
  const isGranular = barType === ResourceBarType.granular;
  const hasLeftBar = hasAnyBarValues(leftBar);
  const hasRightBar = hasAnyBarValues(rightBar);
  const isEmptyBar = !hasLeftBar && !hasRightBar;
  const isEmptyBarWithBaseQuota = isEmptyBar && locateAnyAZ(resource);

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
      toolTipContent = "Pay as you go";
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
      {displayResourceInfo && (!isEmptyBar || isEmptyBarWithBaseQuota) && (
        <ResourceInfo resource={resource} az={az} leftBar={leftBar} rightBar={rightBar} unit={unit} />
      )}
    </>
  );
};

export default ResourceBarBuilder;
