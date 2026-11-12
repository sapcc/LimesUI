// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Message, DataGrid, DataGridRow, DataGridCell, Stack, Checkbox } from "@cloudoperators/juno-ui-components";
import BaseModal from "./BaseComponents/BaseModal";
import BaseFooter from "./BaseComponents/BaseFooter";
import CommitmentCalendar from "../CommitmentCalendar";
import moment from "moment";
import useConfirmInput from "./BaseComponents/useConfirmInput";
import { createUnit, valueWithUnit } from "../../../lib/unit";
import { checkForReasonablySizedCommitment, REASON } from "../../../lib/commitmentSize";
import { formatTimeISO8160 } from "../../../lib/utils";

const label = "font-semibold";

export function getWarningText(warningReason, warningSource, warningComparisonValue, warningBase) {
  const warningText = {
    [REASON.LARGE]: `The resulting commitment sum after this request is very large compared to ${warningSource} (${warningBase}).`,
    [REASON.SMALL]: `The commitment amount (${warningComparisonValue}) is very small compared to ${warningSource} (${warningBase}).`,
  };
  return warningText[warningReason];
}

const CommitmentModal = (props) => {
  const {
    action,
    currentTab,
    canConfirm,
    commitment,
    publicCommitmentQuery,
    resource,
    minConfirmDate,
    onModalClose,
    subText,
    title,
  } = { ...props };
  const unit = createUnit(commitment?.unit);
  const { data: publicCommitmentData } = publicCommitmentQuery;
  const publicCommitments = publicCommitmentData?.commitments || [];
  const hasApplicablePublicCommitments = publicCommitments.some((c) => c?.availability_zone === currentTab);
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
  const [warningAcknowledged, setWarningAcknowledged] = React.useState(false);
  const [acknowledgementError, setAcknowledgementError] = React.useState(false);

  const {
    reason: warningReason,
    source: warningSource,
    comparisonValue: warningComparisonValue,
    baseValue: warningBaseValue,
  } = React.useMemo(
    () => checkForReasonablySizedCommitment(commitment.amount, resource, currentTab),
    [resource, currentTab, commitment]
  );
  const formattedWarningBaseValue = warningReason ? unit.format(warningBaseValue) : "";
  const fomattedWarningComparisonValue = warningReason ? unit.format(warningComparisonValue) : "";
  const warningText = getWarningText(
    warningReason,
    warningSource,
    fomattedWarningComparisonValue,
    formattedWarningBaseValue
  );

  async function onConfirm() {
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
      return action(confirm_by, notifyOnConfirm.current);
    } else {
      return action();
    }
  }

  function checkWarningAcknowledgement() {
    const acknowledged = !warningReason || warningAcknowledged;
    setAcknowledgementError(!acknowledged);
    return acknowledged;
  }

  function handleCalendarClick() {
    setShowCalendar(!showCalendar);
    setSelectedDate(startDate);
  }

  return (
    <BaseModal
      className="max-h-full"
      title={title}
      open={true}
      modalFooter={
        <BaseFooter
          onModalClose={onModalClose}
          guardFns={[checkInput, checkWarningAcknowledgement]}
          actionFn={onConfirm}
          variant={"primary"}
        />
      }
      onCancel={() => onModalClose()}
    >
      <Stack direction="vertical" gap="1">
        {hasApplicablePublicCommitments && (
          <Message
            data-testid="marketplaceInfo"
            variant="info"
            dismissible={true}
            text="You can also check the marketplace for a commitment to take over."
          />
        )}
        {!canConfirm && (
          <Message
            data-testid="noCapacityWarning"
            variant="warning"
            text="No capacity available. Confirmation delay possible."
          />
        )}
        {warningReason && (
          <Message data-testid="commitmentWarning" variant="warning">
            <Stack direction="vertical" gap="1">
              <span>{warningText}</span>
              <Checkbox
                data-testid="commitmentWarningAcknowledgeCheckbox"
                checked={warningAcknowledged}
                onChange={() => {
                  setWarningAcknowledged((acknowledged) => !acknowledged);
                  setAcknowledgementError(false);
                }}
                label="I understand and want to proceed"
              />
            </Stack>
          </Message>
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
      {acknowledgementError && (
        <div className="text-sm text-theme-error text-center mt-1" data-testid="acknowledgementError">
          Please acknowledge the warning above to proceed.
        </div>
      )}
    </BaseModal>
  );
};

export default CommitmentModal;
