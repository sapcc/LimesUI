// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import {
  DataGrid,
  DataGridRow,
  DataGridCell,
  LoadingIndicator,
  Message,
  Select,
  SelectOption,
  Stack,
  TextInput,
} from "@cloudoperators/juno-ui-components";
import BaseModal from "./BaseComponents/BaseModal";
import BaseFooter from "./BaseComponents/BaseFooter";
import useConfirmInput from "./BaseComponents/useConfirmInput";
import { HANA_FLAVOR_CASCADE_LAKE } from "../../../lib/constants";
import { t } from "../../../lib/utils";
import { createUnit } from "../../../lib/unit";
import { hwVersionRx, getCurrentResource } from "../../../lib/utils";
import { useGlobalStore } from "../../StoreProvider";

const label = "font-semibold";

/**
 * ConversionModal supports the following conversion modes:
 * - Regular conversion: Source amount is rounded to a multiple of the conversion ratio,
 *   ensuring the target amount is exact.
 * - Conversion with rounding (hw_version resources): Any source amount is allowed,
 *   and the target amount is rounded down (accepting conversion loss).
 */
const ConversionModal = (props) => {
  const { title, subText, onModalClose, currentCategory, categories, commitment, conversionResults, onConvert } = props;
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({
    confirmationText: subText,
  });
  const documentationLinks = useGlobalStore((state) => state.documentationLinks);
  const docLink = documentationLinks.convert_commitments;
  const { resource_name } = commitment;
  const { data, isLoading, isError, error } = conversionResults;
  const { conversions } = data || { conversions: [] };
  const [currentConversion, setCurrentConversion] = React.useState(null);
  const sourceUnit = createUnit(commitment?.unit);
  const [conversionInput, setConversionInput] = React.useState(0);
  const [inputParseError, setInputParseError] = React.useState("");
  // Disables the input field if the commitment amount does not fit into the conversion ratio.
  const [insufficientAmount, setInsufficientAmount] = React.useState(false);
  // Unit formatted value for the input field.
  const [sourceDisplayAmount, setSourceDisplayAmount] = React.useState("");

  const [isOneDirectionalConversion, conversionWithRounding, targetUnit] = React.useMemo(() => {
    if (!currentConversion || !categories) return [false, null];
    const isOneDirectionalConversion = hwVersionRx.test(currentConversion.target_resource);
    const conversionWithRounding = isOneDirectionalConversion && currentCategory === HANA_FLAVOR_CASCADE_LAKE;

    // Find the target resource in categories
    const targetCategory = Object.values(categories).find((cat) =>
      cat.resources.some((res) => res.name === currentConversion.target_resource)
    );
    const targetResource = targetCategory
      ? getCurrentResource(targetCategory.resources, currentConversion.target_resource)
      : null;
    if (!targetResource) return [false, null];
    const targetUnit = createUnit(targetResource.unit);
    return [isOneDirectionalConversion, conversionWithRounding, targetUnit];
  }, [currentConversion, categories]);

  // initialize conversion.
  // Determine the maximum initial amount that can be converted for a selected conversion.
  React.useEffect(() => {
    if (!currentConversion) return;

    let sourceAmount = Math.floor(commitment.amount / currentConversion.from) * currentConversion.from;
    if (conversionWithRounding) {
      sourceAmount = commitment.amount;
    }

    setInsufficientAmount(sourceAmount === 0);
    setConversionInput(sourceAmount);
    setSourceDisplayAmount(sourceUnit.formatForInput(sourceAmount, { ascii: true }));
  }, [currentConversion, conversionWithRounding]);

  // Determine target amount based on desired conversion.
  const { targetAmount, invalidConversion } = React.useMemo(() => {
    if (!currentConversion) {
      return { targetAmount: null, invalidConversion: false };
    }

    if (conversionInput <= 0 || conversionInput > commitment.amount) {
      return { targetAmount: null, invalidConversion: true };
    }

    // For standard conversions, the selected amount to convert must fit into the conversion ratio.
    if (!conversionWithRounding && conversionInput % currentConversion.from !== 0) {
      return { targetAmount: null, invalidConversion: true };
    }

    // Calculate target amount
    const targetAmount = conversionWithRounding
      ? Math.floor((conversionInput / currentConversion.from) * currentConversion.to)
      : (conversionInput / currentConversion.from) * currentConversion.to;

    if (targetAmount === 0) {
      return { targetAmount: null, invalidConversion: true };
    }

    return { targetAmount, invalidConversion: false };
  }, [conversionInput, currentConversion, conversionWithRounding, commitment.amount]);

  function onConversionInput(e) {
    const inputValue = e.target.value;
    setSourceDisplayAmount(inputValue);

    // Parse the input value using the source unit
    const parsedInput = sourceUnit.parse(inputValue, false);
    if (parsedInput.error) {
      setInputParseError(parsedInput.error);
      return;
    }
    setInputParseError("");
    setConversionInput(parsedInput);
  }

  function onSelectChange(conversion) {
    setCurrentConversion(conversion);
  }

  async function onConfirm() {
    if (!currentConversion) return;
    const sourceAmount = conversionInput;
    // defense in depth.
    if (sourceAmount > commitment.amount || sourceAmount <= 0 || invalidConversion || inputParseError) {
      return;
    }
    const payload = {
      commitment: {
        target_service: currentConversion.target_service,
        target_resource: currentConversion.target_resource,
        source_amount: parseInt(sourceAmount),
        target_amount: targetAmount,
      },
    };
    return onConvert(commitment, payload);
  }

  return (
    <BaseModal
      className="max-h-full"
      title={title}
      open={true}
      modalFooter={
        <BaseFooter
          disabled={!currentConversion || invalidConversion || inputParseError || insufficientAmount}
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
          {docLink && (
            <Message className="mb-1" variant="info">
              Learn more about&nbsp;
              <a href={docLink} target="_blank" rel="noopener noreferrer" className="underline">
                resource conversion
              </a>
            </Message>
          )}
          {isOneDirectionalConversion && (
            <Message className="mb-4" variant="warning">
              <div>
                <strong>Important:</strong> Conversion is only possible once in this direction.
              </div>
              {conversionWithRounding && (
                <div>
                  Due to mismatching hardware, 1:1 conversion may not be possible. <br />
                  The target amount might be rounded down to the next matching amount.
                </div>
              )}
            </Message>
          )}
          <DataGrid columns={2} columnMaxSize="1fr">
            <DataGridRow>
              <DataGridCell className={label}>Source:</DataGridCell>
              <DataGridCell>{t(resource_name)}</DataGridCell>
            </DataGridRow>
            <DataGridRow>
              <DataGridCell className={label}>Amount:</DataGridCell>
              <DataGridCell>{sourceUnit.format(commitment.amount)}</DataGridCell>
            </DataGridRow>
            <DataGridRow>
              <DataGridCell className={label}>Target:</DataGridCell>
              <DataGridCell className={"px-0"}>
                <Select
                  data-testid="conversionSelect"
                  disabled={conversions.length === 0}
                  onChange={(targetResource) => {
                    onSelectChange(conversions.find((conversion) => conversion.target_resource == targetResource));
                  }}
                >
                  {conversions.map((conversion) => {
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
                    {`${sourceUnit.formatForInput(currentConversion.from)} : ${targetUnit ? targetUnit.formatForInput(currentConversion.to) : currentConversion.to}`}
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
                  disabled={!currentConversion || insufficientAmount}
                  autoFocus
                  value={sourceDisplayAmount}
                  errortext={
                    (insufficientAmount && "Insufficient amount for conversion.") ||
                    (invalidConversion && "Please enter a valid amount.") ||
                    inputParseError
                  }
                  successtext={
                    !invalidConversion &&
                    !inputParseError &&
                    targetAmount &&
                    `target amount: ${targetUnit ? targetUnit.format(targetAmount) : targetAmount} ${targetUnit && !targetUnit.isStandardUnit ? `(${targetAmount} * ${targetUnit.name})` : ""}`
                  }
                  onChange={(e) => {
                    onConversionInput(e);
                  }}
                />
              </Stack>
            </div>
            <ConfirmInput
              disabled={!currentConversion || invalidConversion || inputParseError || insufficientAmount}
              subText={subText}
              {...inputProps}
            />
          </Stack>
        </>
      )}
    </BaseModal>
  );
};

export default ConversionModal;
