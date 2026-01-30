// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { CEREBROKEY, COMMITMENTRENEWALKEY, CustomZones } from "../constants";
import { unusedCommitments, uncommittedUsage, getResourceDurations } from "../../lib/utils";
import { Scope } from "../scope";

const limesStore = (set, get) => ({
  cluster: {
    clusterData: null,
    refetchClusterAPI: false,
    domainData: null,
    actions: {
      setClusterData: (clusterData) =>
        set((state) => ({
          cluster: { ...state.cluster, clusterData: clusterData },
        })),
      setRefetchClusterAPI: (refetchClusterAPI) =>
        set((state) => ({
          cluster: { ...state.cluster, refetchClusterAPI: refetchClusterAPI },
        })),
      setDomainData: (domainData) =>
        set((state) => ({
          cluster: { ...state.cluster, domainData: domainData },
        })),
      setProjectsToDomain: (projectsPerDomain) =>
        set((state) => {
          const domains = [...state.cluster.domainData];
          if (!domains) return;
          projectsPerDomain.forEach((projects, idx) => {
            domains[idx].projects = projects;
          });

          return {
            ...state,
            cluster: { ...state.cluster, domainData: domains },
          };
        }),
    },
  },
  domain: {
    domainData: null,
    refetchDomainAPI: false,
    projects: null,
    actions: {
      setDomainData: (domainData) =>
        set((state) => ({
          domain: { ...state.domain, domainData: domainData },
        })),
      setRefetchDomainAPI: (refetchDomainAPI) =>
        set((state) => ({
          domain: { ...state.domain, refetchDomainAPI: refetchDomainAPI },
        })),
      setProjects: (projects, sortProjects = true) =>
        set((state) => {
          const domainProjects = [...(state.domain.projects || [])];
          // The user sorts manually if commitments are added or moved to/from projects.
          if (sortProjects) {
            projects = state.domain.actions.sortProjects(projects);
          } else {
            // Keep previous order structure.
            projects.sort((a, b) => {
              return (
                domainProjects.findIndex((p) => p.metadata.id == a.metadata.id) -
                domainProjects.findIndex((p) => p.metadata.id == b.metadata.id)
              );
            });
          }

          return {
            ...state,
            domain: { ...state.domain, projects: projects },
          };
        }),
      sortProjects: (projects) => {
        // Sort after max(unused_commitments, uncommitted_usage)
        const sortedProjects = projects.sort((a, b) => {
          const { resources: resourcesA } = Object.values(a.categories)[0];
          const { resources: resourcesB } = Object.values(b.categories)[0];
          const resourceA = resourcesA[0];
          const resourceB = resourcesB[0];
          let maxA = getMaxCommitmentsOrUsage(resourceA.commitmentSum, resourceA.usage);
          let maxB = getMaxCommitmentsOrUsage(resourceB.commitmentSum, resourceB.usage);

          // Set no quota projects to the bottom of the table.
          if (maxA == 0 && maxB == 0) {
            maxA = resourceA.quota;
            maxB = resourceB.quota;
          }

          // If everything has no quota, just sort alphabetically
          if (maxA == maxB) {
            maxA = a.metadata.name.toLowerCase();
            maxB = b.metadata.name.toLowerCase();
            return maxA > maxB ? 1 : -1;
          }

          return maxB > maxA ? 1 : -1;
        });

        function getMaxCommitmentsOrUsage(commitments, usage) {
          const unused = unusedCommitments(commitments, usage) ? commitments - usage : 0;
          const uncommitted = uncommittedUsage(commitments, usage) ? usage - commitments : 0;
          return Math.max(unused, uncommitted);
        }

        return sortedProjects;
      },
      setSortedProjects: () =>
        set((state) => {
          const projects = state.domain.projects;
          const sortedProjects = state.domain.actions.sortProjects([...projects]);
          return {
            ...state,
            domain: { ...state.domain, projects: sortedProjects },
          };
        }),
    },
  },
  project: {
    //requery API after commit POST to get fresh commitment data for the resource bars.
    projectData: null,
    refetchProjectAPI: false,
    commitments: [],

    actions: {
      setProjectData: (projectData) =>
        set((state) => ({
          project: { ...state.project, projectData: projectData },
        })),
      setRefetchProjectAPI: (refetchProjectAPI) =>
        set((state) => ({
          project: { ...state.project, refetchProjectAPI: refetchProjectAPI },
        })),
      setCommitments: (commitments) =>
        set((state) => {
          return {
            ...state,
            project: { ...state.project, commitments: commitments },
          };
        }),
    },
  },
  global: {
    scope: new Scope(),

    actions: {
      setScope: (scope) => {
        set((state) => ({
          global: { ...state.global, scope: scope },
        }));
      },
      ////////////////////////////////////////////////////////////////////////////////
      // helper that need to restructure a Limes JSON into a triplet of
      // (metadata, overview, categories)
      restructureReport: (data, resourceFilter = null) => {
        // This helper takes the `data` returned by Limes under any GET
        // endpoint and flattens it into several structures that reflect the
        // different levels of React components.
        //
        // Note that the outermost level of the JSON (containing only the key
        // "cluster", "domain" or "project") has already been removed in the
        // fetchData/fetchCapacity action.
        //
        // If `resourceFilter` is given, only resources matching this attribute are
        // included in the final result. (Services and categories without any
        // matching resources are removed from the result.)

        // `metadata` is what multiple levels need (e.g. bursting multiplier).
        var { services: serviceList, ...metadata } = data;

        //apply `resourceFilter`
        if (resourceFilter !== null) {
          serviceList = serviceList.map((srv) => ({
            ...srv,
            resources: srv.resources.filter(resourceFilter),
          }));
        }

        //skip services that do not have any resources (either because of the
        //`resourceFilter` above or because the service in question only reports
        //rates)
        serviceList = serviceList.filter((srv) => srv.resources.length > 0);

        // `categories` is what the Category component needs.
        const categories = {};
        for (let srv of serviceList) {
          const { resources: resourceList, type: serviceType, ...serviceData } = srv;

          for (let res of resourceList) {
            categories[res.category || serviceType] = {
              serviceType,
              ...serviceData,
              resources: [],
            };
          }

          let editableResourceCount = 0;
          for (let res of resourceList) {
            filterAZs(res);
            getQuotaNewOrOldModel(res);
            addCommitmentSum(res);
            if (identifyEditableResource(res)) {
              editableResourceCount++;
            }
            categories[res.category || serviceType].resources.push(res);
          }
          if (editableResourceCount == 0) {
            srv.editableService = false;
          } else {
            srv.editableService = true;
          }
        }

        // helper function: groupKeys transforms a list of key-value pairs into an
        // object just like Object.fromEntries(), but allows duplicate keys by
        // producing arrays of values
        //
        // e.g. groupKeys(["foo", 1], ["bar", 2], ["foo", 3])
        //      = { foo: [1, 3], bar: [2] }
        const groupKeys = (entries) => {
          const result = {};
          for (let [k, _] of entries) {
            result[k] = [];
          }
          for (let [k, v] of entries) {
            result[k].push(v);
          }
          return result;
        };

        // Identify areas that contain editable services
        const areas = new Map();
        const services = serviceList.map((srv) => [srv.area, srv.editableService]).sort();

        services.forEach((srv) => {
          const area = srv[0];
          const editable = srv[1];
          editable && areas.set(area, editable);
        });
        // HANA BigVMResource needs to be added manually to the areas with the coressponding CEREBRO key.
        areas.set(CEREBROKEY, true);
        // Renewal is a custom area that allows to renew expiring commitments.
        areas.set(COMMITMENTRENEWALKEY, true);
        const editableAreas = Array.from(areas.keys());

        // `overview` is what the Overview component needs.
        const overview = {
          //This field is only filled for project scope, and {} otherwise.
          scrapedAt: objectFromEntries(serviceList.map((srv) => [srv.type, srv.scraped_at])),
          //These two fields are only filled for cluster/domain scope, and {} otherwise.
          minScrapedAt: objectFromEntries(serviceList.map((srv) => [srv.type, srv.min_scraped_at])),
          maxScrapedAt: objectFromEntries(serviceList.map((srv) => [srv.type, srv.max_scraped_at])),
          areas: groupKeys(serviceList.map((srv) => [srv.area || srv.type, srv.type]).sort()),
          editableAreas: editableAreas,
          categories: groupKeys(Object.entries(categories).map(([catName, cat]) => [cat.serviceType, catName])),
        };
        overview.areas[CEREBROKEY] = ["cerebro"];
        overview.areas[COMMITMENTRENEWALKEY] = ["renewal"];

        return { metadata, categories, overview };
      },
      receiveCapacity: (data) => {
        // resourceFilters could be defined here.
        const restructure = get().global.actions.restructureReport;
        const { metadata, categories, overview } = restructure(data, null);
        //The AvailabilityZoneCategory component needs a list of all AZs to render
        //the AZ table consistently across all categories.
        const availabilityZones = {};
        for (const categoryName in categories) {
          for (const resource of categories[categoryName].resources) {
            if (!resource?.per_az) continue;
            for (const azCapacity of resource.per_az) {
              availabilityZones[azCapacity.name] = true;
            }
          }
        }
        return { metadata, categories, overview, availabilityZones };
      },
    },
  },
});

