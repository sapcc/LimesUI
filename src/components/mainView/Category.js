// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { t, sortByLogicalOrderAndName, tracksQuota } from "../../lib/utils";
import Resource from "./Resource";
import { createCommitmentStore } from "../StoreProvider";
import { ErrorBoundary } from "../../lib/ErrorBoundary";

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
  const { currentProject } = createCommitmentStore();
  const forwardProps = {
    area,
    canEdit,
    categoryName,
    project: currentProject,
    serviceType,
  };

  const editableResources = resources.filter((res) => res.editableResource === true);

  return (
    (editableResources.length > 0 || advancedView) && (
      <div className="category-container mb-4">
        <h1 className={`category-title ${categoryTitle}`}>{t(props.categoryName)}</h1>
        <div className={`category-content ${categoryContent}`}>
          {sortByLogicalOrderAndName(advancedView ? resources : editableResources).map((res) => {
            return (
              <ErrorBoundary key={res.name}>
                <Resource resource={res} {...forwardProps} tracksQuota={tracksQuota(res)} />
              </ErrorBoundary>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Category;
