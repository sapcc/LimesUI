/**
 * Copyright 2025 SAP SE
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
