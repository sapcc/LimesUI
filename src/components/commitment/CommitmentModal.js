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
  Checkbox,
} from "juno-ui-components";
import { Unit, valueWithUnit } from "../../lib/unit";
import { formatTimeISO8160 } from "../../lib/utils";
import moment from "moment";
import CommitmentCalendar from "./CommitmentCalendar";
import useStore from "../../lib/store/store";

const label = "font-semibold";

const CommitmentModal = (props) => {
  const {
    title,
    subText,
    az,
    commitment,
    onConfirm,
    onModalClose,
    showModal,
    isCommitting,
  } = {
    ...props,
  };
  const unit = new Unit(commitment.unit);
  const [invalidInput, setInvalidInput] = React.useState(false);
  const inputRef = React.useRef("");
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(moment()._d);
  const formattedDate = formatTimeISO8160(moment(selectedDate).unix());
  const newCommitment = useStore((state) => state.commitment);
  const setCommitment = useStore((state) => state.setCommitment);

  function confirm() {
    if (inputRef.current.toLowerCase() !== subText.toLowerCase()) {
      setInvalidInput(true);
      return;
    }
    if (isCommitting) {
      // The calendar component will handle an error message as footer.
      if (!selectedDate) return;
      setCommitment({
        ...newCommitment,
        confirm_by: moment(selectedDate).unix(),
      });
    }
    onConfirm();
  }

  function onInput(e) {
    setInvalidInput(false);
    inputRef.current = e.target.value;
  }

    // Enable Enter input to confirm modal.
    React.useEffect(() => {
      const listener = event => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          event.preventDefault();
          confirm()
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    }, []);

  const modalFooter = (
    <ModalFooter className="justify-end">
      <ButtonRow>
        <Button
          label={subText}
          variant={!isCommitting ? "primary-danger" : "primary"}
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

  function handleCalendarClick() {
    setShowCalendar(!showCalendar);
    setSelectedDate(moment()._d);
  }

  return (
    <Modal
      title={title}
      open={showModal}
      modalFooter={modalFooter}
      onCancel={() => onModalClose()}
    >
      <DataGrid
        columns={2}
        className={!showCalendar ? "mb-6" : "mb-0"}
        columnMaxSize="1fr"
      >
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
        {isCommitting && (
          <DataGridRow>
            <DataGridCell className={label}>Activation</DataGridCell>
            <DataGridCell>
              <Checkbox
                checked={!showCalendar}
                onClick={() => {
                  handleCalendarClick();
                }}
                label="immediately"
              />
            </DataGridCell>
          </DataGridRow>
        )}
        {showCalendar && (
          <DataGridRow>
            <DataGridCell className={label}>Activation Date</DataGridCell>
            <DataGridCell>{formattedDate}</DataGridCell>
          </DataGridRow>
        )}
      </DataGrid>
      {showCalendar && (
        <Stack direction="vertical" alignment="center" className="h-[22.5rem]">
          <CommitmentCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Stack>
      )}
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
              invalidInput && "Please enter the highlighted term above."
            }
            onChange={(e) => onInput(e)}
          />
        </Stack>
      </Stack>
    </Modal>
  );
};

export default CommitmentModal;
