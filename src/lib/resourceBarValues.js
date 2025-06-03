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

// SUM-Bar (Bar over all AZ's) calculation -> loops over all AZ's.
// Domain and Cluster Level calculate their usage values with unused_commitments
export function getTotalCommittedUsage(resource) {
  const AZs = resource.per_az;
  if (!AZs) return;
  let totalUsage = 0;

  AZs.forEach((az) => {
    // No commitments available => No usage gets added to the left bar, because it's uncommitted usage.
    totalUsage += getCommittedUsage(az);
  });

  return totalUsage;
}

export function getTotalUncommittedUsage(resource) {
  const AZs = resource.per_az;
  if (!AZs) return;
  let totalUsage = 0;

  AZs.forEach((az) => {
    totalUsage += getUncommittedUsage(az);
  });

  return totalUsage;
}

// AZ calculation
// No unused commitments means either: a) usage = commitments b) no commitments available
export function getCommittedUsage(az) {
  if (az.commitmentSum == 0) {
    return 0;
  }
  // domain/cluster level
  if (az.hasOwnProperty("unused_commitments")) {
    const commitmentSum = az.commitmentSum;
    return commitmentSum - az.unused_commitments;
  }
  // project level:
  const usage = getUsageForAZLevel(az);
  let usageValue = 0;
  if (usage > az.commitmentSum) {
    usageValue = az.commitmentSum;
  } else {
    usageValue = usage;
  }
  return usageValue;
}

export function getUncommittedUsage(az) {
  const commitmentSum = az.commitmentSum;
  const usage = getUsageForAZLevel(az);
  let rightBarUsage = az.uncommitted_usage ?? usage - (commitmentSum - (az.unused_commitments || 0));
  if (rightBarUsage < 0) {
    rightBarUsage = 0;
  }

  return rightBarUsage;
}

// Capacity calculation
export function getAvailableCapacity(resource) {
  const commitments = resource.commitmentSum;
  if (commitments > 0) {
    return commitments;
  }
  return 0;
}

export function getRemainingCapacity(resource) {
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
  console.log(resource)
  if (resource.hasOwnProperty("capacity")) {
    return "No capacity";
  } else {
    return "No quota";
  }
}
