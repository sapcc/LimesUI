import React, { useState, useEffect, useRef } from "react"
import { Stack } from "juno-ui-components"

const LABEL_MARGIN = 10
const resourceBarWrapper = ``

const barConainer = `
  mb-2 
  min-w-full 
  gap-1
`

const baseResourceBar = `
  rounded-sm 
  border 
  border-theme-background-lvl-5 
  flex 
  p-0.5
`
const emptyResourceBar = `
  bg-theme-background-lvl-2 
  `
const filledResourceBar = `
  text-white 
  bg-sap-blue-3 
  has-label-if-fits 
  rounded-sm 
  `
const emptyExtraResourceBar = `
  bg-theme-background-lvl-4 
  `
const filledExtraResourceBar = `
  text-white 
  bg-sap-purple-2 
  has-label-if-fits 
  rounded-sm  
  `
const noneResourceBar = `
  rounded-sm 
  border 
  border-theme-background-lvl-4
  flex 
  p-0.5
  text-theme-light 
  italic
  h-8
  `
const barLable = `
  text-sm
  font-bold
`
const disabledLable = `
  text-theme-light 
  italic
  px-1
  text-sm
  font-bold
`

const ResourceBar = (props) => {
  const outerDivRef = React.useRef(null)
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
    isAZ,
  } = props

  const disabled = false

  // React.useLayoutEffect(() => {
  //   checkIfLabelFits()
  // })

  // function checkIfLabelFits(opts = {}) {
  //   const bar = outerDivRef.current //this is the <div class="progress"/>
  //   if (!bar) {
  //     return
  //   }

  //   //measure the width of the filled portion of the bar
  //   const filledBar = bar.querySelector(".has-label-if-fits")
  //   if (!filledBar) {
  //     //bar is completely full or empty, so we don't have to measure anything
  //     return
  //   }
  //   const barWidth = filledBar.getBoundingClientRect().width

  //   //measure the width of the label (one of them might be display:none and report width=0)
  //   const labelWidths = [...bar.querySelectorAll(".progress-bar-label")].map(
  //     (span) => span.getBoundingClientRect().width
  //   )
  //   const labelWidth = Math.max(...labelWidths)

  //   //require some extra wiggle room (in px) around the label to account for UI
  //   //margins, and because labels that fit too tightly look dumb
  //   bar
  //     .querySelector(".progress-bar-label")
  //     .classList.toggle("label-fits", labelWidth + LABEL_MARGIN < barWidth)

  //   //re-run this method after animations have completed
  //   if (!opts.delayed) {
  //     window.setTimeout(() => checkIfLabelFits({ delayed: true }), 500)
  //   }
  // }

  function buildResourceBar() {
    // First handle the creation of an empty bar.
    if (capacity == 0 && fill == 0) {
      return (
        <Stack
          direction="vertical"
          distribution="between"
          style={commitment > 0 ? { width: "70%" } : { width: "100%" }}
        >
          <span className={`progress-bar-label ${disabledLable}`}>
            {showsCapacity ? "No capacity" : "No quota"}
          </span>
          <div
            key="filled"
            className={noneResourceBar}
            style={{ width: "100%" }}
          ></div>
        </Stack>
      )
    }

    let widthPercent = Math.round(1000 * (fill / capacity)) / 10
    // ensure that a non-zero-wide bar is at least somewhat visible
    if (fill > 0 && widthPercent < 0.5) {
      widthPercent = 0.5
    }
    let widthCommitment =
      Math.round((1000 * (fill - capacity)) / extraCapacityValue) / 10

    //special cases: purple
    let className =
      commitment > 0 || labelIsUsageOnly || !canEdit
        ? "progress-bar"
        : "progress-bar bg-sap-purple-2"

    const label = (
      <span className={`progress-bar-label ${barLable}`}>
        {fillLabel}/{capacityLabel}{" "}
        {commitment > 0 ? (
          <span className="font-normal">committed</span>
        ) : (
          <span className="font-normal">quota used</span>
        )}
      </span>
    )

    const extraLable = (
      <span className={`progress-bar-label ${barLable}`}>
        {extraFillLabel}/{extraCapacityLabel}
      </span>
    )

    let filled = className
    let barStyleFilled = { width: widthPercent + "%" }
    let barStyleCommitment = { width: widthCommitment + "%" }
    if (disabled) {
      filled = "progress-bar progress-bar-disabled has-label"
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
              isAZ ? "h-4" : "h-8"
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
                props.isAZ ? "h-4" : "h-8"
              }`}
            >
              <div
                key="extra-filled"
                className={`extra-fill ${filled} ${filledExtraResourceBar}`}
                style={fill > capacity ? barStyleCommitment : { width: "0%" }}
              ></div>
            </div>
          </Stack>
        ) : (
          ""
        )}
      </Stack>
    )
    return resourceBar
  }

  return (
    <div className={resourceBarWrapper} ref={outerDivRef}>
      {buildResourceBar()}
    </div>
  )
}

export default ResourceBar
