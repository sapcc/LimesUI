// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

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
  ButtonRow,
} from "@cloudoperators/juno-ui-components";
import BaseFooter from "./BaseComponents/BaseFooter";
import useConfirmInput from "./BaseComponents/useConfirmInput";
import useLimesGetRequest from "../../shared/useLimesGetRequest";
import { Unit, valueWithUnit } from "../../../lib/unit";

const label = "font-semibold";

// The flow to receive a commitments happens in two steps.
// First, the commitment will be checked by its existence with the transfer token
// Then, the commitment infos will be presented to the user asking him for a transfer.
const TransferReceiveModal = (props) => {
  const { title, subText, currentProject, serviceType, currentResource, transferCommitment, onModalClose } = props;
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({
    confirmationText: subText,
  });
  const [tokenInput, setTokenInput] = React.useState("");
  const [getCommitment, setGetCommitment] = React.useState(false);
  const [invalidInput, setInvalidInput] = React.useState(false);
  const [isCorrectResource, setIsCorrectResource] = React.useState(false);
  const commitmentData = useLimesGetRequest({
    queryKey: "commitmentByToken",
    queryArgs: tokenInput,
    queryOpts: {
      gcTime: 0,
      enabled: false,
      retry: false,
      refetchOnWindowFocus: false,
    },
    shouldRefetch: getCommitment,
  });
  const { data, isFetching, isError, error } = commitmentData;
  const commitment = data?.commitment;
  const unit = new Unit(data?.unit);

  React.useEffect(() => {
    setGetCommitment(false);
  }, [commitmentData]);

  // Reject commitments that are received on the wrong resource!
  React.useEffect(() => {
    if (!commitment) return;
    if (commitment.service_type == serviceType && commitment.resource_name == currentResource.name) {
      setIsCorrectResource(true);
    } else {
      setIsCorrectResource(false);
    }
  }, [commitment]);

  function triggerQuery() {
    // A token is 3 Byte in Hex.
    const baseMatch = /^\s*([0-9a-f]{48})\s*$/.exec(tokenInput);
    if (baseMatch == null) {
      setInvalidInput(true);
      return;
    }
    setGetCommitment(true);
  }

  function transferCommitmentByToken() {
    // defense in depth - If button should be forcefully enabled.
    if (!commitment || !isCorrectResource) return;
    transferCommitment(currentProject, commitment, tokenInput);
  }

  return (
    <Modal
      title={title}
      open={true}
      modalFooter={
        <BaseFooter
          disabled={!commitment || !isCorrectResource}
          onModalClose={onModalClose}
          guardFns={[checkInput]}
          actionFn={transferCommitmentByToken}
          variant={"primary"}
        />
      }
      onCancel={() => {
        onModalClose();
      }}
    >
      <div className="font-medium">Enter a token to receive a commmitment:</div>
      <TextInput
        data-testid="transferTokenInput"
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
          data-testid="checkToken"
          label="Check"
          size="small"
          variant="primary"
          onClick={() => {
            triggerQuery();
          }}
        />
        <Button
          data-testid="clearToken"
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
        commitment && (
          <Stack direction="vertical">
            <div className="font-medium mb-1">Commitment found:</div>
            <DataGrid className="mb-2" columns={2} columnMaxSize="1fr">
              <DataGridRow>
                <DataGridCell className={label}>Amount</DataGridCell>
                <DataGridCell>{valueWithUnit(commitment.amount, unit)}</DataGridCell>
              </DataGridRow>
              <DataGridRow>
                <DataGridCell className={label}>Duration:</DataGridCell>
                <DataGridCell>{commitment.duration}</DataGridCell>
              </DataGridRow>
              <DataGridRow>
                <DataGridCell className={label}>Availability Zone</DataGridCell>
                <DataGridCell>{commitment.availability_zone}</DataGridCell>
              </DataGridRow>
            </DataGrid>
            {isCorrectResource ? (
              <ConfirmInput subText={subText} {...inputProps} />
            ) : (
              <Message
                className="m-auto"
                variant="warning"
                text={`Commitment should be received at resource: ${commitment.resource_name}`}
              />
            )}
          </Stack>
        )
      )}
    </Modal>
  );
};

export default TransferReceiveModal;
