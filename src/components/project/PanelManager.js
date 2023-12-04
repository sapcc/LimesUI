import React from "react";
import { Panel } from "juno-ui-components";
import EditPanel from "./EditPanel";
import { useParams, useNavigate } from "react-router";
import { t } from "../../lib/utils";
import useStore from "../../lib/store/store";
import { initialCommitmentObject } from "../../lib/store/store";

// Panel needs to be rendered first to enable the fading UI animation.
const PanelManager = (props) => {
  const setCommitment = useStore((state) => state.setCommitment);
  const setToast = useStore((state) => state.setToast);
  const setIsCommitting = useStore((state) => state.setIsCommitting);
  const navigate = useNavigate();
  const params = useParams();
  const { currentArea, categoryName, resourceName } = { ...params };

  function onPanelClose() {
    setCommitment(initialCommitmentObject);
    setToast(null);
    setIsCommitting(false);
    navigate(`/${currentArea}`);
  }

  return (
    <Panel
      size="large"
      opened={true}
      onClose={() => onPanelClose()}
      closeable={true}
      heading={`Edit Commitment: ${t(categoryName)} - ${t(resourceName)}`}
    >
      <EditPanel {...props} />
    </Panel>
  );
};

export default PanelManager;
