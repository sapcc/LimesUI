// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import {
  getTotalCommittedUsage,
  getTotalUncommittedUsage,
  getCommittedUsage,
  getUncommittedUsage,
  getAvailableCapacity,
  getRemainingCapacity,
} from "../lib/resourceBarValues";
import resourceBar from "../components/resourceBar/ResourceBar";

export const ResourceBarType = {
  total: "total",
  granular: "granular",
};
Object.freeze(ResourceBarType);

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
