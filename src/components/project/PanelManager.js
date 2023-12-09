import React from "react";
import { Panel } from "juno-ui-components";
import EditPanel from "./EditPanel";
import { useParams, useNavigate } from "react-router";
import { t } from "../../lib/utils";
import { initialCommitmentObject } from "../../lib/constants";
import {
  createCommitmentStore,
  createCommitmentStoreActions,
} from "../StoreProvider";

// Panel needs to be rendered first to enable the fading UI animation.
const PanelManager = (props) => {
  const { isEditing } = createCommitmentStore();
  const { setIsEditing } = createCommitmentStoreActions();
  const { setCommitment } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();
  const { setIsCommitting } = createCommitmentStoreActions();
  const navigate = useNavigate();
  const params = useParams();
  const { currentArea, categoryName, resourceName } = { ...params };
  const currentResource = props.categories[categoryName]?.resources.find(
    (res) => {
      if (res.name === resourceName) {
        return res;
      }
    }
  );

  React.useEffect(() => {
    if (currentResource) {
      setIsEditing(true);
    }
  }, []);

  function onPanelClose() {
    setCommitment(initialCommitmentObject);
    setToast(null);
    setIsEditing(false);
    setIsCommitting(false);
    navigate(`/${currentArea}`);
  }

  //Durations get checked to avoid route call to uneditable resource.
  return (
    currentResource?.commitment_config?.durations && (
      <Panel
        size="large"
        opened={isEditing}
        onClose={() => onPanelClose()}
        closeable={true}
        heading={`Edit Commitment: ${t(categoryName)} - ${t(resourceName)}`}
      >
        <EditPanel
          {...props}
          currentResource={currentResource}
          currentArea={currentArea}
        />
      </Panel>
    )
  );
};

export default PanelManager;
