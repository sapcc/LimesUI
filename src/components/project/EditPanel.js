import React from "react";
import { useMutation } from "@tanstack/react-query";
import { PanelBody, Toast } from "juno-ui-components";
import { tracksQuota } from "../../lib/utils";
import ProjectResource from "./ProjectResource";
import {
  limesStore,
  limesStoreActions,
  createCommitmentStore,
  createCommitmentStoreActions,
} from "../StoreProvider";
import AvailabilityZoneNav from "./AvailabilityZoneNav";
import CommitmentTable from "../commitment/CommitmentTable";
import CommitmentModal from "../commitment/CommitmentModal";
import { initialCommitmentObject } from "../../lib/constants";

const EditPanel = (props) => {
  const { currentResource, currentArea } = { ...props };
  const minConfirmDate = currentResource?.commitment_config?.min_confirm_by;
  const { commitments } = limesStore();
  const { setRefetchProjectAPI } = limesStoreActions();
  const { addCommitment } = limesStoreActions();
  const commit = useMutation({ mutationKey: ["newCommitment"] });
  const confirm = useMutation({ mutationKey: ["canConfirm"] });
  const { commitment: newCommitment } = createCommitmentStore();
  const { toast } = createCommitmentStore();
  const { isSubmitting } = createCommitmentStore();
  const { currentAZ } = createCommitmentStore();
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
    return () => setCurrentAZ(null);
  }, []);

  function canConfirmCommitment(callback) {
    setCommitmentIsLoading(true);
    const payload = { ...newCommitment, id: "" };
    confirm.mutate(
      {
        payload: {
          commitment: payload,
        },
      },
      {
        onSuccess: (data) => {
          callback(data.result);
          setCommitmentIsLoading(false);
        },
        onError: () => {
          setCommitmentIsLoading(false);
          setToast("Network error: Could not post commitment.");
          // Prevent modal from opening.
          setIsSubmitting(false);
        },
      }
    );
  }

  function postCommitment(confirm_by = null) {
    setCommitmentIsLoading(true);
    const payload = confirm_by
      ? { ...newCommitment, id: "", confirm_by: confirm_by }
      : { ...newCommitment, id: "" };
    commit.mutate(
      {
        payload: {
          commitment: payload,
        },
      },
      {
        onSuccess: (data) => {
          setRefetchProjectAPI(true);
          setCommitmentIsLoading(false);
          addCommitment(data.commitment);
        },
        onError: () => {
          setCommitmentIsLoading(false);
          setToast("Network error: Could not post commitment.");
        },
      }
    );
    setCommitment(initialCommitmentObject);
    setIsSubmitting(false);
    setIsCommitting(false);
  }

  function onPostModalClose() {
    setIsSubmitting(false);
    setCommitment({
      ...initialCommitmentObject,
      amount: newCommitment.amount,
      unit: newCommitment.unit,
      duration: newCommitment.duration,
    });
  }

  function dismissToast() {
    setToast(null);
  }

  return (
    <PanelBody>
      <ProjectResource
        resource={currentResource}
        currentAZ={currentAZ}
        tracksQuota={tracksQuota(currentResource)}
        isPanelView={true}
      />
      <AvailabilityZoneNav az={currentResource.per_az} currentAZ={currentAZ} />
      {toast.message && (
        <Toast
          text={toast.message}
          autoDismiss={true}
          variant="danger"
          onDismiss={() => dismissToast()}
        />
      )}
      {commitments && (
        <CommitmentTable
          currentArea={currentArea}
          currentResource={currentResource.name}
          resource={currentResource}
          currentAZ={currentAZ}
          commitmentData={commitments}
        />
      )}
      {isSubmitting && (
        <CommitmentModal
          title="Confirm commitment creation"
          subText="Commit"
          az={currentAZ}
          minConfirmDate={minConfirmDate}
          commitment={newCommitment}
          canConfirmCommitment={canConfirmCommitment}
          onConfirm={postCommitment}
          onModalClose={onPostModalClose}
        />
      )}
    </PanelBody>
  );
};

export default EditPanel;
