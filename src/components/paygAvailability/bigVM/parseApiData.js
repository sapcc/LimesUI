// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

export function parseApiData(data) {
  const filterRule = "hana_";
  const availabilityZones = data?.placeable_vms?.result_per_availability_zone;
  if (!availabilityZones) return [];
  const result = Object.keys(availabilityZones)
    .sort()
    .map((az) => {
      const scrapeTime = availabilityZones[az].timestamp_data_crawled;
      const entry = {
        availabilityZone: az,
        flavors: [],
        scrapeTime: scrapeTime,
      };
      const flavors = availabilityZones[az]?.placeable_vms;
      if (!flavors) {
        return entry;
      }
      Object.keys(flavors)
        .sort()
        .forEach((fname) => {
          if (fname.startsWith(filterRule)) {
            entry.flavors.push({ [fname]: flavors[fname] });
          }
        });
      return entry;
    });
  return result;
}
