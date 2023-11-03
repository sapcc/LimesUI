import React from "react"
import moment from "moment"
import { Link, useParams } from 'react-router-dom'
import Category from "./Category"
import { byUIString } from "../utils"
import { TopNavigation, TopNavigationItem } from "juno-ui-components"

// TODO: Replace Navigation with Tab, TabList, TabPanel and Panels. Every Panel needs one TabPanel as parent.

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
                            category={props.categories[categoryName]}
                            canEdit={props.canEdit}
                        />
                    ))
                )}
                <div>Usage last updated {ageDisplay} ago.</div>
            </>
        )
    }

    return (
        <>
            <TopNavigation>
                {allAreas.map((area) =>
                    <TopNavigationItem
                        key={area}
                        active={area === currentArea}
                    >
                        <Link key={`/${area}`} to={`/${area}`}>{area}</Link>
                    </TopNavigationItem>
                )}
            </TopNavigation>
            {renderArea()}
        </>
    )
}

export default Overview
