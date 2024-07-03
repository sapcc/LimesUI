import React from "react";
import {
  Icon,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "juno-ui-components";

const HistoricalUsage = (props) => {
  const { az } = props;
  const minUsage = az?.historical_usage?.min_usage ?? -1;
  const azUsage = az.usage;
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
            Usage increased by {(azUsage / (minUsage || 1) - 1) * 100} %
            recently
          </span>
        </TooltipContent>
      </Tooltip>
    )
  );
};

export default HistoricalUsage;
