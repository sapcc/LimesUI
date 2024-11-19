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
  Icon,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@cloudoperators/juno-ui-components";

const HistoricalUsage = (props) => {
  const { resource } = props;
  const minUsage = resource?.historical_usage?.min_usage ?? -1;
  const azUsage = resource.usage;
  const matchesCondition = minUsage < 0.95 * azUsage;

  return (
    minUsage >= 0 &&
    matchesCondition && (
      <Tooltip triggerEvent="hover">
        <TooltipTrigger>
          <Icon icon="info" size="14px" color="jn-global-text" />
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-sm p-0">
            Usage increased by{" "}
            {((azUsage / (minUsage || 1) - 1) * 100).toFixed(2)} % recently
          </span>
        </TooltipContent>
      </Tooltip>
    )
  );
};

export default HistoricalUsage;
