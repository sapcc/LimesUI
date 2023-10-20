import React from 'react'
import { t } from '../utils'

const ProjectResource = (props) => {
    return (
        <>
            <div className="text-2xl">
                {t(props.resource.name)}
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
        </>
    )
}

export default ProjectResource
