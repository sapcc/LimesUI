import React from "react";
import {
  Modal,
  ModalFooter,
  DataGrid,
  DataGridRow,
  DataGridCell,
  ButtonRow,
  Button,
  Checkbox,
  Stack,
  TextInput,
} from "juno-ui-components";
import { valueWithUnit } from "../../lib/unit";
import { Unit } from "../../lib/unit";

const label = "font-semibold";

const TransferModal = (props) => {
  const {
    title,
    subText,
    onModalClose,
    onTransfer,
    currentProject,
    transferProject,
    commitment,
  } = props;
  const { metadata: originMeta } = currentProject;
  const { metadata: targetMeta } = transferProject;
  const unit = new Unit(commitment.unit);
  const [splitCommitment, setSplitCommitment] = React.useState(false);
  const [invalidInput, setInvalidInput] = React.useState(false);
  const inputRef = React.useRef("");
  const [invalidSplitInput, setInvalidSplitInput] = React.useState(false);
  const splitInputRef = React.useRef(
    unit.format(commitment.amount, { ascii: true })
  );

  function onInput(e) {
    setInvalidInput(false);
    inputRef.current = e.target.value;
  }

  function onSplitInput(e) {
    setInvalidSplitInput(false);
    splitInputRef.current = e.target.value;
  }

  function onConfirm() {
    if (inputRef.current.toLowerCase() !== subText.toLowerCase()) {
      setInvalidInput(true);
      return;
    }
    if (splitCommitment) {
      const parsedInput = unit.parse(splitInputRef.current);
      if (
        parsedInput.error ||
        parsedInput > commitment.amount ||
        parsedInput <= 0
      ) {
        setInvalidSplitInput(true);
        return;
      }
      commitment.amount = parsedInput;
    }
    onTransfer(transferProject, commitment);
  }

  const modalFooter = (
    <ModalFooter className="justify-end">
      <ButtonRow>
        <Button
          label="confirm"
          variant={"primary"}
          onClick={() => onConfirm()}
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
        <DataGridRow>
          <DataGridCell className={label}>Customize:</DataGridCell>
          <DataGridCell>
            <Checkbox
              checked={splitCommitment}
              onClick={() => {
                setSplitCommitment(!splitCommitment);
              }}
              label="Transfer only a part."
            />
          </DataGridCell>
        </DataGridRow>
      </DataGrid>
      <Stack direction="vertical" alignment="center" className="mb-1 mt-5">
        <div>
          {splitCommitment && (
            <div>
              <Stack>{"Amount to transfer: "}</Stack>
              <Stack>
                <TextInput
                  width="auto"
                  autoFocus
                  value={splitInputRef.current}
                  errortext={
                    invalidSplitInput && "Please enter a valid amount."
                  }
                  onChange={(e) => {
                    onSplitInput(e);
                  }}
                />{" "}
              </Stack>
            </div>
          )}
          <Stack className={splitCommitment ? "mt-5 mb-1" : "mb-1"}>
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

export default TransferModal;
