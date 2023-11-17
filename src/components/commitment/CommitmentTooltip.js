import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "juno-ui-components";

const CommitmentTooltip = (props) => {
  const { displayText, toolTipContent, emptyText } = { ...props };

  return displayText ? (
    <Tooltip triggerEvent="hover">
      <TooltipTrigger>{displayText}</TooltipTrigger>
      <TooltipContent>{toolTipContent}</TooltipContent>
    </Tooltip>
  ) : (
    emptyText
  );
};

export default CommitmentTooltip;
