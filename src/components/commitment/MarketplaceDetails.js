import React from "react";
import { DataGridRow, DataGridCell } from "@cloudoperators/juno-ui-components/index";
import { valueWithUnit, Unit } from "../../lib/unit";
import { formatTimeISO8160 } from "../../lib/utils";
import useCommitmentFilter from "../../hooks/useCommitmentFilter";

const MarketplaceDetails = (props) => {
  const { commitment, resource } = props;
  const unit = new Unit(resource.unit);
  const { getCommitmentLabel } = useCommitmentFilter();
  return (
    <DataGridRow>
      <DataGridCell>{valueWithUnit(commitment.amount, unit)}</DataGridCell>
      <DataGridCell>{commitment.availability_zone}</DataGridCell>
      <DataGridCell>{commitment.duration}</DataGridCell>
      <DataGridCell>{formatTimeISO8160(commitment.expires_at)}</DataGridCell>
      <DataGridCell>{getCommitmentLabel(commitment)}</DataGridCell>
    </DataGridRow>
  );
};

export default MarketplaceDetails;
