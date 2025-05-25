/**
 * Copyright 2024 SAP SE
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

import { tracksQuota } from "./utils";

// AZs may or may not contain their own values.
// Either the AZ or resource values get provided to the UI.

export function getUsageForAZLevel(az) {
  return az.projects_usage || az.usage || 0;
}

export function getQuotaForAZLevel(az, quota) {
  return az.quota ?? quota;
}

// Domain and Cluster Level calculate their usage values with unused_commitments

// SUM-Bar (Bar over all AZ's) calculation -> loops over all AZ's.
export function getTotalUsageForLeftBar(resource) {
  const AZs = resource.per_az;
  if (!AZs) return;
  let totalUsage = 0;

  AZs.forEach((az) => {
    // No commitments available => No usage gets added to the left bar, because it's uncommitted usage.
    // Ensure that the left bar only contains uncommitted usage if no AZ's have any commitments.
    if (resource.commitmentSum == 0 || az.commitmentSum > 0) {
      totalUsage += getUsageForLeftBar(az);
    }
  });

  return totalUsage;
}

export function getTotalUsageForRightBar(resource) {
  const AZs = resource.per_az;
  if (!AZs) return;
  let totalUsage = 0;

  AZs.forEach((az) => {
    // No commitments available => The usage gets added to the right bar, because it's uncommitted usage.
    if (az.commitmentSum > 0) {
      totalUsage += getUsageForRightBar(az);
    } else {
      totalUsage += getUsageForAZLevel(az);
    }
  });

  return totalUsage;
}

// AZ calculation
// No unused commitments means either: a) usage = commitments b) no commitments available
export function getUsageForLeftBar(az) {
  // domain/cluster level
  if (az.hasOwnProperty("unused_commitments")) {
    const commitmentSum = getCommitmentSumPerAZ(az);
    return commitmentSum - az.unused_commitments;
  }
  // project level:
  const usage = getUsageForAZLevel(az);
  let usageValue = 0;
  if (az.commitmentSum > 0 && usage > az.commitmentSum) {
    usageValue = az.commitmentSum;
  } else {
    usageValue = usage;
  }
  return usageValue;
}

export function getUsageForRightBar(az) {
  const commitmentSum = getCommitmentSumPerAZ(az);
  const usage = getUsageForAZLevel(az);
  let rightBarUsage = az.uncommitted_usage ?? usage - (commitmentSum - (az.unused_commitments || 0));
  if (rightBarUsage < 0) {
    rightBarUsage = 0;
  }

  return rightBarUsage;
}

function getCommitmentSumPerAZ(az) {
  let commitmentSum = 0;
  for (const duration in az.committed) {
    commitmentSum += az.committed[duration] || 0;
  }
  return commitmentSum;
}

export function getQuotaForLeftBar(resource) {
  const commitments = resource.commitmentSum;
  if (commitments > 0) {
    return commitments;
  }
  if (resource.hasOwnProperty("capacity")) {
    return resource.capacity;
  }
  if (tracksQuota(resource)) {
    return resource.quota;
  } else {
    return resource.usage;
  }
}

export function getQuotaForRightBar(resource) {
  const commitments = resource.commitmentSum;
  if (resource.hasOwnProperty("capacity")) {
    return resource.capacity - commitments;
  }
  if (tracksQuota(resource)) {
    return resource.quota - commitments;
  } else {
    return resource.usage - commitments;
  }
}
