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

  return <Checkbox checked={selectedForMerge} onClick={() => onCommitmentMergeSelect(!selectedForMerge)} />;
};

export default CommitmentMergeSelect;
