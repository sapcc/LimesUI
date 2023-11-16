import projectAPIData from "../lib/limes_project_api.json";
import commitmentAPIDAta from "../lib/limes_commitment_api.json";

// Requeues are caused by window focus refetching.
// More details: https://tanstack.com/query/v4/docs/react/guides/window-focus-refetching

function mockAPIData(queryKey, url) {
  if (queryKey === "commitmentData") {
    return commitmentAPIDAta;
  }
  return projectAPIData;
}

function responseHandler(response, meta, commitmentID = null) {
  if (!response.ok) {
    throw new Error(
      `Network error while fetching project data for ${meta.projectID}`
    );
  }
  if (response.statusCode >= 400) {
    throw new Error(
      `${response.statusText} while fetching project data for ${meta.projectID}`
    );
  }
  if (commitmentID) {
    return commitmentID;
  }
  return response.json();
}

export const fetchProjectData = async ({ queryKey, meta }) => {
  let url = `${meta.endpoint}/v1/domains/${meta.domainID}/projects/${meta.projectID}`;
  if (queryKey[0] === "commitmentData") {
    url = url + "/commitments";
  }

  if (queryKey[1]) {
    return mockAPIData(queryKey[0], url);
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-Limes-V2-API-Preview": "per-az",
      "X-Auth-Token": meta.token,
    },
  });

  return responseHandler(response, meta);
};

export const postCommitments = async ({ payload, meta }) => {
  const url = `${meta.endpoint}/v1/domains/${meta.domainID}/projects/${meta.projectID}/commitments/new`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "X-Auth-Token": meta.token,
    },
    body: JSON.stringify(payload),
  });
  return responseHandler(response, meta);
};

export const deleteCommitments = async ({ commitmentID, meta }) => {
  const url = `${meta.endpoint}/v1/domains/${meta.domainID}/projects/${meta.projectID}/commitments/${commitmentID}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "X-Auth-Token": meta.token,
    },
  });
  return responseHandler(response, meta, commitmentID);
};
