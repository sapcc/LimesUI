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
import useResourceBarValues from "../../hooks/useResourceBarValues";

const ResourceBarBuilder = (props) => {
  const { resource, unit: unitName, isAZ, barType, clusterQuotaView } = { ...props };
  const { scope } = globalStore();
  const unit = new Unit(unitName || "");
  const clusterView = clusterQuotaView ? false : scope.isCluster();
  const { leftBar, rightBar } = useResourceBarValues(resource, barType);

  return (
    <ResourceBar
      fillLabel={unit.format(leftBar.utilized)}
      capacityLabel={unit.format(leftBar.available)}
      extraFillLabel={unit.format(rightBar.utilized)}
      extraCapacityLabel={unit.format(rightBar.available, unit)}
      usageLabel={clusterView ? "capacity used" : "quota used"}
      fill={leftBar.utilized}
      capacity={leftBar.available}
      commitment={resource.commitmentSum ?? 0}
      extraFillValue={rightBar.utilized}
      // Providing 1 enables the bar to be filled completely if commitments > quota
      extraCapacityValue={rightBar.available || 1}
      showsCapacity={clusterView}
      isAZ={isAZ}
    />
  );
};

export default ResourceBarBuilder;
