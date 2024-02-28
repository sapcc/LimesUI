import React from "react";
import { useMutation } from "@tanstack/react-query";
import { PanelBody, Toast } from "juno-ui-components";
import { tracksQuota } from "../../lib/utils";
import Resource from "../mainView/Resource";
import {
  globalStore,
  projectStore,
  domainStoreActions,
  projectStoreActions,
  createCommitmentStore,
  createCommitmentStoreActions,
} from "../StoreProvider";
import AvailabilityZoneNav from "./AvailabilityZoneNav";
import CommitmentTable from "../commitment/CommitmentTable";
import CommitmentModal from "../commitment/CommitmentModal";
import TransferModal from "../project/TransferModal";
import ProjectManager from "../project/ProjectManager";
import useResetCommitment from "../../hooks/useResetCommitment";
import { initialCommitmentObject } from "../../lib/constants";

const EditPanel = (props) => {
  const { scope } = globalStore();
  const { serviceType, currentResource, currentCategory } = {
    ...props,
  };
  const minConfirmDate = currentResource?.commitment_config?.min_confirm_by;
  const [canConfirm, setCanConfirm] = React.useState(null);
  const { commitments } = projectStore();
  const { setRefetchProjectAPI } = projectStoreActions();
  const { addCommitment } = projectStoreActions();
  const commit = useMutation({
    mutationKey: ["newCommitment"],
  });
  const confirm = useMutation({
    mutationKey: ["canConfirm"],
  });
  const del = useMutation({
    mutationKey: ["deleteCommitment"],
  });
  const { resetCommitmentTransfer } = useResetCommitment();
  const { commitment: newCommitment } = createCommitmentStore();
  const { toast } = createCommitmentStore();
  const { isSubmitting } = createCommitmentStore();
  const { currentProject } = createCommitmentStore();
  const { currentAZ } = createCommitmentStore();
  const { commitment } = createCommitmentStore();
  const { transferProject } = createCommitmentStore();
  const { setTransferProject } = createCommitmentStoreActions();
  const { setRefetchCommitmentAPI } = createCommitmentStoreActions();
  const { setRefetchDomainAPI } = domainStoreActions();
  const { setCommitment } = createCommitmentStoreActions();
  const { setCommitmentIsLoading } = createCommitmentStoreActions();
  const { setIsSubmitting } = createCommitmentStoreActions();
  const { setIsCommitting } = createCommitmentStoreActions();

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
    confirm.mutate(
      {
        payload: {
          commitment: payload,
        },
        queryKey: currentProjectID,
      },
      {
        onSuccess: (data) => {
          setCanConfirm(data.result);
          setCommitmentIsLoading(false);
        },
        onError: (data) => {
          setCommitmentIsLoading(false);
          setToast("Check to confirm commitment failed.");
          // Prevent modal from opening.
          setIsSubmitting(false);
        },
      }
    );
  }, [isSubmitting]);

  function postCommitment(confirm_by = null) {
    const currentProjectID = currentProject?.metadata?.id;
    setCommitmentIsLoading(true);
    const payload = confirm_by
      ? { ...newCommitment, id: "", confirm_by: confirm_by }
      : { ...newCommitment, id: "" };
    commit.mutate(
      {
        payload: {
          commitment: payload,
        },
        queryKey: currentProjectID,
      },
      {
        onSuccess: (data) => {
          scope.isDomain() &&
            setToast(
              "Order of projects might have updated. Please sort the table.",
              "info"
            );
          setRefetchDomainAPI(true);
          setRefetchProjectAPI(true);
          setRefetchCommitmentAPI(true);
          setCommitmentIsLoading(false);
          addCommitment(data.commitment);
        },
        onError: (data) => {
          setCommitmentIsLoading(false);
          setToast("Network error: Could not post commitment.");
        },
      }
    );
    setCommitment(initialCommitmentObject);
    setIsSubmitting(false);
    setIsCommitting(false);
  }

  // To transfer a commitment it get's created on the new and deleted in the old project.
  // Because we delete, we might to consider a transaction rollback.
  function transferCommitment(project, commitment) {
    const currentProjectID = currentProject.metadata.id;
    const transferProjectID = project.metadata.id;
    const payload = commitment;
    commit.mutate(
      {
        payload: {
          commitment: payload,
        },
        queryKey: transferProjectID,
      },
      {
        onSuccess: (data) => {
          del.mutate(
            {
              queryKey: currentProjectID,
              commitmentID: commitment.id,
            },
            {
              onSuccess: (data) => {
                setToast(
                  "Order of projects might have updated. Please sort the table.",
                  "info"
                );
                resetCommitmentTransfer();
                setRefetchCommitmentAPI(true);
                setRefetchProjectAPI(true);
                setTransferProject(null);
              },
              onError: (data) => {
                resetCommitmentTransfer();
                setTransferProject(null);
                setToast(
                  `Network Error: Unable to remove commit. Please contact an administrator.`
                );
              },
            }
          );
        },
        onError: (data) => {
          resetCommitmentTransfer();
          setTransferProject(null);
          setToast("Network error: Could not post commitment.");
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

  function dismissToast() {
    setToast(null);
  }

  return (
    <PanelBody>
      <Resource
        resource={currentResource}
        currentAZ={currentAZ}
        tracksQuota={tracksQuota(currentResource)}
        isPanelView={true}
      />
      <AvailabilityZoneNav az={currentResource.per_az} currentAZ={currentAZ} />
      {toast.message && (
        <Toast
          className={"p-0 sticky top-[11.5rem] z-[100]"}
          text={toast.message}
          autoDismiss={true}
          variant={toast.state}
          onDismiss={() => dismissToast()}
        />
      )}
      {scope.isProject() && commitments && (
        <CommitmentTable
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
          currentResource={currentResource.name}
          currentAZ={currentAZ}
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
          onModalClose={onTransferModalClose}
          onTransfer={transferCommitment}
          commitment={commitment}
          currentProject={currentProject}
          transferProject={transferProject}
        />
      )}
    </PanelBody>
  );
};

export default EditPanel;
