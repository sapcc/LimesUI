import React from "react";
import { t } from "./utils"

const UsageOnlyResource = (props) => {
    const displayName = t(props.resource.name)

    // TODO: this or project/domain/cluster resource gets displayed. Fill out this skeleton later.
    return (
        <>
            <div className="text-xs">
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

export default UsageOnlyResource
