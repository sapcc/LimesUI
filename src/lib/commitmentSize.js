// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { locateBaseQuotaAZ } from "./utils";

export const REASON = {
  LARGE: "tooLarge",
  SMALL: "tooSmall",
  COVERED: "usageAlreadyCovered",
};

export const FACTOR = {
  LARGE: 1.5,
  SMALL: 0.05,
};

// Returns a size or coverage warning, or an empty object.
// Prefer actual usage, then existing reservations, then quota headroom.
export function checkForReasonableSizedCommitment(amount, resource, azName) {
  const availabilityZones = resource?.per_az ?? [];
  const currentAZ = availabilityZones.find((az) => az.name === azName);

  // Coverage based check
  const currentUsage = currentAZ?.usage;
  if (currentUsage > 0 && currentAZ?.commitmentSum >= currentUsage) {
    return createWarning(REASON.COVERED, "commitments cover usage", currentAZ.commitmentSum);
  }

  // Usage based check
  if (currentUsage > 0) {
    return checkSizeBoundaries(amount, currentUsage, FACTOR.LARGE, FACTOR.SMALL, "current usage");
  }

  // Commitment based check
  const baseCommitmentSum = currentAZ?.commitmentSum || resource?.commitmentSum;
  if (baseCommitmentSum > 0) {
    return checkSizeBoundaries(amount, baseCommitmentSum, FACTOR.LARGE, FACTOR.SMALL, "existing commitments");
  }

  // Quota based check
  const baseQuotaAZ = locateBaseQuotaAZ(resource);
  const baseQuotaValue = [currentAZ?.quota, baseQuotaAZ?.quota, resource?.quota].find((quota) => quota > 0);
  if (baseQuotaValue > 0) {
    return checkSizeBoundaries(amount, baseQuotaValue, FACTOR.LARGE, FACTOR.SMALL, "available quota");
  }
  return {};
}

function checkSizeBoundaries(amount, baseValue, largeThreshold, smallThreshold, source) {
  if (amount >= baseValue * largeThreshold) {
    return createWarning(REASON.LARGE, source, baseValue);
  }

  if (amount <= baseValue * smallThreshold) {
    return createWarning(REASON.SMALL, source, baseValue);
  }
  return {};
}

export function createWarning(reason, source, base) {
  return { reason: reason, source: source, base: base };
}
