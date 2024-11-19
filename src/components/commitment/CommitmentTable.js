/**
 * Copyright 2024 SAP SE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  const resourceName = currentResource?.name;
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
    const filteredData = filterCommitments(resourceName, currentAZ);
    if (!isCommitting) {
      return filteredData;
    }
    newCommitment.unit = unit;
    filteredData.unshift(newCommitment);
    return filteredData;
  }, [commitmentData, currentAZ, resourceName, isCommitting]);

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
