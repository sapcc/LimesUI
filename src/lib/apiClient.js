import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchProxy } from "utils";
import { apiStore, apiStoreActions } from "../components/StoreProvider";

// Requeues are caused by window focus refetching.
// More details: https://tanstack.com/query/v4/docs/react/guides/window-focus-refetching

const useQueryClientFn = (isMockApi) => {
  const queryClient = useQueryClient();
  const globalAPI = apiStore();
  const { setApiReady } = apiStoreActions();
  const { endpoint, token, projectID, domainID } = { ...globalAPI };

  function responseHandler(response) {
    if (!response.ok) {
      throw new Error(
        `Network error while fetching project data for ${projectID} Code: ${response.status}`
      );
    }
    return response.json();
  }

  // ProjectView Endpoints
  React.useEffect(() => {
    if (!queryClient || !endpoint || !token) return;
    let pid;
    queryClient.setQueryDefaults(["projectData"], {
      queryFn: async ({ queryKey }) => {
        queryKey[1] ? (pid = queryKey[1]) : (pid = projectID);
        const url = `${endpoint}/v1/domains/${domainID}/projects/${pid}`;
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
      queryFn: async ({ queryKey }) => {
        queryKey[1] ? (pid = queryKey[1]) : (pid = projectID);
        const url = `${endpoint}/v1/domains/${domainID}/projects/${pid}/commitments`;
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
      mutationFn: async ({ payload, queryKey }) => {
        queryKey ? (pid = queryKey) : (pid = projectID);
        const url = `${endpoint}/v1/domains/${domainID}/projects/${pid}/commitments/new`;
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

    queryClient.setMutationDefaults(["deleteCommitment"], {
      mutationFn: async ({ queryKey, commitmentID }) => {
        queryKey ? (pid = queryKey) : (pid = projectID);
        const url = `${endpoint}/v1/domains/${domainID}/projects/${pid}/commitments/${commitmentID}`;
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "X-Auth-Token": token,
          },
        });
        if (!response.ok) {
          throw new Error(
            `Network error while dseleting project data for ${projectID} Code: ${response.status}`
          );
        }
        return response;
      },
    });

    queryClient.setMutationDefaults(["canConfirm"], {
      mutationFn: async ({ payload, queryKey }) => {
        queryKey ? (pid = queryKey) : (pid = projectID);
        const url = `${endpoint}/v1/domains/${domainID}/projects/${pid}/commitments/can-confirm`;
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

  // DomainView Endpoints
  React.useEffect(() => {
    if (!queryClient || !endpoint || !token) return;
    queryClient.setQueryDefaults(["domainData"], {
      queryFn: async () => {
        const url = `${endpoint}/v1/domains/${domainID}`;
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
    queryClient.setQueryDefaults(["projectsInDomain"], {
      queryFn: async ({ queryKey }) => {
        const service = queryKey[1];
        const resource = queryKey[2];
        const url = `${endpoint}/v1/domains/${domainID}/projects?service=${service}&resource=${resource}`;
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
    setApiReady(true);
  }, [queryClient, endpoint, token, domainID]);
};

export default useQueryClientFn;
