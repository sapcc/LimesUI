import React from "react"
import { t } from '../lib/utils'
import ResourceBar from './ResourceBar'
import { GridRow, GridColumn, Button } from 'juno-ui-components'

const UsageOnlyResource = (props) => {
    const { name, usage, unit: unitName } = props.resource
    const { quota, usable_quota: usableQuota } = props.parentResource
    const displayName = t(name)

    return (
        <>
            <GridRow className={"row usage-only items-center"}>
                <GridColumn cols={2}>
                    <div className={"text-xs"}>{displayName}</div>
                </GridColumn>
                <GridColumn cols={4}>
                    <ResourceBar
                        capacity={quota}
                        fill={usage}
                        isDanger={usage > usableQuota}
                        unit={unitName}
                        showsCapacity={false}
                        labelIsUsageOnly={true}
                    />
                </GridColumn>
            </GridRow>
        </>
    )
}

export default UsageOnlyResource
