// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

// Generic functions for the label builders.

import { createUnit, valueWithUnit } from "../../lib/unit";

function getResource(resources, resourceName) {
  return resources.find((resource) => resource.name == resourceName);
}

function getRemainingQuota(resource) {
  const remainingQuota = resource.quota - resource.usage;
  return remainingQuota > 0 ? remainingQuota : 0;
}

function getRemainingQuotaWithUnit(resource, resourceUnit) {
  const unit = createUnit(resourceUnit);
  const remainingQuota = getRemainingQuota(resource);
  return valueWithUnit(remainingQuota, unit);
}

export { getResource, getRemainingQuota, getRemainingQuotaWithUnit };
