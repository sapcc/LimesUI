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
import { tracksQuota } from "../../lib/utils";
import { useParams, useNavigate } from "react-router";
import { t, getCurrentResource } from "../../lib/utils";
import { initialCommitmentObject } from "../../lib/constants";
import { createCommitmentStore, createCommitmentStoreActions } from "../StoreProvider";
import { ErrorBoundary } from "../../lib/ErrorBoundary";

// Panel needs to be rendered first to enable the fading UI animation.
const PanelManager = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const { currentArea, categoryName, resourceName, subRoute } = { ...params };
  // currentResource has to be provided from the props. The location state is static and does not refresh on rerender once the project data gets requeried.
  const { resources, serviceType } = props.categories[categoryName];
  const currentResource = getCurrentResource(resources, resourceName);
  const isEditableResource = currentResource.commitment_config?.durations ?? false;
  const resourceTracksQuota = tracksQuota(currentResource);
  const { isEditing } = createCommitmentStore();
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
    if ((isEditableResource || subRoute) && currentResource) {
      setIsEditing(true);
      document.documentElement.style.overflow = 'hidden';
    }
    // reset state if user presses return button at the browser
    return () => {
      setIsSubmitting(false);
      setTransferProject(null);
      setDeleteCommitment(null);
      onPanelClose();
    };
  }, [currentResource]);

  function onPanelClose() {
    document.documentElement.style.overflow = '';
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
  }

  //Durations get checked to avoid route call to uneditable resource.
  return (
    <Panel
      size="large"
      opened={isEditing}
      onClose={() => {
        onPanelClose();
        navigate(`/${currentArea}`);
      }}
      closeable={true}
      heading={`Manage Committed Resources: ${t(categoryName)} - ${t(resourceName)}`}
    >
      <ErrorBoundary>
        <EditPanel
          {...props}
          serviceType={serviceType}
          currentResource={currentResource}
          currentArea={currentArea}
          currentCategory={categoryName}
          subRoute={subRoute}
          tracksQuota={resourceTracksQuota}
        />
      </ErrorBoundary>
    </Panel>
  );
};

export default PanelManager;
