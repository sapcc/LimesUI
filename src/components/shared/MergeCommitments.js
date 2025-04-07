import React from "react";
import { Button, Icon } from "@cloudoperators/juno-ui-components";

const MergeCommitment = () => {
  function onMerge() {
    
  }

  return (
    <Button
      size="small"
      onClick={() => {
        onMerge();
      }}
    >
      <Icon className="mr-2" icon="autoAwesomeMotion" title="Receive" size="18" />
      <span>Merge</span>
    </Button>
  );
};

export default MergeCommitment;
