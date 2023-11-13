import React from "react";
import { DataGrid, DataGridHeadCell, DataGridRow } from "juno-ui-components";
import CommitmentTableDetails from "./CommitmentTableDetails";
import useStore from "../../lib/store/store";

const CommitmentTable = (props) => {
  const durations = props.resource.commitment_config.durations;
  const unit = props.resource.unit;
  const newCommitment = useStore((state) => state.commitment);
  const isCommitting = useStore((state) => state.isCommitting);
  const { currentArea, currentResource, currentAZ, commitmentData } = {
    ...props,
  };
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
    v.resource_name === currentResource && v.availability_zone === currentAZ;

  //Add or remove edit commitment row.
  const filteredCommitments = React.useMemo(() => {
    const filteredData = commitmentData.filter(filterCommitments);
    if (!isCommitting) {
      return filteredData;
    }
    newCommitment.unit = unit;
    filteredData.unshift(newCommitment);
    return filteredData;
  }, [commitmentData, currentAZ, currentResource, isCommitting]);

  return (
    <DataGrid columnMaxSize="1fr" columns={commitmentHeadCells.length}>
      <DataGridRow>
        {commitmentHeadCells.map((headCell) => (
          <DataGridHeadCell key={headCell.key}>
            {headCell.label}
          </DataGridHeadCell>
        ))}
      </DataGridRow>

      {filteredCommitments.map((commitment) => (
        <CommitmentTableDetails
          key={commitment.id}
          commitment={commitment}
          durations={durations}
          currentArea={currentArea}
          currentResource={currentResource}
          currentAZ={currentAZ}
        />
      ))}
    </DataGrid>
  );
};

export default CommitmentTable;
