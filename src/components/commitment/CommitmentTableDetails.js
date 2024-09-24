import React from "react";
import {
  DataGridRow,
  DataGridCell,
  Button,
  Select,
  SelectOption,
  TextInput,
  Stack,
  Icon,
} from "@cloudoperators/juno-ui-components";
import { valueWithUnit, Unit } from "../../lib/unit";
import { formatTime, formatTimeISO8160 } from "../../lib/utils";
import {
  createCommitmentStore,
  createCommitmentStoreActions,
  globalStore,
} from "../StoreProvider";
import CommitmentTooltip from "./CommitmentTooltip";
import { initialCommitmentObject } from "../../lib/constants";
import { COMMITMENTID, TransferStatus } from "../../lib/constants";
import useCommitmentFilter from "../../hooks/useCommitmentFilter";
import useResetCommitment from "../../hooks/useResetCommitment";

const CommitmentTableDetails = (props) => {
  const { commitment } = props;
  const {
    id,
    amount,
    duration,
    created_at,
    confirmed_at,
    confirmed_at: isConfirmed,
    confirm_by,
    expires_at,
    creator_name,
    unit: unitName,
  } = { ...commitment };
  const startDate = confirm_by ? confirm_by : created_at;
  const durations = props.durations;
  const serviceType = props.serviceType;
  const currentResource = props.currentResource;
  const currentAZ = props.currentAZ;
  const isAddingCommitment = id === COMMITMENTID ? true : false;
  const { commitment: newCommitment } = createCommitmentStore();
  const { commitmentIsLoading } = createCommitmentStore();
  const { transferCommitment } = createCommitmentStore();
  const { isTransferring } = createCommitmentStore();
  const [showTransfer, setShowTransfer] = React.useState(true);
  const { isPlanned, isPending } = useCommitmentFilter();
  const { setCommitment } = createCommitmentStoreActions();
  const { setTransferredCommitment } = createCommitmentStoreActions();
  const { setIsCommitting } = createCommitmentStoreActions();
  const { setIsSubmitting } = createCommitmentStoreActions();
  const { resetCommitmentTransfer } = useResetCommitment();
  const { setIsTransferring } = createCommitmentStoreActions();
  const { setTransferFromAndToProject } = createCommitmentStoreActions();
  const { setDeleteCommitment } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();
  const { scope } = globalStore();
  const [invalidDuration, setInValidDuration] = React.useState(false);
  const [invalidInput, setInvalidInput] = React.useState(false);
  const unit = new Unit(unitName);
  const commitmentInTrasfer = commitment.transfer_status ? true : false;
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
      service_type: serviceType,
      resource_name: currentResource,
      availability_zone: currentAZ,
      amount: parsedInput,
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

  function transferCommitOnProjectLevel() {
    setTransferFromAndToProject(
      commitmentInTrasfer ? TransferStatus.VIEW : TransferStatus.START
    );
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

  function setCommitmentLabel() {
    let label;
    isConfirmed
      ? (label = "Committed")
      : isPending(commitment)
      ? (label = "Pending")
      : isPlanned(commitment)
      ? (label = "Planned")
      : (label = "");
    return label;
  }

  function onCommitmentDelete() {
    setDeleteCommitment(commitment);
  }

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
          displayText={formatTimeISO8160(startDate)}
          toolTipContent={formatTime(startDate, "YYYY-MM-DD HH:mm A")}
        />
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
          displayText={formatTimeISO8160(expires_at)}
          toolTipContent={formatTime(expires_at, "YYYY-MM-DD HH:mm A")}
        />
      </DataGridCell>
      <DataGridCell className="items-start">
        <CommitmentTooltip
          displayText={parseRequesterName(creator_name)}
          toolTipContent={creator_name}
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
        ) : transferCommitment && showTransfer ? (
          <Stack gap="2">
            <Button
              size="small"
              variant="primary"
              onClick={() => {
                transferCommit();
              }}
              disabled={newCommitment?.id == id}
            >
              Move
            </Button>
            <Button
              size="small"
              onClick={() => {
                resetCommitmentTransfer();
              }}
            >
              Cancel
            </Button>
          </Stack>
        ) : (
          <Stack className="gap-1">
            <Stack>{setCommitmentLabel()}</Stack>
            <Stack className={"mr-0 gap-1"}>
              {commitment?.can_be_deleted && (
                <Button
                  className="py-[0.315rem] px-2]"
                  onClick={() => {
                    onCommitmentDelete();
                  }}
                  size="small"
                  variant="primary-danger"
                >
                  <Icon icon="cancel" title="Delete" size="18" />
                </Button>
              )}
              {scope.isProject() && isConfirmed && (
                <Button
                  className="py-[0.315rem] px-2]"
                  size="small"
                  variant={commitmentInTrasfer ? "primary" : "default"}
                  onClick={() => {
                    transferCommitOnProjectLevel();
                  }}
                >
                  <Icon icon="openInBrowser" title="Edit" size="18" />
                </Button>
              )}
            </Stack>
          </Stack>
        )}
      </DataGridCell>
    </DataGridRow>
  );
};

export default CommitmentTableDetails;
