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
import { Modal, CodeBlock } from "@cloudoperators/juno-ui-components";

const TransferTokenModal = (props) => {
  const { commitment, title, onModalClose } = props;
  const token = commitment.transfer_token;

  return (
    <Modal
      title={title}
      open={true}
      onCancel={() => {
        onModalClose();
      }}
    >
      <div className={"mb-4 font-medium"}>
        <div>Copy this token.</div>
        <div>Enter it at the target project to receive the commitment.</div>
      </div>
      <CodeBlock className={"mb-4"} content={token} />
    </Modal>
  );
};

export default TransferTokenModal;
