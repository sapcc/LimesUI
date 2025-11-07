// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Button, Icon } from "@cloudoperators/juno-ui-components";
import { createCommitmentStoreActions } from "../StoreProvider";
import { TransferStatus } from "../../lib/constants";

const ReceiveCommitment = () => {
  const { setTransferFromAndToProject } = createCommitmentStoreActions();

  function onTransfer() {
    setTransferFromAndToProject(TransferStatus.RECEIVE);
  }

  return (
    <Button
      size="small"
      onClick={() => {
        onTransfer();
      }}
    >
      <Icon className="mr-2" icon="download" title="Receive" size="18" />
      <span>Receive</span>
    </Button>
  );
};

export default ReceiveCommitment;
