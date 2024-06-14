import React from "react";
import { useMutation } from "@tanstack/react-query";
import { PanelBody, Toast } from "juno-ui-components";
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
import CommitmentModal from "../commitment/CommitmentModal";
import TransferModal from "../project/TransferModal";
import ProjectManager from "../project/ProjectManager";
import DomainManager from "../domain/DomainManager";
import useResetCommitment from "../../hooks/useResetCommitment";
import { initialCommitmentObject } from "../../lib/constants";
import DeleteModal from "../commitment/DeleteModal";

const EditPanel = (props) => {
  const { scope } = globalStore();
  const {
    serviceType,
    currentResource,
    tracksQuota,
    currentCategory,
    subRoute,
  } = {
    ...props,
  };
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
  const maxQuota = useMutation({
    mutationKey: ["setMaxQuota"],
  });
  const { resetCommitmentTransfer } = useResetCommitment();
  const { commitment: newCommitment } = createCommitmentStore();
  const { toast } = createCommitmentStore();
  const { isSubmitting } = createCommitmentStore();
  const { currentProject } = createCommitmentStore();
  const { currentAZ } = createCommitmentStore();
  const { commitment } = createCommitmentStore();
  const { transferProject } = createCommitmentStore();
  const { deleteCommitment } = createCommitmentStore();
  const { setTransferProject } = createCommitmentStoreActions();
  const { setRefetchClusterAPI } = clusterStoreActions();
  const { setRefetchDomainAPI } = domainStoreActions();
  const { setRefetchCommitmentAPI } = createCommitmentStoreActions();
  const { setCommitment } = createCommitmentStoreActions();
  const { setCommitmentIsLoading } = createCommitmentStoreActions();
  const { setIsSubmitting } = createCommitmentStoreActions();
  const { setIsCommitting } = createCommitmentStoreActions();
  const { setDeleteCommitment } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();
  const { setCurrentAZ } = createCommitmentStoreActions();

  React.useEffect(() => {
    if (!currentAZ) {
      setCurrentAZ(currentResource.per_az[0][0]);
    }
    return () => {
      setCurrentAZ(null);
    };
  }, []);

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
    const currentDomainID = scope.isCluster()
      ? currentProject.metadata.domainID
      : null;
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
    const currentDomainID = scope.isCluster()
      ? currentProject.metadata.domainID
      : null;
    setCommitmentIsLoading(true);
    const payload = confirm_by
      ? { ...newCommitment, id: "", confirm_by: confirm_by }
      : { ...newCommitment, id: "" };
    commit.mutate(
      {
        payload: {
          commitment: payload,
        },
        queryKey: [currentProjectID, currentDomainID],
      },
      {
        onSuccess: (data) => {
          (scope.isDomain() || scope.isCluster()) &&
            setToast(
              "Order of projects might have updated. Please sort the table.",
              "info"
            );
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
    setIsCommitting(false);
  }

  // Transferring a commitment requires to mark the commitment as transferrable and then transfer it to it's target.
  function startCommitmentTransfer(project, commitment) {
    const sourceProjectID = currentProject.metadata.id;
    const sourceDomainID = scope.isCluster()
      ? currentProject.metadata.domainID
      : null;
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
          setToast(
            "Order of projects might have updated. Please sort the table.",
            "info"
          );
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

  function onDeleteClose() {
    setDeleteCommitment(null);
  }

  function dismissToast() {
    setToast(null);
  }

  return (
    <PanelBody>
      <Resource
        resource={currentResource}
        currentAZ={currentAZ}
        tracksQuota={tracksQuota}
        isPanelView={true}
        subRoute={subRoute}
      />
      <div className={"sticky top-0 z-[100] bg-juno-grey-light-1 h-8"}>
        {toast.message && (
          <Toast
            className={"pb-0"}
            text={toast.message}
            variant={toast.variant}
            onDismiss={() => dismissToast()}
          />
        )}
      </div>
      {!subRoute && (
        <AvailabilityZoneNav
          az={currentResource.per_az}
          currentAZ={currentAZ}
        />
      )}
      {scope.isProject() && commitments && (
        <CommitmentTable
          serviceType={serviceType}
          currentCategory={currentCategory}
          currentResource={currentResource.name}
          resource={currentResource}
          currentAZ={currentAZ}
          commitmentData={commitments}
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
          title="Confirm commitment creation"
          subText="Commit"
          az={currentAZ}
          canConfirm={canConfirm}
          minConfirmDate={minConfirmDate}
          commitment={newCommitment}
          onConfirm={postCommitment}
          onModalClose={onPostModalClose}
        />
      )}
      {transferProject && commitment && (
        <TransferModal
          title="Transfer Commitment"
          subText="Transfer"
          onModalClose={onTransferModalClose}
          onTransfer={startCommitmentTransfer}
          commitment={commitment}
          currentProject={currentProject}
          transferProject={transferProject}
        />
      )}
      {deleteCommitment && (
        <DeleteModal
          title="Delete Commitment"
          subText="Delete"
          commitment={deleteCommitment}
          az={currentAZ}
          onModalClose={onDeleteClose}
          onDelete={deleteCommitmentAPI}
        />
      )}
    </PanelBody>
  );
};

export default EditPanel;
