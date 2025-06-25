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
import { resourceBar } from "./ResourceBar";
import { Unit } from "../../lib/unit";
import { getBaseQuotaObject, hasAnyBarValues } from "./resourceBarUtils";
import { CustomZones } from "../../lib/constants";
import { globalStore } from "../StoreProvider";
import { Scope } from "../../lib/scope";

export function getCommittedUsageInfo(leftBar = resourceBar, unit = new Unit()) {
  const remaining = leftBar.available - leftBar.utilized;
  switch (true) {
    case remaining === 0:
      return `Committments are fully utilized.`;
    case remaining > 0:
      return (
        <>
          Unused committments: <strong>{unit.format(remaining)}</strong>
        </>
      );
    default:
      return `Displayed usage should not exceed commitments. Please report your case.`;
  }
}

export function getPaygInfo(rightBar = resourceBar, unit) {
  switch (true) {
    case rightBar.utilized >= 0:
      return (
        <>
          Pay as you go usage: <strong>{unit.format(rightBar.utilized)}</strong>
        </>
      );
    default:
      return `Invalid pay as you go usage detected. Please report your case.`;
  }
}

export function getBaseQuotaInfo(resource, unit) {
  const anyAZ = getBaseQuotaObject(resource);
  if (!anyAZ) return;
  return (
    <>
      Remaining base quota: <strong>{unit.format(anyAZ.quota)}</strong>. Commitments or usage assign quota to this AZ.
    </>
  );
}

export function getRemainingQuotaIsNegativeInfo(
  resource,
  rightBar = resourceBar,
  unit = new Unit(),
  scope = new Scope()
) {
  const sections = [];
  const availableIsNegative = rightBar.available < 0;
  if (!availableIsNegative) return sections;

  if (scope.isCluster()) {
    sections.push(<>Remaining capacity is: {unit.format(rightBar.available)}. Resource might not report capacity.</>);
    return sections;
  }

  const anyAZ = getBaseQuotaObject(resource);
  if (anyAZ) {
    sections.push(
      <>
        Remaining quota is: <strong>{unit.format(rightBar.available)}</strong>. Base quota is in the process of being
        applied.
      </>
    );
    sections.push(`Please refresh the page to receive updated quota values.`);
    return sections;
  }
}

const ResourceInfo = (props) => {
  const { parent, resource, unit } = { ...props };
  const { leftBar, rightBar } = { ...props };
  const hasLeftBar = hasAnyBarValues(leftBar);
  const hasRightBar = hasAnyBarValues(rightBar);
  const { scope } = globalStore();

  const resourceInfos = React.useMemo(() => {
    const infos = [];

    if (resource.name === CustomZones.UNKNOWN) {
      infos.push("This AZ contains assets in error states.");
    }
    if (hasLeftBar) {
      infos.push(getCommittedUsageInfo(leftBar, unit));
    }
    if (hasRightBar) {
      infos.push(getPaygInfo(rightBar, unit));
    }
    if (parent) {
      infos.push(getBaseQuotaInfo(parent, unit));
    }
    infos.push(...getRemainingQuotaIsNegativeInfo(parent || resource, rightBar, unit, scope));

    return infos;
  }, [parent, resource, leftBar, rightBar]);

  console.log(resourceInfos);

  return (
    <IntroBox className="my-1 text-sm">
      {resourceInfos.map((info, index) => (
        <p key={index}>{info}</p>
      ))}
    </IntroBox>
  );
};

export default ResourceInfo;
