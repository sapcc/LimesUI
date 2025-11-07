// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { locateBaseQuotaAZ } from "../../lib/utils";

export function getBarLabel(resource) {
  if (resource.commitmentSum > 0) {
    return "committed";
  }
  if (resource.hasOwnProperty("capacity")) {
    return "capacity used";
  } else {
    return "quota used";
  }
}

export function getEmptyBarLabel(resource) {
  if (resource.hasOwnProperty("capacity")) {
    return "No capacity";
  } else {
    if (locateBaseQuotaAZ(resource)) {
      return "No usage (has base quota)";
    }
    return "No quota";
  }
}

export function hasAnyBarValues(barValues) {
  return barValues.utilized > 0 || barValues.available > 0;
}
