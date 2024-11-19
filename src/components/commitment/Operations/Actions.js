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
import CommitmentTooltip from "../CommitmentTooltip";
import useCommitmentFilter from "../../../hooks/useCommitmentFilter";
import { ContextMenu, Icon, Stack } from "@cloudoperators/juno-ui-components";
import useDeleteAction from "./useDeleteAction";
import useTransferAction from "./useTransferAction";
import useConversionAction from "./useConversionAction";
import useUpdateDurationAction from "./useUpdateDurationAction";

const Actions = (props) => {
  const { commitment = {}, resource = {} } = props;
  const { confirmed_at: isConfirmed = false } = commitment;
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
    setCommitmentActions((commitmentActions) =>
      [...commitmentActions, newAction].sort((a, b) => a.key.localeCompare(b.key))
    );
  }

  useConversionAction({ commitment, updateActions });
  useDeleteAction({ commitment, updateActions });
  useUpdateDurationAction({ commitment, resource, updateActions });
  useTransferAction({ commitment, updateActions });

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
          <div className="border-solid border-2 border-juno-grey-light-9">
            {commitmentActions.map((action) => {
              return <div key={action.key}> {action.menuItem} </div>;
            })}
          </div>
        </ContextMenu>
      )}
    </Stack>
  );
};

export default Actions;
