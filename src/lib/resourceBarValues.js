// AZs may or may not contain their own quota.
// This function either returns the AZ values or resource values.
export function getQuotaForAZLevel(az, quota) {
  return az.quota ?? quota;
}
