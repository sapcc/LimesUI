/**
 * Copyright 2025 SAP SE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
