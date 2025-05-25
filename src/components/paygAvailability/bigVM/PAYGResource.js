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

import React from "react";
import { Stack, Icon, Tooltip, TooltipContent, TooltipTrigger } from "@cloudoperators/juno-ui-components";
import { t } from "../../../lib/utils";
import { Unit } from "../../../lib/unit";
import { isAZUnaware } from "../../../lib/utils";
import { getTotalUsageForRightBar } from "../../../lib/resourceBarValues";

function createTooltip(resource, tooltipContent) {
  return (
    <Stack className="justify-end items-center" gap="1">
      <Tooltip triggerEvent="hover">
        <TooltipTrigger>
          <Icon size="12px" icon="info" />
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-sm p-0">{tooltipContent}</span>
        </TooltipContent>
      </Tooltip>
    </Stack>
  );
}

const PAYGResource = (props) => {
  const { resource, cerebro, az, azIndex } = props;
  const azValues = az;
  const unit = new Unit(resource.unit);
  const azUnaware = isAZUnaware(resource.per_az);

  // Guard clause - Prevent AZ unaware resource from displaying under other AZ's!
  if (azUnaware && azIndex > 0) {
    return;
  }

  function getAZUnawareAvailability() {
    const paygUsage = getTotalUsageForRightBar(resource);
    const totalUsage = resource.commitmentSum + paygUsage;
    const capacity = resource.capacity ?? 0;
    return capacity - totalUsage;
  }

  function getAvailableResourcesFromAZ() {
    const totalUsage = az?.commitmentSum + azValues?.uncommitted_usage || 0;
    const capacity = azValues?.capacity || 0;
    let availableResources = capacity - totalUsage;
    return availableResources;
  }

  function getAvailableResourcesFromCerebro() {
    // All other resources get handled exclusively by limes.
    if (!cerebro) {
      return getAvailableResourcesFromAZ();
    }
    const availableCerebroFlavors = Object.values(cerebro);
    const unusedCommitments = azValues?.unused_commitments || 0;

    return availableCerebroFlavors - unusedCommitments;
  }

  const availableResources = azUnaware ? getAZUnawareAvailability() : getAvailableResourcesFromCerebro();

  return (
    <Stack key={resource.name} direction="horizontal" gap="1" className="items-center">
      <span
        className={`box-border h-2 w-2 ${
          availableResources > 0 ? "bg-theme-success" : "bg-theme-warning"
        } rounded-full`}
      ></span>
      <Stack gap="1" className="items-center">
        <span className="font-medium">{t(resource.name)}</span>
        {cerebro && createTooltip(resource, "Estimated with Cerebro")}
        {azUnaware && createTooltip(resource, "Resource is AZ unaware.")}
      </Stack>
      <span className="text-xs">
        {availableResources < 0 ? unit.format(0) : unit.format(availableResources)} available
      </span>
    </Stack>
  );
};

export default PAYGResource;
