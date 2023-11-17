import React from "react"
import moment from "moment"
import {
  DataGridRow,
  DataGridCell,
  ButtonRow,
  Button,
  Select,
  SelectOption,
  TextInput,
} from "juno-ui-components"
import { valueWithUnit, Unit } from "../../lib/unit"
import useStore from "../../lib/store/store"
import CommitmentTooltip from "./CommitmentTooltip"
import { initialCommitmentObject } from "../../lib/store/store"
import { COMMITMENTID } from "../../lib/constants"

const CommitmentTableDetails = (props) => {
  const {
    id,
    amount,
    duration,
    requested_at,
    confirmed_at,
    confirmed_at: isConfirmed,
    expires_at,
    unit: unitName,
  } = { ...props.commitment }
  const durations = props.durations
  const currentArea = props.currentArea
  const currentResource = props.currentResource
  const currentAZ = props.currentAZ

  const isAddingCommitment = id === COMMITMENTID ? true : false
  const newCommitment = useStore((state) => state.commitment)
  const setCommitment = useStore((state) => state.setCommitment)
  const setIsCommitting = useStore((state) => state.setIsCommitting)
  const commitmentIsLoading = useStore((state) => state.commitmentIsLoading)
  const setIsSubmitting = useStore((state) => state.setIsSubmitting)
  const setIsDeleting = useStore((state) => state.setIsDeleting)
  const deleteIsLoading = useStore((state) => state.deleteIsLoading)
  const setToast = useStore((state) => state.setToast)
  const [invalidDuration, setInValidDuration] = React.useState(false)
  const [invalidInput, setInvalidInput] = React.useState(false)
  const unit = new Unit(unitName)
  const initialParsedAmount = unit.format(amount, { ascii: true })
  const inputRef = React.useRef(initialParsedAmount)

  function formatTime(unixTimeStamp, formatter) {
    if (!moment.unix(unixTimeStamp).isValid() || unixTimeStamp == "") return ""
    return moment.unix(unixTimeStamp).format(formatter)
  }

  function stopEditing() {
    setInvalidInput(false)
    setInValidDuration(false)
    setCommitment(initialCommitmentObject)
    setIsCommitting(false)
    setToast(null)
  }

  function handleInput(e) {
    setInvalidInput(false)
    setToast(null)
    inputRef.current = e.target.value
  }

  function handleSelect(value) {
    setInValidDuration(false)
    setCommitment({
      ...newCommitment,
      duration: value,
    })
  }

  function handleSave() {
    const parsedInput = unit.parse(inputRef.current)
    if (parsedInput.error) {
      setInvalidInput(true)
      setToast(parsedInput.error)
      return
    }

    if (!newCommitment.duration) {
      setInValidDuration(true)
      return
    }

    //Unit is set in parent component (table).
    setCommitment({
      ...newCommitment,
      service_type: currentArea,
      resource_name: currentResource,
      availability_zone: currentAZ,
      amount: parsedInput,
    })
    setIsSubmitting(true)
  }

  function handleDeletion() {
    setCommitment({
      ...props.commitment,
    })
    setIsDeleting(true)
  }

  return (
    <DataGridRow>
      <DataGridCell>
        {isAddingCommitment ? (
          <TextInput
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
            placeholder="Select"
            invalid={invalidDuration}
            onChange={(e) => handleSelect(e)}
          >
            {durations.map((duration) => (
              <SelectOption key={duration}>{duration}</SelectOption>
            ))}
          </Select>
        ) : (
          duration
        )}
      </DataGridCell>
      <DataGridCell>
        <CommitmentTooltip
          displayText={formatTime(requested_at, "YYYY-MM-DD")}
          toolTipContent={formatTime(requested_at, "YYYY-MM-DD HH:mm A")}
        />
      </DataGridCell>
      <DataGridCell>
        <CommitmentTooltip
          displayText={formatTime(confirmed_at, "YYYY-MM-DD")}
          toolTipContent={formatTime(confirmed_at, "YYYY-MM-DD HH:mm A")}
        />
      </DataGridCell>
      <DataGridCell>
        <CommitmentTooltip
          displayText={formatTime(expires_at, "YYYY-MM-DD")}
          toolTipContent={formatTime(expires_at, "YYYY-MM-DD HH:mm A")}
        />
      </DataGridCell>
      <DataGridCell nowrap>
        {isAddingCommitment ? (
          <ButtonRow>
            <Button
              variant="primary"
              onClick={() => handleSave()}
              progress={commitmentIsLoading}
              size="small"
              icon="check"
            >
              Save
            </Button>
            <Button onClick={() => stopEditing()} icon="close">
              Cancel
            </Button>
          </ButtonRow>
        ) : !isConfirmed ? (
          <Button
            onClick={() => {
              handleDeletion()
            }}
            progress={deleteIsLoading}
            icon="deleteForever"
            size="small"
            className="self-start"
          ></Button>
        ) : (
          "Committed"
        )}
      </DataGridCell>
    </DataGridRow>
  )
}

export default CommitmentTableDetails
