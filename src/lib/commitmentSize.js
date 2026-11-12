// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { locateBaseQuotaAZ } from "./utils";

export const FACTOR = {
  LARGE: 1.5,
  SMALL: 0.05,
};

export const REASON = {
  LARGE: "tooLarge",
  SMALL: "tooSmall",
};

export const SOURCE = {
  USAGE: "current usage",
  COMMITMENTS: "existing commitments",
  QUOTA: "available quota",
};

// Returns a size or coverage warning, or an empty object.
// Check resulting commitments and request size against current usage.
export function checkForReasonablySizedCommitment(amount, resource, azName) {
  const currentAZ = resource?.per_az?.find((az) => az.name === azName);
  const currentUsage = currentAZ?.usage ?? 0;
  const currentCommitmentSum = currentAZ?.commitmentSum ?? 0;
  const resultingCommitmentSum = currentCommitmentSum + amount;

  // Check the resulting commitment sum for being too large relative to the current usage.
  // Check the requested amount for being too small relative to the current usage.
  if (currentUsage > 0 || currentCommitmentSum > 0) {
    return checkSizeBoundaries(amount, currentUsage, SOURCE.USAGE, { largeComparisonAmount: resultingCommitmentSum });
  }

  // Compare against resource-wide commitments when the selected AZ has no usage and no commitments.
  const topLevelCommitmentSum = resource?.commitmentSum;
  if (topLevelCommitmentSum > 0) {
    return checkSizeBoundaries(amount, topLevelCommitmentSum, SOURCE.COMMITMENTS);
  }

  // Quota based check
  const baseQuotaAZ = locateBaseQuotaAZ(resource);
  const baseQuotaValue = [currentAZ?.quota, baseQuotaAZ?.quota, resource?.quota].find((quota) => quota > 0);
  if (baseQuotaValue > 0) {
    return checkSizeBoundaries(amount, baseQuotaValue, SOURCE.QUOTA);
  }
  return {};
}

function checkSizeBoundaries(comparisonAmount, baseValue, source, options = {}) {
  const { largeComparisonAmount = comparisonAmount } = options;

  if (largeComparisonAmount >= baseValue * FACTOR.LARGE) {
    return createWarning(REASON.LARGE, source, largeComparisonAmount, baseValue);
  }

  if (comparisonAmount <= baseValue * FACTOR.SMALL) {
    return createWarning(REASON.SMALL, source, comparisonAmount, baseValue);
  }
  return {};
}

export function createWarning(reason, source, comparisonValue, baseValue) {
  return { reason, source, comparisonValue, baseValue };
}
