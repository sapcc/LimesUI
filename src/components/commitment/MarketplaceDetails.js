// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { DataGridRow, DataGridCell, Stack, Button } from "@cloudoperators/juno-ui-components/index";
import { valueWithUnit, Unit } from "../../lib/unit";
import { formatTimeISO8160, formatTime } from "../../lib/utils";
import useCommitmentFilter from "../../hooks/useCommitmentFilter";
import ToolTipWrapper from "../shared/ToolTipWrapper";
import MarketplaceModal from "./Modals/MarketplaceModal";

const MarketplaceDetails = (props) => {
  const { project, resource, commitment, transferCommitment } = props;
  const unit = new Unit(resource.unit);
  const { getCommitmentLabel } = useCommitmentFilter();
  const [showModal, setShowModal] = React.useState(false);

  return (
    <DataGridRow>
      <DataGridCell>{valueWithUnit(commitment.amount, unit)}</DataGridCell>
      <DataGridCell>{commitment.availability_zone}</DataGridCell>
      <DataGridCell>{commitment.duration}</DataGridCell>
      <DataGridCell className="items-start">
        <ToolTipWrapper
          trigger={formatTimeISO8160(commitment.expires_at)}
          content={formatTime(commitment.expires_at, "YYYY-MM-DD HH:mm A")}
        />
      </DataGridCell>
      <DataGridCell>
        <Stack gap="1" distribution="between">
          {getCommitmentLabel(commitment)}{" "}
          <Button variant="primary" icon="download" size="small" onClick={() => setShowModal(true)} />
        </Stack>
      </DataGridCell>
      {showModal && (
        <MarketplaceModal
          action={transferCommitment}
          title="Marketplace: Receive commitment"
          subText="receive"
          onModalClose={() => {
            setShowModal(false);
          }}
          project={project}
          commitment={commitment}
        />
      )}
    </DataGridRow>
  );
};

export default MarketplaceDetails;
