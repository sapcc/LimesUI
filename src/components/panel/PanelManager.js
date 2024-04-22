import React from "react";
import { Panel } from "juno-ui-components";
import EditPanel from "./EditPanel";
import { useParams, useNavigate } from "react-router";
import {
  t,
  getCurrentResource,
  getContainingResourceFor,
  tracksQuota,
} from "../../lib/utils";
import { initialCommitmentObject } from "../../lib/constants";
import {
  createCommitmentStore,
  createCommitmentStoreActions,
  domainStoreActions,
} from "../StoreProvider";

// Panel needs to be rendered first to enable the fading UI animation.
const PanelManager = (props) => {
  const { setShowCommitments } = domainStoreActions();
  const { isEditing } = createCommitmentStore();
  const { currentProject } = createCommitmentStore();
  const project = React.useRef(currentProject);
  const { setIsEditing } = createCommitmentStoreActions();
  const { setCommitment } = createCommitmentStoreActions();
  const { setTransferCommitment } = createCommitmentStoreActions();
  const { setIsTransferring } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();
  const { setIsCommitting } = createCommitmentStoreActions();
  const { setIsSubmitting } = createCommitmentStoreActions();
  const { setTransferProject } = createCommitmentStoreActions();
  const { setDeleteCommitment } = createCommitmentStoreActions();
  const navigate = useNavigate();
  const params = useParams();
  const { currentArea, categoryName, resourceName, subRoute } = { ...params };
  const { serviceType } = props.categories[categoryName];
  const { resources } = props.categories[categoryName];
  const currentResource = getCurrentResource(resources, resourceName);
  const resourceTracksQuota = tracksQuota(currentResource);
  const parentResource = getContainingResourceFor(resources, resourceName);

  React.useEffect(() => {
    if (currentResource) {
      setIsEditing(true);
    }
    // reset state if user presses return button at the browser
    return () => {
      setIsSubmitting(false);
      setTransferProject(null);
      setDeleteCommitment(null);
      onPanelClose(project.current);
    };
  }, []);

  React.useEffect(() => {
    project.current = currentProject;
  }, [currentProject]);

  function onPanelClose(currentProject) {
    setCommitment(initialCommitmentObject);
    setToast(null);
    // create commitment
    setIsEditing(false);
    setIsCommitting(false);
    // transfer commitment
    setTransferCommitment(false);
    setIsTransferring(false);
    // Reset showCommitment on project
    if (currentProject) {
      setShowCommitments(currentProject.metadata.id, false);
    }
  }

  //Durations get checked to avoid route call to uneditable resource.
  return (
    currentResource?.commitment_config?.durations && (
      <Panel
        size="large"
        opened={isEditing}
        onClose={() => {
          onPanelClose(currentProject);
          navigate(`/${currentArea}`);
        }}
        closeable={true}
        heading={`Manage Committed Resources: ${t(categoryName)} - ${t(
          resourceName
        )}`}
      >
        <EditPanel
          {...props}
          serviceType={serviceType}
          currentResource={currentResource}
          tracksQuota={resourceTracksQuota}
          parentResource={parentResource}
          currentArea={currentArea}
          currentCategory={categoryName}
          subRoute={subRoute}
        />
      </Panel>
    )
  );
};

export default PanelManager;
