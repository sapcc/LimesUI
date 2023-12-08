import React from "react";
import {
  Message,
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

const label = "font-semibold";

const CommitmentModal = (props) => {
  const {
    title,
    subText,
    az,
    minConfirmDate,
    commitment,
    canConfirm,
    onConfirm,
    onModalClose,
    showModal,
  } = {
    ...props,
  };
  const hasMinConfirmDate = minConfirmDate ? true : false;
  const unit = new Unit(commitment.unit);
  const [invalidInput, setInvalidInput] = React.useState(false);
  const inputRef = React.useRef("");
  const [showWarning, setShowWarning] = React.useState(false);
  const [showCalendar, setShowCalendar] = React.useState(hasMinConfirmDate);
  // The calendar start date primarely uses the API date and defaults to todays timestamp.
  const startDate = hasMinConfirmDate
    ? moment.unix(minConfirmDate)._d
    : moment()._d;
  const [selectedDate, setSelectedDate] = React.useState(startDate);
  const formattedDate = formatTimeISO8160(moment(selectedDate).unix());

  // Query can-confirm API. Determine if capacity is sufficient on limes.
  // TODO: cannot be implemented yet: capacity errors not always identifiable by the API
  /*
  React.useEffect(() => {
    const result = canConfirm((result) => {
      console.log(result)
      return result;
    });
    if (hasMinConfirmDate && !result) {
      setShowWarning(true);
    }
  }, []);
  */

  function confirm() {
    if (inputRef.current.toLowerCase() !== subText.toLowerCase()) {
      setInvalidInput(true);
      return;
    }
    if (!selectedDate) return;

    // Send the request with or without confirm_by field.
    // The API confirms commitments without confirm_by instantly.
    const confirm_by = moment(selectedDate).unix();
    const sendConfirmBy = showCalendar;
    if (sendConfirmBy) {
      onConfirm(confirm_by);
    } else {
      onConfirm();
    }
  }

  function onInput(e) {
    setInvalidInput(false);
    inputRef.current = e.target.value;
  }

  function handleCalendarClick() {
    setShowCalendar(!showCalendar);
    setSelectedDate(startDate);
  }

  const modalFooter = (
    <ModalFooter className="justify-end">
      <ButtonRow>
        <Button
          disabled={!selectedDate ? true : false}
          label={subText}
          variant={"primary"}
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
      className="max-h-full"
      title={title}
      open={showModal}
      modalFooter={modalFooter}
      onCancel={() => onModalClose()}
    >
      {showWarning && (
        <Message
          className="m-auto"
          variant="warning"
          text="No capacity available. Confirmation delay possible."
        />
      )}
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
        <DataGridRow>
          <DataGridCell className={label}>Activation</DataGridCell>
          <DataGridCell>
            <Checkbox
              checked={!showCalendar}
              disabled={hasMinConfirmDate}
              onClick={() => {
                handleCalendarClick();
              }}
              label="immediately"
            />
          </DataGridCell>
        </DataGridRow>
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
            startDate={startDate}
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
