import React from "react";
import { CustomZones } from "../../lib/constants";

export const UnknownAZLabel = <span data-testid="UnknownAZ">This AZ contains assets in error states.</span>;

export const CommittedUsageLabels = {
  FULLY_UTILIZED: <span data-testid="CommittedUsage.FULLY_UTILIZED">Commitments are fully utilized.</span>,
  UNUSED: (amount) => (
    <span data-testid="CommittedUsage.UNUSED">
      Unused commitments: <strong>{amount}</strong>{" "}
    </span>
  ),
  INVALID: (
    <span data-testid="CommittedUsage.INVALID">
      Displayed usage should not exceed commitments. Please report your case.
    </span>
  ),
};

export const PAYGLabels = {
  AVAILABLE: (amount) => (
    <span data-testid="PAYG.AVAILABLE">
      Pay as you go usage: <strong>{amount}</strong>
    </span>
  ),
  INVALID: <span data-testid="PAYG.INVALID">Invalid pay as you go usage detected. Please report your case.</span>,
};

export const BaseQuotaLabels = {
  AVAILABLE: (amount, az) => (
    <>
      <span data-testid="BaseQuota.AVAILABLE">
        Available base quota: <strong>{amount}</strong>.{" "}
      </span>{" "}
      {az && (
        <span data-testid="BaseQuota.ADDITION">
          {az.name === CustomZones.UNKNOWN ? (
            <span data-testid="BaseQuota.UNKNOWN">Usage assigns</span>
          ) : (
            <span data-testid="BaseQuota.AZ">Commitments and usage assign</span>
          )}{" "}
          quota to this AZ.
        </span>
      )}
    </>
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
    <span data-testid="NegativeRemainingQuota.REFRESH">Please refresh the page to receive updated quota values.</span>
  ),
};
