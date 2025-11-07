// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import ToolTipWrapper from "../../shared/ToolTipWrapper";
import useCommitmentFilter from "../../../hooks/useCommitmentFilter";
import { PopupMenu, PopupMenuOptions, Icon, Stack } from "@cloudoperators/juno-ui-components";
import useDeleteAction from "./useDeleteAction";
import useTransferAction from "./useTransferAction";
import useConversionAction from "./useConversionAction";
import useUpdateDurationAction from "./useUpdateDurationAction";
import CommitmentMergeSelect from "./CommitmentMergeSelect";

const Actions = (props) => {
  const { commitment = {}, resource = {}, mergeOps = { isMerging: false } } = props;
  const { isMerging } = mergeOps;
  const { getCommitmentLabel, isActive } = useCommitmentFilter();
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

    setCommitmentActions((commitmentActions) => {
      return commitmentActions
        .filter((action) => action.key !== key)
        .concat(newAction)
        .sort((a, b) => a.key.localeCompare(b.key));
    });
  }

  useConversionAction({ commitment, updateActions });
  useDeleteAction({ commitment, updateActions });
  useUpdateDurationAction({ commitment, resource, updateActions });
  useTransferAction({ commitment, updateActions });

  return (
    <Stack distribution="between">
      <Stack gap="1" alignment="center">
        {getCommitmentLabel(commitment)}
        {hasTooltips && (
          <ToolTipWrapper
            trigger={<Icon size="16" icon="info" />}
            content={commitmentActions.map((action) => {
              const toolTip = action.toolTip;
              if (toolTip == null) return;
              return (
                <span key={action.key}>
                  {toolTip} <br />
                </span>
              );
            })}
          />
        )}
      </Stack>
      {isMerging ? (
        <Stack className={"h-4 self-center"}>
          {isActive(commitment) && <CommitmentMergeSelect commitment={commitment} mergeOps={mergeOps} />}
        </Stack>
      ) : (
        commitmentActions.length > 0 && (
          <PopupMenu className="h-4">
            <PopupMenuOptions className="border-solid border-2 border-juno-grey-light-9">
              {commitmentActions.map((action) => {
                return <div key={action.key}> {action.menuItem} </div>;
              })}
            </PopupMenuOptions>
          </PopupMenu>
        )
      )}
    </Stack>
  );
};

export default Actions;
