import React from 'react'
import useLimesStore from './lib/store/store'
import { Unit, valueWithUnit } from './lib/unit'

const LABEL_MARGIN = 10
const resourceBarWrapper = "bg-theme-highest progress"
const emptyResourceBar = "bg-theme-background-lvl-3 progress-bar shadow-inner inline-flex"
const filledResourceBar = "text-juno-grey-light-1 bg-theme-accent has-label-if-fits shadow-md"
const stripedResourceBar = "progress-bar progress-bar-disabled has-label shadow-inner"

const ResourceBar = (props) => {
    const theme = useLimesStore((state) => state.theme)
    const outerDivRef = React.useRef(null)
    const {
        capacity,
        fill,
        isDanger,
        unit: unitName,
        showsCapacity,
        labelIsUsageOnly,
    } = props
    const disabled = false
    const unit = new Unit(unitName || '')

    React.useEffect(() => {
        checkIfLabelFits()
    })

    function checkIfLabelFits(opts = {}) {
        const bar = outerDivRef.current //this is the <div class="progress"/>
        if (!bar) {
            return
        }

        //measure the width of the filled portion of the bar
        const filledBar = bar.querySelector(".has-label-if-fits")
        if (!filledBar) {
            //bar is completely full or empty, so we don't have to measure anything
            return
        }
        const barWidth = filledBar.getBoundingClientRect().width

        //measure the width of the label (one of them might be display:none and report width=0)
        const labelWidths = [...bar.querySelectorAll(".progress-bar-label")].map(
            (span) => span.getBoundingClientRect().width
        )
        const labelWidth = Math.max(...labelWidths)

        //require some extra wiggle room (20px) around the label to account for UI
        //margins, and because labels that fit too tightly look dumb
        bar.classList.toggle("label-fits", labelWidth + LABEL_MARGIN < barWidth)

        //re-run this method after animations have completed
        if (!opts.delayed) {
            window.setTimeout(() => checkIfLabelFits({ delayed: true }), 500)
        }
    }

    function buildResourceBar() {
        // First handle the creation of an empty bar.
        if (capacity == 0 && fill == 0) {
            return (
                <div
                    key="filled"
                    className={stripedResourceBar}
                    style={{ width: "100%" }}
                >
                    <span className="progress-bar-label">
                        {showsCapacity ? "No capacity" : "No quota"}
                    </span>
                </div>
            )
        }

        let widthPercent = Math.round(1000 * (fill / capacity)) / 10
        // ensure that a non-zero-wide bar is at least somewhat visible
        if (fill > 0 && widthPercent < 0.5) {
            widthPercent = 0.5
        }

        //special cases: yellow and red bars
        let className = "progress-bar"
        if (isDanger) {
            className = "progress-bar progress-bar-striped bg-theme-danger"
        } else if (fill > capacity) {
            className = "progress-bar bg-theme-danger"
        } else if (fill == capacity) {
            className = "progress-bar bg-theme-warning"
        }

        const label = labelIsUsageOnly ?
            <span className="progress-bar-label">
                {valueWithUnit(fill, unit)}
            </span>
            :
            <span className="progress-bar-label">
                {valueWithUnit(fill, unit)}/{valueWithUnit(capacity, unit)}
            </span>

        let filled = className
        let barStyleFilled = { width: widthPercent + "%" }
        let barStyleEmpty = {}
        if (disabled) {
            filled = "progress-bar progress-bar-disabled has-label"
            barStyleFilled["opacity"] = 0.6
            barStyleEmpty["opacity"] = 0.6
        }

        const resourceBar = (
            <div className={emptyResourceBar} style={{ width: "100%" }}>
                <div
                    key="filled"
                    className={`${filled} ${filledResourceBar}`}
                    style={fill > 0 ? barStyleFilled : { width: "0%" }}
                >
                    {label}
                </div>
                <div
                    key="empty"
                    className="progress-bar has-label-unless-fits"
                    style={barStyleEmpty}
                >
                    {label}
                </div>
            </div>
        )

        return resourceBar
    }

    return (
        <>
            <div className={resourceBarWrapper} ref={outerDivRef}>
                {buildResourceBar()}
            </div >
        </>
    )
}

export default ResourceBar
