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
  rounded 
  border 
  border-theme-background-lvl-5 
  flex 
  p-0.5
  h-8
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
  rounded 
  border 
  border-theme-background-lvl-4 
  px-2 
  font-bold 
  text-theme-light 
  italic
  `;
const barLable = `
  px-1
`;

const ResourceBar = (props) => {
  const outerDivRef = React.useRef(null);
  const {
    fillLabel,
    capacityLabel,
    extraFillLabel,
    extraCapacityLabel,
    fill,
    capacity,
    commitment,
    extraCapacityValue,
    labelIsUsageOnly,
    canEdit,
    showsCapacity,
  } = props;

  const disabled = false;

  React.useLayoutEffect(() => {
    checkIfLabelFits();
  });

  function checkIfLabelFits(opts = {}) {
    const bar = outerDivRef.current; //this is the <div class="progress"/>
    if (!bar) {
      return;
    }

    //measure the width of the filled portion of the bar
    const filledBar = bar.querySelector(".has-label-if-fits");
    if (!filledBar) {
      //bar is completely full or empty, so we don't have to measure anything
      return;
    }
    const barWidth = filledBar.getBoundingClientRect().width;

    //measure the width of the label (one of them might be display:none and report width=0)
    const labelWidths = [...bar.querySelectorAll(".progress-bar-label")].map(
      (span) => span.getBoundingClientRect().width
    );
    const labelWidth = Math.max(...labelWidths);

    //require some extra wiggle room (in px) around the label to account for UI
    //margins, and because labels that fit too tightly look dumb
    bar
      .querySelector(".progress-bar-label")
      .classList.toggle("label-fits", labelWidth + LABEL_MARGIN < barWidth);

    //re-run this method after animations have completed
    if (!opts.delayed) {
      window.setTimeout(() => checkIfLabelFits({ delayed: true }), 500);
    }
  }

  function buildResourceBar() {
    // First handle the creation of an empty bar.
    if (capacity == 0 && fill == 0) {
      return (
        <div key="filled" className={noneResourceBar} style={{ width: "100%" }}>
          <span className="progress-bar-label">
            {showsCapacity ? "No capacity" : "No quota"}
          </span>
        </div>
      );
    }

    let widthPercent = Math.round(1000 * (fill / capacity)) / 10;
    // ensure that a non-zero-wide bar is at least somewhat visible
    if (fill > 0 && widthPercent < 0.5) {
      widthPercent = 0.5;
    }
    let widthCommitment =
      Math.round((1000 * (fill - capacity)) / extraCapacityValue) / 10;
    //special cases: purple
    let className =
      commitment > 0 || labelIsUsageOnly || !canEdit
        ? "progress-bar"
        : "progress-bar bg-sap-purple-2";

    const label = (
      <span className={`progress-bar-label ${barLable}`}>
        {fillLabel}/{capacityLabel}{" "}
        {commitment > 0 ? "committed" : "quota used"}
      </span>
    );

    const extraLable = (
      <span className={`progress-bar-label ${barLable}`}>
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
        <div
          className={`main-bar ${baseResourceBar} ${emptyResourceBar}`}
          style={commitment > 0 ? { width: "50%" } : { width: "100%" }}
        >
          <div
            key="filled"
            className={`main-fill ${filled} ${filledResourceBar}`}
            style={fill > 0 ? barStyleFilled : { width: "0%" }}
          ></div>
          {label}
        </div>

        {commitment ? (
          <div
            className={`extra-bar ${baseResourceBar} ${emptyExtraResourceBar}`}
            style={{ width: "50%" }}
          >
            <div
              key="extra-filled"
              className={`extra-fill ${filled} ${filledExtraResourceBar}`}
              style={fill > capacity ? barStyleCommitment : { width: "0%" }}
            ></div>
            {extraLable}
          </div>
        ) : (
          ""
        )}
      </Stack>
    );

    return resourceBar;
  }

  return (
    <>
      <style>
        {`
          .label-fits {
            color:white;
            position:absolute;
          }  
        `}
      </style>
      <div className={resourceBarWrapper} ref={outerDivRef}>
        {buildResourceBar()}
      </div>
    </>
  );
};

export default ResourceBar;
