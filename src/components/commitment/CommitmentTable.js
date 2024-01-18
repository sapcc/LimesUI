import React from "react";
import {
  DataGrid,
  DataGridHeadCell,
  DataGridRow,
  IntroBox,
} from "juno-ui-components";
import CommitmentTableDetails from "./CommitmentTableDetails";
import useCommitmentFilter from "../../hooks/useCommitmentFilter";
import { createCommitmentStore } from "../StoreProvider";

const CommitmentTable = (props) => {
  const durations = props.resource.commitment_config.durations;
  const unit = props.resource.unit;
  const { filterCommitments } = useCommitmentFilter();
  const { commitment: newCommitment } = createCommitmentStore();
  const { isCommitting } = createCommitmentStore();
  const { currentCategory, currentResource, currentAZ, commitmentData } = {
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
      key: "startsAt",
      label: "Starts at",
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
      key: "requestedBy",
      label: "Requester",
    },
    {
      key: "edit",
      label: "Actions",
    },
  ];

  //Add or remove edit commitment row.
  const filteredCommitments = React.useMemo(() => {
    const filteredData = filterCommitments(currentResource, currentAZ);
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
          currentCategory={currentCategory}
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
