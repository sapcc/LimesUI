import React from "react";
import CommitmentTooltip from "../CommitmentTooltip";
import useCommitmentFilter from "../../../hooks/useCommitmentFilter";
import { ContextMenu, Icon, Stack } from "@cloudoperators/juno-ui-components";
import useDeleteAction from "./useDeleteAction";
import useTransferAction from "./useTransferAction";
import useConversionAction from "./useConversionAction";
import useUpdateDurationAction from "./useUpdateDurationAction";

const Actions = (props) => {
  const { commitment } = props;
  const { confirmed_at: isConfirmed } = commitment;
  const { isPlanned, isPending } = useCommitmentFilter();
  const [commitmentActions, setCommitmentActions] = React.useState([]);

  const hasTooltips = React.useMemo(() => {
    return (
      commitmentActions.filter((action) => {
        return action.toolTip != null;
      }).length > 0
    );
  }, [commitmentActions]);

  function updateActions(key, menuItem, toolTip) {
    const newAction = { key: key, menuItem: menuItem, toolTip: toolTip };
    setCommitmentActions((commitmentActions) => [
      ...commitmentActions,
      newAction,
    ]);
  }

  useConversionAction({ commitment, updateActions });
  useTransferAction({ commitment, updateActions });
  useUpdateDurationAction({ commitment, updateActions });
  useDeleteAction({ commitment, updateActions });

  function setCommitmentLabel() {
    let label;
    isConfirmed
      ? (label = "Committed")
      : isPending(commitment)
      ? (label = "Pending")
      : isPlanned(commitment)
      ? (label = "Planned")
      : (label = "");
    return label;
  }

  return (
    <Stack distribution="between">
      <Stack gap="1" alignment="center">
        {setCommitmentLabel()}
        {hasTooltips && (
          <CommitmentTooltip
            displayText={<Icon size="16" icon="info" />}
            toolTipContent={commitmentActions.map((action) => {
              const toolTip = action.toolTip;
              if (toolTip == null) return;
              return <div key={action.key}>{toolTip}</div>;
            })}
          />
        )}
      </Stack>
      {commitmentActions.length > 0 && (
        <ContextMenu>
          {commitmentActions.map((action) => {
            return <div key={action.key}> {action.menuItem} </div>;
          })}
        </ContextMenu>
      )}
    </Stack>
  );
};

export default Actions;
