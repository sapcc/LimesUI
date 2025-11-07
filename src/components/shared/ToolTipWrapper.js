// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@cloudoperators/juno-ui-components";

const ToolTipWrapper = (props) => {
  const { trigger, content, triggerEvent = "hover" } = { ...props };

  return (
    trigger && (
      <Tooltip triggerEvent={triggerEvent}>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent className="z-[999]">{content}</TooltipContent>
      </Tooltip>
    )
  );
};

export default ToolTipWrapper;
