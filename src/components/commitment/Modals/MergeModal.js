// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

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
    const payload = { commitment_ids: commitments.map((c) => c.id) };
    action(payload);
  }

  return (
    <Modal
      data-testid={"mergeModal"}
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
