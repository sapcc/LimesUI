import React from "react";
import {
  Button,
  ButtonRow,
  DataGrid,
  DataGridRow,
  DataGridCell,
  LoadingIndicator,
  Message,
  Modal,
  ModalFooter,
  Select,
  SelectOption,
  Stack,
  TextInput,
} from "@cloudoperators/juno-ui-components";
import { t } from "../../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { createCommitmentStoreActions } from "../../StoreProvider";
import { Unit } from "../../../lib/unit";

const label = "font-semibold";

const ConversionModal = (props) => {
  const { title, subText, onModalClose, commitment, onConvert } = props;
  const { service_type, resource_name } = commitment;
  const { setConversionCommitment } = createCommitmentStoreActions();
  const inputRef = React.useRef("");
  const [invalidInput, setInvalidInput] = React.useState(false);
  const [invalidConversion, setInvalidConversion] = React.useState(false);
  const [currentConversion, setCurrentConversion] = React.useState(null);
  const unit = new Unit(commitment.unit);
  const [conversionAmount, setConversionAmount] = React.useState();
  const [maxConversion, setMaxConversion] = React.useState();
  const [targetAmount, setTargetAmount] = React.useState();
  const [insufficientAmount, setInsufficientAmount] = React.useState(false);
  const getConversions = useQuery({
    queryKey: ["getConversions", { service_type, resource_name }],
  });
  const { data: conversionData, isLoading, isError, error } = getConversions;
  const { conversions } = { ...conversionData };

  // initialize conversion.
  React.useEffect(() => {
    if (!currentConversion) return;
    const amount =
      Math.floor(commitment.amount / currentConversion.from) *
      currentConversion.from;
    if (commitment.amount < amount) {
      setInsufficientAmount(true);
      setConversionAmount(null);
      return;
    }
    const formattedAmount = unit.format(amount, { ascii: true });
    setConversionAmount(formattedAmount);
    setMaxConversion(amount);
  }, [currentConversion]);

  // set target amount based on desired conversion.
  React.useEffect(() => {
    if (!conversionAmount || insufficientAmount) return;
    const parsedInput = unit.parse(conversionAmount);
    const invalidConversion = parsedInput % currentConversion.from != 0;
    if (
      parsedInput.error ||
      parsedInput > maxConversion ||
      parsedInput <= 0 ||
      invalidConversion
    ) {
      setInvalidConversion(true);
      return;
    }
    const targetAmount =
      (parsedInput / currentConversion.from) * currentConversion.to;
    setTargetAmount(targetAmount);
  }, [conversionAmount, insufficientAmount]);

  function onInput(e) {
    setInvalidInput(false);
    inputRef.current = e.target.value;
  }

  function onConversionInput(e) {
    setInvalidConversion(false);
    setConversionAmount(e.target.value);
  }

  function onConfirm() {
    if (!currentConversion) return;
    if (inputRef.current.toLowerCase() !== subText.toLowerCase()) {
      setInvalidInput(true);
      return;
    }
    const parsedInput = unit.parse(conversionAmount);
    // defense in depth.
    if (
      parsedInput.error ||
      parsedInput > maxConversion ||
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
        target_amount: targetAmount,
      },
    };
    onConvert(commitment, payload);
  }

  const modalFooter = (
    <ModalFooter className="justify-end">
      <ButtonRow>
        <Button
          label="confirm"
          disabled={insufficientAmount}
          variant={"primary"}
          onClick={() => onConfirm()}
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

  return (
    <Modal
      className="max-h-full"
      title={title}
      open={true}
      modalFooter={modalFooter}
      onCancel={() => {
        setConversionCommitment(null);
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
              <DataGridCell className={label}>
                Available Conversions:
              </DataGridCell>
              <DataGridCell className={"px-0"}>
                <Select
                  onChange={(conversion) => {
                    setInvalidConversion(false);
                    setInsufficientAmount(false);
                    setCurrentConversion(conversion);
                  }}
                >
                  {conversions?.map((conversion) => {
                    const targetResource = t(conversion.target_resource);
                    return (
                      <SelectOption value={conversion} label={targetResource} />
                    );
                  })}
                </Select>
              </DataGridCell>
              <DataGridRow>
                <DataGridCell className={label}>Converts from:</DataGridCell>
                <DataGridCell>{currentConversion?.from}</DataGridCell>
              </DataGridRow>
              <DataGridRow>
                <DataGridCell className={label}>Converts to:</DataGridCell>
                <DataGridCell>{currentConversion?.to}</DataGridCell>
              </DataGridRow>
            </DataGridRow>
          </DataGrid>
          {currentConversion && (
            <Stack
              direction="vertical"
              alignment="center"
              className="mb-1 mt-5"
            >
              <div>
                <Stack>{"Amount to convert: "}</Stack>
                <Stack>
                  <TextInput
                    width="auto"
                    disabled={insufficientAmount}
                    autoFocus
                    value={conversionAmount}
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
              <div>
                <Stack className={"mt-5"}>
                  To confirm, type:&nbsp;
                  <span className={label}>{subText}</span>
                </Stack>
                <Stack>
                  <TextInput
                    width="auto"
                    disabled={insufficientAmount}
                    autoFocus
                    errortext={
                      invalidInput && "Please enter the highlighted term above."
                    }
                    onChange={(e) => onInput(e)}
                  />
                </Stack>
              </div>
            </Stack>
          )}
        </>
      )}
    </Modal>
  );
};

export default ConversionModal;
