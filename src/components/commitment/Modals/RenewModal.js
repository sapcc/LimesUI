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
import BaseFooter from "./BaseComponents/BaseFooter";
import useConfirmInput from "./BaseComponents/useConfirmInput";
import { Modal, DataGrid, DataGridRow, DataGridCell } from "@cloudoperators/juno-ui-components";
import { Unit, valueWithUnit } from "../../../lib/unit";
import { formatTimeISO8160 } from "../../../lib/utils";

const label = "font-semibold";

const RenewModal = (props) => {
  const { commitments = [] } = props;
  const isSingleCommitment = commitments.length == 1;
  const unit = isSingleCommitment && new Unit(commitments[0].unit);
  const { open, action, title, subText, onModalClose } = props;
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({ confirmationText: subText });

  function onRenew() {
    action(commitments);
  }

  return (
    <Modal
      className="max-h-full"
      title={title}
      open={open}
      modalFooter={
        <BaseFooter onModalClose={onModalClose} guardFns={[checkInput]} actionFn={onRenew} variant={"primary"} />
      }
      onCancel={() => {
        onModalClose();
      }}
    >
      <div className={label}>
        About to renew: {commitments.length} {isSingleCommitment ? "commitment" : "commitments"}
      </div>
      {isSingleCommitment && (
        <DataGrid columns={2} columnMaxSize="1fr">
          <DataGridRow>
            <DataGridCell className={label}>Resource:</DataGridCell>
            <DataGridCell data-testid={"renewResource"}>{commitments[0].resource_name}</DataGridCell>
          </DataGridRow>
          <DataGridRow>
            <DataGridCell className={label}>Amount:</DataGridCell>
            <DataGridCell>{valueWithUnit(commitments[0].amount, unit)}</DataGridCell>
          </DataGridRow>
          <DataGridRow>
            <DataGridCell className={label}>Expires At:</DataGridCell>
            <DataGridCell>{formatTimeISO8160(commitments[0].expires_at)}</DataGridCell>
          </DataGridRow>
        </DataGrid>
      )}
      <ConfirmInput subText={subText} {...inputProps} />
    </Modal>
  );
};

export default RenewModal;
