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
import { parseCommitmentDuration } from "../../../lib/parseCommitmentDurations";

const label = "font-semibold";

const MergeModal = (props) => {
  const { commitments = [] } = props;
  const unit = new Unit(commitments[0].unit);
  const { action, title, subText, onModalClose } = props;
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({ confirmationText: subText });
  const [mergeAmount, highestDuration] = React.useMemo(() => {
    let mergeAmount = 0;
    let highestDuration = "";
    for (const c of commitments) {
      mergeAmount = mergeAmount + c.amount;
      if (parseCommitmentDuration(c.duration) > parseCommitmentDuration(highestDuration)) {
        highestDuration = c.duration;
      }
    }
    return [mergeAmount, highestDuration];
  }, [commitments]);

  function onMerge() {
    if (commitments.length < 2) return;
    let commitment_ids = [];
    for (const c of commitments) {
      commitment_ids.push(c.id);
    }

    const payload = { commitment_ids: commitment_ids };
    action(payload);
  }

  return (
    <Modal
      className="max-h-full"
      title={title}
      open={true}
      modalFooter={
        <BaseFooter onModalClose={onModalClose} guardFns={[checkInput]} actionFn={onMerge} variant={"primary"} />
      }
      onCancel={() => {
        onModalClose();
      }}
    >
      <DataGrid columns={2} columnMaxSize="1fr">
        <DataGridRow>
          <DataGridCell className={label}>Resource:</DataGridCell>
          <DataGridCell data-testid={"renewResource"}>{commitments[0].resource_name}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className={label}>Amount:</DataGridCell>
          <DataGridCell>{valueWithUnit(mergeAmount, unit)}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className={label}>Duration</DataGridCell>
          <DataGridCell>{highestDuration}</DataGridCell>
        </DataGridRow>
      </DataGrid>
      <ConfirmInput subText={subText} {...inputProps} />
    </Modal>
  );
};

export default MergeModal;
