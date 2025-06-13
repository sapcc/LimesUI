import { http, HttpResponse } from "msw";
import { clusterAPI } from "./fixtures/cluster_api.json";
import { domainsForClusterAPI } from "./fixtures/domain_api.json";
import { projectAPI } from "./fixtures/limes_project_api.json";
import { projectCommitmentAPI } from "./fixtures/limes_commitment_api.json";
import { cerebroAPI } from "./fixtures/cerebro_api.json";

const getCluster = ({ endpoint }) => {
  return http.get(`${endpoint}/v1/clusters/current*`, () => HttpResponse.json(clusterAPI));
};
const getDomainsForCluster = ({ endpoint }) => {
  return http.get(`${endpoint}/v1/domains`, () => {
    return HttpResponse.json(domainsForClusterAPI);
  });
};
const getProjectsForCluster = ({ endpoint }) => {
  return http.get(`${endpoint}/v1/domains/:domainID/projects`, () => {
    return HttpResponse.json(domainsForClusterAPI);
  });
};

const getProject = ({ endpoint }) => {
  return http.get(`${endpoint}/v1/domains/:domainID/projects/:projectID`, () => {
    return HttpResponse.json(projectAPI);
  });
};
const getCommitments = ({ endpoint }) => {
  return http.get(`${endpoint}/v1/domains/:domainID/projects/:projectID/commitments`, () => {
    return HttpResponse.json(projectCommitmentAPI);
  });
};
const getCerebro = ({ defaultEndpoint }) => {
  return http.get(`${defaultEndpoint}/bigvm_resources`, () => {
    return HttpResponse.json(cerebroAPI);
  });
};

export default (options) => [
  getCluster(options),
  getDomainsForCluster(options),
  getProjectsForCluster(options),
  getProject(options),
  getCommitments(options),
  getCerebro(options),
];
