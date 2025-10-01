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
import { IntroBox } from "@cloudoperators/juno-ui-components/index";
import { hasAnyBarValues } from "./resourceBarUtils";
import { locateBaseQuotaAZ } from "../../lib/utils";
import { CustomZones } from "../../lib/constants";
import { Unit } from "../../lib/unit";
import {
  UnknownAZLabel,
  CommittedUsageLabels,
  PAYGLabels,
  BaseQuotaLabels,
  NegativeRemainingQuotaLabels,
  AllocationRatio,
  FullResourceName,
  Autogrowth,
} from "./resourceInfoLabels";
import { Scope } from "../../lib/scope";

const ResourceInfo = (props) => {
  const {
    scope = new Scope(),
    categoryName,
    resource,
    az,
    unit = new Unit(""),
    isEmptyBar,
    isGranular,
    isEditableResource,
  } = { ...props };
  const { leftBar, rightBar } = { ...props };
  const hasLeftBar = hasAnyBarValues(leftBar);
  const hasRightBar = hasAnyBarValues(rightBar);
  const resourceInfos = React.useMemo(() => {
    const infos = [];

    if (!isGranular) {
      infos.push(getFullResourceName());
      infos.push(...getAutoGrowthInfo());
    }

    if (isEmptyBar) {
      return infos;
    }

    if (scope.isCluster()) {
      infos.push(getCapacityAllocationRatio());
    }
    if (az?.name === CustomZones.UNKNOWN) {
      infos.push(UnknownAZLabel);
    }
    if (hasLeftBar) {
      infos.push(getCommittedUsageInfo());
    }
    if (hasRightBar) {
      infos.push(getPaygInfo());
    }
    if (!scope.isCluster()) {
      infos.push(...getBaseQuotaInfo());
    }
    infos.push(...getNegativeRemainingQuotaInfo());

    return infos;
  }, [scope, resource, az, leftBar, rightBar]);

  function getFullResourceName() {
    return FullResourceName.LABEL(categoryName, resource.name);
  }

  function getAutoGrowthInfo() {
    const autogrowthForbidden = resource?.forbid_autogrowth ?? false;
    const maxQuota = resource?.max_quota;
    const sections = [];
    if (autogrowthForbidden) {
      sections.push(Autogrowth.FORBIDDEN);
    }
    if (maxQuota >= 0) {
      sections.push(Autogrowth.MAXQUOTA);
    }
    if (autogrowthForbidden && maxQuota >= 0) {
      sections.push(Autogrowth.OVERLAP);
    }
    return sections;
  }

  function getCapacityAllocationRatio() {
    let allocationRatio = (
      ((rightBar.utilized + leftBar.available) / (rightBar.available + leftBar.available)) *
      100
    ).toFixed(2);

    if (isFinite(allocationRatio)) {
      allocationRatio += " %";
    }

    return AllocationRatio.LABEL(allocationRatio);
  }

  function getCommittedUsageInfo() {
    const remaining = leftBar.available - leftBar.utilized;

    if (remaining === 0) {
      return CommittedUsageLabels.FULLY_UTILIZED;
    }

    if (remaining > 0) {
      return CommittedUsageLabels.UNUSED(unit.format(remaining));
    }
    return CommittedUsageLabels.INVALID;
  }

  function getPaygInfo() {
    if (rightBar.utilized == 0) {
      return PAYGLabels.UNAVAILABLE;
    }
    if (rightBar.utilized > 0) {
      if (isEditableResource) {
        return PAYGLabels.AVAILABLE(unit.format(rightBar.utilized));
      } else {
        return PAYGLabels.AVAILABLE_BASIC(unit.format(rightBar.utilized));
      }
    }
    if (rightBar.utilized < 0) {
      return PAYGLabels.INVALID;
    }
  }

  function getBaseQuotaInfo() {
    const baseQuotaAZ = locateBaseQuotaAZ(resource);
    const sections = [];
    if (!baseQuotaAZ) return sections;
    const totalQuota = unit.format(resource.quota);
    const remainingBaseQuota = unit.format(baseQuotaAZ.quota);
    const deductedBaseQuota = unit.format(resource.quota - baseQuotaAZ.quota);
    !az && sections.push(BaseQuotaLabels.REMAINING({ totalQuota, remainingBaseQuota, deductedBaseQuota }));
    !az && sections.push(BaseQuotaLabels.BASEINFO);
    az && az.name != CustomZones.UNKNOWN && sections.push(BaseQuotaLabels.AZINFO(az));
    return sections;
  }

  function getNegativeRemainingQuotaInfo() {
    const sections = [];
    const availableIsNegative = rightBar.available < 0;
    if (!availableIsNegative) return sections;

    if (scope.isCluster()) {
      sections.push(NegativeRemainingQuotaLabels.CAPACITY(unit.format(rightBar.available)));
      return sections;
    }

    const hasAnyAZ = locateBaseQuotaAZ(resource);
    if (hasAnyAZ) {
      sections.push(NegativeRemainingQuotaLabels.QUOTA(unit.format(rightBar.available)));
      sections.push(NegativeRemainingQuotaLabels.REFRESH);
      return sections;
    }
    return sections;
  }

  return (
    resourceInfos.length > 0 && (
      <IntroBox className="my-1 text-sm">
        {resourceInfos.map((info, index) => (
          <div key={index}>{info}</div>
        ))}
      </IntroBox>
    )
  );
};

export default ResourceInfo;
