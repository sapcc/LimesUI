// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import Filter from "./Filter";
import { useSearchParams } from "react-router";
import { t } from "../../lib/utils";

const OverviewFilter = (props) => {
  const { categories, setFilteredCategories } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("searchTerm") || "";
  const categoryFilterRaw = searchParams.get("category") || "";
  const resourceFilterRaw = searchParams.get("resource") || "";

  const categoryFilters = categoryFilterRaw ? categoryFilterRaw.split(",") : [];
  const resourceFilters = resourceFilterRaw ? resourceFilterRaw.split(",") : [];

  const selectedFilters = React.useMemo(() => {
    const filters = [];
    categoryFilters.forEach((value) => filters.push({ name: "category", value }));
    resourceFilters.forEach((value) => filters.push({ name: "resource", value }));
    return filters;
  }, [categoryFilterRaw, resourceFilterRaw]);

  const filterOptions = React.useMemo(() => {
    const categoryNames = Object.keys(categories);
    const resourceNames = Object.values(categories).flatMap((cat) => (cat.resources || []).map((r) => r.name));
    return {
      category: [...new Set(categoryNames)],
      resource: [...new Set(resourceNames)],
    };
  }, [categories]);

  React.useEffect(() => {
    const filtered = {};

    Object.entries(categories).forEach(([categoryName, category]) => {
      if (categoryFilters.length > 0 && !categoryFilters.includes(categoryName)) return;

      let resources = category.resources || [];

      if (resourceFilters.length > 0) {
        resources = resources.filter((r) => resourceFilters.includes(r.name));
      }

      if (searchTerm) {
        const term = searchTerm.trim().toLowerCase();
        const categoryMatches = matchName(term, categoryName);
        const matchingResources = resources.filter((r) => matchName(term, r.name));

        if (matchingResources.length > 0) {
          resources = matchingResources;
        } else if (categoryMatches) {
        } else {
          return;
        }
      }

      if (resources.length > 0) {
        filtered[categoryName] = { ...category, resources };
      }
    });

    setFilteredCategories(filtered);
  }, [categories, categoryFilterRaw, resourceFilterRaw, searchTerm, setFilteredCategories]);

  function matchName(term, name) {
    const nameLower = name.toLowerCase();
    const nameTranslated = t(name).toLowerCase();

    if (term.endsWith("$")) {
      const exactTerm = term.slice(0, -1);
      return nameLower === exactTerm || nameTranslated === exactTerm;
    }
    return nameLower.includes(term) || nameTranslated.includes(term);
  }

  function handleFilterChange(filter) {
    const { name, value } = filter;
    if (name === "searchTerm") {
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
      const existing = newParams.get(name) || "";
      const existingValues = existing ? existing.split(",") : [];

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
      const existing = newParams.get(name) || "";
      const existingValues = existing ? existing.split(",") : [];
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
    <Filter
      searchTerm={searchTerm}
      filterOptions={filterOptions}
      selectedFilters={selectedFilters}
      onChange={handleFilterChange}
      onDelete={handleFilterDelete}
      onClearAll={handleClearAll}
    />
  );
};

export default OverviewFilter;
