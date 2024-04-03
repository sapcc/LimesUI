import React from "react";
import {
  Modal,
  ModalFooter,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Button,
  ButtonRow,
  Stack,
  TextInput,
} from "juno-ui-components";
import { valueWithUnit } from "../../lib/unit";
import { Unit } from "../../lib/unit";

const label = "font-semibold";

const DeleteModal = (props) => {
  const { title, subText, onModalClose, commitment, az, onDelete } = props;
  const unit = new Unit(commitment.unit);
  const inputRef = React.useRef("");
  const [invalidInput, setInvalidInput] = React.useState(false);

  function onInput(e) {
    setInvalidInput(false);
    inputRef.current = e.target.value;
  }

  function onConfirm(commitment) {
    if (inputRef.current.toLowerCase() !== subText.toLowerCase()) {
      setInvalidInput(true);
      return;
    }
    onDelete(commitment);
  }

  const modalFooter = (
    <ModalFooter className="justify-end">
      <ButtonRow>
        <Button
          label="confirm"
          variant={"primary-danger"}
          onClick={() => onConfirm(commitment)}
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
      <Stack direction="vertical" alignment="center" className="mb-1 mt-5">
        <div>
          <Stack className={"mt-5"}>
            To confirm, type:&nbsp;
            <span className={label}>{subText}</span>
          </Stack>
          <Stack>
            <TextInput
              width="auto"
              autoFocus
              errortext={
                invalidInput && "Please enter the highlighted term above."
              }
              onChange={(e) => onInput(e)}
            />
          </Stack>
        </div>
      </Stack>
    </Modal>
  );
};

export default DeleteModal;
