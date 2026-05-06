// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { CustomZones, STRINGS } from "./constants";
import moment from "moment";

const perFlavorRx = /^instances_(.+)$/;
const hwVersionRx = /^hw_version_(\d+)_(.+)$/;
export const hwVersionScaleRx = /^hw_version_215(.*)$/;

// Translates API-level strings into user-readable UI strings,
// e.g. "volumev2" -> "Block Storage".
export const t = (str) => {
  const translated = STRINGS[str];
  if (translated) {
    return translated;
  }

  // resources like "instances_<resource>",
  const perFlavorMatch = perFlavorRx.exec(str);
  if (perFlavorMatch) {
    return perFlavorMatch[1];
  }

  // hardware version resources like "hw_version_<version>_<resource>",
  const hwVersionMatch = hwVersionRx.exec(str);
  if (hwVersionMatch) {
    const version = hwVersionMatch[1];
    const resourceName = hwVersionMatch[2];
    const translatedResource = STRINGS[resourceName] || resourceName;
    return `${translatedResource} (${version})`;
  }

  return str;
};

// wrapper for formatTime
export function formatTimeISO8160(unixTimeStamp) {
  return formatTime(unixTimeStamp, "YYYY-MM-DD");
}

// Used to provide a uniform time format throughout the UI.
export function formatTime(unixTimeStamp, formatter) {
  if (!moment.unix(unixTimeStamp).isValid()) return false;
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
    const key = t(resName);
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
export const chunkProjects = (projects, chunkSize = 30) => {
  const projectChunks = [];
  for (let i = 0; i < projects.length; i += chunkSize) {
    const chunk = projects.slice(i, i + chunkSize);
    projectChunks.push(chunk);
  }
  return projectChunks;
};

export function unusedCommitments(committed, usage) {
  return committed > usage;
}

export function getUnusedCommitmentRatio(committed, usage) {
  if (committed === 0 || usage > committed) {
    return 0;
  }
  return Math.round((1 - usage / committed) * 100);
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
