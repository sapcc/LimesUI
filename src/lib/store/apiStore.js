// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

const apiStore = (set) => ({
  api: {
    globalAPI: {
      apiReady: false,
      endpoint: "",
      token: "",
      projectID: "",
      domainID: "",
    },
    actions: {
      setGlobalAPI: (globalAPI) => set((state) => ({ api: { ...state.api, globalAPI: globalAPI } })),
      setToken: (token) =>
        set((state) => ({
          api: {
            ...state.api,
            globalAPI: { ...state.api.globalAPI, token: token },
          },
        })),
      setApiReady: (isReady) => {
        set((state) => ({
          api: {
            ...state.api,
            globalAPI: { ...state.api.globalAPI, apiReady: isReady },
          },
        }));
      },
    },
  },
});

export default apiStore;
