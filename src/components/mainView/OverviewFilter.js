// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import BaseFilter from "./BaseFilter";
import { useSearchParams } from "react-router";
import { t } from "../../lib/utils";
import { SEARCH_TERM } from "./BaseFilter";

export const FILTER_TYPES = Object.freeze({
  category: { key: "category", label: "Category" },
  resource: { key: "resource", label: "Resource" },
});

export function matchName(term, name) {
  const nameLower = name.toLowerCase();
  const nameTranslated = t(name).toLowerCase();

  if (term.endsWith("$")) {
    const exactTerm = term.slice(0, -1);
    return nameLower === exactTerm || nameTranslated === exactTerm;
  }
  return nameLower.includes(term) || nameTranslated.includes(term);
}

const OverviewFilter = (props) => {
  const { categories, categoryFilters, resourceFilters, searchTerm, currentArea, overview, advancedView } = props;
  const [, setSearchParams] = useSearchParams();

  const selectedFilters = React.useMemo(() => {
    const filters = [];
    categoryFilters.forEach((value) => filters.push({ name: FILTER_TYPES.category.key, value }));
    resourceFilters.forEach((value) => filters.push({ name: FILTER_TYPES.resource.key, value }));
    return filters;
  }, [categoryFilters, resourceFilters]);

  const filterValues = React.useMemo(() => {
    const currentServices = overview.areas[currentArea];
    const currentCategories = currentServices.flatMap((serviceType) => overview.categories[serviceType]);
    const filteredCategoryNames = [];
    const filteredResourceNames = [];

    currentCategories.forEach((categoryName) => {
      const category = categories[categoryName];
      if (!category) return;

      const resources = category.resources;
      const visibleResources = advancedView ? resources : resources.filter((res) => res.editableResource === true);

      if (visibleResources.length > 0) {
        filteredCategoryNames.push(categoryName);
        visibleResources.forEach((res) => filteredResourceNames.push(res.name));
      }
    });

    return {
      [FILTER_TYPES.category.key]: filteredCategoryNames,
      [FILTER_TYPES.resource.key]: filteredResourceNames,
    };
  }, [categories, currentArea, overview, advancedView]);

  function handleFilterChange(filter) {
    const { name, value } = filter;
    if (name === SEARCH_TERM) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (value) {
          newParams.set(name, value);
        } else {
          newParams.delete(name);
        }
        return newParams;
      });
      return;
    }

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      const existingValues = newParams.get(name)?.split(",") || [];

      if (!existingValues.includes(value)) {
        existingValues.push(value);
        newParams.set(name, existingValues.join(","));
      }
      return newParams;
    });
  }

  function handleFilterDelete(filter) {
    const { name, value } = filter;
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      const existingValues = newParams.get(name)?.split(",") || [];
      const newValues = existingValues.filter((v) => v !== value);

      if (newValues.length > 0) {
        newParams.set(name, newValues.join(","));
      } else {
        newParams.delete(name);
      }
      return newParams;
    });
  }

  function handleClearAll() {
    setSearchParams({});
  }

  return (
    <BaseFilter
      filterTypes={FILTER_TYPES}
      filterValues={filterValues}
      searchTerm={searchTerm}
      selectedFilters={selectedFilters}
      onFilterChange={handleFilterChange}
      onDelete={handleFilterDelete}
      onClearAll={handleClearAll}
    />
  );
};

export default OverviewFilter;
