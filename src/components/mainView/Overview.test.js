// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HashRouter, Routes, Route } from "react-router";
import Overview from "./Overview";
import StoreProvider from "../StoreProvider";
import { PortalProvider } from "@cloudoperators/juno-ui-components/index";
import { SEARCH_TERM } from "./BaseFilter";

const mockOverview = {
  editableAreas: ["area-1", "area-2"],
  areas: {
    "area-1": ["service-a"],
    "area-2": ["service-b"],
    "advanced-area": ["service-c"],
  },
  categories: {
    "service-a": ["category-x", "category-y", "category-z"],
    "service-b": ["category-y"],
    "service-c": ["category-z"],
  },
  scrapedAt: 12345,
  minScrapedAt: {
    "service-a": 12345,
    "service-b": 12345,
    "service-c": 12345,
  },
  maxScrapedAt: {
    "service-a": 12345,
    "service-b": 12345,
    "service-c": 12345,
  },
};

const mockCategories = {
  "category-x": { resources: [] },
  "category-y": { resources: [] },
  "category-z": { resources: [] },
};

const mockCategoriesWithResources = {
  "category-x": {
    resources: [
      { name: "cores", editableResource: true, quota: 10 },
      { name: "ram", editableResource: true, quota: 1024 },
    ],
  },
  "category-y": {
    resources: [{ name: "cores2", editableResource: true, quota: 20 }],
  },
  "category-z": {
    resources: [{ name: "other", editableResource: true, quota: 30 }],
  },
};

const renderOverview = (initialLocation, canEdit = true, categories = mockCategories) => {
  window.location.hash = initialLocation;
  return render(
    <StoreProvider>
      <PortalProvider>
        <HashRouter>
          <Routes>
            <Route
              path="/:currentArea?"
              element={<Overview overview={mockOverview} categories={categories} canEdit={canEdit} />}
            />
            <Route
              path="/:currentArea/*"
              element={<Overview overview={mockOverview} categories={categories} canEdit={canEdit} />}
            />
          </Routes>
        </HashRouter>
      </PortalProvider>
    </StoreProvider>
  );
};

