import React from "react";
import { Modal, DataGrid, DataGridRow, DataGridCell } from "@cloudoperators/juno-ui-components";
import BaseFooter from "./BaseComponents/BaseFooter";
import useConfirmInput from "./BaseComponents/useConfirmInput";
import { formatTimeISO8160 } from "../../../lib/utils";
import { valueWithUnit } from "../../../lib/unit";
import { Unit } from "../../../lib/unit";

const label = "font-semibold";

const MarketplaceModal = (props) => {
  const { action, title, subText, onModalClose, commitment } = props;
  const { amount, availability_zone, duration, expires_at } = commitment;
  const unit = new Unit(commitment.unit);
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({
    confirmationText: subText,
  });

  function onConfirm() {
    action(commitment);
  }

  return (
    <Modal
      className="max-h-full"
      title={title}
      open={true}
      modalFooter={
        <BaseFooter onModalClose={onModalClose} guardFns={[checkInput]} actionFn={onConfirm} variant={"primary"} />
      }
      onCancel={() => {
        onModalClose();
      }}
    >
      <DataGrid columns={2} columnMaxSize="1fr">
        <DataGridRow>
          <DataGridCell className={label}>Availability Zone:</DataGridCell>
          <DataGridCell>{availability_zone}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className={label}>Amount:</DataGridCell>
          <DataGridCell>{valueWithUnit(amount, unit)}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className={label}>Duration:</DataGridCell>
          <DataGridCell>{duration}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell>Expires at:</DataGridCell>
          <DataGridCell>{formatTimeISO8160(expires_at)}</DataGridCell>
        </DataGridRow>
      </DataGrid>
      <ConfirmInput subText={subText} {...inputProps} />
    </Modal>
  );
};

export default MarketplaceModal;
