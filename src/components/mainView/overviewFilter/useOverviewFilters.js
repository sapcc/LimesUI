// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { useSearchParams } from "react-router";
import { byUIString } from "../../../lib/utils";
import { SEARCH_TERM } from "./BaseFilter";
import { FILTER_TYPES } from "./OverviewFilter";
import { t } from "../../../lib/utils";

function matchName(term, name) {
  const regexp = new RegExp(term, "i");
  const nameTranslated = t(name);

  return regexp.exec(name) || regexp.exec(nameTranslated);
}
// Filter categories based on search parameters
const useOverviewFilters = (props) => {
  const { overview, categories, currentArea } = props;
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get(SEARCH_TERM) || "";
  const categoryFilterParams = searchParams.get(FILTER_TYPES.category.key);
  const resourceFilterParams = searchParams.get(FILTER_TYPES.resource.key);

  // Memos prevent a recalculation of filteredCategories if Overview rerenders.
  const categoryFilters = React.useMemo(
    () => new Set(categoryFilterParams?.split(",").filter(Boolean) || []),
    [categoryFilterParams]
  );
  const resourceFilters = React.useMemo(
    () => new Set(resourceFilterParams?.split(",").filter(Boolean) || []),
    [resourceFilterParams]
  );

  const getCategoriesForArea = React.useCallback(
    (categories) => {
      const currentServices = overview.areas[currentArea];
      return Object.fromEntries(
        currentServices
          .sort(byUIString)
          .flatMap(
            (serviceType) =>
              overview.categories[serviceType]?.map((categoryName) => [categoryName, categories[categoryName]]) || []
          )
      );
    },
    [overview, currentArea]
  );

  const { categoriesForArea, filteredCategories } = React.useMemo(() => {
    const categoriesForArea = getCategoriesForArea(categories);

    if (categoryFilters.size === 0 && resourceFilters.size === 0 && !searchTerm) {
      return { categoriesForArea, filteredCategories: categoriesForArea };
    }

    const term = searchTerm?.trim()?.toLocaleLowerCase();
    const filtered = {};
    Object.entries(categoriesForArea).forEach(([categoryName, category]) => {
      if (categoryFilters.size > 0 && !categoryFilters.has(categoryName)) return;
      let resources = category.resources;

      if (resourceFilters.size > 0) {
        resources = resources.filter((res) => resourceFilters.has(res.name));
      }

      if (term) {
        const categoryMatches = matchName(term, categoryName);
        const matchingResources = resources.filter((r) => matchName(term, r.name));

        if (matchingResources.length > 0) {
          resources = matchingResources;
        } else if (!categoryMatches) {
          return;
        }
      }

      if (resources.length > 0) {
        filtered[categoryName] = { ...category, resources };
      }
    });

    return { categoriesForArea, filteredCategories: filtered };
  }, [categories, currentArea, categoryFilters, resourceFilters, searchTerm, getCategoriesForArea]);

  return { categoriesForArea, filteredCategories, categoryFilters, resourceFilters, searchTerm };
};

export default useOverviewFilters;
