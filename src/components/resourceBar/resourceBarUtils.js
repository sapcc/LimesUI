import { CustomZones } from "../../lib/constants";

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

export function getEmptyBarLabel(parent, resource) {
  if (parent) {
    if (getBaseQuotaObject(parent)) {
      return "No usage (has base quota)";
    }
  }

  if (resource.hasOwnProperty("capacity")) {
    return "No capacity";
  } else {
    return "No quota";
  }
}

export function getBaseQuotaObject(resource) {
  return resource.per_az.find((az) => az.name === CustomZones.ANY) || false;
}

export function hasAnyBarValues(barValues) {
  return barValues.utilized > 0 || barValues.available > 0;
}
