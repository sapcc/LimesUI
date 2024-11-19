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
  Modal,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Checkbox,
  Stack,
  TextInput,
} from "@cloudoperators/juno-ui-components";
import BaseFooter from "./BaseComponents/BaseFooter";
import useConfirmInput from "./BaseComponents/useConfirmInput";
import { valueWithUnit } from "../../../lib/unit";
import { Unit } from "../../../lib/unit";

const label = "font-semibold";

const TransferModal = (props) => {
  const {
    title,
    subText,
    onModalClose,
    onTransfer,
    currentProject,
    transferProject,
    commitment,
    isProjectView,
  } = props;
  const { metadata: originMeta } = currentProject || {};
  const { metadata: targetMeta } = transferProject || {};
  const unit = new Unit(commitment.unit);
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({
    confirmationText: subText,
  });
  const [splitCommitment, setSplitCommitment] = React.useState(false);
  const [invalidSplitInput, setInvalidSplitInput] = React.useState(false);
  const splitInputRef = React.useRef(
    unit.format(commitment.amount, { ascii: true })
  );

  function onSplitInput(e) {
    setInvalidSplitInput(false);
    splitInputRef.current = e.target.value;
  }

  function onConfirm() {
    if (splitCommitment) {
      const parsedInput = unit.parse(splitInputRef.current);
      if (
        parsedInput.error ||
        parsedInput > commitment.amount ||
        parsedInput <= 0
      ) {
        setInvalidSplitInput(true);
        return;
      }
      commitment.amount = parsedInput;
    }
    onTransfer(transferProject, commitment);
  }

  return (
    <Modal
      className="max-h-full"
      title={title}
      open={true}
      modalFooter={
        <BaseFooter
          onModalClose={onModalClose}
          guardFns={[checkInput]}
          actionFn={onConfirm}
        />
      }
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
        {!isProjectView && (
          <DataGridRow>
            <DataGridCell className={label}>Origin:</DataGridCell>
            <DataGridCell>{originMeta?.name}</DataGridCell>
          </DataGridRow>
        )}
        {!isProjectView && (
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
