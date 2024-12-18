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
import { useMutation } from "@tanstack/react-query";
import { PanelBody, Toast } from "@cloudoperators/juno-ui-components";
import Resource from "../mainView/Resource";
import {
  globalStore,
  clusterStoreActions,
  domainStoreActions,
  projectStore,
  projectStoreActions,
  createCommitmentStore,
  createCommitmentStoreActions,
} from "../StoreProvider";
import AvailabilityZoneNav from "./AvailabilityZoneNav";
import CommitmentTable from "../commitment/CommitmentTable";
import CommitmentModal from "../commitment/Modals/CommitmentModal";
import ConversionModal from "../commitment/Modals/ConversionModal";
import DeleteModal from "../commitment/Modals/DeleteModal";
import TransferModal from "../commitment/Modals/TransferModal";
import TransferTokenModal from "../commitment/Modals/TransferTokenModal";
import TransferReceiveModal from "../commitment/Modals/TransferReceiveModal";
import UpdateDurationModal from "../commitment/Modals/UpdateDurationModal";
import ProjectManager from "../project/ProjectManager";
import DomainManager from "../domain/DomainManager";
import useGetConversions from "./PanelHooks/useGetConversions";
import useResetCommitment from "../../hooks/useResetCommitment";
import { initialCommitmentObject, TransferStatus } from "../../lib/constants";

