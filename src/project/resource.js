import React from 'react'

const ProjectResource = (props) => {
    return (
        <>
            <div className="text-2xl">
                {props.resource.name}
            </div>
            <div>
            Quota: {props.resource.quota}
            </div>
            <div>
            Usage: {props.resource.usage}
            </div>
            <div>
            UsableQuota: {props.resource.usable_quota}
            </div>
        </>
    )
}

export default ProjectResource
