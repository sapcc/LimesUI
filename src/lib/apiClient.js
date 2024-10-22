import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchProxy } from "@cloudoperators/juno-utils";
import { apiStore, apiStoreActions } from "../components/StoreProvider";
import { getCerebroBaseURL } from "./scope";

// Requeues are caused by window focus refetching.
// More details: https://tanstack.com/query/v4/docs/react/guides/window-focus-refetching

const useQueryClientFn = (isMockApi) => {
  const queryClient = useQueryClient();
  const globalAPI = apiStore();
  const { setApiReady } = apiStoreActions();
  const { endpoint, token, projectID, domainID } = { ...globalAPI };

  async function responseHandler(response, addStatusCode = true) {
    if (!response.ok) {
      const text = await response.text();
      const errorText = addStatusCode
        ? `${text} (Code: ${response.status})`
        : `${text}`;
      throw new Error(errorText);
    }
    return response.json();
  }

  // ProjectView Endpoints
  React.useEffect(() => {
    if (!queryClient || !endpoint || !token) return;
    let pid;
    let did;
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
        queryKey[2] ? (did = queryKey[2]) : (did = domainID);
        const url = `${endpoint}/v1/domains/${did}/projects/${pid}/commitments`;
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
        queryKey[0] ? (pid = queryKey[0]) : (pid = projectID);
        queryKey[1] ? (did = queryKey[1]) : (did = domainID);
        const url = `${endpoint}/v1/domains/${did}/projects/${pid}/commitments/new`;
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
      mutationFn: async ({
        domainID: domID,
        projectID: projID,
        commitmentID,
      }) => {
        projID ? (pid = projID) : (pid = projectID);
        domID ? (did = domID) : (did = domainID);
        const url = `${endpoint}/v1/domains/${did}/projects/${pid}/commitments/${commitmentID}`;
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "X-Auth-Token": token,
          },
        });
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Network error: ${text} (Code: ${response.status})`);
        }
        return response;
      },
    });

    queryClient.setMutationDefaults(["canConfirm"], {
      mutationFn: async ({ payload, queryKey }) => {
        queryKey[0] ? (pid = queryKey[0]) : (pid = projectID);
        queryKey[1] ? (did = queryKey[1]) : (did = domainID);
        const url = `${endpoint}/v1/domains/${did}/projects/${pid}/commitments/can-confirm`;
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

    queryClient.setMutationDefaults(["setMaxQuota"], {
      mutationFn: async ({ payload, targetDomain, targetProject }) => {
        targetDomain ? (did = targetDomain) : (did = domainID);
        const url = `${endpoint}/v1/domains/${did}/projects/${targetProject}/max-quota`;
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "X-Auth-Token": token,
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Network error: ${text} (Code: ${response.status})`);
        }
        return response;
      },
    });

    if (!queryClient || !endpoint || !token) return;
    queryClient.setQueryDefaults(["getConversions"], {
      queryFn: async ({ queryKey }) => {
        const { serviceType, resourceName } = queryKey[1];
        const url = `${endpoint}/v1/commitment-conversion/${serviceType}/${resourceName}`;
        const response = await fetchProxy(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-Auth-Token": token,
          },
          ...{ mock: isMockApi },
        });
        return responseHandler(response);
      },
    });
    queryClient.setMutationDefaults(["convertCommitment"], {
      // Receives the target domainID and projectID to transfer the commitment to.
      mutationFn: async ({
        domainID: domID,
        projectID: projID,
        commitmentID,
        payload,
      }) => {
        projID ? (pid = projID) : (pid = projectID);
        domID ? (did = domID) : (did = domainID);
        const url = `${endpoint}/v1/domains/${did}/projects/${pid}/commitments/${commitmentID}/convert`;
        const response = await fetchProxy(url, {
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

    queryClient.setMutationDefaults(["updateCommitmentDuration"], {
      mutationFn: async ({
        domainID: domID,
        projectID: projID,
        commitmentID,
        payload,
      }) => {
        projID ? (pid = projID) : (pid = projectID);
        domID ? (did = domID) : (did = domainID);
        const url = `${endpoint}/v1/domains/${did}/projects/${pid}/commitments/${commitmentID}/update-duration`;
        const response = await fetchProxy(url, {
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
    let dID;
    if (!queryClient || !endpoint || !token) return;
    queryClient.setQueryDefaults(["domainData"], {
      queryFn: async ({ queryKey }) => {
        queryKey[1] ? (dID = queryKey[1]) : (dID = domainID);
        const url = `${endpoint}/v1/domains/${dID}`;
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
        queryKey[3] ? (dID = queryKey[3]) : (dID = domainID);
        const url = `${endpoint}/v1/domains/${dID}/projects?service=${service}&resource=${resource}`;
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
    queryClient.setMutationDefaults(["startCommitmentTransfer"], {
      // payload contains amount and transferStatus (unlisted or public).
      mutationFn: async ({
        payload,
        domainID: domID,
        projectID,
        commitmentID,
      }) => {
        domID ? (dID = domID) : (dID = domainID);
        const url = `${endpoint}/v1/domains/${dID}/projects/${projectID}/commitments/${commitmentID}/start-transfer`;
        const response = await fetchProxy(url, {
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
    queryClient.setMutationDefaults(["transferCommitment"], {
      // Receives the target domainID and projectID to transfer the commitment to.
      mutationFn: async ({
        domainID: domID,
        projectID,
        commitmentID,
        transferToken,
      }) => {
        domID ? (dID = domID) : (dID = domainID);
        const url = `${endpoint}/v1/domains/${dID}/projects/${projectID}/transfer-commitment/${commitmentID}`;
        const response = await fetchProxy(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "X-Auth-Token": token,
            "Transfer-Token": transferToken,
          },
        });
        return responseHandler(response);
      },
    });
    setApiReady(true);
  }, [queryClient, endpoint, token, domainID]);

  // ClusterView Endpoints
  React.useEffect(() => {
    if (!queryClient || !endpoint || !token) return;
    queryClient.setQueryDefaults(["clusterData"], {
      queryFn: async ({ queryKey }) => {
        const isDetail = queryKey[1];
        const url = isDetail
          ? `${endpoint}/v1/clusters/current?detail`
          : `${endpoint}/v1/clusters/current`;
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
    queryClient.setQueryDefaults(["domains"], {
      queryFn: async ({ queryKey }) => {
        const service = queryKey[1];
        const resource = queryKey[2];
        // sending an empty queryString results in the domains without any resources attached to them.
        const url = `${endpoint}/v1/domains?service=${service}&resource=${resource}`;
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
  }, [queryClient, endpoint, token]);

  // Cerebro API Client
  React.useEffect(() => {
    queryClient.setQueryDefaults(["cerebro"], {
      queryFn: async () => {
        // Don't retrieve a token in dev to ensure the mocks work.
        const token = isMockApi
          ? null
          : [...document.querySelectorAll("meta")].find(
              (n) => n.name.toLowerCase() == "csrf-token"
            ).content;
        const host = isMockApi ? "host" : window.location.host;
        const path = isMockApi
          ? "/domain/project/resources/project"
          : getCerebroBaseURL();

        const url = `https://${host}${path}/bigvm_resources`;
        const response = await fetchProxy(url, {
          method: "GET",
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-Token": token,
          },
          ...{ mock: isMockApi },
        });
        return responseHandler(response, false);
      },
    });
  }, [queryClient]);

  // CommitmentByToken is used for commitment transfers.
  React.useEffect(() => {
    queryClient.setQueryDefaults(["commitmentByToken"], {
      queryFn: async ({ queryKey }) => {
        const transferToken = queryKey[1];
        const url = `${endpoint}/v1/commitments/${transferToken}`;
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
  }, [queryClient, endpoint, token]);
};

export default useQueryClientFn;
