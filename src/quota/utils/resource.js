// Generic functions for the label builders.

import { Unit, valueWithUnit } from "../../lib/unit";

function getResource(resources, resourceName) {
  return resources.find((resource) => resource.name == resourceName);
}

function getRemainingQuota(resource) {
  const remainingQuota = resource.quota - resource.usage;
  return remainingQuota > 0 ? remainingQuota : 0;
}

function getRemainingQuotaWithUnit(resource, resourceUnit) {
  const unit = new Unit(resourceUnit);
  const remainingQuota = getRemainingQuota(resource);
  return valueWithUnit(remainingQuota, unit);
}

export { getResource, getRemainingQuota, getRemainingQuotaWithUnit };
