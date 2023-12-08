import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchProxy } from "utils";
import useStore from "../lib/store/store";

// Requeues are caused by window focus refetching.
// More details: https://tanstack.com/query/v4/docs/react/guides/window-focus-refetching

const useQueryClientFn = (isMockApi) => {
  const queryClient = useQueryClient();
  const globalAPI = useStore((state) => state.globalAPI);
  const { endpoint, token, projectID, domainID } = { ...globalAPI };
  const setApiReady = useStore((state) => state.setApiReady);

  function responseHandler(response) {
    if (!response.ok) {
      throw new Error(
        `Network error while fetching project data for ${projectID} Code: ${response.status}`
      );
    }
    return response.json();
  }

  React.useEffect(() => {
    if (!queryClient || !endpoint || !token) return;
    queryClient.setQueryDefaults(["projectData"], {
      queryFn: async () => {
        const url = `${endpoint}/v1/domains/${domainID}/projects/${projectID}`;
        const response = await fetchProxy(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-Limes-V2-API-Preview": "per-az",
            "X-Auth-Token": token,
          },
          ...{ mock: isMockApi },
        });
        return responseHandler(response);
      },
    });

    queryClient.setQueryDefaults(["commitmentData"], {
      queryFn: async () => {
        const url = `${endpoint}/v1/domains/${domainID}/projects/${projectID}/commitments`;
        const response = await fetchProxy(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-Limes-V2-API-Preview": "per-az",
            "X-Auth-Token": token,
          },
          ...{ mock: isMockApi },
        });
        return responseHandler(response);
      },
    });

    queryClient.setMutationDefaults(["newCommitment"], {
      mutationFn: async ({ payload }) => {
        const url = `${endpoint}/v1/domains/${domainID}/projects/${projectID}/commitments/new`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "X-Auth-Token": token,
          },
          body: JSON.stringify(payload),
        });
        return responseHandler(response);
      },
    });

    queryClient.setMutationDefaults(["canConfirm"], {
      mutationFn: async ({ payload }) => {
        const url = `${endpoint}/v1/domains/${domainID}/projects/${projectID}/commitments/can-confirm`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "X-Auth-Token": token,
          },
          body: JSON.stringify(payload),
        });
        return responseHandler(response);
      },
    });
    setApiReady(true);
  }, [queryClient, endpoint, token, projectID, domainID]);
};

export default useQueryClientFn;
