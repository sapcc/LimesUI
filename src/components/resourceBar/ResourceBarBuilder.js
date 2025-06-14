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
import useResourceBarValues, { ResourceBarType } from "../../hooks/useResourceBarValues";
import { Stack } from "@cloudoperators/juno-ui-components/index";
import { getBarLabel, getEmptyBarLabel } from "../../lib/resourceBarValues";

const barConainer = `
  min-w-full 
  gap-1
`;
const extraBaseStyle = `
  bg-theme-background-lvl-4 
  `;
const extraFillStyle = `bg-sap-purple-2`;

const ResourceBarBuilder = (props) => {
  const { resource, unit: unitName, barType, isEditableResource } = { ...props };
  const unit = new Unit(unitName || "");
  const { leftBar, rightBar } = useResourceBarValues(resource, barType);
  const isGranular = barType === ResourceBarType.granular;
  const hasLeftBar = leftBar.utilized > 0 || leftBar.available > 0;
  const hasRightBar = rightBar.utilized > 0 || rightBar.available > 0;
  const isEmptyBar = !hasLeftBar && !hasRightBar;

  function getResourceBarLabel(bar) {
    if (isEmptyBar) {
      return getEmptyBarLabel(resource);
    }

    const hideLabelInfo = bar === rightBar && hasLeftBar;
    const barLabel = !hideLabelInfo && getBarLabel(resource);
    return (
      <span className={`progress-bar-label font-bold ${isGranular && "text-xs"}`}>
        {unit.format(bar.utilized) + "/" + unit.format(bar.available)} {<span className="font-normal">{barLabel}</span>}
      </span>
    );
  }

  return (
    <Stack distribution="between" className={`${barConainer}`}>
      {hasLeftBar && (
        <ResourceBar
          barValues={leftBar}
          barLabel={getResourceBarLabel(leftBar)}
          variant={isGranular ? "small" : "large"}
          containerWidth={70}
        />
      )}
      <ResourceBar
        barValues={rightBar}
        barLabel={getResourceBarLabel(rightBar)}
        variant={isGranular ? "small" : "large"}
        containerWidth={hasLeftBar ? 30 : 100}
        styles={{ base: hasLeftBar && extraBaseStyle, filled: isEditableResource && extraFillStyle }}
        isEmptyBar={isEmptyBar}
      />
    </Stack>
  );
};

export default ResourceBarBuilder;
