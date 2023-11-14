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
  const postCommitmentQuery = useMutation({
    mutationFn: postCommitments,
    onSuccess: (data) => {
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
  const res = props.categories[categoryName].resources.find((res) => {
    if (res.name === resourceName) {
      return res;
    }
  });
  const [currentAZ, setCurrentAZ] = React.useState(Object.keys(res.per_az)[0]);

  React.useEffect(() => {
    setCurrentAZ(Object.keys(res.per_az)[0]);
  }, [res]);

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
    console.log(postCommitmentQuery);

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
    console.log("DELETING: ", newCommitment.id);
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

  return (
    <>
      {currentAZ && (
        <Panel
          size="large"
          opened={true}
          onClose={() => onPanelClose()}
          closeable={true}
          heading={`Edit Commitment: ${t(categoryName)} - ${t(resourceName)}`}
        >
          <PanelBody>
            <ProjectResource
              resource={res}
              tracksQuota={tracksQuota(res)}
              isPanelView={true}
            />
            <AvailabilityZoneNav
              az={res.per_az}
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
                currentResource={res.name}
                resource={res}
                currentAZ={currentAZ}
                commitmentData={commitments}
              />
            )}
            {isSubmitting && (
              <CommitmentModal
                title="Confirm Commitment creation"
                commitment={newCommitment}
                onConfirm={postCommitment}
                onModalClose={onPostModalClose}
                showModal={isSubmitting}
              />
            )}
            {isDeleting && (
              <CommitmentModal
                title="Confirm Commitment deletion"
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