describe("Overview", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders the default view with the first area selected", () => {
    renderOverview("/");
    expect(screen.getByText("area-1")).toBeInTheDocument();
    expect(screen.getByText("area-2")).toBeInTheDocument();
    expect(screen.queryByText("advanced-area")).not.toBeInTheDocument();

    expect(screen.getByText("area-1")).toHaveAttribute("aria-selected", "true");
  });

  test("navigates to the correct area when a tab is clicked", () => {
    renderOverview("/area-1");
    const area2Tab = screen.getByText("area-2");
    fireEvent.click(area2Tab);
    expect(screen.getByText("area-2")).toHaveAttribute("aria-selected", "true");
  });

  test('clicking "Show more" reveals advanced tabs', () => {
    renderOverview("/");
    expect(screen.queryByText("advanced-area")).not.toBeInTheDocument();

    const showMoreButton = screen.getByText("Show more");
    fireEvent.click(showMoreButton);
    expect(screen.getByText("advanced-area")).toBeInTheDocument();
    expect(screen.getByText("Show less")).toBeInTheDocument();

    const showLessButton = screen.getByText("Show less");
    fireEvent.click(showLessButton);
    expect(screen.queryByText("advanced-area")).not.toBeInTheDocument();
  });

  test("falls back to the first area if the current URL area is not visible after toggling view", () => {
    localStorage.setItem("advancedView", "true");
    renderOverview("/advanced-area");
    expect(screen.getByText("advanced-area")).toHaveAttribute("aria-selected", "true");

    const showLessButton = screen.getByText("Show less");
    fireEvent.click(showLessButton);

    expect(screen.getByText("area-1")).toHaveAttribute("aria-selected", "true");
    expect(screen.queryByText("Advanced Area")).not.toBeInTheDocument();
  });

  test("redirects to the default area if the URL contains an invalid area", () => {
    renderOverview(["/invalid-area"]);
    expect(screen.getByText("area-1")).toHaveAttribute("aria-selected", "true");
  });

  test("calling the panel URL with no edit permissions reroutes to the default route", async () => {
    renderOverview("/area-1/edit/some/stuff", false);
    await waitFor(() => {
      expect(window.location.hash).toEqual("#/area-1");
    });
  });

  test("resource search term filter", async () => {
    renderOverview("/area-1", true, mockCategoriesWithResources);

    // all resources are initially visible
    expect(screen.getByText("Cores")).toBeInTheDocument();
    expect(screen.getByText("RAM")).toBeInTheDocument();

    // fill input field, only matching resources show up
    const searchInput = screen.getByTestId("Search");
    fireEvent.change(searchInput, { target: { value: "cores" } });
    expect(searchInput).toHaveValue("cores");

    await waitFor(() => {
      expect(screen.getByText("Cores")).toBeInTheDocument();
      expect(screen.queryByText("RAM")).not.toBeInTheDocument();
    });

    // clear input field, all resources show again
    fireEvent.change(searchInput, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.getByText("Cores")).toBeInTheDocument();
      expect(screen.getByText("RAM")).toBeInTheDocument();
    });

    // no resources match the filter
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });
    await waitFor(() => {
      expect(screen.queryByText("Cores")).not.toBeInTheDocument();
      expect(screen.queryByText("RAM")).not.toBeInTheDocument();
      expect(screen.getByTestId("no-resources-found")).toBeInTheDocument();
    });

    // filter <category> should show all resources of the matching category
    fireEvent.change(searchInput, { target: { value: "category-x" } });
    await waitFor(() => {
      expect(screen.getByText("category-x")).toBeInTheDocument();
      expect(screen.getByText("Cores")).toBeInTheDocument();
      expect(screen.getByText("RAM")).toBeInTheDocument();
      expect(screen.queryByText("category-y")).not.toBeInTheDocument();
      expect(screen.queryByText("category-z")).not.toBeInTheDocument();
    });

    // tab change resets the input and removes query parameter
    fireEvent.change(searchInput, { target: { value: "test-filter" } });
    expect(searchInput).toHaveValue("test-filter");
    await waitFor(() => {
      expect(window.location.hash).toContain(`${SEARCH_TERM}=test-filter`);
    });

    const area2Tab = screen.getByText("area-2");
    fireEvent.click(area2Tab);

    await waitFor(() => {
      expect(screen.getByTestId("Search")).toHaveValue("");
      expect(window.location.hash).not.toContain(SEARCH_TERM);
    });
  });
  test("resource filter options", async () => {
    const user = userEvent.setup();
    renderOverview("/area-1", true, mockCategoriesWithResources);

    // all resources are initially visible
    expect(screen.getByText("Cores")).toBeInTheDocument();
    expect(screen.getByText("RAM")).toBeInTheDocument();

    const filterSelect = screen.getByTestId("filter-select");
    const filterBox = screen.getByTestId("filter-box");
    expect(filterBox).toHaveAttribute("data-disabled");

    // category and resource filter
    await user.click(filterSelect);
    const capacityOpt = screen.getByTestId("select-Category");

    await user.click(capacityOpt);
    await waitFor(() => {
      expect(filterBox).not.toHaveAttribute("data-disabled");
    });

    // select category-x
    const comboboxToggle = filterBox.getElementsByClassName("juno-combobox-toggle")[0];
    await user.click(comboboxToggle);

    await waitFor(() => {
      expect(screen.getByTestId("box-category-x")).toBeInTheDocument();
    });

    await user.click(screen.getByTestId("box-category-x"));

    await waitFor(() => {
      expect(screen.getByTestId("category:category-x")).toBeInTheDocument();
    });

    // select category-y
    await user.click(comboboxToggle);

    await waitFor(() => {
      expect(screen.getByTestId("box-category-y")).toBeInTheDocument();
    });

    await user.click(screen.getByTestId("box-category-y"));

    await waitFor(() => {
      expect(screen.getByTestId("category:category-x")).toBeInTheDocument();
      expect(screen.getByTestId("category:category-y")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryAllByText("category-x")).toHaveLength(2);
      expect(screen.queryAllByText("category-y")).toHaveLength(2);
      expect(screen.queryByText("category-z")).not.toBeInTheDocument();
    });

    // searching a specific resource narrows down the selected filter results
    const searchInput = screen.getByTestId("Search");
    fireEvent.change(searchInput, { target: { value: "cores$" } });

    await waitFor(() => {
      expect(screen.queryAllByText("category-x")).toHaveLength(2);
      expect(screen.queryAllByText("category-y")).toHaveLength(1);
      expect(screen.queryByText("category-z")).not.toBeInTheDocument();
    });

    fireEvent.change(searchInput, { target: { value: "" } });

    // selecting the same resource per filter does not change the result
    await user.click(filterSelect);
    const resourceOpt = screen.getByTestId("select-Resource");
    await user.click(resourceOpt);

    await user.click(comboboxToggle);
    await user.click(screen.getByTestId("box-cores"));
    await waitFor(() => {
      expect(screen.getByTestId("resource:cores")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryAllByText("category-x")).toHaveLength(2);
      expect(screen.queryAllByText("category-y")).toHaveLength(1);
      expect(screen.queryByText("category-z")).not.toBeInTheDocument();
    });

    // verify URL contains filter parameters
    await waitFor(() => {
      expect(window.location.hash).toContain("category=category-x");
      expect(window.location.hash).toContain("category-y");
      expect(window.location.hash).toContain("resource=cores");
    });

    // clear all button resets filter values and URL parameters
    const clearAllButton = screen.getByTestId("filter-clear");
    await user.click(clearAllButton);

    await waitFor(() => {
      expect(screen.queryByTestId("category:category-x")).not.toBeInTheDocument();
      expect(screen.queryByTestId("category:category-y")).not.toBeInTheDocument();
      expect(screen.queryByTestId("resource:cores")).not.toBeInTheDocument();
      expect(window.location.hash).not.toContain("category=");
      expect(window.location.hash).not.toContain("resource=");
    });

    // re-add filters to test tab change reset
    await user.click(filterSelect);
    await user.click(screen.getByTestId("select-Category"));
    await user.click(comboboxToggle);
    await user.click(screen.getByTestId("box-category-x"));

    await waitFor(() => {
      expect(screen.getByTestId("category:category-x")).toBeInTheDocument();
      expect(window.location.hash).toContain("category=category-x");
    });

    // tab change resets filter values and URL parameters
    const area2Tab = screen.getByText("area-2");
    await user.click(area2Tab);

    await waitFor(() => {
      expect(screen.queryByTestId("category:category-x")).not.toBeInTheDocument();
      expect(window.location.hash).not.toContain("category=");
      expect(window.location.hash).not.toContain("resource=");
    });
  });
});
