import React from "react";
import {
  Modal,
  TextInput,
  Button,
  Stack,
  Message,
  LoadingIndicator,
  DataGrid,
  DataGridRow,
  DataGridCell,
  ModalFooter,
  ButtonRow,
} from "juno-ui-components";
import useReceivedCommitment from "./useReceivedCommitment";
import { Unit, valueWithUnit } from "../../lib/unit";

const label = "font-semibold";

// The flow to receive a commitments happens in two steps.
// First, the commitment will be checked by its existence with the transfer token
// Then, the commitment infos will be presented to the user asking him for a transfer.
const TransferReceiveModal = (props) => {
  const {
    title,
    subText,
    currentProject,
    serviceType,
    currentResource,
    currentAZ,
    transferCommitment,
    onModalClose,
  } = props;
  const [tokenInput, setTokenInput] = React.useState("");
  const [getCommitment, setGetCommitment] = React.useState(false);
  const [invalidInput, setInvalidInput] = React.useState(false);
  const confirmInput = React.useRef("");
  const [invalidConfirmInput, setInvalidConfirmInput] = React.useState(true);
  const [isCorrectResource, setIsCorrectResource] = React.useState(false);
  const commitmentData = useReceivedCommitment({
    token: tokenInput,
    shouldFetch: getCommitment,
  });
  const { data, isFetching, isError, error } = commitmentData;
  const unit = new Unit(data?.unit);

  React.useEffect(() => {
    setGetCommitment(false);
  }, [commitmentData]);

  // Reject commitments that are received on the wrong resource!
  React.useEffect(() => {
    if (!data) return;
    if (
      data.service_type == serviceType &&
      data.resource_name == currentResource.name
    ) {
      setIsCorrectResource(true);
    } else {
      setIsCorrectResource(false);
    }
  }, [data]);

  function triggerQuery() {
    // A token is 3 Byte in Hex.
    const baseMatch = /^\s*([0-9a-f]{48})\s*$/.exec(tokenInput);
    if (baseMatch == null) {
      setInvalidInput(true);
      return;
    }
    setGetCommitment(true);
  }

  const modalFooter = (
    <ModalFooter className="justify-end">
      <ButtonRow>
        <Button
          label="confirm"
          variant={"primary"}
          disabled={!data || invalidConfirmInput || !isCorrectResource}
          onClick={() => transferCommitmentByToken()}
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

  function onInput(e) {
    confirmInput.current = e.target.value;
    if (confirmInput.current.toLowerCase() == subText.toLowerCase()) {
      setInvalidConfirmInput(false);
    } else {
      setInvalidConfirmInput(true);
    }
  }

  function transferCommitmentByToken() {
    transferCommitment(currentProject, data, tokenInput);
  }

  return (
    <Modal
      title={title}
      open={true}
      modalFooter={modalFooter}
      onCancel={() => {
        onModalClose();
      }}
    >
      <div className="font-medium">Enter a token to receive a commmitment:</div>
      <TextInput
        autoFocus
        invalid={invalidInput}
        className={"px-2 mb-2"}
        value={tokenInput}
        onChange={(e) => {
          setTokenInput(e.target.value);
          setInvalidInput(false);
        }}
      />
      <ButtonRow className="mb-2">
        <Button
          label="Check"
          size="small"
          variant="primary"
          onClick={() => {
            triggerQuery();
          }}
        />
        <Button
          label="Clear"
          size="small"
          onClick={() => {
            setTokenInput("");
            setInvalidInput(false);
          }}
        />
      </ButtonRow>
      {invalidInput ? (
        <Message variant="warning" text="token structure is invalid." />
      ) : isError ? (
        <Message variant="warning" text={error.toString()} />
      ) : isFetching ? (
        <LoadingIndicator className="m-auto" />
      ) : (
        data && (
          <Stack direction="vertical">
            <div className="font-medium mb-1">Commitment found:</div>
            <DataGrid className="mb-2" columns={2} columnMaxSize="1fr">
              <DataGridRow>
                <DataGridCell className={label}>Amount</DataGridCell>
                <DataGridCell>{valueWithUnit(data.amount, unit)}</DataGridCell>
              </DataGridRow>
              <DataGridRow>
                <DataGridCell className={label}>Duration:</DataGridCell>
                <DataGridCell>{data.duration}</DataGridCell>
              </DataGridRow>
              <DataGridRow>
                <DataGridCell className={label}>Availability Zone</DataGridCell>
                <DataGridCell>{data.availability_zone}</DataGridCell>
              </DataGridRow>
            </DataGrid>
            {isCorrectResource ? (
              <Stack className="m-auto" direction="vertical">
                <Stack className={"mb-1"}>
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
            ) : (
              <Message
                className="m-auto"
                variant="warning"
                text={`Commitment should be received at resource: ${data.resource_name}`}
              />
            )}
          </Stack>
        )
      )}
    </Modal>
  );
};

export default TransferReceiveModal;
