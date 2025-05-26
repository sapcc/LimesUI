/**
 * Copyright 2025 SAP SE
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
import {
  getTotalCommittedUsage,
  getTotalUncommittedUsage,
  getCommittedUsage,
  getUncommittedUsage,
  getAvailableCapacity,
  getRemainingCapacity,
} from "../lib/resourceBarValues";

const ResourceBarType = {
  total: "total",
  granular: "granular",
};
Object.freeze(ResourceBarType);

const resourceBar = {
  utilized: 0,
  available: 0,
};

const useResourceBarValues = (resource, type) => {
  const { leftBar, rightBar } = React.useMemo(() => {
    if (!resource) return;
    let leftBar = { ...resourceBar };
    let rightBar = { ...resourceBar };
    switch (type) {
      case ResourceBarType.total:
        leftBar.utilized = getTotalCommittedUsage(resource);
        rightBar.utilized = getTotalUncommittedUsage(resource);
        break;
      case ResourceBarType.granular:
        leftBar.utilized = getCommittedUsage(resource);
        rightBar.utilized = getUncommittedUsage(resource);
        break;
      default:
        break;
    }
    leftBar.available = getAvailableCapacity(resource);
    rightBar.available = getRemainingCapacity(resource);
    return { leftBar, rightBar };
  }, [resource]);

  return { leftBar, rightBar };
};

export default useResourceBarValues;
