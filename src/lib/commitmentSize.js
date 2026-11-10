// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { locateBaseQuotaAZ } from "./utils";

export const FACTOR = {
  LARGE: 1.5,
  SMALL: 0.05,
  MAX_USAGE_RATIO: 1.5,
};

export const REASON = {
  LARGE: "tooLarge",
  SMALL: "tooSmall",
  COVERED: "usageAlreadyCovered",
};

export const SOURCE = {
  USAGE: "current usage",
  COMMITMENTS: "existing commitments",
  COVERED: "commitments already cover current usage",
  QUOTA: "available quota",
};

// Returns a size or coverage warning, or an empty object.
// Check resulting commitments and request size against current usage.
export function checkForReasonableSizedCommitment(amount, resource, azName) {
  const currentAZ = resource?.per_az?.find((az) => az.name === azName);
  const currentUsage = currentAZ?.usage;
  const currentCommitmentSum = currentAZ?.commitmentSum ?? 0;
  const resultingCommitmentSum = currentCommitmentSum + amount;
  const withinUsageTolerance = resultingCommitmentSum <= currentUsage * FACTOR.MAX_USAGE_RATIO;

  // Check the request against covered usage.
  if (currentCommitmentSum > 0 && currentCommitmentSum >= currentUsage) {
    if (!withinUsageTolerance) {
      return createWarning(REASON.COVERED, SOURCE.COVERED, currentCommitmentSum);
    }
    return {};
  }

  // Check the request against uncovered usage.
  if (currentUsage > currentCommitmentSum) {
    if (!withinUsageTolerance) {
      return createWarning(REASON.LARGE, SOURCE.USAGE, currentUsage);
    }
    if (amount <= currentUsage * FACTOR.SMALL) {
      return createWarning(REASON.SMALL, SOURCE.USAGE, currentUsage);
    }
    return {};
  }

  // Resource-wide commitment fallback. AZ commitments are accounted for above.
  if (resource?.commitmentSum > 0) {
    return checkSizeBoundaries(amount, resource?.commitmentSum, FACTOR.LARGE, FACTOR.SMALL, SOURCE.COMMITMENTS);
  }

  // Quota based check
  const baseQuotaAZ = locateBaseQuotaAZ(resource);
  const baseQuotaValue = [currentAZ?.quota, baseQuotaAZ?.quota, resource?.quota].find((quota) => quota > 0);
  if (baseQuotaValue > 0) {
    return checkSizeBoundaries(amount, baseQuotaValue, FACTOR.LARGE, FACTOR.SMALL, SOURCE.QUOTA);
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
