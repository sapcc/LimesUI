import React from "react";
import {
  DataGrid,
  DataGridRow,
  DataGridCell,
  Modal,
  Select,
  SelectOption,
} from "@cloudoperators/juno-ui-components";
import BaseFooter from "./BaseFooter";
import { parseCommitmentDuration } from "../../../../lib/parseCommitmentDurations";
import { Unit, valueWithUnit } from "../../../../lib/unit";
import useConfirmInput from "./useConfirmInput";

// This package is isolated in order to create a way to decouple the remaining modal components in the near future.
const UpdateDurationModal = (props) => {
  const { title, onModalClose, resource, commitment, subText, onUpdate } =
    props;
  const commitmentDuration = commitment?.duration || null;
  const durations = resource?.commitment_config?.durations ?? [];
  const [selectedDuration, setSelectedDuration] = React.useState(null);
  const unit = new Unit(commitment.unit);
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({
    confirmationText: subText,
  });

  const validDurations = React.useMemo(() => {
    return durations.filter(
      (duration) =>
        parseCommitmentDuration(duration) >
        parseCommitmentDuration(commitmentDuration)
    );
  }, [resource]);

  const cmpDisabled = React.useMemo(() => {
    return validDurations.length == 0;
  }, [validDurations]);

  function onConfirm() {
    if (!selectedDuration) {
      return;
    }
    const payload = { duration: selectedDuration };
    onUpdate(commitment, payload);
  }

  return (
    <Modal
      className="max-h-full"
      title={title}
      open={true}
      modalFooter={
        <BaseFooter
          disabled={cmpDisabled}
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
          <DataGridCell className="font-semibold">Amount</DataGridCell>
          <DataGridCell>{valueWithUnit(commitment.amount, unit)}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className="font-semibold">
            Available Durations
          </DataGridCell>
          <DataGridCell>
            <Select
              data-testid="updateDurationInput"
              disabled={cmpDisabled}
              onChange={(duration) => {
                setSelectedDuration(duration);
              }}
            >
              {validDurations.map((duration) => (
                <SelectOption data-testid={duration} key={duration}>
                  {duration}
                </SelectOption>
              ))}
            </Select>
          </DataGridCell>
        </DataGridRow>
      </DataGrid>
      <ConfirmInput disabled={cmpDisabled} subText={subText} {...inputProps} />
    </Modal>
  );
};

export default UpdateDurationModal;
