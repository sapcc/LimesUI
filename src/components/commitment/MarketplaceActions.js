// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { TransferStatus } from "../../lib/constants";
import { Button, Icon, Stack } from "@cloudoperators/juno-ui-components/index";
import { createCommitmentStoreActions } from "../StoreProvider";
import Actions from "./Operations/Actions";
import ToolTipWrapper from "../shared/ToolTipWrapper";
import useCommitmentFilter from "../../hooks/useCommitmentFilter";

// Project level: Commitments originating from this project can be cancelled. Foreign commitments can be received.
// Domain level: Commitments can be received for a selected project.
// Cluster level: Provides administrative actions. Utilizes cluster api endpoints.
const MarketplaceActions = (props) => {
  const { scope, resource, projectCommitments, commitment, setShowModal } = props;
  const { getCommitmentLabel } = useCommitmentFilter();
  const { setTransferredCommitment } = createCommitmentStoreActions();
  const { setTransferFromAndToProject } = createCommitmentStoreActions();
  const projectOwnsCommitment = projectCommitments.some((pc) => pc.id == commitment.id);

  if (scope.isCluster()) {
    commitment.can_be_deleted = true;
  }

  function getReceiveBtn() {
    return (
      <Button
        data-testid="mp-receive"
        variant="primary"
        icon="download"
        size="small"
        title="Receive"
        onClick={() => setShowModal(true)}
      />
    );
  }

  function cancelCommitmentTransfer() {
    setTransferFromAndToProject(TransferStatus.CANCEL);
    setTransferredCommitment(commitment);
  }

  return (
    <>
      {scope.isCluster() && <Actions commitment={commitment} resource={resource} marketplaceModalFn={setShowModal} />}
      {scope.isDomain() && (
        <Stack distribution="between">
          {getCommitmentLabel(commitment)}
          {getReceiveBtn()}
        </Stack>
      )}
      {scope.isProject() && (
        <Stack distribution="between">
          <Stack alignment="center" gap="1">
            {getCommitmentLabel(commitment)}
            {projectOwnsCommitment && (
              <ToolTipWrapper trigger={<Icon size="16" icon="info" />} content="Originates from this project" />
            )}
          </Stack>
          {projectOwnsCommitment ? (
            <Button
              data-testid="mp-cancel"
              onClick={() => {
                cancelCommitmentTransfer();
              }}
              variant="default"
              icon="cancel"
              title="Cancel transfer"
              size="small"
            />
          ) : (
            getReceiveBtn()
          )}
        </Stack>
      )}
    </>
  );
};

export default MarketplaceActions;
