import React from "react"
import { Link } from 'react-router-dom'

const Overview = (props) => {
    console.log(props.api?.project?.services)
    return (
        <>
            {props.api?.project?.services.map((service, index) => {
                return <Link key={`/${index}`} to={`/${service.area}`}> {service.area}</Link>
            })}
        </>
    )
}

export default Overview
