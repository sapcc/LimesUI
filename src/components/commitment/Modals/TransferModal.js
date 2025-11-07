// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import {
  Modal,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Checkbox,
  Select,
  Stack,
  TextInput,
  SelectOption,
} from "@cloudoperators/juno-ui-components";
import BaseFooter from "./BaseComponents/BaseFooter";
import useConfirmInput from "./BaseComponents/useConfirmInput";
import { valueWithUnit } from "../../../lib/unit";
import { Unit } from "../../../lib/unit";
import { TransferType } from "../../../lib/constants";

const label = "font-semibold";

// The TransferModal displays the commitment transfer action for certain conditions.
// Project level: Allows the set the target commitment into a private or public transfer state (private transfer or marketplace posting).
// Cluster/Domain level: Allows to start and transfer the commitment in a single action.
// Cluster/Domain level: Allows to set the target commitment into a public transfer state (marketplace posting).
const TransferModal = (props) => {
  const { title, subText, onModalClose, onTransfer, currentProject, transferProject, commitment, isProjectView } =
    props;
  const { metadata: originMeta } = currentProject || {};
  const { metadata: targetMeta } = transferProject || {};
  const isMoveAction = transferProject ? true : false;
  const unit = new Unit(commitment.unit);
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({
    confirmationText: subText,
  });
  const [publicationType, setPublicationType] = React.useState(
    isProjectView || isMoveAction ? TransferType.UNLISTED : TransferType.PUBLIC
  );
  const [splitCommitment, setSplitCommitment] = React.useState(false);
  const [invalidSplitInput, setInvalidSplitInput] = React.useState(false);
  const splitInputRef = React.useRef(unit.format(commitment.amount, { ascii: true }));

  function onSplitInput(e) {
    setInvalidSplitInput(false);
    splitInputRef.current = e.target.value;
  }

  function onConfirm() {
    if (splitCommitment) {
      const parsedInput = unit.parse(splitInputRef.current);
      if (parsedInput.error || parsedInput > commitment.amount || parsedInput <= 0) {
        setInvalidSplitInput(true);
        return;
      }
      commitment.amount = parsedInput;
    }
    onTransfer(transferProject, commitment, publicationType);
  }

  return (
    <Modal
      className="max-h-full"
      title={title}
      open={true}
      modalFooter={<BaseFooter onModalClose={onModalClose} guardFns={[checkInput]} actionFn={onConfirm} />}
      onCancel={() => {
        onModalClose();
      }}
    >
      <DataGrid columns={2} columnMaxSize="1fr">
        <DataGridRow>
          <DataGridCell className={label}>Amount:</DataGridCell>
          <DataGridCell>{valueWithUnit(commitment.amount, unit)}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className={label}>Duration:</DataGridCell>
          <DataGridCell>{commitment.duration}</DataGridCell>
        </DataGridRow>
        {isMoveAction && (
          <DataGridRow>
            <DataGridCell className={label}>Origin:</DataGridCell>
            <DataGridCell>{originMeta?.name}</DataGridCell>
          </DataGridRow>
        )}
        {isMoveAction && (
          <DataGridRow>
            <DataGridCell className={label}>Target:</DataGridCell>
            <DataGridCell>{targetMeta?.name}</DataGridCell>
          </DataGridRow>
        )}
        <DataGridRow>
          <DataGridCell className={label}>Customize:</DataGridCell>
          <DataGridCell>
            <Checkbox
              checked={splitCommitment}
              onClick={() => {
                setSplitCommitment(!splitCommitment);
              }}
              label="Transfer only a part."
            />
          </DataGridCell>
          {!isMoveAction && (
            <DataGridRow>
              <DataGridCell className={label}>Publication type:</DataGridCell>
              <DataGridCell>
                {isProjectView ? (
                  <Select
                    data-testid="publicationSelect"
                    defaultValue={isProjectView ? TransferType.UNLISTED : TransferType.PUBLIC}
                    onChange={(value) => {
                      setPublicationType(value);
                    }}
                  >
                    <SelectOption value={TransferType.UNLISTED} label="Private" />
                    <SelectOption value={TransferType.PUBLIC} label="Marketplace" />
                  </Select>
                ) : (
                  "Marketplace"
                )}
              </DataGridCell>
            </DataGridRow>
          )}
        </DataGridRow>
      </DataGrid>
      <Stack direction="vertical" alignment="center" className="mb-1 mt-5">
        {splitCommitment && (
          <div>
            <Stack>{"Amount to transfer: "}</Stack>
            <Stack>
              <TextInput
                data-testid="splitInput"
                width="auto"
                autoFocus
                value={splitInputRef.current}
                errortext={invalidSplitInput && "Please enter a valid amount."}
                onChange={(e) => {
                  onSplitInput(e);
                }}
              />{" "}
            </Stack>
          </div>
        )}
      </Stack>
      <ConfirmInput subText={subText} {...inputProps} />
    </Modal>
  );
};

export default TransferModal;
