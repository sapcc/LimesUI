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
