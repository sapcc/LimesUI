/**
 * Copyright 2025 SAP SE
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
import { Modal } from "@cloudoperators/juno-ui-components";
import { TransferType } from "../../../lib/constants";

const TransferCancelModal = (props) => {
  const { commitment, title, startCommitmentTransfer, onModalClose } = props;

  return (
    <Modal
      title={title}
      open={true}
      confirmButtonLabel="Confirm"
      onConfirm={() => {
        startCommitmentTransfer(null, commitment, TransferType.NONE);
      }}
      cancelButtonLabel="Cancel"
      onCancel={() => {
        onModalClose();
      }}
    >
      <div className={"mb-4 font-medium"}>
        <div>Do you want to reset the commitment transfer state?</div>
      </div>
    </Modal>
  );
};

export default TransferCancelModal;
