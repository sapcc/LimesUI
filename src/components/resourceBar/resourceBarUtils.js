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

import { CustomZones } from "../../lib/constants";

export function getBarLabel(resource) {
  if (resource.commitmentSum > 0) {
    return "committed";
  }
  if (resource.hasOwnProperty("capacity")) {
    return "capacity used";
  } else {
    return "quota used";
  }
}

export function getEmptyBarLabel(resource) {
  if (locateAnyAZ(resource)) {
    return "No usage (has base quota)";
  }

  if (resource.hasOwnProperty("capacity")) {
    return "No capacity";
  } else {
    return "No quota";
  }
}

export function locateAnyAZ(resource) {
  return resource?.per_az?.find((az) => az.name === CustomZones.ANY) || false;
}

export function hasAnyBarValues(barValues) {
  return barValues.utilized > 0 || barValues.available > 0;
}
