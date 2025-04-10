/**
 * Copyright 2024 SAP SE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  const { action, az, canConfirm, commitment, minConfirmDate, onModalClose, subText, title } = { ...props };
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
      {!canConfirm && (
        <Message
          data-testid="noCapacityWarning"
          className="m-auto"
          variant="warning"
          text="No capacity available. Confirmation delay possible."
        />
      )}
      <DataGrid columns={2} className={!showCalendar ? "mb-6" : "mb-0"} columnMaxSize="1fr">
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
          <DataGridCell>
            {commitment.duration + (commitment?.durationLabel && " " + "(" + commitment.durationLabel + ")")}
          </DataGridCell>
        </DataGridRow>
        <DataGridRow></DataGridRow>
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
