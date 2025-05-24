/**
 * Copyright 2024 SAP SE
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

import { STRINGS } from "./constants";
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
  if (committed > usage) {
    return true;
  }
  return false;
}

export function uncommittedUsage(committed, usage) {
  if (usage > committed) {
    return true;
  }
  return false;
}

export function isAZUnaware(az) {
  if (az?.length == 1 && az[0].name == "any") return true;
  return false;
}
