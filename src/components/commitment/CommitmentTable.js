import React from "react";
import {
  DataGrid,
  DataGridHeadCell,
  DataGridRow,
  IntroBox,
} from "juno-ui-components";
import CommitmentTableDetails from "./CommitmentTableDetails";
import { createCommitmentStore } from "../StoreProvider";

const CommitmentTable = (props) => {
  const durations = props.resource.commitment_config.durations;
  const unit = props.resource.unit;
  const { commitment: newCommitment } = createCommitmentStore();
  const { isCommitting } = createCommitmentStore();
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
      key: "confirmedAt",
      label: "Confirmed at",
    },
    {
      key: "startsAt",
      label: "Starts at",
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

  return filteredCommitments.length > 0 ? (
    <DataGrid columns={commitmentHeadCells.length} columnMaxSize="1fr">
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
  ) : (
    <IntroBox text="No commitments found in this availability zone." />
  );
};

export default CommitmentTable;
