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
import { DataGrid, DataGridRow, IntroBox, LoadingIndicator } from "@cloudoperators/juno-ui-components";
import CommitmentTableDetails from "./CommitmentTableDetails";
import useSortTableData from "../../hooks/useSortTable";
import useCommitmentFilter from "../../hooks/useCommitmentFilter";
import { createCommitmentStore } from "../StoreProvider";
import { CustomZones } from "../../lib/constants";

const CommitmentTable = (props) => {
  const durations = props.resource.commitment_config.durations;
  const unit = props.resource.unit;
  const { filterCommitments } = useCommitmentFilter();
  const { commitment: newCommitment } = createCommitmentStore();
  const { commitmentIsFetching } = createCommitmentStore();
  const commitmentTransferID = React.useRef(null);
  const { isCommitting } = createCommitmentStore();
  const { serviceType, currentCategory, currentResource, currentAZ, commitmentData, mergeOps } = {
    ...props,
  };
  const { setMergeIsActive } = mergeOps;
  const resourceName = currentResource?.name;
  const { per_az: availabilityZones } = props.resource;
  const isAZAware = availabilityZones.length == 1 && availabilityZones[0][0] == CustomZones.ANY;
  const noCommitmentsText = `No commitments found${!isAZAware ? " in this availability zone" : ""}.`;

  const initialSortConfig = {
    starts_at: {
      direction: "descending",
      sortValueFn: (commitment) => commitment["confirm_by"] ?? commitment["created_at"],
      sortStrategy: "numeric",
    },
  };
  const commitmentHeadCells = [
    {
      key: "amount",
      label: "Amount",
      sortStrategy: "numeric",
    },
    {
      key: "duration",
      label: "Duration",
      sortStrategy: "text",
    },
    {
      key: "starts_at",
      label: "Starts at",
      sortValueFn: initialSortConfig["starts_at"].sortValueFn,
      sortStrategy: initialSortConfig["starts_at"].sortStrategy,
    },
    {
      key: "confirmed_at",
      label: "Confirmed at",
      sortStrategy: "numeric",
    },
    {
      key: "expires_at",
      label: "Expires at",
      sortStrategy: "numeric",
    },
    {
      key: "creator_name",
      label: "Requester",
      sortStrategy: "text",
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

  const { items, TableSortHeader } = useSortTableData(filteredCommitments, initialSortConfig);

  React.useEffect(() => {
    filteredCommitments.length >= 2 ? setMergeIsActive(true) : setMergeIsActive(false);
  }, [filteredCommitments]);

  return commitmentIsFetching ? (
    <LoadingIndicator className="m-auto" />
  ) : filteredCommitments.length > 0 ? (
    <DataGrid columns={commitmentHeadCells.length} gridColumnTemplate={gridColumnTemplate}>
      <DataGridRow>
        {commitmentHeadCells.map((headCell) => (
          <TableSortHeader
            key={headCell.key}
            identifier={headCell.key}
            value={headCell.label}
            sortValueFn={headCell.sortValueFn}
            sortStrategy={headCell.sortStrategy}
          />
        ))}
      </DataGridRow>

      {items.map((commitment) => (
        <CommitmentTableDetails
          key={commitment.id}
          commitment={commitment}
          durations={durations}
          serviceType={serviceType}
          currentCategory={currentCategory}
          currentResource={currentResource}
          currentAZ={currentAZ}
          commitmentTransferID={commitmentTransferID}
          mergeOps={mergeOps}
        />
      ))}
    </DataGrid>
  ) : (
    <IntroBox text={noCommitmentsText} />
  );
};

export default CommitmentTable;
