import { initialCommitmentObject } from "../constants";

const createCommitmentStore = (set) => ({
  createCommitment: {
    commitment: { ...initialCommitmentObject },
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
    // The project to tranfer to
    transferProject: null,
    actions: {
      setCommitment: (commitment) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            commitment: { ...commitment },
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
    },
  },
});

export default createCommitmentStore;
