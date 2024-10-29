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
