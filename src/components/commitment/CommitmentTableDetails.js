// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { DataGridRow, DataGridCell, Button, Select, Stack } from "@cloudoperators/juno-ui-components";
import Actions from "./Operations/Actions";
import { createUnit, valueWithUnit } from "../../lib/unit";
import { formatTime, formatTimeISO8160 } from "../../lib/utils";
import { createCommitmentStoreActions, useCreateCommitmentStore } from "../StoreProvider";
import CommitmentDurationInputLabel from "./CommitmentDurationInputLabel";
import ToolTipWrapper from "../shared/ToolTipWrapper";
import InputWithUnit from "../shared/InputWithUnit";
import { initialCommitmentObject } from "../../lib/constants";
import { COMMITMENTID } from "../../lib/constants";
import useResetCommitment from "../../hooks/useResetCommitment";

const transferLabel = Object.freeze({
  Move: "Move",
  Selected: "Selected",
});

const CommitmentTableDetails = (props) => {
  const { currentTab, commitment, commitmentTransferID, mergeOps } = props;
  const {
    id,
    amount,
    duration,
    created_at,
    confirmed_at,
    confirm_by,
    expires_at,
    creator_name,
    unit: unitName,
  } = { ...commitment };
  const startDate = confirm_by ?? created_at;
  const durations = props.durations;
  const serviceType = props.serviceType;
  const currentResource = props.currentResource;
  const resourceName = currentResource?.name;
  const isAddingCommitment = id === COMMITMENTID ? true : false;
  const newCommitment = useCreateCommitmentStore((state) => state.commitment);
  const commitmentIsLoading = useCreateCommitmentStore((state) => state.commitmentIsLoading);
  const transferCommitment = useCreateCommitmentStore((state) => state.transferCommitment);
  const isTransferring = useCreateCommitmentStore((state) => state.isTransferring);
  const [showTransfer, setShowTransfer] = React.useState(true);
  const { setCommitment } = createCommitmentStoreActions();
  const { setTransferredCommitment } = createCommitmentStoreActions();
  const { setIsCommitting } = createCommitmentStoreActions();
  const { setIsSubmitting } = createCommitmentStoreActions();
  const { resetCommitmentTransfer } = useResetCommitment();
  const { setIsTransferring } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();
  const [invalidDuration, setInValidDuration] = React.useState(false);
  const [invalidInput, setInvalidInput] = React.useState(false);
  const unit = createUnit(unitName);
  const initialParsedAmount = unit.formatForInput(amount, { ascii: true });
  const commitmentInputRef = React.useRef(initialParsedAmount);
  const durationLabel = React.useRef("");

  function stopEditing() {
    setInvalidInput(false);
    setInValidDuration(false);
    setCommitment(initialCommitmentObject);
    setIsCommitting(false);
    setToast(null);
  }

  function handleInput() {
    setInvalidInput(false);
    setToast(null);
  }

  function handleSelect(value) {
    const duration = value?.key;
    const { label = "" } = value?.props;
    durationLabel.current = label;
    setInValidDuration(false);
    setCommitment({ ...newCommitment, duration: duration });
  }

  function handleSave() {
    const parsedInput = unit.parse(commitmentInputRef.current);
    if (parsedInput.error) {
      setInvalidInput(true);
      setToast(parsedInput.error);
      return;
    }

    if (!newCommitment.duration) {
      setInValidDuration(true);
      return;
    }

    //Unit is set in parent component (table).
    setCommitment({
      ...newCommitment,
      service_type: serviceType,
      resource_name: resourceName,
      availability_zone: currentTab,
      amount: parsedInput,
      durationLabel: durationLabel.current,
    });
    setIsSubmitting(true);
  }

  function parseRequesterName(name) {
    const exp = new RegExp("[^@]*").exec(name)[0];
    if (exp === "undefined") {
      return "";
    }
    return exp;
  }

  // Transfer commitment (Cluster/Domain View)
  function transferCommit() {
    setIsTransferring(true);
    setTransferredCommitment(props.commitment);
  }

  // If a commitment is selected, hide all other move buttons from the UI.
  React.useEffect(() => {
    if (newCommitment.id == COMMITMENTID) {
      setShowTransfer(true);
    } else {
      setShowTransfer(newCommitment?.id == id);
    }
  }, [isTransferring]);

  return (
    <DataGridRow>
      <DataGridCell className="justify-start">
        {isAddingCommitment ? (
          <InputWithUnit
            inputRef={commitmentInputRef}
            invalid={invalidInput}
            onChange={() => handleInput()}
            unit={unit}
          />
        ) : (
          valueWithUnit(amount, unit)
        )}
      </DataGridCell>
      <DataGridCell className="justify-start">
        {isAddingCommitment ? (
          <Select
            data-cy="commitmentSelect"
            placeholder="Select"
            invalid={invalidDuration}
            onChange={(e) => handleSelect(e)}
          >
            {durations.map((duration, idx) => (
              <CommitmentDurationInputLabel
                key={duration}
                index={idx}
                allowedDurations={durations}
                commitmentDuration={duration}
              />
            ))}
          </Select>
        ) : (
          duration
        )}
      </DataGridCell>
      <DataGridCell className="justify-start">
        <ToolTipWrapper trigger={formatTimeISO8160(startDate)} content={formatTime(startDate, "YYYY-MM-DD HH:mm A")} />
      </DataGridCell>
      <DataGridCell className="justify-start">
        <ToolTipWrapper
          trigger={formatTimeISO8160(confirmed_at) || (!isAddingCommitment ? "Unconfirmed" : "")}
          content={
            <span className="grid grid-cols-3 gap-1">
              <span>created: </span>
              <span className="col-span-2">{formatTime(created_at, "YYYY-MM-DD HH:mm A")}</span>
              {confirmed_at >= 0 && (
                <>
                  <span>confirmed: </span>
                  <span className="col-span-2">{formatTime(confirmed_at, "YYYY-MM-DD HH:mm A")}</span>
                </>
              )}
            </span>
          }
        />
      </DataGridCell>
      <DataGridCell className="justify-start">
        <ToolTipWrapper
          trigger={formatTimeISO8160(expires_at)}
          content={formatTime(expires_at, "YYYY-MM-DD HH:mm A")}
        />
      </DataGridCell>
      <DataGridCell className="justify-start truncate">
        <ToolTipWrapper trigger={parseRequesterName(creator_name)} content={creator_name} />
      </DataGridCell>
      <DataGridCell className="justify-start">
        {isAddingCommitment ? (
          <Stack gap="2">
            <Button
              data-testid="commitmentSave"
              data-cy="commitmentSave"
              variant="primary"
              onClick={() => handleSave()}
              progress={commitmentIsLoading}
              size="small"
              icon="check"
            >
              Save
            </Button>
            <Button onClick={() => stopEditing()} data-testid="commitmentCancel" icon="close" size="small">
              Cancel
            </Button>
          </Stack>
        ) : transferCommitment && showTransfer ? (
          <Stack gap="2">
            <Button
              size="small"
              title={commitment.id == commitmentTransferID.current && `Please select a target project`}
              variant="primary"
              onClick={() => {
                commitmentTransferID.current = commitment.id;
                transferCommit();
              }}
              disabled={newCommitment?.id == id}
            >
              {isTransferring && commitment.id == commitmentTransferID.current
                ? transferLabel.Selected
                : transferLabel.Move}
            </Button>
            <Button
              size="small"
              onClick={() => {
                commitmentTransferID.current = null;
                resetCommitmentTransfer();
              }}
            >
              Cancel
            </Button>
          </Stack>
        ) : (
          <Actions commitment={commitment} resource={currentResource} mergeOps={mergeOps} />
        )}
      </DataGridCell>
    </DataGridRow>
  );
};

export default CommitmentTableDetails;
