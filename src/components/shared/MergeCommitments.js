import React from "react";
import { Button, Icon, Stack } from "@cloudoperators/juno-ui-components";

const MergeCommitment = (props) => {
  const { mergeOps } = props;
  const { isMerging, setIsMerging, commitmentsToMerge, setCommitmentsToMerge, setConfirmMerge } = mergeOps;

  return (
    <Stack gap="1">
      <Button
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
