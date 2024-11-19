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

// Generic functions for the label builders.

import { Unit, valueWithUnit } from "../../lib/unit";

function getResource(resources, resourceName) {
  return resources.find((resource) => resource.name == resourceName);
}

function getRemainingQuota(resource) {
  const remainingQuota = resource.quota - resource.usage;
  return remainingQuota > 0 ? remainingQuota : 0;
}

function getRemainingQuotaWithUnit(resource, resourceUnit) {
  const unit = new Unit(resourceUnit);
  const remainingQuota = getRemainingQuota(resource);
  return valueWithUnit(remainingQuota, unit);
}

export { getResource, getRemainingQuota, getRemainingQuotaWithUnit };
