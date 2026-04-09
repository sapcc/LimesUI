// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { HashRouter, Routes, Route } from "react-router";
import Overview from "./Overview";
import StoreProvider from "../StoreProvider";

const mockOverview = {
  editableAreas: ["area-1", "area-2"],
  areas: {
    "area-1": ["service-a"],
    "area-2": ["service-b"],
    "advanced-area": ["service-c"],
  },
  categories: {
    "service-a": ["category-x"],
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
};

const renderOverview = (initialLocation, canEdit = true, categories = mockCategories) => {
  window.location.hash = initialLocation;
  return render(
    <StoreProvider>
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

  test("resource search filter", async () => {
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

    // tab change resets the input and removes query parameter
    fireEvent.change(searchInput, { target: { value: "test-filter" } });
    expect(searchInput).toHaveValue("test-filter");
    await waitFor(() => {
      expect(window.location.hash).toContain("resourceFilter=test-filter");
    });

    const area2Tab = screen.getByText("area-2");
    fireEvent.click(area2Tab);

    await waitFor(() => {
      expect(screen.getByTestId("Search")).toHaveValue("");
      expect(window.location.hash).not.toContain("resourceFilter");
    });
  });
});
