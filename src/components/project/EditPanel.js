import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCommitments, deleteCommitments } from "../../lib/apiClient";
import { Panel, PanelBody, Toast } from "juno-ui-components";
import { useParams, useNavigate } from "react-router-dom";
import { t } from "../../lib/utils";
import { tracksQuota } from "../../lib/utils";
import ProjectResource from "./ProjectResource";
import useStore from "../../lib/store/store";
import AvailabilityZoneNav from "./AvailabilityZoneNav";
import CommitmentTable from "../commitment/CommitmentTable";
import CommitmentModal from "../commitment/CommitmentModal";
import { initialCommitmentObject } from "../../lib/store/store";

const EditPanel = (props) => {
  // Variables and State.
  const commitments = useStore((state) => state.commitments);
  const newCommitment = useStore((state) => state.commitment);
  const setCommitment = useStore((state) => state.setCommitment);
  const addCommitment = useStore((state) => state.addCommitment);
  const removeCommitment = useStore((state) => state.removeCommitment);
  const setCommitmentIsLoading = useStore(
    (state) => state.setCommitmentIsLoading
  );
  const setRefetchProjectAPI = useStore((state) => state.setRefetchProjectAPI);
  const postCommitmentQuery = useMutation({
    mutationFn: postCommitments,
    onSuccess: (data) => {
      setRefetchProjectAPI(true);
      setCommitmentIsLoading(false);
      addCommitment(data.commitment);
    },
    onError: () => {
      setCommitmentIsLoading(false);
      setToast("Network error: Could not post commitment.");
    },
  });
  const setDeleteIsLoading = useStore((state) => state.setDeleteIsLoading);
  const deleteCommitmentQuery = useMutation({
    mutationFn: deleteCommitments,
    onSuccess: (data) => {
      setDeleteIsLoading(false);
      removeCommitment(data);
    },
    onError: () => {
      setDeleteIsLoading(false);
      setToast("Network error: Could not delete commitment.");
    },
  });
  const isSubmitting = useStore((state) => state.isSubmitting);
  const setIsSubmitting = useStore((state) => state.setIsSubmitting);
  const isDeleting = useStore((state) => state.isDeleting);
  const setIsDeleting = useStore((state) => state.setIsDeleting);
  const { defaultOptions } = useQueryClient();
  const queryMeta = defaultOptions.queries.meta;
  const setIsCommitting = useStore((state) => state.setIsCommitting);
  const toast = useStore((state) => state.toast);
  const setToast = useStore((state) => state.setToast);
  const params = useParams();
  const navigate = useNavigate();
  const { currentArea, categoryName, resourceName } = { ...params };
  const currentResource = props.categories[categoryName].resources.find(
    (res) => {
      if (res.name === resourceName) {
        return res;
      }
    }
  );
  const currentAZ = useStore((state) => state.currentAZ);
  const setCurrentAZ = useStore((state) => state.setCurrentAZ);

  React.useEffect(() => {
    if (!currentAZ) {
      setCurrentAZ(currentResource.per_az[0][0]);
    }
    return () => setCurrentAZ(null);
  }, []);

  function postCommitment() {
    setCommitmentIsLoading(true);
    const result = postCommitmentQuery.mutate({
      payload: {
        commitment: { ...newCommitment, id: "" },
      },
      meta: {
        ...queryMeta,
      },
    });

    setCommitment(initialCommitmentObject);
    setIsSubmitting(false);
    setIsCommitting(false);
  }

  function deleteCommitment() {
    setDeleteIsLoading(true);
    deleteCommitmentQuery.mutate({
      commitmentID: newCommitment.id,
      meta: { ...queryMeta },
    });
    setCommitment(initialCommitmentObject);
    setIsDeleting(false);
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

  function onDeleteModalClose() {
    setIsDeleting(false);
    setCommitment({ ...initialCommitmentObject });
  }

  function onPanelClose() {
    setCommitment(initialCommitmentObject);
    setToast(null);
    setIsCommitting(false);
    navigate(`/${currentArea}`);
  }

  function dismissToast() {
    setToast(null);
  }

  //Durations get checked to avoid route call to uneditable resource.
  return (
    <>
      {currentAZ && currentResource.commitment_config?.durations && (
        <Panel
          size="large"
          opened={true}
          onClose={() => onPanelClose()}
          closeable={true}
          heading={`Edit Commitment: ${t(categoryName)} - ${t(resourceName)}`}
        >
          <PanelBody>
            <ProjectResource
              resource={currentResource}
              currentAZ={currentAZ}
              tracksQuota={tracksQuota(currentResource)}
              isPanelView={true}
            />
            <AvailabilityZoneNav
              az={currentResource.per_az}
              currentAZ={currentAZ}
              setCurrentAZ={setCurrentAZ}
            />
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
                commitment={newCommitment}
                onConfirm={postCommitment}
                onModalClose={onPostModalClose}
                showModal={isSubmitting}
              />
            )}
            {isDeleting && (
              <CommitmentModal
                title="Confirm commitment deletion"
                subText="Delete"
                az={currentAZ}
                commitment={newCommitment}
                onConfirm={deleteCommitment}
                onModalClose={onDeleteModalClose}
                showModal={isDeleting}
              />
            )}
          </PanelBody>
        </Panel>
      )}
    </>
  );
};

export default EditPanel;
