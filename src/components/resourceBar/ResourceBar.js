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
const emptyResourceBar = `
  bg-theme-background-lvl-2 
  `;
const filledResourceBar = `
  text-white 
  bg-sap-blue-3 
  has-label-if-fits 
  rounded-sm 
  `;
const emptyExtraResourceBar = `
  bg-theme-background-lvl-4 
  `;
const filledExtraResourceBar = `
  text-white
  bg-sap-purple-2
  has-label-if-fits 
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
const barLable = `
  font-bold
`;
const disabledLable = `
  text-theme-light 
  italic
  px-1
  text-sm
  font-bold
`;

const usageExceedsCapacity = "repeating-linear-gradient(55deg,#c9302c ,#c9302c  8px,#d9534f 8px,#d9534f 16px)";

const ResourceBar = (props) => {
  const outerDivRef = React.useRef(null);
  const {
    fillLabel,
    capacityLabel,
    extraFillLabel,
    extraCapacityLabel,
    usageLabel,
    fill,
    // determine fill size of single bar
    capacity,
    // determine if extra bar should be displayed
    commitment,
    extraFillValue,
    // determine fill size of extra bar
    extraCapacityValue,
    canEdit,
    showsCapacity,
    isAZ,
    equallySized,
  } = props;

  const disabled = false;

  function buildResourceBar() {
    // First handle the creation of an empty bar.
    if (capacity == 0 && fill == 0) {
      return (
        <Stack direction="vertical" distribution="between" style={{ width: commitment > 0 ? "70%" : "100%" }}>
          <span className={`progress-bar-label ${disabledLable} ${props.isAz ? "text-xs" : "text-sm"}`}>
            {showsCapacity ? "No capacity" : "No quota"}
          </span>
          <div
            key="filled"
            className={`${noneResourceBar} ${equallySized ? "h-4" : "h-7"}`}
            style={{ width: "100%" }}
          ></div>
        </Stack>
      );
    }

    let widthPercent = Math.round(1000 * (fill / capacity)) / 10;
    // ensure that a non-zero-wide bar is at least somewhat visible
    if (fill > 0 && widthPercent < 0.5) {
      widthPercent = 0.5;
    }
    let widthCommitment = Math.round((1000 * extraFillValue) / extraCapacityValue) / 10;

    // special cases:
    // purple: Occurs when usage > commitments. Do not display purple if resource is not managable.
    // gradient: Occurs if usage > capacity. Displays a striped bar.
    let className;
    if (commitment > 0 || !canEdit) {
      className = "progress-bar";
    } else {
      className = "progress-bar bg-sap-purple-2";
    }

    let gradientSingleBar;
    if (commitment == 0 && fill > capacity) {
      gradientSingleBar = {
        background: usageExceedsCapacity,
      };
    }

    let gradientExtraBar;
    if (commitment > 0 && extraFillValue > extraCapacityValue) {
      gradientExtraBar = {
        background: usageExceedsCapacity,
      };
    }

    const label = (
      <span className={`progress-bar-label ${barLable} ${props.isAZ && "text-xs"}`}>
        {fillLabel}/{capacityLabel}{" "}
        {commitment > 0 ? (
          <span className="font-normal">committed</span>
        ) : (
          <span className="font-normal">{usageLabel}</span>
        )}
      </span>
    );

    const extraLable = (
      <span className={`progress-bar-label ${barLable} ${props.isAZ && "text-xs"}`}>
        {extraFillLabel}/{extraCapacityLabel}
      </span>
    );

    let filled = className;
    let barStyleFilled = {
      width: widthPercent + "%",
      background: gradientSingleBar?.background,
    };
    let barStyleCommitment = {
      width: widthCommitment + "%",
      background: gradientExtraBar?.background,
    };
    if (disabled) {
      filled = "progress-bar progress-bar-disabled has-label";
    }
    const resourceBar = (
      <Stack distribution="between" className={`process-bar-container ${barConainer}`}>
        <Stack direction="vertical" distribution="between" style={{ width: commitment > 0 ? "70%" : "100%" }}>
          {label}
          <div className={`main-bar ${baseResourceBar} ${emptyResourceBar} ${isAZ ? "h-4 p-0" : "h-8 p-0.5"}`}>
            <div
              key="filled"
              className={`main-fill ${filled} ${filledResourceBar}`}
              style={fill > 0 ? barStyleFilled : { width: "0%" }}
            ></div>
          </div>
        </Stack>

        {commitment ? (
          <Stack direction="vertical" distribution="between" style={{ width: "30%" }}>
            {extraLable}
            <div
              className={`extra-bar ${baseResourceBar} ${emptyExtraResourceBar} ${
                props.isAZ ? "h-4 p-0" : "h-8 p-0.5"
              }`}
            >
              <div
                key="extra-filled"
                className={`extra-fill ${filled} ${filledExtraResourceBar}`}
                style={barStyleCommitment}
              ></div>
            </div>
          </Stack>
        ) : (
          ""
        )}
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
