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
} from "./ResourceInfoLabels";
import { Scope } from "../../lib/scope";

const ResourceInfo = (props) => {
  const { scope = new Scope(), resource, az, unit = new Unit("") } = { ...props };
  const { leftBar, rightBar } = { ...props };
  const hasLeftBar = hasAnyBarValues(leftBar);
  const hasRightBar = hasAnyBarValues(rightBar);

  const resourceInfos = React.useMemo(() => {
    const infos = [];

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
      infos.push(getBaseQuotaInfo());
    }
    infos.push(...getNegativeRemainingQuotaInfo());

    return infos;
  }, [scope, resource, az, leftBar, rightBar]);

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
    if (rightBar.utilized >= 0) {
      return PAYGLabels.AVAILABLE(unit.format(rightBar.utilized));
    }
    if (rightBar.utilized < 0) {
      return PAYGLabels.INVALID;
    }
  }

  function getBaseQuotaInfo() {
    const baseQuotaAZ = locateBaseQuotaAZ(resource);
    if (!baseQuotaAZ) return;
    return BaseQuotaLabels.AVAILABLE(unit.format(baseQuotaAZ.quota), az);
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
    <IntroBox className="my-1 text-sm">
      {resourceInfos.map((info, index) => (
        <p key={index}>{info}</p>
      ))}
    </IntroBox>
  );
};

export default ResourceInfo;
