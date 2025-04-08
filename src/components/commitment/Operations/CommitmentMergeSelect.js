import React from "react";
import { Checkbox } from "@cloudoperators/juno-ui-components/index";

const CommitmentMergeSelect = (props) => {
  const { commitment, mergeOps } = props;
  const { commitmentsToMerge, setCommitmentsToMerge } = mergeOps;
  const [selectedForMerge, setSelectedForMerge] = React.useState(false);
  function onCommitmentMergeSelect(isSelected) {
    console.log(commitmentsToMerge)
    setSelectedForMerge(isSelected);
    if(isSelected) {
        setCommitmentsToMerge([...commitmentsToMerge, commitment.id])
    }
  }

  return <Checkbox checked={selectedForMerge} onClick={() => onCommitmentMergeSelect(!selectedForMerge)} />;
};

export default CommitmentMergeSelect;
