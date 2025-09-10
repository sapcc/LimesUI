/**
 * Copyright 2025 SAP SE
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

import React from "react";

export const FullResourceName = {
  LABEL: (categoryName, resourceName) => (
    <span data-testid="fullResourceName">
      Full name: <strong>{categoryName + "/" + resourceName}</strong>
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
  AVAILABLE: (amount) => (
    <span data-testid="PAYG.AVAILABLE">
      Pay-As-You-Go usage: <strong>{amount}</strong>.
    </span>
  ),
  UNAVAILABLE: <span data-testid="PAYG.UNAVAILABLE">No Pay-As-You-Go usage present.</span>,
  INVALID: (
    <span data-testid="PAYG.INVALID">Invalid Pay-As-You-Go usage detected. Please create a support ticket.</span>
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
