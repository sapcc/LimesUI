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
