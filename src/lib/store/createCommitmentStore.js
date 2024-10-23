import { initialCommitmentObject } from "../constants";

const createCommitmentStore = (set) => ({
  createCommitment: {
    commitment: { ...initialCommitmentObject },
    transferredCommitment: { ...initialCommitmentObject },
    // Requery API
    refetchCommitmentAPI: false,
    // Toggle the edit mode and the commitment button.
    isCommitting: false,
    // Disable tabs on edit mode
    isEditing: false,
    // Open the submit modal
    isSubmitting: false,
    // Indicate loading state on commitment save
    commitmentIsLoading: false,
    commitmentIsFetching: false,
    // Set toast on API errors
    toast: { message: null, variant: "" },
    // Display current selected AZ tab.
    currentAZ: null,
    // Cluster/Domain View: currently clicked project of a resource in a domain.
    currentProject: null,
    // Transfer commitment to other project (Cluster/Domain View only).
    transferCommitment: false,
    // The user choses a concrete commitment to move.
    isTransferring: false,
    // The project to tranfer to (cluster/domain level)
    transferProject: null,
    // transfer commitments on project level.
    transferFromAndToProject: null,
    // contains the commitment to convert.
    conversionCommitment: null,
    showConversionOption: false,
    // contains the commitment to delete.
    deleteCommitment: null,
    // contains the commitment to update the duration on.
    updateDurationCommitment: null,
    validDurations: new Map(),
    actions: {
      setCommitment: (commitment) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            commitment: { ...commitment },
          },
        })),
      setTransferredCommitment: (transferredCommitment) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            transferredCommitment: { ...transferredCommitment },
          },
        })),
      setRefetchCommitmentAPI: (refetchCommitmentAPI) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            refetchCommitmentAPI: refetchCommitmentAPI,
          },
        })),
      setIsCommitting: (setIsCommitting) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            isCommitting: setIsCommitting,
          },
        })),
      setIsEditing: (isEditing) =>
        set((state) => ({
          createCommitment: { ...state.createCommitment, isEditing: isEditing },
        })),
      setIsSubmitting: (isSubmitting) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            isSubmitting: isSubmitting,
          },
        })),
      setCommitmentIsLoading: (loading) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            commitmentIsLoading: loading,
          },
        })),
      setCommitmentIsFetching: (fetching) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            commitmentIsFetching: fetching,
          },
        })),
      setToast: (toast, variant = "danger") =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            toast: { message: toast, variant: variant },
          },
        })),
      setCurrentAZ: (currentAZ) =>
        set((state) => {
          if (currentAZ === "unknown") return { ...state };
          return {
            ...state,
            createCommitment: {
              ...state.createCommitment,
              currentAZ: currentAZ,
            },
          };
        }),
      setTransferCommitment: (transferCommitment) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            transferCommitment: transferCommitment,
          },
        })),
      setTransferFromAndToProject: (isTrasferring) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            transferFromAndToProject: isTrasferring,
          },
        })),
      setCurrentProject: (project) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            currentProject: project,
          },
        })),
      setIsTransferring: (isTransferring) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            isTransferring: isTransferring,
          },
        })),
      setTransferProject: (transferProject) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            transferProject: transferProject,
          },
        })),
      setConversionCommitment: (commitment) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            conversionCommitment: commitment,
          },
        })),
      setShowConversionOption: (showConversionOption) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            showConversionOption: showConversionOption,
          },
        })),
      setDeleteCommitment: (commitment) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            deleteCommitment: commitment,
          },
        })),
      setUpdateDurationCommitment: (commitment) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            updateDurationCommitment: commitment,
          },
        })),
      addValidDuration: (durationSet) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            validDurations: state.createCommitment.validDurations.set(
              durationSet?.id,
              durationSet?.durations
            ),
          },
        })),
      resetValidDurations: () => {
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            validDurations: new Map(),
          },
        }));
      },
    },
  },
});

export default createCommitmentStore;
