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
import { Stack } from "@cloudoperators/juno-ui-components";

const resourceBarWrapper = ``;

const barConainer = `
  min-w-full 
  gap-1
`;
const baseResourceBar = `
  rounded-sm 
  border 
  border-theme-background-lvl-5 
  flex 
`;
const filledResourceBar = `
  text-white 
  bg-sap-blue-3 
  rounded-sm 
  `;
const baseBarBackground = `
  bg-theme-background-lvl-2 
  `;
const extraBarBackground = `
  bg-theme-background-lvl-4 
  `;
const filledExtraResourceBar = `
  text-white
  bg-sap-purple-2
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
const barLabel = `
  font-bold
`;
const disabledLabel = `
  text-theme-light 
  italic
  px-1
  text-sm
  font-bold
`;
const usageExceedsCapacity = "repeating-linear-gradient(55deg,#c9302c ,#c9302c  8px,#d9534f 8px,#d9534f 16px)";

export const resourceBar = {
  utilized: 0,
  available: 0,
};

const ResourceBar = (props) => {
  const outerDivRef = React.useRef(null);
  const { usageLabel, leftBar, rightBar, formatter, showsCapacity, commitment, isAZ } = props;

  function buildResourceBar() {
    // First handle the creation of an empty bar.
    if (rightBar.utilized == 0 && rightBar.available == 0) {
      return (
        <Stack direction="vertical" distribution="between">
          <span className={`progress-bar-label ${disabledLabel} ${isAZ ? "text-xs" : "text-sm"}`}>
            {showsCapacity ? "No capacity" : "No quota"}
          </span>
          <div key="filled" className={`${noneResourceBar} ${isAZ ? "h-4" : "h-8"}`} style={{ width: "100%" }}></div>
        </Stack>
      );
    }

    let widthPercent = Math.round(1000 * (leftBar.utilized / leftBar.available)) / 10;
    // ensure that a non-zero-wide bar is at least somewhat visible
    if (leftBar.utilized > 0 && widthPercent < 0.5) {
      widthPercent = 0.5;
    }
    let widthCommitment = Math.round((1000 * rightBar.utilized) / rightBar.available) / 10;

    let gradientSingleBar;
    if (leftBar.utilized > leftBar.available) {
      gradientSingleBar = {
        background: usageExceedsCapacity,
      };
    }

    let gradientExtraBar;
    if (rightBar.utilized > rightBar.available) {
      gradientExtraBar = {
        background: usageExceedsCapacity,
      };
    }

    const label = (
      <span className={`progress-bar-label ${barLabel} ${props.isAZ && "text-xs"}`}>
        {formatter(leftBar.utilized)}/{formatter(leftBar.available)}{" "}
        {commitment > 0 ? (
          <span className="font-normal">committed</span>
        ) : (
          <span className="font-normal">{usageLabel}</span>
        )}
      </span>
    );

    const extraLabel = (
      <span className={`progress-bar-label ${barLabel} ${props.isAZ && "text-xs"}`}>
        {formatter(rightBar.utilized)}/{formatter(rightBar.available)}
      </span>
    );

    let barStyleFilled = {
      width: widthPercent + "%",
      background: gradientSingleBar?.background,
    };
    let barStyleCommitment = {
      width: widthCommitment + "%",
      background: gradientExtraBar?.background,
    };

    const resourceBar = (
      <Stack distribution="between" className={`${barConainer}`}>
        {commitment > 0 && (
          <Stack direction="vertical" distribution="between" style={{ width: "70%" }}>
            {label}
            <div className={`${baseResourceBar} ${baseBarBackground} ${isAZ ? "h-4 p-0" : "h-8 p-0.5"}`}>
              <div key="base-bar" className={`${filledResourceBar}`} style={barStyleFilled} />
            </div>
          </Stack>
        )}

        <Stack direction="vertical" distribution="between" style={{ width: commitment > 0 ? "30%" : "100%" }}>
          {extraLabel}
          <div className={`${baseResourceBar} ${commitment > 0 ? extraBarBackground : baseBarBackground} ${isAZ ? "h-4 p-0" : "h-8 p-0.5"}`}>
            <div key="extra-bar" className={`${filledExtraResourceBar}`} style={barStyleCommitment} />
          </div>
        </Stack>
      </Stack>
    );
    return resourceBar;
  }

  return (
    <div className={resourceBarWrapper} ref={outerDivRef}>
      {buildResourceBar()}
    </div>
  );
};

export default ResourceBar;
