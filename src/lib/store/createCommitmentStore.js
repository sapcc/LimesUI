import { initialCommitmentObject } from "../constants";

const createCommitmentStore = (set) => ({
  createCommitment: {
    commitment: { ...initialCommitmentObject },
    // Toggle the edit mode and the commitment button.
    isCommitting: false,
    // Disable tabs on edit mode
    isEditing: false,
    // Open the submit modal
    isSubmitting: false,
    // Indicate loading state on commitment save
    commitmentIsLoading: false,
    // Set toast on API errors
    toast: { message: null },
    // Display current selected AZ tab.
    currentAZ: null,
    actions: {
      setCommitment: (commitment) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            commitment: { ...commitment },
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
      setToast: (toast) =>
        set((state) => ({
          createCommitment: {
            ...state.createCommitment,
            toast: { message: toast },
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
    },
  },
});

export default createCommitmentStore;
