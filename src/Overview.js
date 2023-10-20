import React from "react"
import moment from "moment"
import { Link, useParams } from 'react-router-dom'
import Category from "./Category"
import { byUIString } from "./utils"

const Overview = (props) => {
    const [allAreas, setAllAreas] = React.useState(Object.keys(props.overview.areas))
    const { currentArea = allAreas[0] } = useParams()

    function renderArea() {
        const { areas, categories, scrapedAt, minScrapedAt, maxScrapedAt } = props.overview
        const currentServices = areas[currentArea]

        const currMinScrapedAt = currentServices
            .map((serviceType) => minScrapedAt[serviceType])
            .filter((x) => x !== undefined)
        const currMaxScrapedAt = currentServices
            .map((serviceType) => maxScrapedAt[serviceType])
            .filter((x) => x !== undefined)
        const currScrapedAt = currentServices
            .map((serviceType) => scrapedAt[serviceType])
            .filter((x) => x !== undefined)
        const minScrapedStr = moment
            .unix(Math.min(...currMinScrapedAt, ...currScrapedAt))
            .fromNow(true)
        const maxScrapedStr = moment
            .unix(Math.max(...currMaxScrapedAt, ...currScrapedAt))
            .fromNow(true)
        const ageDisplay =
            minScrapedStr == maxScrapedStr
                ? minScrapedStr
                : `between ${minScrapedStr} and ${maxScrapedStr}`

        return (
            <>
                {currentServices.sort(byUIString).map((serviceType) =>
                    categories[serviceType].map((categoryName) => (
                        <Category
                            key={categoryName}
                            categoryName={categoryName}
                            category={props.categories[serviceType]}
                            canEdit={props.canEdit}
                        />
                    ))
                )}
            </>
        )

    }

    return (
        <>
            <ul className="flex border-b">
                {allAreas.map((area) =>
                    <li key={area}
                        className="-mb-px mr-1 inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
                    >
                        <Link key={`/${area}`} to={`/${area}`}> {area}</Link>
                    </li>
                )}
            </ul>
            {renderArea()}
        </>
    )
}

export default Overview
