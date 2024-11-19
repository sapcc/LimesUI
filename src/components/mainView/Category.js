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
import { t, sortByLogicalOrderAndName, tracksQuota } from "../../lib/utils";
import Resource from "./Resource";

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
  const { categoryName, canEdit, advancedView } = props;
  const { area, resources } = props.category;
  const forwardProps = {
    categoryName,
    area,
    canEdit,
  };

  const editableResources = resources.filter((res) => res.editableResource === true);

  return (
    (editableResources.length > 0 || advancedView) && (
      <div className="category-container mb-4">
        <h1 className={`category-title ${categoryTitle}`}>{t(props.categoryName)}</h1>
        <div className={`category-content ${categoryContent}`}>
          {sortByLogicalOrderAndName(advancedView ? resources : editableResources).map((res) => {
            return <Resource key={res.name} resource={res} {...forwardProps} tracksQuota={tracksQuota(res)} />;
          })}
        </div>
      </div>
    )
  );
};

export default Category;
