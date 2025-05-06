/**
 * Copyright 2024 SAP SE
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
import { Panel } from "@cloudoperators/juno-ui-components";
import EditPanel from "./EditPanel";
import { useParams, useNavigate, useLocation } from "react-router";
import { t } from "../../lib/utils";
import { initialCommitmentObject } from "../../lib/constants";
import { createCommitmentStore, createCommitmentStoreActions, domainStoreActions, globalStore } from "../StoreProvider";

// Panel needs to be rendered first to enable the fading UI animation.
const PanelManager = (props) => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { resource: currentResource, serviceType, tracksQuota } = {...location.state}
  const { currentArea, categoryName, resourceName, subRoute } = { ...params };
  const { setShowCommitments } = domainStoreActions();
  const { isEditing } = createCommitmentStore();
  const { currentProject } = createCommitmentStore();
  const project = React.useRef(currentProject);
  const { scope } = globalStore();
  const { resetValidDurations } = createCommitmentStoreActions();
  const { setIsEditing } = createCommitmentStoreActions();
  const { setCommitment } = createCommitmentStoreActions();
  const { setTransferCommitment } = createCommitmentStoreActions();
  const { setIsTransferring } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();
  const { setIsCommitting } = createCommitmentStoreActions();
  const { setIsSubmitting } = createCommitmentStoreActions();
  const { setShowConversionOption } = createCommitmentStoreActions();
  const { setTransferProject } = createCommitmentStoreActions();
  const { setDeleteCommitment } = createCommitmentStoreActions();

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

  // This is a workaround hence the return statement of a useEffect apparently clears the store data first.
  React.useEffect(() => {
    project.current = currentProject;
  }, [currentProject]);

  function onPanelClose(currentProject) {
    setCommitment(initialCommitmentObject);
    setToast(null);
    // create commitment
    setIsEditing(false);
    setIsCommitting(false);
    setShowConversionOption(false);
    resetValidDurations();
    // transfer commitment
    setTransferCommitment(false);
    setIsTransferring(false);
    // Reset showCommitment on project
    if (!scope.isProject() && currentProject) {
      setShowCommitments(currentProject.metadata.id, false);
    }
  }

  //Durations get checked to avoid route call to uneditable resource.
  return (
    (currentResource?.commitment_config?.durations || subRoute) && (
      <Panel
        size="large"
        opened={isEditing}
        onClose={() => {
          onPanelClose(currentProject);
          navigate(`/${currentArea}`);
        }}
        closeable={true}
        heading={`Manage Committed Resources: ${t(categoryName)} - ${t(resourceName)}`}
      >
        <EditPanel
          {...props}
          serviceType={serviceType}
          currentResource={currentResource}
          currentArea={currentArea}
          currentCategory={categoryName}
          subRoute={subRoute}
          tracksQuota={tracksQuota}
        />
      </Panel>
    )
  );
};

export default PanelManager;
