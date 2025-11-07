// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { DataGrid, DataGridRow, IntroBox, LoadingIndicator } from "@cloudoperators/juno-ui-components";
import CommitmentTableDetails from "./CommitmentTableDetails";
import useSortTableData from "../../hooks/useSortTable";
import useCommitmentFilter from "../../hooks/useCommitmentFilter";
import { createCommitmentStore } from "../StoreProvider";
import { CustomZones } from "../../lib/constants";
import { COMMITMENTID } from "../../lib/constants";
import { getResourceDurations } from "../../lib/utils";

const CommitmentTable = (props) => {
  const unit = props.resource.unit;
  const { filterCommitments } = useCommitmentFilter();
  const { commitment: newCommitment } = createCommitmentStore();
  const { commitmentIsFetching } = createCommitmentStore();
  const commitmentTransferID = React.useRef(null);
  const { isCommitting } = createCommitmentStore();
  const { serviceType, currentCategory, currentResource, currentTab, commitmentData, mergeOps } = {
    ...props,
  };
  const durations = getResourceDurations(currentResource);
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
      label: "Start",
      sortValueFn: initialSortConfig["starts_at"].sortValueFn,
      sortStrategy: initialSortConfig["starts_at"].sortStrategy,
    },
    {
      key: "confirmed_at",
      label: "Confirmed",
      sortStrategy: "numeric",
    },
    {
      key: "expires_at",
      label: "Expires",
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
    const filteredData = filterCommitments(resourceName, currentTab);
    return filteredData;
  }, [commitmentData, currentTab, resourceName]);

  const { items, TableSortHeader } = useSortTableData(filteredCommitments, initialSortConfig);

  const parsedItems = React.useMemo(() => {
    let newItems = [...items];
    if (!isCommitting) {
      newItems[0]?.id === COMMITMENTID && newItems.shift();
      return newItems;
    }
    newCommitment.unit = unit;
    newItems.unshift(newCommitment);
    return newItems;
  }, [items, isCommitting]);

  React.useEffect(() => {
    filteredCommitments.length >= 2 ? setMergeIsActive(true) : setMergeIsActive(false);
  }, [filteredCommitments]);

  return commitmentIsFetching ? (
    <LoadingIndicator className="m-auto" />
  ) : parsedItems.length > 0 ? (
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
      {parsedItems.map((commitment) => (
        <CommitmentTableDetails
          key={commitment.id}
          commitment={commitment}
          durations={durations}
          serviceType={serviceType}
          currentCategory={currentCategory}
          currentResource={currentResource}
          currentTab={currentTab}
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
