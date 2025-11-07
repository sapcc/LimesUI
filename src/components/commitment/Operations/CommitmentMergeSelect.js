// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

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
