import React from "react";
import { t, sortByLogicalOrderAndName} from "./utils"
import ProjectResource from "./project/resource";

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
            <h1 className="mb-4 mt-4 text-2xl">{t(props.categoryName)}</h1>
            {sortByLogicalOrderAndName(resources).map((res) => 
                <ProjectResource
                    key={res.name}
                    resource={res}
                    {...forwardProps}
                />
            )}
        </>
    )
}

export default Category
