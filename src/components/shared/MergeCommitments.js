// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Button, Icon, Stack } from "@cloudoperators/juno-ui-components";

const MergeCommitment = (props) => {
  const { mergeOps, style } = props;
  const { isMerging, setIsMerging, commitmentsToMerge, setCommitmentsToMerge, setConfirmMerge, mergeIsActive } =
    mergeOps;

  return (
    <Stack className={style} gap="1">
      <Button
        data-testid={"mergeToggle"}
        disabled={!mergeIsActive}
        title={!isMerging ? "Merge" : "Cancel Merge"}
        size="small"
        onClick={() => {
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
        disabled={commitmentsToMerge.length < 2}
        variant="primary"
        onClick={() => {
          setConfirmMerge(true);
        }}
      />
    </Stack>
  );
};

export default MergeCommitment;
