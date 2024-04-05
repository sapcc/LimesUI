// AZs may or may not contain their own quota and capacity.
// Either the AZ or resource values get delivered.

export function getCapacityForAZLevel(az, capacity) {
  return az.capacity ?? capacity;
}

export function getQuotaForAZLevel(az, quota) {
  return az.quota ?? quota;
}
