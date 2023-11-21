import React from "react";
import {
  Modal,
  ModalFooter,
  ButtonRow,
  Button,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Stack,
  TextInput,
} from "juno-ui-components";
import { Unit, valueWithUnit } from "../../lib/unit";

const label = "font-semibold";

const CommitmentModal = (props) => {
  const { title, subText, az, commitment, onConfirm, onModalClose, showModal } =
    {
      ...props,
    };
  const unit = new Unit(commitment.unit);
  const [invalidInput, setInvalidInput] = React.useState(false);
  const inputRef = React.useRef("");

  function confirm() {
    if (inputRef.current !== subText) {
      setInvalidInput(true);
      return;
    }
    onConfirm();
  }

  function onInput(e) {
    setInvalidInput(false);
    inputRef.current = e.target.value;
  }

  const modalFooter = (
    <ModalFooter className="justify-end">
      <ButtonRow>
        <Button
          label={subText}
          variant={subText === "Delete" ? "primary-danger" : "primary"}
          onClick={() => confirm()}
        />
        <Button
          label="Cancel"
          variant="subdued"
          onClick={() => onModalClose()}
        />
      </ButtonRow>
    </ModalFooter>
  );

  return (
    <Modal
      title={title}
      open={showModal}
      modalFooter={modalFooter}
      onCancel={() => onModalClose()}
    >
      <DataGrid columns={2} className={"mb-6"}>
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
      <Stack direction="vertical" alignment="center" className="mb-1">
        <Stack className="mb-1">
          To confirm, type:&nbsp;
          <span className={label}>{subText}</span>
        </Stack>
        <Stack>
          <TextInput
            width="auto"
            autoFocus
            errortext={
              invalidInput ? "Please enter the highlighted term above." : ""
            }
            onChange={(e) => onInput(e)}
          />
        </Stack>
      </Stack>
    </Modal>
  );
};

export default CommitmentModal;
