import React from "react"
import { Link, useParams } from 'react-router-dom'

const Overview = (props) => {
    const [allAreas, setAllAreas] = React.useState(props.api.services)
    const {currentArea = allAreas[0].area} = useParams()

    function renderArea() {
        const render = allAreas.map((area) => {
            return area
        }).filter((area) => area.area == currentArea)

        return JSON.stringify(render, null, 2)
    }

    return (
        <>
            {allAreas.map((services, index) => {
                return <Link key={`/${index}`} to={`/${services.area}`}> {services.area}</Link>
            })}
            { currentArea && <pre>{renderArea()}</pre>}
        </>
    )
}

export default Overview
