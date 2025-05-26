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
      usageLabel={clusterView ? "capacity used" : "quota used"}
      leftBar={leftBar}
      rightBar={rightBar}
      formatter={(value) => unit.format(value)}
      showsCapacity={clusterView}
      commitment={resource.commitmentSum ?? 0}
      isAZ={isAZ}
    />
  );
};

export default ResourceBarBuilder;
