import React from "react";
import { Panel, PanelBody } from "juno-ui-components";
import { useParams, useNavigate } from "react-router-dom";
import { t } from "../utils"
import { Unit } from "../lib/unit";
import ProjectResource from "./ProjectResource";
import AvailabilityZoneNav from "./AvailabilityZoneNav";
import CommitmentTable from "../commitment/CommitmentTable";

import data from '../lib/limes_commitment_api.json'

// TODO: Replace hardcoded API data vs API-call. Get them via useEffect,[]
// TODO: Move API call and useEffect to parent component. API fetches all commitments for a project.

const EditPanel = (props) => {

    // Variables and State.

    const [commitmentData, setCommitmentData] = React.useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const { currentArea, categoryName, resourceName } = { ...params }
    const res = props.categories[categoryName].resources.find((res) => {
        if (res.name === resourceName) {
            return res
        }
    })
    const [currentAZ, setCurrentAZ] = React.useState(Object.keys(res.per_az)[0])
    const [state, setState] = React.useState({
        inputs: null
    })

    // Initializers.

    React.useEffect(() => {
        // Initial Commitment-API data fetch.
        setCommitmentData(data.commitments)
    }, [])

    React.useEffect(() => {
        // initialize the state of input form
        const unit = new Unit(res.unit)
        const inputs = {
            value: res.quota,
            text: unit.format(res.quota, { ascii: true })
        }

        setState({ ...state, inputs })
    }, [])

    // Functions

    function close() {
        setState(state => ({ ...state, show: !state.show }))
        navigate(`/${currentArea}`)
    }

    function handleInput(text) {
        alert(text)
    }

    return (
        <>
            <Panel
                size="large"
                opened={true}
                onClose={() => close()}
                closeable={true}
                heading={`Edit Commitment: ${t(categoryName)} - ${t(resourceName)}`}
            >
                <PanelBody>
                    <ProjectResource
                        resource={res}
                        edit={state.inputs}
                        handleInput={handleInput}
                    />

                    <AvailabilityZoneNav
                        az={res.per_az}
                        currentAZ={currentAZ}
                        setCurrentAZ={setCurrentAZ}
                    />
                    {commitmentData &&
                        <CommitmentTable
                            currentResource={res.name}
                            currentAZ={currentAZ}
                            commitmentData={commitmentData}
                        />}
                </PanelBody>
            </Panel>
        </>
    )
}

export default EditPanel
