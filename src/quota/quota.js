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

import React from "react";
import {
  getResource,
  getRemainingQuota,
  getRemainingQuotaWithUnit,
} from "./utils/resource";
import { t } from "../lib/utils";

function getQuotaFromResources(projectData, serviceType, resourceTypes) {
  const resources = projectData.categories[serviceType].resources;
  const remainingQuotas = resourceTypes.map((resourceType) => {
    const resource = getResource(resources, resourceType);
    if (!resource) return;
    const remainingValue = resource.unit
      ? getRemainingQuotaWithUnit(resource, resource.unit)
      : getRemainingQuota(resource);
    return {
      name: resourceType,
      value: remainingValue,
    };
  });

  return (
    <span>
      {remainingQuotas.map((remainingQuota) => {
        if (!remainingQuota?.name || !remainingQuota.value) return;
        return (
          <React.Fragment key={remainingQuota.name}>
            {remainingQuota.value} {t(remainingQuota.name)}{" "}
          </React.Fragment>
        );
      })}
    </span>
  );
}

export default getQuotaFromResources;