export default limesStore;

// Helpers for restructureReport
// Availability Zones will be received as objects. It is easier to handle them as an Array.
function filterAZs(res) {
  if (Array.isArray(res.per_az)) return;
  let validAZs;
  if (res.per_az == undefined) return;
  validAZs = Object.keys(res.per_az).map((key) => {
    return { name: key, ...res.per_az[key] };
  });
  // move 'unknown' and 'any' AZ's to the bottom of the array.
  validAZs.forEach((az, idx) => {
    if ((validAZs.length > 1 && az.name == CustomZones.ANY) || az.name == CustomZones.UNKNOWN) {
      validAZs.push(validAZs.splice(idx, 1)[0]);
    }
  });
  res.per_az = validAZs;
  return;
}

// Add a attribute that defines if a resource can be managed (edited)
function identifyEditableResource(res) {
  const hasDurations = getResourceDurations(res).length > 0;
  // editableResource indicates the color of the resource bar.
  const isEditableResource = hasDurations || res.commitmentSum > 0;
  res.editableResource = isEditableResource;
  return isEditableResource;
}

// old model: Resources have a quota attribute attached to them.
// new model: quota gets calculated after the quota of all availability zones.
function getQuotaNewOrOldModel(res) {
  if ("quota" in res) return;
  // Handle cluster level
  if ("domains_quota" in res) {
    res.quota = res.domains_quota;
    return;
  }
  let quotaSum = 0;
  res.per_az.forEach((az) => {
    return (quotaSum += az.quota || 0);
  });
  if (quotaSum > 0) {
    res.quota = quotaSum;
  }
}

// Sum up all commitments of a resource over all AZ's
function addCommitmentSum(res) {
  let resCommitmentSum = 0;
  // Determine per AZ if it contains any sort of commitment
  res.per_az?.forEach((az) => {
    const hasCommitments = az.committed || az.planned_commitments || az.pending_commitments ? true : false;
    az.hasCommitments = hasCommitments;
  });
  // Sum of all commitments over all AZ's.
  res.per_az?.forEach((az) => {
    let azCommitmentSum = 0;
    const commitments = Object.values(az.committed || {});
    commitments.forEach((commitmentValue) => {
      azCommitmentSum += commitmentValue;
      resCommitmentSum += commitmentValue;
    });
    az.commitmentSum = azCommitmentSum;
  });
  res.commitmentSum = resCommitmentSum;
}

const objectFromEntries = (entries) => {
  const result = {};
  for (let [k, v] of entries) {
    result[k] = v;
  }
  return result;
};
