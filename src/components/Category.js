import React from "react";
import { t, sortByLogicalOrderAndName, tracksQuota } from "../lib/utils"
import ProjectResource from "./project/ProjectResource";
import UsageOnlyResource from "./UsageOnlyResource";
import { Grid, GridColumn, GridRow } from "juno-ui-components"

// TODO: for domain/cluster level add tracksQuota which skips resource that do not track quota.

const Category = (props) => {
    const { categoryName, canEdit } = props
    const { area, resources } = props.category
    const forwardProps = {
        categoryName,
        area,
        canEdit
    }

    //for usage-only resources with no quota of their own, this finds
    //the resource they're ultimately "contained_in"
    function getContainingResourceFor(resName) {
        const res = resources.find((res) => res.name === resName)
        if (res.contained_in) {
            return getContainingResourceFor(res.contained_in)
        }
        return res
    }

    return (
        <>
            <Grid>
                <GridRow>
                    <GridColumn auto>
                        <h1 className="mb-4 mt-4 text-2xl font-bold">{t(props.categoryName)}</h1>
                    </GridColumn>
                </GridRow>
                {
                    sortByLogicalOrderAndName(resources).map((res) =>
                        tracksQuota(res) ?
                            <ProjectResource key={res.name} resource={res} {...forwardProps} />
                            :
                            <UsageOnlyResource key={res.name} resource={res} parentResource={getContainingResourceFor(res.name)}{...forwardProps} />
                    )
                }
            </Grid>
        </>
    )
}

export default Category
