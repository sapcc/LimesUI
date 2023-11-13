import React, { useState, useEffect, useRef } from 'react';
import { Stack } from "juno-ui-components";


const LABEL_MARGIN = 10
const resourceBarWrapper = ``

const barConainer = `
  mb-2 
  min-w-full 
  gap-1
`

const baseResourceBar = `
  rounded 
  border 
  border-theme-background-lvl-5 
  flex 
  p-0.5
  h-8
`
const emptyResourceBar = `
  bg-theme-background-lvl-2 
  `
const filledResourceBar =`
  text-white 
  bg-sap-blue-3 
  has-label-if-fits 
  rounded-sm 
  `
const emptyExtraResourceBar =`
  bg-theme-background-lvl-4 

  `
const filledExtraResourceBar =`
  text-white 
  bg-sap-purple-2 
  has-label-if-fits 
  rounded-sm  
  `
const noneResourceBar =`
  rounded 
  border 
  border-theme-background-lvl-4 
  px-2 
  font-bold 
  text-theme-light 
  italic
  `
const barLable =`
  px-1
`
  
  
// TODO: Move Unit calculation to parent component.
// TODO: Hardocde commitment data if necesary -> Restructure the component accordingly.
const ResourceBar = (props) => {
  const outerDivRef = React.useRef(null);
  const {
    capacity,
    capacityLabel,
    fill,
    fillLabel,
    commitment,
    showsCapacity,
    labelIsUsageOnly,
    extraCapacityLabel,
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
    bar.querySelector('.progress-bar-label').classList.toggle('label-fits', labelWidth + LABEL_MARGIN < barWidth);

    //re-run this method after animations have completed
    if (!opts.delayed) {
      window.setTimeout(() => checkIfLabelFits({ delayed: true }), 500);
    }
  }


  function buildResourceBar() {
    // First handle the creation of an empty bar.
    if (capacity == 0 && fill == 0) {
      return (
        <div
          key="filled"
          className={noneResourceBar}
          style={{ width: "100%" }}
        >
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
    let widthCommitment = (widthPercent * 0.2)
    //special cases: purple
    let className = "progress-bar";
    if (fill == capacity) {
      className = "progress-bar bg-sap-purple-2";
    }

    const label = labelIsUsageOnly ? (
      <span className={`progress-bar-label ${barLable}`}>{fillLabel}</span>
    ) : (
      <span className={`progress-bar-label ${barLable}`}>{fillLabel}/{capacityLabel} committed</span>
    );
    const extraFillLable = fill > capacity ? fill - capacity : "0";
    const extraLable = <span className={`progress-bar-label ${barLable}`}>{extraFillLable}/{extraCapacityLabel}</span>;

    let filled = className;
    let barStyleFilled = { width: widthPercent + "%" };
    let barStyleCommitment = { width: widthCommitment + "%" };
    let barStyleEmpty = {};
    if (disabled) {
      filled = "progress-bar progress-bar-disabled has-label";
      // barStyleFilled["opacity"] = 0.6;
      // barStyleEmpty["opacity"] = 0.6;
    }


    const resourceBar = 

      <Stack distribution="between" className={`process-bar-container ${barConainer}`}>
                <div className={`main-bar ${baseResourceBar} ${emptyResourceBar}`} style={{ width: "100%" }}>
                  <div
                    key="filled"
                    className={`main-fill ${filled} ${filledResourceBar}`}
                    style={fill > 0 ? barStyleFilled : { width: "0%" }}
                  >
                    {/* {label} */}
                  </div>
                  {/* <div
                    key="empty"
                    className="progress-bar has-label-unless-fits"
                    style={barStyleEmpty}
                  >
                    {label}
                  </div> */}
                  {label}
                </div>

          {commitment ? [
                <div className={`extra-bar ${baseResourceBar} ${emptyExtraResourceBar}`} style={{ width: "30%" }}>
                    <div
                      key="extra-filled"
                      className={`extra-fill ${filled} ${filledExtraResourceBar}`}
                      style={fill > capacity ? barStyleCommitment : { width: "0%" }}
                    >
                      
                    </div>
                    {extraLable}
                    {/* <div
                      key="extra-mpty"
                      className="progress-bar has-label-unless-fits"
                      style={barStyleEmpty}
                    >
                      {extraLable}
                    </div> */}
              </div>
          ]:""}
    </Stack>

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
