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
import ToolTipWrapper from "../../shared/ToolTipWrapper";
import useCommitmentFilter from "../../../hooks/useCommitmentFilter";
import { PopupMenu, Icon, Stack } from "@cloudoperators/juno-ui-components";
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
    setCommitmentActions((commitmentActions) =>
      [...commitmentActions, newAction].sort((a, b) => a.key.localeCompare(b.key))
    );
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
              return <div key={action.key}>{toolTip}</div>;
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
            <PopupMenu.Menu className="border-solid border-2 border-juno-grey-light-9">
              {commitmentActions.map((action) => {
                return <div key={action.key}> {action.menuItem} </div>;
              })}
            </PopupMenu.Menu>
          </PopupMenu>
        )
      )}
    </Stack>
  );
};

export default Actions;
