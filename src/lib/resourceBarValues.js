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

// Domain and Cluster Level calculate their usage values with unused_commitments

// SUM-Bar (Bar over all AZ's) calculation -> loops over all AZ's.
export function getTotalUsageForLeftBar(resource) {
  const AZs = resource.per_az;
  let totalUsage = 0;
  AZs.forEach((az) => {
    // No commitments available => No usage gets added to the left bar, because it's uncommitted usage.
    // Ensure that the left bar only contains uncommitted usage if no AZ's have any commitments.
    if (az.commitmentSum > 0) {
      totalUsage += getUsageForLeftBar(az[1]);
    } else if (resource.totalCommitments == 0) {
      totalUsage += az[1].usage;
    } else {
      totalUsage += 0;
    }
  });

  return totalUsage;
}

export function getTotalUsageForRightBar(resource) {
  const AZs = resource.per_az;
  let totalUsage = 0;
  AZs.forEach((az) => {
    // No commitments available => The usage gets added to the right bar, because it's uncommitted usage.
    az.commitmentSum > 0
      ? (totalUsage += getUsageForRightBar(az[1]))
      : (totalUsage += az[1].usage);
  });

  return totalUsage;
}

// AZ calculation
// No unused commitments means either: a) usage = commitments b) no commitments available
export function getUsageForLeftBar(az) {
  if (!az.hasOwnProperty("unused_commitments")) {
    return getUsageForAZLevel(az);
  }
  const commitmentSum = getCommitmentSumPerAZ(az);
  return commitmentSum - az.unused_commitments;
}

export function getUsageForRightBar(az) {
  const commitmentSum = getCommitmentSumPerAZ(az);
  const rightBarUsage =
    az.uncommitted_usage ??
    az.usage - (commitmentSum - (az.unused_commitments || 0));

  return rightBarUsage;
}

function getCommitmentSumPerAZ(az) {
  let commitmentSum = 0;
  for (const duration in az.committed) {
    commitmentSum += az.committed[duration] || 0;
  }
  return commitmentSum;
}
