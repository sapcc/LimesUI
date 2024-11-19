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
  DataGrid,
  DataGridRow,
  DataGridCell,
  LoadingIndicator,
  Message,
  Modal,
  Select,
  SelectOption,
  Stack,
  TextInput,
} from "@cloudoperators/juno-ui-components";
import BaseFooter from "./BaseComponents/BaseFooter";
import useConfirmInput from "./BaseComponents/useConfirmInput";
import { t } from "../../../lib/utils";
import { Unit } from "../../../lib/unit";

const label = "font-semibold";

const ConversionModal = (props) => {
  const {
    title,
    subText,
    onModalClose,
    commitment,
    conversionResults,
    onConvert,
  } = props;
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({
    confirmationText: subText,
  });
  const { resource_name } = commitment;
  const { data, isLoading, isError, error } = conversionResults;
  const { conversions } = data || { conversions: null };
  const [invalidConversion, setInvalidConversion] = React.useState(false);
  const [currentConversion, setCurrentConversion] = React.useState(null);
  const unit = new Unit(commitment.unit);
  // Needs to be an object. The same suggested conversion value on select of a different conversion type would not trigger a rerender.
  const [conversion, setConversion] = React.useState({ amount: "" });
  const [targetAmount, setTargetAmount] = React.useState();
  const [insufficientAmount, setInsufficientAmount] = React.useState(false);

  // initialize conversion.
  React.useEffect(() => {
    if (!currentConversion) return;
    const amount =
      Math.floor(commitment.amount / currentConversion.from) *
      currentConversion.from;
    const formattedAmount = unit.format(amount, { ascii: true });
    if (amount == 0) {
      setConversion({ amount: formattedAmount });
      setTargetAmount(null);
      setInsufficientAmount(true);
      return;
    }
    setConversion({ amount: formattedAmount });
  }, [currentConversion]);

  // set target amount based on desired conversion.
  React.useEffect(() => {
    if (!currentConversion || insufficientAmount) {
      return;
    }
    const parsedAmount = unit.parse(conversion.amount);
    const invalidConversion = parsedAmount % currentConversion.from != 0;
    if (
      parsedAmount.error ||
      parsedAmount > commitment.amount ||
      parsedAmount <= 0 ||
      invalidConversion
    ) {
      setInvalidConversion(true);
      return;
    }
    const targetAmount =
      (parsedAmount / currentConversion.from) * currentConversion.to;
    setTargetAmount(unit.format(targetAmount, { ascii: true }));
  }, [conversion]);

  function onConversionInput(e) {
    setInvalidConversion(false);
    setConversion({ amount: e.target.value });
  }

  function onSelectChange(conversion) {
    setInvalidConversion(false);
    setInsufficientAmount(false);
    setCurrentConversion(conversion);
  }

  function onConfirm() {
    if (!currentConversion) return;
    const parsedInput = unit.parse(conversion.amount);
    const parsedAmount = unit.parse(targetAmount);
    // defense in depth.
    if (
      parsedInput.error ||
      parsedInput > commitment.amount ||
      parsedInput <= 0 ||
      invalidConversion
    ) {
      setInvalidConversion(true);
      return;
    }
    const payload = {
      commitment: {
        target_service: currentConversion.target_service,
        target_resource: currentConversion.target_resource,
        source_amount: parsedInput,
        target_amount: parsedAmount,
      },
    };
    onConvert(commitment, payload);
  }

  return (
    <Modal
      className="max-h-full"
      title={title}
      open={true}
      modalFooter={
        <BaseFooter
          disabled={!currentConversion || insufficientAmount}
          onModalClose={onModalClose}
          guardFns={[checkInput]}
          actionFn={onConfirm}
        />
      }
      onCancel={() => {
        onModalClose();
      }}
    >
      {isError ? (
        <Message variant="warning">{error.message}</Message>
      ) : isLoading ? (
        <LoadingIndicator className="m-auto" />
      ) : (
        <>
          <DataGrid columns={2} columnMaxSize="1fr">
            <DataGridRow>
              <DataGridCell className={label}>Source:</DataGridCell>
              <DataGridCell>{t(resource_name)}</DataGridCell>
            </DataGridRow>
            <DataGridRow>
              <DataGridCell className={label}>Amount:</DataGridCell>
              <DataGridCell>{commitment.amount}</DataGridCell>
            </DataGridRow>
            <DataGridRow>
              <DataGridCell className={label}>Target:</DataGridCell>
              <DataGridCell className={"px-0"}>
                <Select
                  data-testid="conversionSelect"
                  disabled={!conversions}
                  onChange={(targetResource) => {
                    onSelectChange(
                      conversions.find(
                        (conversion) =>
                          conversion.target_resource == targetResource
                      )
                    );
                  }}
                >
                  {conversions?.map((conversion) => {
                    const targetResource = t(conversion.target_resource);
                    return (
                      <SelectOption
                        data-testid={targetResource}
                        key={targetResource}
                        value={conversion.target_resource}
                        label={targetResource}
                      />
                    );
                  })}
                </Select>
              </DataGridCell>
              <DataGridRow>
                <DataGridCell className={label}>Conversion Ratio:</DataGridCell>
                {currentConversion && (
                  <DataGridCell>
                    {currentConversion.from} : {currentConversion.to}
                  </DataGridCell>
                )}
              </DataGridRow>
            </DataGridRow>
          </DataGrid>
          <Stack direction="vertical" alignment="center" className="mb-1 mt-5">
            <div>
              <Stack>{"Amount to convert: "}</Stack>
              <Stack>
                <TextInput
                  data-testid="conversionInput"
                  width="auto"
                  disabled={insufficientAmount || !currentConversion}
                  autoFocus
                  value={conversion.amount}
                  errortext={
                    invalidConversion && "Please enter a valid amount."
                  }
                  successtext={
                    !invalidConversion &&
                    targetAmount &&
                    `target amount: ${targetAmount}`
                  }
                  onChange={(e) => {
                    onConversionInput(e);
                  }}
                />
              </Stack>
            </div>
            <ConfirmInput
              disabled={insufficientAmount || !currentConversion}
              subText={subText}
              {...inputProps}
            />
          </Stack>
        </>
      )}
    </Modal>
  );
};

export default ConversionModal;
