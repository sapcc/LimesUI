import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "juno-ui-components";

const CommitmentTooltip = (props) => {
  const { displayText, toolTipContent, emptyText } = { ...props };

  return (
    <Tooltip triggerEvent="hover">
      <TooltipTrigger>
        {displayText ? displayText : emptyText}
      </TooltipTrigger>
      <TooltipContent>{toolTipContent}</TooltipContent>
    </Tooltip>
  );
};

export default CommitmentTooltip;
