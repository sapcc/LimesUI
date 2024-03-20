import React, { useState, useEffect, useRef } from "react";
import { Stack } from "juno-ui-components";

const LABEL_MARGIN = 10;
const resourceBarWrapper = ``;

const barConainer = `
  mb-2 
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
        <Stack
          direction="vertical"
          distribution="between"
          style={commitment > 0 ? { width: "70%" } : { width: "100%" }}
        >
          <span
            className={`progress-bar-label ${disabledLable} ${
              props.isAz ? "text-xs" : "text-sm"
            }`}
          >
            {showsCapacity ? "No capacity" : "No quota"}
          </span>
          <div
            key="filled"
            className={`${noneResourceBar} ${equallySized ? "h-4" : "h-8"}`}
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
    let widthCommitment =
      Math.round((1000 * extraFillValue) / extraCapacityValue) / 10;

    //special cases: purple
    let className =
      commitment > 0 || !canEdit
        ? "progress-bar"
        : "progress-bar bg-sap-purple-2";

    const label = (
      <span
        className={`progress-bar-label ${barLable} ${props.isAZ && "text-xs"}`}
      >
        {fillLabel}/{capacityLabel}{" "}
        {commitment > 0 ? (
          <span className="font-normal">committed</span>
        ) : (
          <span className="font-normal">{usageLabel}</span>
        )}
      </span>
    );

    const extraLable = (
      <span
        className={`progress-bar-label ${barLable} ${props.isAZ && "text-xs"}`}
      >
        {extraFillLabel}/{extraCapacityLabel}
      </span>
    );

    let filled = className;
    let barStyleFilled = { width: widthPercent + "%" };
    let barStyleCommitment = { width: widthCommitment + "%" };
    if (disabled) {
      filled = "progress-bar progress-bar-disabled has-label";
    }
    const resourceBar = (
      <Stack
        distribution="between"
        className={`process-bar-container ${barConainer}`}
      >
        <Stack
          direction="vertical"
          distribution="between"
          style={commitment > 0 ? { width: "70%" } : { width: "100%" }}
        >
          {label}
          <div
            className={`main-bar ${baseResourceBar} ${emptyResourceBar} ${
              isAZ ? "h-4 p-0" : "h-8 p-0.5"
            }`}
          >
            <div
              key="filled"
              className={`main-fill ${filled} ${filledResourceBar}`}
              style={fill > 0 ? barStyleFilled : { width: "0%" }}
            ></div>
          </div>
        </Stack>

        {commitment ? (
          <Stack
            direction="vertical"
            distribution="between"
            style={{ width: "30%" }}
          >
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
