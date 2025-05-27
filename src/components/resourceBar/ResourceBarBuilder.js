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
import useResourceBarValues from "../../hooks/useResourceBarValues";
import { globalStore } from "../StoreProvider";
import { Stack } from "@cloudoperators/juno-ui-components/index";

const barConainer = `
  min-w-full 
  gap-1
`;
const extraBaseStyle = `
  bg-theme-background-lvl-4 
  `;
const extraFillStyle = `bg-sap-purple-2`;

const ResourceBarBuilder = (props) => {
  const { resource, unit: unitName, isAZ, barType, clusterQuotaView, isEditableResource } = { ...props };
  const { scope } = globalStore();
  const unit = new Unit(unitName || "");
  const clusterView = clusterQuotaView ? false : scope.isCluster();
  const { leftBar, rightBar } = useResourceBarValues(resource, barType);
  const hasLeftBar = leftBar.utilized > 0 || leftBar.available > 0;
  const hasRightBar = rightBar.utilized > 0 || rightBar.available > 0;
  const isEmptyBar = !hasLeftBar && !hasRightBar;

  function getLabelInfo() {
    let labelInfo;
    if (hasLeftBar) {
      labelInfo = <span className="font-normal">committed</span>;
    } else {
      labelInfo = <span className="font-normal">{clusterView ? "capacity used" : "quota used"}</span>;
    }
    return labelInfo;
  }

  function getResourceBarLabel(bar) {
    const labelInfo = !hasLeftBar && getLabelInfo();
    return (
      <span className={`progress-bar-label font-bold ${isAZ && "text-xs"}`}>
        {unit.format(bar.utilized)}/{unit.format(bar.available)} {labelInfo}
      </span>
    );
  }

  function getEmptyBarLabel() {
    if (isEmptyBar) {
      return clusterView ? "No capacity" : "No quota";
    }
  }

  return (
    <Stack distribution="between" className={`${barConainer}`}>
      {hasLeftBar && (
        <ResourceBar
          barValues={leftBar}
          barLabel={getResourceBarLabel(leftBar)}
          variant={isAZ ? "small" : "large"}
          containerWidth={70}
        />
      )}
      <ResourceBar
        barValues={rightBar}
        barLabel={isEmptyBar ? getEmptyBarLabel() : getResourceBarLabel(rightBar)}
        variant={isAZ ? "small" : "large"}
        containerWidth={hasLeftBar > 0 ? 30 : 100}
        styles={{ base: hasLeftBar && extraBaseStyle, filled: isEditableResource && extraFillStyle }}
        isEmptyBar={isEmptyBar}
      />
    </Stack>
  );
};

export default ResourceBarBuilder;
