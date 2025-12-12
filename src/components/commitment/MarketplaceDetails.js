// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { DataGridRow, DataGridCell } from "@cloudoperators/juno-ui-components/index";
import { valueWithUnit, Unit } from "../../lib/unit";
import { formatTimeISO8160, formatTime } from "../../lib/utils";
import ToolTipWrapper from "../shared/ToolTipWrapper";
import MarketplaceModal from "./Modals/MarketplaceModal";
import MarketplaceActions from "./MarketplaceActions";

const MarketplaceDetails = (props) => {
  const { project, commitment, transferCommitment } = props;
  const unit = new Unit(commitment.unit);
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
        <MarketplaceActions {...props} setShowModal={setShowModal} />
      </DataGridCell>
      {showModal && (
        <MarketplaceModal
          action={transferCommitment}
          title="Marketplace: Receive commitment"
          subText="Receive"
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
