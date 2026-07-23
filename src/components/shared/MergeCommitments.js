// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Button, Icon, Stack } from "@cloudoperators/juno-ui-components";
import { useGlobalStore } from "../StoreProvider";

const MergeCommitment = (props) => {
  const { mergeOps, style } = props;
  const { isMerging, setIsMerging, commitmentsToMerge, setCommitmentsToMerge, setConfirmMerge, mergeIsActive } =
    mergeOps;
  const canEdit = useGlobalStore((state) => state.canEdit);

  return (
    <Stack className={style} gap="1">
      <Button
        data-testid={"mergeToggle"}
        disabled={!mergeIsActive || !canEdit}
        title={!isMerging ? "Merge" : "Cancel Merge"}
        size="small"
        onClick={() => {
          if (!canEdit) return;
          if (isMerging) {
            setCommitmentsToMerge([]);
          }
          setIsMerging(!isMerging);
        }}
      >
        <Icon className="mr-2" icon={isMerging ? "cancel" : "autoAwesomeMotion"} title="Receive" size="18" />
        <span>Merge</span>
      </Button>
      <Button
        data-testid={"mergeAction"}
        title="Confirm Merge"
        className={!isMerging && "invisible"}
        size="small"
        icon="success"
        disabled={commitmentsToMerge.length < 2 || !canEdit}
        variant="primary"
        onClick={() => {
          if (!canEdit) return;
          setConfirmMerge(true);
        }}
      />
    </Stack>
  );
};

export default MergeCommitment;
