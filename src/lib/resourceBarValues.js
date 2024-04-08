// AZs may or may not contain their own values.
// Either the AZ or resource values get provided to the UI.

export function getUsageForAZLevel(az) {
  return az.projects_usage || az.usage || 0;
}

export function getCapacityForAZLevel(az, capacity) {
  return az.capacity ?? capacity;
}

export function getQuotaForAZLevel(az, quota) {
  return az.quota ?? quota;
}
