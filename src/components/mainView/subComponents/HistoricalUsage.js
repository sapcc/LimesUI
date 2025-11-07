// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Icon, Tooltip, TooltipTrigger, TooltipContent } from "@cloudoperators/juno-ui-components";

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
            Usage increased by {((azUsage / (minUsage || 1) - 1) * 100).toFixed(2)} % recently
          </span>
        </TooltipContent>
      </Tooltip>
    )
  );
};

export default HistoricalUsage;
