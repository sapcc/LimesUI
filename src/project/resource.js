import React from 'react'
import { t } from '../utils'
import ResourceBar from '../ResourceBar'

const ProjectResource = (props) => {
    const displayName = t(props.resource.name)

    return (
        <>
            <div className="text-base">
                <div >
                    {displayName}
                    <ResourceBar />
                </div>
                <div>
                    Usage: {props.resource.usage}
                </div>
                <div>
                    Quota: {props.resource.quota}
                </div>
                <div>
                    UsableQuota: {props.resource.usable_quota}
                </div>
            </div>
        </>
    )
}

export default ProjectResource
