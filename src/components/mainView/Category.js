// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { t, sortByLogicalOrderAndName, tracksQuota } from "../../lib/utils";
import Resource from "./Resource";
import { ErrorBoundary } from "../../lib/ErrorBoundary";
import { hwVersionScaleRx } from "../../lib/utils";

const categoryTitle = `
    text-lg 
    mb-4 
    font-bold 
    col-span-full 
    text-theme-hig
    `;
const categoryContent = `
    grid
    gap-4 
    grid-cols-[repeat(auto-fit,_minmax(34rem,_1fr))]
    `;

// TODO: for domain/cluster level add tracksQuota which skips resource that do not track quota.

const Category = (props) => {
  const { advancedView, canEdit, categoryName, serviceType } = props;
  const { area, resources } = props.category;
  const forwardProps = {
    area,
    canEdit,
    categoryName,
    serviceType,
  };

  const editableResources = React.useMemo(() => {
    return resources.filter((res) => res.editableResource === true);
  }, [resources]);

  // Identify cores resources that should display special unit info based on a corresponding editable ram resource and the absence of their own editability.
  // Defense in depth: A category group normally contains only one pair of cores and ram resources, but the code accounts for multiple pairs.
  const specialUnitCoreNames = React.useMemo(() => {
    const hwVersionResources = resources.filter((res) => hwVersionScaleRx.test(res.name));
    const editableRamNames = hwVersionResources
      .filter((res) => res.name.includes("ram") && res.editableResource)
      .map((res) => res.name);
    return hwVersionResources
      .filter(
        (res) =>
          res.name.includes("cores") &&
          !res.editableResource &&
          editableRamNames.includes(res.name.replace("cores", "ram"))
      )
      .map((res) => res.name);
  }, [resources]);

  return (
    (editableResources.length > 0 || advancedView) && (
      <div className="category-container mb-4">
        <h1 className={`category-title ${categoryTitle}`}>{t(props.categoryName)}</h1>
        <div className={`category-content ${categoryContent}`}>
          {sortByLogicalOrderAndName(advancedView ? resources : editableResources).map((res) => {
            const withSpecialUnitInfo = specialUnitCoreNames.includes(res.name);
            return (
              <ErrorBoundary key={res.name}>
                <Resource
                  resource={res}
                  {...forwardProps}
                  tracksQuota={tracksQuota(res)}
                  withSpecialUnitInfo={withSpecialUnitInfo}
                />
              </ErrorBoundary>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Category;
