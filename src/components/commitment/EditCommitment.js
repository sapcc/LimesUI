import React from "react";
import { ContextMenu } from "juno-ui-components";
import { MenuItem } from "juno-ui-components/build/MenuItem";

const EditCommitment = (props) => {
  return (
    <ContextMenu>
      <MenuItem label="Edit amount" />
      <MenuItem label="Edit duration" />
    </ContextMenu>
  );
};

export default EditCommitment;
