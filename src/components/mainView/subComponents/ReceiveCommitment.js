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
import { Button, Icon } from "@cloudoperators/juno-ui-components";
import { createCommitmentStoreActions } from "../../StoreProvider";
import { TransferStatus } from "../../../lib/constants";

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
      <span>Receive Commitment</span>
    </Button>
  );
};

export default ReceiveCommitment;
