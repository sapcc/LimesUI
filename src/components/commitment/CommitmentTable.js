import React from "react";
import {
  DataGrid,
  DataGridHeadCell,
  DataGridRow,
  IntroBox,
  LoadingIndicator,
} from "@cloudoperators/juno-ui-components";
import CommitmentTableDetails from "./CommitmentTableDetails";
import useCommitmentFilter from "../../hooks/useCommitmentFilter";
import { createCommitmentStore } from "../StoreProvider";

const CommitmentTable = (props) => {
  const durations = props.resource.commitment_config.durations;
  const unit = props.resource.unit;
  const { filterCommitments } = useCommitmentFilter();
  const { commitment: newCommitment } = createCommitmentStore();
  const { commitmentIsFetching } = createCommitmentStore();
  const { isCommitting } = createCommitmentStore();
  const {
    serviceType,
    currentCategory,
    currentResource,
    currentAZ,
    commitmentData,
  } = {
    ...props,
  };
  const { per_az: availabilityZones } = props.resource;
  const isAZAware =
    availabilityZones.length == 1 && availabilityZones[0][0] == "any";
  const noCommitmentsText = `No commitments found${
    !isAZAware ? " in this availability zone" : ""
  }.`;
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

  const gridColumnTemplate = "15% 15% 14% 14% 14% 10% 18%";

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

  return commitmentIsFetching ? (
    <LoadingIndicator className="m-auto" />
  ) : filteredCommitments.length > 0 ? (
    <DataGrid
      columns={commitmentHeadCells.length}
      gridColumnTemplate={gridColumnTemplate}
    >
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
          serviceType={serviceType}
          currentCategory={currentCategory}
          currentResource={currentResource}
          currentAZ={currentAZ}
        />
      ))}
    </DataGrid>
  ) : (
    <IntroBox text={noCommitmentsText} />
  );
};

export default CommitmentTable;
