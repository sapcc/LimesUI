import React from "react";
import { DataGrid, DataGridHeadCell, DataGridRow } from "juno-ui-components";
import CommitmentTableDetails from "./CommitmentTableDetails";

const CommitmentTable = (props) => {
  const commitmentHeadCells = [
    {
      key: "amount",
      label: "Amount",
    },
    {
      key: "duration",
      label: "Duration",
    },
    {
      key: "requestedAt",
      label: "Requested at",
    },
    {
      key: "confirmedAt",
      label: "Confirmed at",
    },
    {
      key: "expiresAt",
      label: "Expires at",
    },
    {
      key: "edit",
      label: "Actions",
    },
  ];

  const filterCommitments = (v) =>
    v.resource_name === props.currentResource &&
    v.availability_zone === props.currentAZ;
  const filteredCommitments = props.commitmentData.filter(filterCommitments);

  return (
    <DataGrid columns={commitmentHeadCells.length}>
      <DataGridRow>
        {commitmentHeadCells.map((headCell) => (
          <DataGridHeadCell key={headCell.key}>
            {headCell.label}
          </DataGridHeadCell>
        ))}
      </DataGridRow>

      {filteredCommitments.map((commitment) => (
        <CommitmentTableDetails key={commitment.id} {...commitment} />
      ))}
    </DataGrid>
  );
};

export default CommitmentTable;
