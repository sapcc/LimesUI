import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "juno-ui-components";

const CommitmentTooltip = (props) => {
  const { displayText, toolTipContent } = { ...props };

  return (
    displayText && (
      <Tooltip triggerEvent="hover">
        <TooltipTrigger asChild>
          <span>{displayText}</span>
        </TooltipTrigger>
        <TooltipContent>{toolTipContent}</TooltipContent>
      </Tooltip>
    )
  );
};

export default CommitmentTooltip;
