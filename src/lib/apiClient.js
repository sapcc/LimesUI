export const fetchProjectData = async ({ queryKey, meta }) => {
  const url = `${meta.endpoint}/v1/domains/${meta.domainID}/projects/${meta.projectID}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-Auth-Token": meta.token,
    },
  });
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
  return response.json();
};
