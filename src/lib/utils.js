// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { CustomZones, STRINGS } from "./constants";
import moment from "moment";

const perFlavorRx = /^instances_(.+)$/;

// Translates API-level strings into user-readable UI strings,
// e.g. "volumev2" -> "Block Storage".
export const t = (str) => {
  const translated = STRINGS[str];
  if (translated) {
    return translated;
  }

  //for baremetal flavor resources like "instances_zh2vic1.medium",
  //return the flavor name, e.g. "zh2vic1.medium"
  const match = perFlavorRx.exec(str);
  return match ? match[1] : str;
};

// wrapper for formatTime
export function formatTimeISO8160(unixTimeStamp) {
  return formatTime(unixTimeStamp, "YYYY-MM-DD");
}

// Used to provide a uniform time format throughout the UI.
export function formatTime(unixTimeStamp, formatter) {
  if (!moment.unix(unixTimeStamp).isValid() || unixTimeStamp == "") return false;
  return moment.unix(unixTimeStamp).format(formatter);
}

// This can be used as a sorting predicate:
// sorted_things = things.sort(byUIString)
export const byUIString = (a, b) => {
  const aa = t(a);
  const bb = t(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
};

//A sorting predicate for categories: Sort by translated name, but categories
//named after their service come first.
export const byNameIn = (serviceType) => (a, b) => {
  if (t(serviceType) == t(a)) {
    return -1;
  }
  if (t(serviceType) == t(b)) {
    return +1;
  }
  return byUIString(a, b);
};

// A sorting method for resources in a category. This is not just a predicate
// because we need to traverse the entire list to compute individual sorting
// keys.
export const sortByLogicalOrderAndName = (resources) => {
  const sortingKeysByName = {};
  let sortingKeyForName;
  sortingKeyForName = (resName) => {
    const cached = sortingKeysByName[resName];
    if (cached) {
      return cached;
    }
    const res = resources.find((res) => res.name == resName);
    const parts = [];
    if (res?.contained_in) {
      parts.push(sortingKeyForName(res.contained_in));
      parts.push("000"); //ensure that `contained_in` resources are sorted before `scales_with` resources
    }
    if (res?.scales_with) {
      parts.push(sortingKeyForName(res.scales_with.resource_name));
    }
    parts.push(t(resName));
    const key = parts.join("/");
    sortingKeysByName[resName] = key;
    return key;
  };

  return resources.sort((resA, resB) => {
    const keyA = sortingKeyForName(resA.name);
    const keyB = sortingKeyForName(resB.name);
    return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
  });
};

export const tracksQuota = (res) => {
  return res.quota !== undefined || res.domains_quota !== undefined || res.projects_quota !== undefined;
};

// get specific resource from provided resource list.
export function getCurrentResource(resources, resourceName) {
  return resources.find((res) => {
    if (res.name === resourceName) {
      return res;
    }
  });
}

export function getResourceDurations(resource) {
  return resource.commitment_config?.durations ?? [];
}

// project chunks for table pagination in the EditPanel.
export const chunkProjects = (projects) => {
  const projectChunks = [];
  const chunkSize = 30;
  for (let i = 0; i < projects.length; i += chunkSize) {
    const chunk = projects.slice(i, i + chunkSize);
    projectChunks.push(chunk);
  }
  return projectChunks;
};

export function unusedCommitments(committed, usage) {
  return committed > usage;
}

export function uncommittedUsage(committed, usage) {
  return usage > committed;
}

export function isAZUnaware(az) {
  if (az?.length == 1 && az[0].name == CustomZones.ANY) return true;
  return false;
}

export function locateBaseQuotaAZ(resource) {
  if (isAZUnaware(resource?.per_az)) return null;
  return resource?.per_az?.find((az) => az.name === CustomZones.ANY) || null;
}
