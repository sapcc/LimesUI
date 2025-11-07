// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { DataGridRow, DataGridCell, Button, Select, TextInput, Stack } from "@cloudoperators/juno-ui-components";
import Actions from "./Operations/Actions";
import { valueWithUnit, Unit } from "../../lib/unit";
import { formatTime, formatTimeISO8160 } from "../../lib/utils";
import { createCommitmentStore, createCommitmentStoreActions } from "../StoreProvider";
import CommitmentDurationInputLabel from "./CommitmentDurationInputLabel";
import ToolTipWrapper from "../shared/ToolTipWrapper";
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
  const startDate = confirm_by ? confirm_by : created_at;
  const durations = props.durations;
  const serviceType = props.serviceType;
  const currentResource = props.currentResource;
  const resourceName = currentResource?.name;
  const isAddingCommitment = id === COMMITMENTID ? true : false;
  const { commitment: newCommitment } = createCommitmentStore();
  const { commitmentIsLoading } = createCommitmentStore();
  const { transferCommitment } = createCommitmentStore();
  const { isTransferring } = createCommitmentStore();
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
  const unit = new Unit(unitName);
  const initialParsedAmount = unit.format(amount, { ascii: true });
  const inputRef = React.useRef(initialParsedAmount);
  const durationLabel = React.useRef("");

  function stopEditing() {
    setInvalidInput(false);
    setInValidDuration(false);
    setCommitment(initialCommitmentObject);
    setIsCommitting(false);
    setToast(null);
  }

  function handleInput(e) {
    setInvalidInput(false);
    setToast(null);
    inputRef.current = e.target.value;
  }

  function handleSelect(value) {
    const duration = value?.key;
    const { label = "" } = value?.props;
    durationLabel.current = label;
    setInValidDuration(false);
    setCommitment({ ...newCommitment, duration: duration });
  }

  function handleSave() {
    const parsedInput = unit.parse(inputRef.current);
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
      <DataGridCell>
        {isAddingCommitment ? (
          <TextInput
            data-cy="commitmentInput"
            value={inputRef.current}
            invalid={invalidInput}
            autoFocus={true}
            onChange={(e) => handleInput(e)}
          />
        ) : (
          valueWithUnit(amount, unit)
        )}
      </DataGridCell>
      <DataGridCell>
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
      <DataGridCell className="items-start">
        <ToolTipWrapper trigger={formatTimeISO8160(startDate)} content={formatTime(startDate, "YYYY-MM-DD HH:mm A")} />
      </DataGridCell>
      <DataGridCell className="items-start">
        <ToolTipWrapper
          trigger={formatTimeISO8160(confirmed_at) || (!isAddingCommitment ? "Unconfirmed" : "")}
          content={
            <span className="grid grid-cols-3 gap-1">
              <span>created: </span>
              <span className="col-span-2">{formatTime(created_at, "YYYY-MM-DD HH:mm A")}</span>
              {confirmed_at && (
                <>
                  <span>confirmed: </span>
                  <span className="col-span-2">{formatTime(confirmed_at, "YYYY-MM-DD HH:mm A")}</span>
                </>
              )}
            </span>
          }
        />
      </DataGridCell>
      <DataGridCell className="items-start">
        <ToolTipWrapper
          trigger={formatTimeISO8160(expires_at)}
          content={formatTime(expires_at, "YYYY-MM-DD HH:mm A")}
        />
      </DataGridCell>
      <DataGridCell className="items-start truncate">
        <ToolTipWrapper trigger={parseRequesterName(creator_name)} content={creator_name} />
      </DataGridCell>
      <DataGridCell>
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
