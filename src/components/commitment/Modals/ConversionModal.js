// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

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
import { createUnit } from "../../../lib/unit";
import { hwVersionScaleRx, getCurrentResource } from "../../../lib/utils";
import { useGlobalStore } from "../../StoreProvider";

const label = "font-semibold";

/**
 * ConversionModal supports the following conversion modes:
 * - Regular conversion: Source amount is rounded to a multiple of the conversion ratio,
 *   ensuring the target amount is exact.
 * - Complex conversion (hw_version_215x resources): Any source amount is allowed,
 *   and the target amount is rounded down (accepting conversion loss).
 */
const ConversionModal = (props) => {
  const { title, subText, onModalClose, categories, commitment, conversionResults, onConvert } = props;
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({
    confirmationText: subText,
  });
  const documentationLinks = useGlobalStore((state) => state.documentationLinks);
  const docLink = documentationLinks.convert_commitments;
  const { resource_name } = commitment;
  const { data, isLoading, isError, error } = conversionResults;
  const { conversions } = data || { conversions: [] };
  const [currentConversion, setCurrentConversion] = React.useState(null);
  const unit = createUnit(commitment?.unit);
  // Needs to be an object. The same suggested conversion value on select of a different conversion type would not trigger a rerender.
  const [conversion, setConversion] = React.useState({ amount: 0 });

  const [allowComplexConversion, complexTargetUnit] = React.useMemo(() => {
    if (!currentConversion || !categories) return [false, null];
    const allowed = hwVersionScaleRx.test(currentConversion.target_resource);
    if (!allowed) return [false, null];

    // Find the target resource in categories
    const targetCategory = Object.values(categories).find((cat) =>
      cat.resources.some((res) => res.name === currentConversion.target_resource)
    );
    const targetResource = targetCategory
      ? getCurrentResource(targetCategory.resources, currentConversion.target_resource)
      : null;
    if (!targetResource) return [false, null];
    const targetUnit = createUnit(targetResource.unit);
    return [true, targetUnit];
  }, [currentConversion, categories]);

  // initialize conversion.
  // Determine the maximum initial amount that can be converted for a selected conversion.
  React.useEffect(() => {
    if (!currentConversion) return;

    let sourceAmount = commitment.amount;
    if (!allowComplexConversion) {
      sourceAmount = Math.floor(sourceAmount / currentConversion.from) * currentConversion.from;
    }

    setConversion({ amount: sourceAmount });
  }, [currentConversion, allowComplexConversion]);

  // set target amount based on desired conversion.
  const { targetAmount, invalidConversion, insufficientAmount } = React.useMemo(() => {
    if (!currentConversion) {
      return { targetAmount: null, invalidConversion: false, insufficientAmount: false };
    }

    const amount = parseInt(conversion.amount, 10) || 0;

    let initialSourceAmount = commitment.amount;
    if (!allowComplexConversion) {
      initialSourceAmount = Math.floor(initialSourceAmount / currentConversion.from) * currentConversion.from;
    }
    if (initialSourceAmount === 0) {
      return { targetAmount: null, invalidConversion: false, insufficientAmount: true };
    }

    const rawTargetAmount = (amount / currentConversion.from) * currentConversion.to;

    let finalTargetAmount;
    if (allowComplexConversion) {
      finalTargetAmount = Math.floor(rawTargetAmount);
      if (finalTargetAmount === 0) {
        return { targetAmount: null, invalidConversion: true, insufficientAmount: false };
      }
    } else {
      finalTargetAmount = rawTargetAmount;
    }

    const isInvalidConversion = !allowComplexConversion && amount % currentConversion.from !== 0;
    if (amount > commitment.amount || amount <= 0 || isInvalidConversion) {
      return { targetAmount: null, invalidConversion: true, insufficientAmount: false };
    }

    return { targetAmount: finalTargetAmount, invalidConversion: false, insufficientAmount: false };
  }, [conversion, currentConversion, allowComplexConversion, commitment.amount]);

  function onConversionInput(e) {
    setConversion({ amount: e.target.value });
  }

  function onSelectChange(conversion) {
    setCurrentConversion(conversion);
  }

  async function onConfirm() {
    if (!currentConversion) return;
    const sourceAmount = parseInt(conversion.amount, 10) || 0;
    // defense in depth.
    if (sourceAmount > commitment.amount || sourceAmount <= 0 || invalidConversion) {
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
          {docLink && (
            <Message className="mb-1" variant="info">
              Learn more about&nbsp;
              <a href={docLink} target="_blank" rel="noopener noreferrer" className="underline">
                resource conversion
              </a>
            </Message>
          )}
          {allowComplexConversion && (
            <Message className="mb-4" variant="warning">
              <div>
                <strong>Important:</strong> Conversion is only possible once in this direction.
              </div>
              <div>
                Due to mismatching hardware, 1:1 conversion may not be possible. <br />
                The target amount will be rounded down to the next matching amount.
              </div>
            </Message>
          )}
          <DataGrid columns={2} columnMaxSize="1fr">
            <DataGridRow>
              <DataGridCell className={label}>Source:</DataGridCell>
              <DataGridCell>{t(resource_name)}</DataGridCell>
            </DataGridRow>
            <DataGridRow>
              <DataGridCell className={label}>Amount:</DataGridCell>
              <DataGridCell>{unit.format(commitment.amount)}</DataGridCell>
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
                  errortext={invalidConversion && "Please enter a valid amount."}
                  successtext={
                    !invalidConversion &&
                    targetAmount &&
                    (() => {
                      const displayUnit = allowComplexConversion ? complexTargetUnit : unit;
                      return `target amount: ${displayUnit.format(targetAmount)} ${!displayUnit.isStandardUnit ? `(${targetAmount} * ${displayUnit.name})` : ""}`;
                    })()
                  }
                  onChange={(e) => {
                    onConversionInput(e);
                  }}
                />
              </Stack>
            </div>
            <ConfirmInput disabled={insufficientAmount || !currentConversion} subText={subText} {...inputProps} />
          </Stack>
        </>
      )}
    </Modal>
  );
};

export default ConversionModal;
