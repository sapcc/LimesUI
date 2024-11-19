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
import {
  Modal,
  DataGrid,
  DataGridRow,
  DataGridCell,
} from "@cloudoperators/juno-ui-components";
import BaseFooter from "./BaseComponents/BaseFooter";
import useConfirmInput from "./BaseComponents/useConfirmInput";
import { valueWithUnit } from "../../../lib/unit";
import { Unit } from "../../../lib/unit";

const label = "font-semibold";

const DeleteModal = (props) => {
  const { action, az, title, subText, onModalClose, commitment } = props;
  const unit = new Unit(commitment.unit);
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({
    confirmationText: subText,
  });

  function onDelete() {
    action(commitment);
  }

  return (
    <Modal
      className="max-h-full"
      title={title}
      open={true}
      modalFooter={
        <BaseFooter
          onModalClose={onModalClose}
          guardFns={[checkInput]}
          actionFn={onDelete}
          variant={"primary-danger"}
        />
      }
      onCancel={() => {
        onModalClose();
      }}
    >
      <DataGrid columns={2} columnMaxSize="1fr">
        <DataGridRow>
          <DataGridCell className={label}>Availability Zone:</DataGridCell>
          <DataGridCell>{az}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className={label}>Amount:</DataGridCell>
          <DataGridCell>{valueWithUnit(commitment.amount, unit)}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className={label}>Duration:</DataGridCell>
          <DataGridCell>{commitment.duration}</DataGridCell>
        </DataGridRow>
      </DataGrid>
      <ConfirmInput subText={subText} {...inputProps} />
    </Modal>
  );
};

export default DeleteModal;
