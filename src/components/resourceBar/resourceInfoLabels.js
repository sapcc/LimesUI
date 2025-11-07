// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";

export const FullResourceName = {
  LABEL: (categoryName, resourceName) => (
    <span data-testid="fullResourceName">
      Full name: <strong>{categoryName + "/" + resourceName}</strong>
    </span>
  ),
};

export const Autogrowth = {
  FORBIDDEN: (
    <span data-testid="autogrowthForbidden">
      Pay-As-You-Go is disabled. Existing PAYG-usage might still be present, but any further provisioning from PAYG will
      be prevented.
    </span>
  ),
  MAXQUOTA: <span data-testid="maxQuota">Max-Quota is active. Assigned quota will not exceed the limit.</span>,
  OVERLAP: (
    <span data-testid="maxQuota_AND_AutogrowthForbidden">
      Disabling Pay-As-You-Go is more restrictive than setting Max-Quota.
    </span>
  ),
};

export const AllocationRatio = {
  LABEL: (ratio) => (
    <span data-testid="allocationRatio">
      Capacity allocation ratio: <strong>{ratio}</strong>
    </span>
  ),
};

export const UnknownAZLabel = (
  <span data-testid="UnknownAZ">
    This usage number accounts for assets in error states that are not associated with a real AZ.
  </span>
);

export const CommittedUsageLabels = {
  FULLY_UTILIZED: <span data-testid="CommittedUsage.FULLY_UTILIZED">Commitments are fully utilized.</span>,
  UNUSED: (amount) => (
    <span data-testid="CommittedUsage.UNUSED">
      Unused commitments: <strong>{amount}</strong>.{" "}
    </span>
  ),
  INVALID: (
    <span data-testid="CommittedUsage.INVALID">
      Displayed commitment usage should not exceed commitment amount. Please create a support ticket.
    </span>
  ),
};

export const PAYGLabels = {
  AVAILABLE: (amount, isEditableResource) => (
    <span data-testid={`${isEditableResource ? "PAYG.AVAILABLE" : "USAGE.AVAILABLE"}`}>
      {isEditableResource ? "Pay-As-You-Go usage" : "Usage"}: <strong>{amount}</strong>.
    </span>
  ),
  UNAVAILABLE: (isEditableResource) => (
    <span data-testid={`${isEditableResource ? "PAYG.UNAVAILABLE" : "USAGE.UNAVAILABLE"}`}>
      No {isEditableResource && "Pay-As-You-Go "} usage present.
    </span>
  ),
  INVALID: (isEditableResource) => (
    <span data-testid={`${isEditableResource ? "PAYG.INVALID" : "USAGE.INVALID"}`}>
      Invalid {isEditableResource && "Pay-As-You-Go "} usage detected. Please create a support ticket.
    </span>
  ),
};

export const BaseQuotaLabels = {
  REMAINING: ({ totalQuota, remainingBaseQuota, deductedBaseQuota }) => (
    <p data-testid="BaseQuota.AVAILABLE">
      Base quota: <strong>{remainingBaseQuota}</strong> out of the original <strong>{totalQuota}</strong> are still
      available. <strong>{deductedBaseQuota}</strong> have been deducted because of AZ-aware quotas based on existing
      commitments and usage.
    </p>
  ),
  AZINFO: () => (
    <span data-testid="BaseQuota.AZ">
      Resources in this AZ can also be deployed using the region-wide base quota seen above.
    </span>
  ),
  BASEINFO: (
    <span>Base quota can be used to deploy into any AZ of your choice. Quota does not incur costs until used.</span>
  ),
};

export const NegativeRemainingQuotaLabels = {
  CAPACITY: (amount) => (
    <span data-testid="NegativeRemainingQuota.CAPACITY">
      Remaining capacity is: <strong>{amount}</strong>. Resource might not report capacity.
    </span>
  ),
  QUOTA: (amount) => (
    <span data-testid="NegativeRemainingQuota.QUOTA">
      Assigned quota is: <strong>{amount}</strong>. Base quota application is processing.
    </span>
  ),
  REFRESH: (
    <span data-testid="NegativeRemainingQuota.REFRESH">
      Please refresh the page after a while to receive updated quota values.
    </span>
  ),
};
