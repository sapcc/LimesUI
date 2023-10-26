import React from 'react'
import { t } from '../utils'
import ResourceBar from '../ResourceBar'
import { GridRow, GridColumn, Button } from 'juno-ui-components'
import EditModal from '../EditModal'

const ProjectResource = (props) => {
    const [showModal, setShowModal] = React.useState(false)
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

    return (
        <>
            <GridRow className={"mb-1 items-center"}>
                <GridColumn cols={2}>
                    <div className="text-base">{displayName}</div>
                </GridColumn>
                <GridColumn cols={4}>
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
                        <Button label="Edit" onClick={() => { setShowModal(true) }} />
                    </GridColumn>
                }
                {showModal &&
                    <EditModal
                        {...props}
                        setShowModal={setShowModal}
                    />
                }
            </GridRow>
        </>
    )
}

export default ProjectResource
