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
import { DataGrid, DataGridRow, DataGridCell, Modal, Select, SelectOption } from "@cloudoperators/juno-ui-components";
import BaseFooter from "./BaseComponents/BaseFooter";
import { createCommitmentStore } from "../../StoreProvider";
import { Unit, valueWithUnit } from "../../../lib/unit";
import useConfirmInput from "./BaseComponents/useConfirmInput";

// This package is isolated in order to create a way to decouple the remaining modal components in the near future.
const UpdateDurationModal = (props) => {
  const { title, onModalClose, commitment, subText, onUpdate } = props;
  const [selectedDuration, setSelectedDuration] = React.useState(null);
  const unit = new Unit(commitment.unit);
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({
    confirmationText: subText,
  });
  const { validDurations: durations } = createCommitmentStore();
  const validDurations = durations.get(commitment.id) || [];

  console.log(commitment);

  function onConfirm() {
    if (!selectedDuration) {
      return;
    }
    const payload = { duration: selectedDuration };
    onUpdate(commitment, payload);
  }

  return (
    validDurations.length !== 0 && (
      <Modal
        className="max-h-full"
        title={title}
        open={true}
        modalFooter={<BaseFooter onModalClose={onModalClose} guardFns={[checkInput]} actionFn={onConfirm} />}
        onCancel={() => {
          onModalClose();
        }}
      >
        <DataGrid columns={2} columnMaxSize="1fr">
          <DataGridRow>
            <DataGridCell className="font-semibold">Amount</DataGridCell>
            <DataGridCell>{valueWithUnit(commitment.amount, unit)}</DataGridCell>
          </DataGridRow>
          <DataGridRow>
            <DataGridCell className="font-semibold">Available Durations</DataGridCell>
            <DataGridCell>
              <Select
                data-testid="updateDurationInput"
                onChange={(duration) => {
                  setSelectedDuration(duration);
                }}
              >
                {validDurations.map((duration) => (
                  <SelectOption data-testid={duration} key={duration}>
                    {duration}
                  </SelectOption>
                ))}
              </Select>
            </DataGridCell>
          </DataGridRow>
        </DataGrid>
        <ConfirmInput subText={subText} {...inputProps} />
      </Modal>
    )
  );
};

export default UpdateDurationModal;
