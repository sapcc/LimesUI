import React from "react"
import { Link, useParams } from 'react-router-dom'

const Overview = (props) => {
    const [allAreas, setAllAreas] = React.useState(Object.keys(props.overview.areas))
    const {currentArea = allAreas[0]} = useParams()

    function renderArea() {
        const render = allAreas.map((area) => {
            return area
        }).filter((area) => area == currentArea)

        return JSON.stringify(render, null, 2)
    }

    return (
        <>
            {allAreas.map((area, index) => {
                return <Link key={`/${area}`} to={`/${area}`}> {area}</Link>
            })}
            { currentArea && <pre>{renderArea()}</pre>}
        </>
    )
}

export default Overview
