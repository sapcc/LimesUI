import React from "react";
import {
  Modal,
  ModalFooter,
  DataGrid,
  DataGridRow,
  DataGridCell,
  ButtonRow,
  Button,
} from "juno-ui-components";
import { valueWithUnit } from "../../lib/unit";
import { Unit } from "../../lib/unit";

const label = "font-semibold";

const TransferModal = (props) => {
  const {
    title,
    onModalClose,
    onTransfer,
    currentProject,
    transferProject,
    commitment,
  } = props;
  const { metadata: originMeta } = currentProject;
  const { metadata: targetMeta } = transferProject;
  const unit = new Unit(commitment.unit);

  const modalFooter = (
    <ModalFooter className="justify-end">
      <ButtonRow>
        <Button
          label="confirm"
          variant={"primary"}
          onClick={() => onTransfer(transferProject, commitment)}
        />
        <Button
          data-cy="modalCancel"
          label="Cancel"
          variant="subdued"
          onClick={() => onModalClose()}
        />
      </ButtonRow>
    </ModalFooter>
  );

  return (
    <Modal
      className="max-h-full"
      title={title}
      open={true}
      modalFooter={modalFooter}
      onCancel={() => {
        onModalClose();
      }}
    >
      <DataGrid columns={2} columnMaxSize="1fr">
        <DataGridRow>
          <DataGridCell className={label}>Amount:</DataGridCell>
          <DataGridCell>{valueWithUnit(commitment.amount, unit)}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className={label}>Duration:</DataGridCell>
          <DataGridCell>{commitment.duration}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className={label}>Origin:</DataGridCell>
          <DataGridCell>{originMeta.name}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className={label}>Target:</DataGridCell>
          <DataGridCell>{targetMeta.name}</DataGridCell>
        </DataGridRow>
      </DataGrid>
    </Modal>
  );
};

export default TransferModal;
