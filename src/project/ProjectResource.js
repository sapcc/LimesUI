import React from 'react'
import { t } from '../utils'
import ResourceBar from '../ResourceBar'
import { GridRow, GridColumn, Button } from 'juno-ui-components'
import { Link } from 'react-router-dom'
import ResourceEditor from './ResourceEditor'

const ProjectResource = (props) => {
    const displayName = t(props.resource.name)
    const {
        quota: originalQuota,
        usage,
        usable_quota: usableQuota,
        backend_quota: backendQuota,
        unit: unitName
    } = props.resource
    const actualBackendQuota = backendQuota == null ? usableQuota : backendQuota
    const isDanger = usage > usableQuota || usableQuota != actualBackendQuota
    const isEditing = props.edit ? true : false

    return (
        <>
            <GridRow className={"mb-1 items-center"}>
                <GridColumn cols={2}>
                    <div className="text-base break-words">{displayName}</div>
                </GridColumn>
                <GridColumn cols={isEditing ? 5 : 4}>
                    <ResourceBar
                        capacity={originalQuota}
                        fill={usage}
                        isDanger={isDanger}
                        unit={unitName}
                        showsCapacity={false}
                        labelIsUsageOnly={false}
                    />
                </GridColumn>
                {props.canEdit &&
                    <GridColumn cols={1}>
                        <Link to={`/${props.area}/edit/${props.categoryName}/${props.resource.name}`}
                            state={props}>
                            <Button>Edit</Button>
                        </Link>
                    </GridColumn>
                }
            </GridRow>
        </>
    )
}

export default ProjectResource
