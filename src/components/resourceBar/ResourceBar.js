// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Stack, Tooltip, TooltipContent, TooltipTrigger } from "@cloudoperators/juno-ui-components";

const baseResourceBar = `
rounded-sm 
border 
border-theme-background-lvl-5 
flex 
`;
const baseBarBackground = `bg-theme-background-lvl-2`;
const filledResourceBar = `
text-white
rounded-sm 
`;
const noneResourceBar = `
rounded-sm 
border 
border-theme-background-lvl-4
flex 
p-0.5
text-theme-light 
italic
`;
const disabledLabel = `
text-theme-light 
italic
px-1
text-sm
font-bold
`;

const filledBarBackground = `bg-sap-blue-3`;
const utilizedExceedsAvailable = `utilized-exceeds-available`;

export const resourceBar = {
  utilized: 0,
  available: 0,
};

export const barStyles = {
  base: null,
  filled: null,
};

export function getAppliedBarColors(barValues, style = barStyles) {
  if (barValues.utilized > barValues.available) {
    return utilizedExceedsAvailable;
  }
  if (style.filled) {
    return style.filled;
  }
  return filledBarBackground;
}

const ResourceBar = (props) => {
  const {
    barValues,
    barLabel,
    variant = "small",
    isEmptyBar = false,
    styles = { ...barStyles },
    containerWidth = 100,
    toolTip = "",
  } = props;

  if (isEmptyBar) {
    const barVariant = { small: "h-4", large: "h-8" };
    const textVariant = { small: "text-xs", large: "text-sm" };
    return (
      <Stack direction="vertical" distribution="between" style={{ width: "100%" }}>
        <span className={`progress-bar-label ${disabledLabel} ${textVariant[variant]}`}>{barLabel}</span>
        <div key="filled" className={`${noneResourceBar} ${barVariant[variant]}`} />
      </Stack>
    );
  }

  let widthPercent = Math.round(1000 * (barValues.utilized / barValues.available)) / 10;
  if (barValues.utilized > 0 && barValues.available == 0) {
    widthPercent = 100;
  }
  // ensure that a non-zero-wide bar is at least somewhat visible
  if (barValues.utilized > 0 && widthPercent < 0.5) {
    widthPercent = 0.5;
  }

  const barStyle = {
    width: widthPercent + "%",
    background: getAppliedBarColors(barValues, styles),
  };

  const barVariant = {
    small: "h-4 p-0",
    large: "h-8 p-0.5",
  };

  function buildResourceBar() {
    return (
      <div className={`${baseResourceBar} ${styles.base || baseBarBackground} ${barVariant[variant]}`}>
        <div
          key="base-bar"
          className={`${filledResourceBar} ${barStyle.background} w-[${barStyle.width}%]`}
          style={barStyle}
        />
      </div>
    );
  }

  return (
    <Stack direction="vertical" distribution="between" style={{ width: containerWidth + "%" }}>
      {barLabel}
      {toolTip ? (
        <Tooltip triggerEvent="hover">
          <TooltipTrigger>{buildResourceBar()}</TooltipTrigger>
          <TooltipContent>{toolTip}</TooltipContent>
        </Tooltip>
      ) : (
        buildResourceBar()
      )}
    </Stack>
  );
};

export default ResourceBar;
