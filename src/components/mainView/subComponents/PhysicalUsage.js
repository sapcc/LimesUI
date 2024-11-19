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
import {
  Box,
  Icon,
  Stack,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@cloudoperators/juno-ui-components";
import { Unit } from "../../../lib/unit";
import { getUsageForAZLevel } from "../../../lib/resourceBarValues";

const docLink =
  "https://documentation.global.cloud.sap/docs/customer/storage/file-storage/fs-howto/filestore-create-a-share-replica/";

const PhysicalUsage = (props) => {
  const { resource, resourceName = null, unit: unitName } = props;
  const name = resourceName ?? resource.name;
  const usage = getUsageForAZLevel(resource);
  const physicalUsage = resource?.physical_usage;
  const isWarning = physicalUsage > usage;
  const unit = new Unit(unitName);
  const displayText = `Physical Usage: ${unit.format(physicalUsage)}`;
  const isSnapshot = name == "snapshot_capacity";

  if (!isSnapshot) return;

  function createBadge() {
    return (
      <Stack className="items-center" gap="1">
        {isWarning && <Icon icon="warning" size="12px" />}
        <span className="text-xs">{displayText}</span>
      </Stack>
    );
  }

  return physicalUsage ? (
    <Box
      className={`max-w-max px-1 py-0 mt-1 ${
        isWarning && "bg-theme-warning bg-opacity-25"
      }`}
    >
      {isSnapshot && isWarning ? (
        <Stack className="items-center">
          <Tooltip triggerEvent="click">
            <TooltipTrigger>{createBadge()}</TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">
                A difference might occur due to{" "}
                <a target="_blank" rel="noopener noreferrer" href={docLink}>
                  Snapmirror
                </a>{" "}
                usage.
              </div>
            </TooltipContent>
          </Tooltip>
        </Stack>
      ) : (
        createBadge()
      )}
    </Box>
  ) : null;
};

export default PhysicalUsage;