const EditPanel = (props) => {
  const { scope } = globalStore();
  const { serviceType, currentResource, tracksQuota, currentCategory, subRoute } = {
    ...props,
  };
  const resourceName = currentResource.name;
  const minConfirmDate = currentResource?.commitment_config?.min_confirm_by;
  const [canConfirm, setCanConfirm] = React.useState(null);
  const { commitments } = projectStore();
  const { setRefetchProjectAPI } = projectStoreActions();
  const commit = useMutation({
    mutationKey: ["newCommitment"],
  });
  const confirm = useMutation({
    mutationKey: ["canConfirm"],
  });
  const startTransfer = useMutation({
    mutationKey: ["startCommitmentTransfer"],
  });
  const transfer = useMutation({
    mutationKey: ["transferCommitment"],
  });
  const commitmentDelete = useMutation({
    mutationKey: ["deleteCommitment"],
  });
  const convert = useMutation({
    mutationKey: ["convertCommitment"],
  });
  const updateDuration = useMutation({
    mutationKey: ["updateCommitmentDuration"],
  });
  const maxQuota = useMutation({
    mutationKey: ["setMaxQuota"],
  });
  const { resetCommitmentTransfer } = useResetCommitment();
  const { commitment: newCommitment } = createCommitmentStore();
  const { toast } = createCommitmentStore();
  const { conversionCommitment } = createCommitmentStore();
  const { currentProject } = createCommitmentStore();
  const { deleteCommitment } = createCommitmentStore();
  const { transferredCommitment } = createCommitmentStore();
  const { transferProject } = createCommitmentStore();
  const { transferFromAndToProject } = createCommitmentStore();
  const { updateDurationCommitment } = createCommitmentStore();
  const { setCommitment } = createCommitmentStoreActions();
  const { setConversionCommitment } = createCommitmentStoreActions();
  const { setDeleteCommitment } = createCommitmentStoreActions();
  const { setIsCommitting } = createCommitmentStoreActions();
  const { isSubmitting } = createCommitmentStore();
  const { setIsSubmitting } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();
  const { setTransferredCommitment } = createCommitmentStoreActions();
  const { setTransferFromAndToProject } = createCommitmentStoreActions();
  const { setTransferProject } = createCommitmentStoreActions();
  const { setUpdateDurationCommitment } = createCommitmentStoreActions();
  const { setRefetchClusterAPI } = clusterStoreActions();
  const { setRefetchDomainAPI } = domainStoreActions();
  const { setRefetchCommitmentAPI } = createCommitmentStoreActions();
  const { setCommitmentIsLoading } = createCommitmentStoreActions();
  const conversionResults = useGetConversions({ serviceType, resourceName });
  const [currentAZ, setCurrentAZ] = React.useState(currentResource.per_az[0][0]);

  // Query can-confirm API. Determine if capacity is sufficient on limes.
  // If a minConfirmDate is set, skip the request. Limes handles capacity concerns.
  React.useEffect(() => {
    if (!isSubmitting) return;
    // capacity with a minConfirmDate will be identified by limes itself.
    if (minConfirmDate) {
      setCanConfirm(true);
      return;
    }
    setCommitmentIsLoading(true);
    const payload = { ...newCommitment, id: "" };
    const currentProjectID = currentProject?.metadata?.id;
    const currentDomainID = scope.isCluster() ? currentProject.metadata.domainID : null;
    confirm.mutate(
      {
        payload: {
          commitment: payload,
        },
        queryKey: [currentProjectID, currentDomainID],
      },
      {
        onSuccess: (data) => {
          setCanConfirm(data.result);
          setCommitmentIsLoading(false);
        },
        onError: (error) => {
          setCommitmentIsLoading(false);
          setToast(error.toString());
          // Prevent modal from opening.
          setIsSubmitting(false);
        },
      }
    );
  }, [isSubmitting]);

  function postCommitment(confirm_by = null) {
    const currentProjectID = currentProject?.metadata?.id;
    const currentDomainID = scope.isCluster() ? currentProject.metadata.domainID : null;
    setCommitmentIsLoading(true);
    const payload = confirm_by ? { ...newCommitment, id: "", confirm_by: confirm_by } : { ...newCommitment, id: "" };
    commit.mutate(
      {
        payload: {
          commitment: payload,
        },
        queryKey: [currentProjectID, currentDomainID],
      },
      {
        onSuccess: () => {
          (scope.isDomain() || scope.isCluster()) &&
            setToast("Order of projects might have updated. Please sort the table.", "info");
          setRefetchClusterAPI(true);
          setRefetchDomainAPI(true);
          setRefetchProjectAPI(true);
          setRefetchCommitmentAPI(true);
          setCommitmentIsLoading(false);
        },
        onError: (error) => {
          setCommitmentIsLoading(false);
          setToast(error.toString());
        },
      }
    );
    setCommitment(initialCommitmentObject);
    setIsSubmitting(false);
    setCanConfirm(null);
    setIsCommitting(false);
  }

  // Transferring a commitment requires to mark the commitment as transferrable and then transfer it to it's target.
  // Cluster and domain level transfer the commitment immediately after
  // On project level we move between projects. First we initiate the transfer. On the target project we receive with the token input.
  function startCommitmentTransfer(project, commitment) {
    const sourceProjectID = currentProject.metadata.id;
    const sourceDomainID = scope.isCluster() ? currentProject.metadata.domainID : null;
    startTransfer.mutate(
      {
        payload: {
          commitment: {
            amount: commitment.amount,
            transfer_status: "unlisted",
          },
        },
        domainID: sourceDomainID,
        projectID: sourceProjectID,
        commitmentID: commitment.id,
      },
      {
        onSuccess: (data) => {
          // On project level we end here and do not process the transfer directly.
          if (scope.isProject()) {
            resetCommitmentTransfer();
            setRefetchProjectAPI(true);
            setRefetchCommitmentAPI(true);
            return;
          }
          const receivedCommitment = data.commitment;
          const transferToken = data.commitment.transfer_token;
          transferCommitment(project, receivedCommitment, transferToken);
        },
        onError: (error) => {
          resetCommitmentTransfer();
          setTransferProject(null);
          setToast(error.toString());
        },
      }
    );
  }

  function transferCommitment(project, commitment, transferToken) {
    // Cluster View targets the custom field domainID. It is set in the cluster project handling logic.
    const targetDomainID = project?.metadata.domainID || null;
    const targetProjectID = project.metadata.id;

    transfer.mutate(
      {
        domainID: targetDomainID,
        projectID: targetProjectID,
        commitmentID: commitment.id,
        transferToken: transferToken,
      },
      {
        onSuccess: () => {
          !scope.isProject() && setToast("Order of projects might have updated. Please sort the table.", "info");
          resetCommitmentTransfer();
          setRefetchClusterAPI(true);
          setRefetchDomainAPI(true);
          setRefetchProjectAPI(true);
          setRefetchCommitmentAPI(true);
          setTransferProject(null);
        },
        onError: (error) => {
          resetCommitmentTransfer();
          setTransferProject(null);
          setToast(error.toString());
        },
      }
    );
  }

  // Delete commitment
  function deleteCommitmentAPI(commitment) {
    if (!deleteCommitment) return;
    // Cluster View targets the custom field domainID. It is set in the cluster project handling logic.
    const targetDomainID = currentProject?.metadata.domainID || null;
    const targetProjectID = currentProject?.metadata.id || null;
    commitmentDelete.mutate(
      {
        domainID: targetDomainID,
        projectID: targetProjectID,
        commitmentID: commitment.id,
      },
      {
        onSuccess: () => {
          setRefetchClusterAPI(true);
          setRefetchDomainAPI(true);
          setRefetchProjectAPI(true);
          setRefetchCommitmentAPI(true);
          setDeleteCommitment(null);
        },
        onError: (error) => {
          setToast(error.toString());
        },
      }
    );
  }

  // Convert commitment
  function convertCommitment(commitment, payload) {
    const targetDomainID = currentProject?.metadata.domainID || null;
    const targetProjectID = currentProject?.metadata.id || null;

    convert.mutate(
      {
        payload: payload,
        domainID: targetDomainID,
        projectID: targetProjectID,
        commitmentID: commitment.id,
      },
      {
        onSuccess: () => {
          setRefetchClusterAPI(true);
          setRefetchDomainAPI(true);
          setRefetchProjectAPI(true);
          setRefetchCommitmentAPI(true);
          setConversionCommitment(null);
        },
        onError: (error) => {
          setToast(error.toString());
        },
      }
    );
  }

  function updateCommitmentDuration(commitment, payload) {
    const targetDomainID = currentProject?.metadata.domainID || null;
    const targetProjectID = currentProject?.metadata.id || null;

    updateDuration.mutate(
      {
        payload: payload,
        domainID: targetDomainID,
        projectID: targetProjectID,
        commitmentID: commitment.id,
      },
      {
        onSuccess: () => {
          setRefetchClusterAPI(true);
          setRefetchDomainAPI(true);
          setRefetchProjectAPI(true);
          setRefetchCommitmentAPI(true);
          setUpdateDurationCommitment(null);
        },
        onError: (error) => {
          setToast(error.toString());
        },
      }
    );
  }

  // maxQuota can be set for a project with n services and m resources.
  function setMaxQuota(project, domainID, projectID) {
    if (!project) return;
    const targetDomainID = domainID || null;
    const targetProjectID = projectID;

    maxQuota.mutate(
      {
        payload: project,
        targetDomain: targetDomainID,
        targetProject: targetProjectID,
      },
      {
        onSuccess: () => {
          setRefetchProjectAPI(true);
        },
        onError: (error) => {
          setToast(error.toString());
        },
      }
    );
  }

  function onPostModalClose() {
    setIsSubmitting(false);
    setCanConfirm(null);
    setCommitment({
      ...initialCommitmentObject,
      amount: newCommitment.amount,
      unit: newCommitment.unit,
      duration: newCommitment.duration,
    });
  }

  function onTransferModalClose() {
    setTransferProject(null);
  }

  function onTransferModalProjectClose() {
    setTransferredCommitment(initialCommitmentObject);
    setTransferFromAndToProject(null);
  }

  function onUpdateDurationClose() {
    setUpdateDurationCommitment(null);
  }

  function onDeleteClose() {
    setDeleteCommitment(null);
  }

  function onConversionClose() {
    setConversionCommitment(null);
  }

  function dismissToast() {
    setToast(null);
  }

  return (
    <PanelBody>
      <Resource
        postMaxQuota={setMaxQuota}
        project={currentProject}
        resource={currentResource}
        serviceType={serviceType}
        currentAZ={currentAZ}
        tracksQuota={tracksQuota}
        isPanelView={true}
        subRoute={subRoute}
        setCurrentAZ={setCurrentAZ}
      />
      <div className={"sticky top-0 z-[100] bg-juno-grey-light-1 h-8"}>
        {toast.message && (
          <Toast className={"pb-0"} text={toast.message} variant={toast.variant} onDismiss={() => dismissToast()} />
        )}
      </div>
      {!subRoute && (
        <AvailabilityZoneNav az={currentResource.per_az} currentAZ={currentAZ} setCurrentAZ={setCurrentAZ} />
      )}
      {scope.isProject() && commitments && (
        <CommitmentTable
          serviceType={serviceType}
          currentCategory={currentCategory}
          currentResource={currentResource}
          resource={currentResource}
          currentAZ={currentAZ}
          commitmentData={commitments}
          scope={scope}
        />
      )}
      {scope.isDomain() && (
        <ProjectManager
          serviceType={serviceType}
          currentCategory={currentCategory}
          currentResource={currentResource}
          currentAZ={currentAZ}
          subRoute={subRoute}
          setMaxQuota={setMaxQuota}
        />
      )}
      {scope.isCluster() && (
        <DomainManager
          serviceType={serviceType}
          currentCategory={currentCategory}
          currentResource={currentResource}
          currentAZ={currentAZ}
          subRoute={subRoute}
          setMaxQuota={setMaxQuota}
        />
      )}
      {isSubmitting && canConfirm != null && (
        <CommitmentModal
          action={postCommitment}
          az={currentAZ}
          canConfirm={canConfirm}
          commitment={newCommitment}
          minConfirmDate={minConfirmDate}
          onModalClose={onPostModalClose}
          subText="Commit"
          title="Confirm commitment creation"
        />
      )}
      {scope.isProject() && transferFromAndToProject == TransferStatus.START && transferredCommitment && (
        <TransferModal
          title="Transfer Commitment"
          subText="Transfer"
          isProjectView={scope.isProject()}
          onModalClose={onTransferModalProjectClose}
          onTransfer={startCommitmentTransfer}
          commitment={transferredCommitment}
        />
      )}
      {transferProject && transferredCommitment && (
        <TransferModal
          title="Transfer Commitment"
          subText="Transfer"
          isProjectView={scope.isProject()}
          onModalClose={onTransferModalClose}
          onTransfer={startCommitmentTransfer}
          commitment={transferredCommitment}
          currentProject={currentProject}
          transferProject={transferProject}
        />
      )}
      {scope.isProject() && transferFromAndToProject == TransferStatus.VIEW && (
        <TransferTokenModal
          title="Transfer Commitment"
          onModalClose={onTransferModalProjectClose}
          commitment={transferredCommitment}
        />
      )}
      {scope.isProject() && transferFromAndToProject == TransferStatus.RECEIVE && (
        <TransferReceiveModal
          title="Receive Commitment"
          subText="Receive"
          currentProject={currentProject}
          serviceType={serviceType}
          currentResource={currentResource}
          transferCommitment={transferCommitment}
          onModalClose={onTransferModalProjectClose}
        />
      )}
      {conversionCommitment && (
        <ConversionModal
          title="Convert Commitment"
          subText="Convert"
          commitment={conversionCommitment}
          conversionResults={conversionResults}
          onModalClose={onConversionClose}
          onConvert={convertCommitment}
        />
      )}
      {deleteCommitment && (
        <DeleteModal
          action={deleteCommitmentAPI}
          az={currentAZ}
          title="Delete Commitment"
          subText="Delete"
          commitment={deleteCommitment}
          onModalClose={onDeleteClose}
        />
      )}
      {updateDurationCommitment && (
        <UpdateDurationModal
          title="Update Commitment Duration"
          subText="Update"
          resource={currentResource}
          commitment={updateDurationCommitment}
          onModalClose={onUpdateDurationClose}
          onUpdate={updateCommitmentDuration}
        />
      )}
    </PanelBody>
  );
};

export default EditPanel;
