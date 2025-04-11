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
import { Checkbox } from "@cloudoperators/juno-ui-components/index";

const CommitmentMergeSelect = (props) => {
  const { commitment, mergeOps } = props;
  const { commitmentsToMerge, setCommitmentsToMerge } = mergeOps;
  const [selectedForMerge, setSelectedForMerge] = React.useState(false);

  function onCommitmentMergeSelect(isSelected) {
    const commitmentInSelection = commitmentsToMerge.find((c) => c.id === commitment.id);
    if (commitmentInSelection && isSelected) {
      return;
    }
    if (commitmentInSelection && !isSelected) {
      const commitments = commitmentsToMerge.filter((c) => c.id !== commitment.id);
      setCommitmentsToMerge(commitments);
    }
    if (isSelected) {
      setCommitmentsToMerge([...commitmentsToMerge, commitment]);
    }
    setSelectedForMerge(isSelected);
  }

  return (
    <Checkbox
      data-testid={`mergeSelect-${commitment.id}`}
      checked={selectedForMerge}
      onClick={() => onCommitmentMergeSelect(!selectedForMerge)}
    />
  );
};

export default CommitmentMergeSelect;
