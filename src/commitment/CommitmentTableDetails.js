import React from "react";
import moment from "moment";
import { DataGridRow, DataGridCell } from "juno-ui-components"
import EditCommitment from "./EditCommitment";
import { valueWithUnit, Unit } from "../lib/unit";

const CommitmentTableDetails = (props) => {
    const unit = new Unit(props.unit)
    function formatTime(unixTimeStamp) {
        if (!moment.unix(unixTimeStamp).isValid() || unixTimeStamp == "") return ""
        return moment.unix(unixTimeStamp).format("MM/DD/YYYY, hh:mm A")
    }

    return (
        <DataGridRow>
            <DataGridCell>
                {valueWithUnit(props.amount, unit)}
            </DataGridCell>
            <DataGridCell>
                {props.duration}
            </DataGridCell>
            <DataGridCell>
                {formatTime(props.requested_at)}
            </DataGridCell>
            <DataGridCell>
                {formatTime(props.confirmed_at)}
            </DataGridCell>
            <DataGridCell>
                {formatTime(props.expires_at)}
            </DataGridCell>
            <DataGridCell>
                {!props.confirmed_at ? (
                    <EditCommitment />
                ) : "Committed"}
            </DataGridCell>
        </DataGridRow>
    )
}

export default CommitmentTableDetails
