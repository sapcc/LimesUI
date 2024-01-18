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
    canConfirm,
    minConfirmDate,
    commitment,
    onConfirm,
    onModalClose,
  } = {
    ...props,
  };
  const unit = new Unit(commitment.unit);
  const hasMinConfirmDate = minConfirmDate ? true : false;
  const [invalidInput, setInvalidInput] = React.useState(false);
  const inputRef = React.useRef("");
  // Show Calendar if: 1.) min_confirm_by field is set 2.) Not enough capacity is available on limes.
  const [showCalendar, setShowCalendar] = React.useState(
    hasMinConfirmDate || !canConfirm
  );
  // Identify if a commitment will be set on the current day.
  const [isCurrentDayCommit, setIsCurrentDayCommit] = React.useState(true);
  // The calendar start date primarely uses the API date and defaults to todays timestamp.
  const startDate = minConfirmDate
    ? moment.unix(minConfirmDate)._d
    : moment()._d;
  const [selectedDate, setSelectedDate] = React.useState(startDate);
  const formattedDate = formatTimeISO8160(moment(selectedDate).unix());

  function confirm() {
    if (inputRef.current.toLowerCase() !== subText.toLowerCase()) {
      setInvalidInput(true);
      return;
    }
    if (!selectedDate) return;

    // Handle current day commitments
    // They should be active after now + 60 seconds (proper margin for the API)
    // Other commitments will be set to 00:00:00 AM
    let confirm_by;
    if (isCurrentDayCommit === true) {
      confirm_by = moment().unix() + 60;
    } else {
      confirm_by = moment(selectedDate).unix();
    }

    // Send the request with or without confirm_by field.
    // The API confirms commitments without confirm_by instantly.
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
      onCancel={() => onModalClose()}
    >
      {!canConfirm && (
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
              disabled={hasMinConfirmDate || !canConfirm}
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
            currentDayCommit={setIsCurrentDayCommit}
          />
        </Stack>
      )}
      <Stack direction="vertical" alignment="center" className="mb-1">
        <div>
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
        </div>
      </Stack>
    </Modal>
  );
};

export default CommitmentModal;
