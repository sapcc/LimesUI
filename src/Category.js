import React from "react";
import { t, sortByLogicalOrderAndName } from "./utils"
import ProjectResource from "./project/resource";
import UsageOnlyResource from "./UsageOnlyResource";
import { Button, Grid, GridColumn, GridRow } from "juno-ui-components"
import EditModal from "./EditModal";

// TODO: for domain/cluster level add tracksQuota which skips resource that do not track quota.

const Category = (props) => {
    const [showModal, setShowModal] = React.useState(false)
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

    function tracksQuota(res) {
        return (
            res.quota !== undefined ||
            res.domains_quota !== undefined ||
            res.projects_quota !== undefined
        )
    }

    return (
        <>
            <Grid auto>
                <GridRow>
                    <GridColumn>
                        <h1 className="mb-4 mt-4 text-2xl font-bold">{t(props.categoryName)}</h1>
                    </GridColumn>
                    {canEdit &&
                        <GridColumn>
                            <Button className="btn" label="Edit" onClick={() => { setShowModal(true) }} />
                        </GridColumn>
                    }
                </GridRow>
                {showModal &&
                    <EditModal
                        {...props}
                        setShowModal={setShowModal}
                    />
                }
            </Grid>

            {
                sortByLogicalOrderAndName(resources).map((res) =>
                    tracksQuota(res) ?
                        <ProjectResource key={res.name} resource={res} {...forwardProps} /> :
                        <UsageOnlyResource key={res.name} resource={res} {...forwardProps} />
                )
            }
        </>
    )
}

export default Category
