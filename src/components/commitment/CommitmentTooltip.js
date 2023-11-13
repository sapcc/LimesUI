import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "juno-ui-components";

const CommitmentTooltip = (props) => {
  const { displayText, toolTipContent } = { ...props };

  return (
    <Tooltip triggerEvent="hover">
      <TooltipTrigger>{displayText}</TooltipTrigger>
      <TooltipContent>{toolTipContent}</TooltipContent>
    </Tooltip>
  );
};

export default CommitmentTooltip;
