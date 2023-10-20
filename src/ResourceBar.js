import React from 'react'

const ResourceBar = (props) => {
    const capacity = 0
    const fill = 0
    const showsCapacity = false
    const beforeOcMark = undefined
    const afterOcMark = undefined

    return (
        <>
            {
                capacity == 0 && fill == 0 &&
                <div className="progress">
                    <div
                        key="filled"
                        className="progress-bar progress-bar-disabled has-label"
                        style={{ width: "100%" }}
                    >
                        <span className="progress-bar-label">
                            {showsCapacity ? "No capacity" : "No quota"}
                        </span>
                    </div>
                    {beforeOcMark}
                    {afterOcMark}
                </div>
            }
        </>
    )
}

export default ResourceBar
