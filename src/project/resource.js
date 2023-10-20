import React from 'react'
import { t } from '../utils'

const ProjectResource = (props) => {
    const displayName = t(props.resource.name)

    return (
        <>
            <div className="text-base">
                <div>
                    {displayName}
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
