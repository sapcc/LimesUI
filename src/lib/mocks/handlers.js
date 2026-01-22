// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { http, HttpResponse } from "msw";
import { clusterAPI } from "./fixtures/cluster_api.json";
import { domainAPI } from "./fixtures/domain_api.json";
import { projectAPI } from "./fixtures/project_api.json";
import { domainProjects } from "./fixtures/domain_projects_api.json";
import { projectCommitmentAPI } from "./fixtures/commitment_api.json";
import { publicCommitmentAPI } from "./fixtures/public_commitment_api.json";
import { cerebroAPI } from "./fixtures/cerebro_api.json";
import moment from "moment";

const getCluster = ({ endpoint }) => {
  return http.get(`${endpoint}/v1/clusters/current*`, () => {
    clusterAPI.cluster.services = structuredClone(projectAPI.project.services);
    mapSourceAPItoCluster(clusterAPI, "quota", "capacity");
    return HttpResponse.json(clusterAPI);
  });
};

const getDomain = ({ endpoint }) => {
  return http.get(`${endpoint}/v1/domains/:domainID`, () => {
    domainAPI.domain.services = structuredClone(projectAPI.project.services);
    return HttpResponse.json(domainAPI);
  });
};

const getProject = ({ endpoint }) => {
  return http.get(`${endpoint}/v1/domains/:domainID/projects/:projectID`, () => {
    return HttpResponse.json(projectAPI);
  });
};

const getDomainsForCluster = ({ endpoint }) => {
  return http.get(`${endpoint}/v1/domains`, () => {
    return HttpResponse.json(domainProjects);
  });
};

const getProjectsForCluster = ({ endpoint }) => {
  return http.get(`${endpoint}/v1/domains/:domainID/projects`, () => {
    domainProjects.domains.services = structuredClone(projectAPI.project.services);
    domainProjects.projects.forEach((project) => {
      if (project.services.length > 0) return;
      project.services = structuredClone(projectAPI.project.services);
    });
    return HttpResponse.json(domainProjects);
  });
};

const getCommitments = ({ endpoint }) => {
  return http.get(`${endpoint}/v1/domains/:domainID/projects/:projectID/commitments`, () => {
    projectCommitmentAPI.commitments.find((c) => c.id === 107).confirm_by = moment().add(30, "days").unix();
    projectCommitmentAPI.commitments
      .filter((c) => [103, 108, 109].includes(c.id))
      .forEach((c) => (c.expires_at = moment().add(2, "months").unix()));
    return HttpResponse.json(projectCommitmentAPI);
  });
};

const canConfirmCommitment = ({ endpoint }) => {
  return http.post(`${endpoint}/v1/domains/:domainID/projects/:projectID/commitments/can-confirm`, () => {
    return HttpResponse.json({ result: true });
  });
};

const getPublicCommitments = ({ endpoint }) => {
  return http.get(`${endpoint}/v1/public-commitments`, (opts) => {
    const { request } = opts;
    const urlParams = new URLSearchParams(request.url);
    const resource = urlParams.get("resource");
    let publicCommitments = projectCommitmentAPI.commitments.filter(
      (c) => c.resource_name === resource && c.transfer_status === "public"
    );
    publicCommitments.push(...publicCommitmentAPI.commitments.filter((c) => c.resource_name === resource));
    return HttpResponse.json({ commitments: publicCommitments });
  });
};

const getCerebro = ({ defaultEndpoint }) => {
  return http.get(`${defaultEndpoint}/bigvm_resources`, () => {
    return HttpResponse.json(cerebroAPI);
  });
};

function mapSourceAPItoCluster(obj, oldKey, newKey) {
  function renameKey(res) {
    res[newKey] = res[oldKey];
    delete res[oldKey];
  }

  obj.cluster.services.map((svc) => {
    svc.resources.map((res) => {
      res.domains_quota = res.quota;
      renameKey(res);
      Object.values(res.per_az).map((az) => {
        renameKey(az);
      });
    });
  });
}

export default (options) => [
  getCluster(options),
  getDomain(options),
  getProject(options),
  getDomainsForCluster(options),
  getProjectsForCluster(options),
  getCommitments(options),
  canConfirmCommitment(options),
  getPublicCommitments(options),
  getCerebro(options),
];
