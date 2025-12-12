// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { DataGrid, DataGridRow, IntroBox, LoadingIndicator, Message } from "@cloudoperators/juno-ui-components/index";
import useSortTableData from "../../hooks/useSortTable";
import MarketplaceDetails from "./MarketplaceDetails";

const Marketplace = (props) => {
  const { project, projectCommitments, publicCommitmentQuery, transferCommitment } = props;
  const { data, isLoading, isError, error } = publicCommitmentQuery;
  const publicCommitments = data?.commitments || [];

  const initialSortConfig = {
    expires_at: {
      direction: "ascending",
      sortStrategy: "numeric",
    },
  };
  const { items, TableSortHeader } = useSortTableData(publicCommitments, initialSortConfig);

  const headCells = [
    {
      key: "amount",
      label: "Amount",
      sortStrategy: "numeric",
    },
    {
      key: "availability_zone",
      label: "Zone",
      sortStrategy: "text",
    },
    {
      key: "duration",
      label: "Duration",
      sortStrategy: "text",
    },
    {
      key: "expires_at",
      label: "Expires",
      sortStrategy: "numeric",
    },
    {
      key: "edit",
      label: "Actions",
    },
  ];

  return (
    (isLoading && <LoadingIndicator className="m-auto" />) ||
    (isError && <Message variant="danger" text={error.toString()} />) ||
    (publicCommitments.length == 0 && <IntroBox text="No commitments available." />) || (
      <DataGrid columns={headCells.length}>
        <DataGridRow>
          {headCells.map((headCell) => (
            <TableSortHeader
              key={headCell.key}
              identifier={headCell.key}
              value={headCell.label}
              sortStrategy={headCell.sortStrategy}
            />
          ))}
        </DataGridRow>
        {items.map((commitment) => (
          <MarketplaceDetails
            key={commitment.id}
            project={project}
            projectCommitments={projectCommitments}
            commitment={commitment}
            transferCommitment={transferCommitment}
          />
        ))}
      </DataGrid>
    )
  );
};

export default Marketplace;
