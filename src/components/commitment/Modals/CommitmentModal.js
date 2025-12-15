// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import {
  Message,
  Modal,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Stack,
  Checkbox,
} from "@cloudoperators/juno-ui-components";
import BaseFooter from "./BaseComponents/BaseFooter";
import CommitmentCalendar from "../CommitmentCalendar";
import moment from "moment";
import useConfirmInput from "./BaseComponents/useConfirmInput";
import { Unit, valueWithUnit } from "../../../lib/unit";
import { formatTimeISO8160 } from "../../../lib/utils";

const label = "font-semibold";

const CommitmentModal = (props) => {
  const { action, currentTab, canConfirm, commitment, minConfirmDate, onModalClose, subText, title } = { ...props };
  const unit = new Unit(commitment.unit);
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({ confirmationText: subText });
  const hasMinConfirmDate = minConfirmDate ? true : false;
  // Show Calendar if: 1.) min_confirm_by field is set 2.) Not enough capacity is available on limes.
  const [showCalendar, setShowCalendar] = React.useState(hasMinConfirmDate || !canConfirm);
  // Identify if a commitment will be set on the current day.
  const [isCurrentDayCommit, setIsCurrentDayCommit] = React.useState(minConfirmDate ? false : true);
  // The calendar start date primarily uses the API date and defaults to todays timestamp.
  const startDate = minConfirmDate ? moment.unix(minConfirmDate)._d : moment()._d;
  const [selectedDate, setSelectedDate] = React.useState(startDate);
  const formattedDate = formatTimeISO8160(moment(selectedDate).unix());
  const notifyOnConfirm = React.useRef(false);

  function onConfirm() {
    if (!selectedDate) return;
    // don't send a durationLabel for the UI to the API.
    delete commitment?.durationLabel;

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
      action(confirm_by, notifyOnConfirm.current);
    } else {
      action();
    }
  }

  function handleCalendarClick() {
    setShowCalendar(!showCalendar);
    setSelectedDate(startDate);
  }

  return (
    <Modal
      className="max-h-full"
      title={title}
      open={true}
      modalFooter={
        <BaseFooter onModalClose={onModalClose} guardFns={[checkInput]} actionFn={onConfirm} variant={"primary"} />
      }
      onCancel={() => onModalClose()}
    >
      <Stack direction="vertical" gap="1">
        <Message data-testid="marketplaceInfo" variant="info" text="Explore the marketplace before committing." />
        {!canConfirm && (
          <Message
            data-testid="noCapacityWarning"
            variant="warning"
            text="No capacity available. Confirmation delay possible."
          />
        )}
      </Stack>
      <DataGrid columns={2} className={!showCalendar ? "mb-6" : "mb-0"} columnMaxSize="1fr">
        <DataGridRow>
          <DataGridCell className={label}>Availability Zone:</DataGridCell>
          <DataGridCell>{currentTab}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className={label}>Amount:</DataGridCell>
          <DataGridCell>{valueWithUnit(commitment.amount, unit)}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className={label}>Duration:</DataGridCell>
          <DataGridCell>
            {commitment.duration + (commitment?.durationLabel && " " + "(" + commitment.durationLabel + ")")}
          </DataGridCell>
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
          {showCalendar && (
            <>
              <DataGridCell className={label}>Notificaton</DataGridCell>
              <DataGridCell>
                <Checkbox
                  label="send mail on confirm"
                  onClick={() => {
                    notifyOnConfirm.current = !notifyOnConfirm.current;
                  }}
                />
              </DataGridCell>
            </>
          )}
        </DataGridRow>
        {showCalendar && (
          <DataGridRow>
            <DataGridCell className={label}>Activation Date</DataGridCell>
            <DataGridCell>{formattedDate}</DataGridCell>
          </DataGridRow>
        )}
      </DataGrid>
      {showCalendar && (
        <Stack direction="vertical" alignment="center" className="h-[20rem]">
          <CommitmentCalendar
            startDate={startDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            currentDayCommit={setIsCurrentDayCommit}
          />
        </Stack>
      )}
      <ConfirmInput subText={subText} {...inputProps} />
    </Modal>
  );
};

export default CommitmentModal;
