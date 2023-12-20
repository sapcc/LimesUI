import React from "react";
import {
  DataGridRow,
  DataGridCell,
  Button,
  Select,
  SelectOption,
  TextInput,
  Stack,
} from "juno-ui-components";
import { valueWithUnit, Unit } from "../../lib/unit";
import { formatTime, formatTimeISO8160 } from "../../lib/utils";
import {
  createCommitmentStore,
  createCommitmentStoreActions,
} from "../StoreProvider";
import CommitmentTooltip from "./CommitmentTooltip";
import { initialCommitmentObject } from "../../lib/constants";
import { COMMITMENTID } from "../../lib/constants";

const CommitmentTableDetails = (props) => {
  const {
    id,
    amount,
    duration,
    created_at,
    confirmed_at,
    confirmed_at: isConfirmed,
    confirm_by,
    expires_at,
    unit: unitName,
  } = { ...props.commitment };
  const startDate = confirm_by ? confirm_by : created_at;
  const durations = props.durations;
  const currentCategory = props.currentCategory;
  const currentResource = props.currentResource;
  const currentAZ = props.currentAZ;

  const isAddingCommitment = id === COMMITMENTID ? true : false;
  const { commitment: newCommitment } = createCommitmentStore();
  const { commitmentIsLoading } = createCommitmentStore();
  const { setCommitment } = createCommitmentStoreActions();
  const { setIsCommitting } = createCommitmentStoreActions();
  const { setIsSubmitting } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();
  const [invalidDuration, setInValidDuration] = React.useState(false);
  const [invalidInput, setInvalidInput] = React.useState(false);
  const unit = new Unit(unitName);
  const initialParsedAmount = unit.format(amount, { ascii: true });
  const inputRef = React.useRef(initialParsedAmount);

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
    setInValidDuration(false);
    setCommitment({
      ...newCommitment,
      duration: value,
    });
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
      service_type: currentCategory,
      resource_name: currentResource,
      availability_zone: currentAZ,
      amount: parsedInput,
    });
    setIsSubmitting(true);
  }

  return (
    <DataGridRow>
      <DataGridCell>
        {isAddingCommitment ? (
          <TextInput
            className="max-w-[7rem]"
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
              <SelectOption
                data-cy={`commitmentSelectOption/${idx}`}
                key={duration}
              >
                {duration}
              </SelectOption>
            ))}
          </Select>
        ) : (
          duration
        )}
      </DataGridCell>
      <DataGridCell className="items-start">
        <CommitmentTooltip
          displayText={
            formatTimeISO8160(confirmed_at) ||
            (!isAddingCommitment ? "Unconfirmed" : "")
          }
          toolTipContent={
            <span className="grid grid-cols-3 gap-1">
              <span>created: </span>
              <span className="col-span-2">
                {formatTime(created_at, "YYYY-MM-DD HH:mm A")}
              </span>
              {confirmed_at && (
                <>
                  <span>confirmed: </span>
                  <span className="col-span-2">
                    {formatTime(confirmed_at, "YYYY-MM-DD HH:mm A")}
                  </span>
                </>
              )}
            </span>
          }
        />
      </DataGridCell>
      <DataGridCell className="items-start">
        <CommitmentTooltip
          displayText={formatTimeISO8160(startDate)}
          toolTipContent={formatTime(startDate, "YYYY-MM-DD HH:mm A")}
        />
      </DataGridCell>
      <DataGridCell className="items-start">
        <CommitmentTooltip
          displayText={formatTimeISO8160(expires_at)}
          toolTipContent={formatTime(expires_at, "YYYY-MM-DD HH:mm A")}
        />
      </DataGridCell>
      <DataGridCell>
        {isAddingCommitment ? (
          <Stack gap="2">
            <Button
              data-cy="commitmentSave"
              variant="primary"
              onClick={() => handleSave()}
              progress={commitmentIsLoading}
              size="small"
              icon="check"
            >
              Save
            </Button>
            <Button onClick={() => stopEditing()} icon="close" size="small">
              Cancel
            </Button>
          </Stack>
        ) : isConfirmed ? (
          "Committed"
        ) : (
          "Pending"
        )}
      </DataGridCell>
    </DataGridRow>
  );
};

export default CommitmentTableDetails;
