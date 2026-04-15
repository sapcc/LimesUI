// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import Category from "./Category";
import { useGlobalStore, useCreateCommitmentStore } from "../StoreProvider";
import useResetCommitment from "../../hooks/useResetCommitment";
import { useParams, useNavigate, useLocation, Outlet } from "react-router";
import { useSearchParams } from "react-router";
import { t, byUIString } from "../../lib/utils";
import { ADVANCEDVIEW, CEREBROKEY, COMMITMENTRENEWALKEY } from "../../lib/constants";
import PAYGOverview from "../paygAvailability/bigVM/PAYGOverview";
import RenewalManager from "../commitmentRenewal/RenewalManager";
import { Box, Button, Container, Tab, Tabs, TabList, TabPanel, Message } from "@cloudoperators/juno-ui-components";
import { getScrapeTime } from "../../lib/getScrapeTime";
import OverviewFilter, { FILTER_TYPES, matchName } from "./OverviewFilter";
import { SEARCH_TERM } from "./BaseFilter";

const Overview = (props) => {
  const { overview, categories, canEdit } = props;
  const scope = useGlobalStore((state) => state.scope);
  const isEditing = useCreateCommitmentStore((state) => state.isEditing);
  const navigate = useNavigate();
  const location = useLocation();
  const editableAreas = overview.editableAreas;
  const [advancedView, setAdvancedView] = React.useState(JSON.parse(localStorage.getItem(ADVANCEDVIEW)) || false);
  const { resetURLChangeState } = useResetCommitment();

  const allAreas = React.useMemo(
    () => (advancedView ? Object.keys(overview.areas) : editableAreas),
    [advancedView, editableAreas, overview.areas]
  );
  const { currentArea: selectedArea } = useParams();
  const currentArea = allAreas.includes(selectedArea) ? selectedArea : allAreas[0];
  const currentTabIdx = allAreas.indexOf(currentArea);

  // Filter
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get(SEARCH_TERM) || "";
  const categoryFilters = searchParams.get(FILTER_TYPES.category.key)?.split(",") || [];
  const resourceFilters = searchParams.get(FILTER_TYPES.resource.key)?.split(",") || [];
  const filteredCategories = React.useMemo(() => {
    if (categoryFilters.length === 0 && resourceFilters.length === 0 && !searchTerm) return categories;
    const term = searchTerm?.trim()?.toLocaleLowerCase()
    const filtered = {};
    Object.entries(categories).forEach(([categoryName, category]) => {
      if (categoryFilters.length > 0 && !categoryFilters.includes(categoryName)) return;
      let resources = category.resources;

      if (resourceFilters.length > 0) {
        resources = resources.filter((res) => resourceFilters.includes(res.name));
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

    return filtered;
  }, [categories, categoryFilters, resourceFilters, searchTerm]);

  // EditPanel State should reset if the user changes the URL.
  React.useEffect(() => {
    resetURLChangeState();
  }, [location.pathname]);

  // if the area from the URL is not in the list of available areas, navigate to the default one
  React.useEffect(() => {
    if (selectedArea !== currentArea) {
      navigate(`/${currentArea}`);
    }
  }, [selectedArea, currentArea]);

  // Hitting edit view URL without edit permissions should lead to the main route.
  React.useEffect(() => {
    if (canEdit || location.pathname === `/${currentArea}`) return;
    navigate(`/${currentArea}`);
  }, [location.pathname, currentArea, canEdit]);

  // navigate to the selected area while also resetting the resource filter
  function onTabChange(selectedArea) {
    navigate(`/${selectedArea}`);
  }

  function renderArea() {
    const currentServices = overview.areas[currentArea];

    if (!currentServices) {
      return <Box>Invalid Path.</Box>;
    }

    const ageDisplay = getScrapeTime(currentServices, props.overview);

    // check if there are any filtered resources for the current area
    const hasFilteredResources = currentServices.some((serviceType) =>
      overview.categories[serviceType].some((categoryName) => {
        const category = filteredCategories[categoryName];
        return category?.resources?.length > 0;
      })
    );

    if (!hasFilteredResources) {
      return (
        <>
          <Message data-testid="no-resources-found" className="my-4">
            No resources found.
          </Message>
          <div>Usage last updated {ageDisplay} ago.</div>
        </>
      );
    }

    return (
      <>
        {currentServices
          .sort(byUIString)
          .map((serviceType) =>
            overview.categories[serviceType].map((categoryName) => (
              <Category
                key={categoryName}
                categoryName={categoryName}
                serviceType={serviceType}
                category={filteredCategories[categoryName]}
                canEdit={props.canEdit}
                advancedView={advancedView}
              />
            ))
          )}
        <div>Usage last updated {ageDisplay} ago.</div>
      </>
    );
  }

  function renderPAYG() {
    const { areas } = props.overview;
    const allServices = [];
    Object.keys(areas).forEach((_, idx) => {
      allServices.push(...Object.values(areas)[idx]);
    });

    const ageDisplay = getScrapeTime(allServices, props.overview);
    return (
      <div>
        <PAYGOverview />
        <div>Usage last updated {ageDisplay} ago.</div>
      </div>
    );
  }

  function renderRenewal(canEdit) {
    return <RenewalManager canEdit={canEdit} />;
  }

  let currentTab;
  switch (currentArea) {
    case CEREBROKEY:
      currentTab = renderPAYG();
      break;
    case COMMITMENTRENEWALKEY:
      currentTab = renderRenewal(canEdit);
      break;
    default:
      currentTab = renderArea();
  }

  return (
    <Container px={false} className="mb-11">
      <Tabs selectedIndex={currentTabIdx} onSelect={() => {}}>
        <TabList>
          {allAreas.map((area) =>
            !scope.isProject() && area === COMMITMENTRENEWALKEY ? null : (
              <Tab key={area} disabled={isEditing} onClick={() => onTabChange(area)}>
                {t(area)}
              </Tab>
            )
          )}
          <div className="m-auto mr-0">
            <Button
              size="small"
              variant="primary"
              onClick={() => {
                localStorage.setItem(ADVANCEDVIEW, JSON.stringify(!advancedView));
                setAdvancedView(!advancedView);
              }}
              className={"w-24 self-center"}
            >
              {advancedView ? "Show less" : "Show more"}
            </Button>
          </div>
        </TabList>
        {allAreas.map((area) =>
          !scope.isProject() && area === COMMITMENTRENEWALKEY ? null : (
            <TabPanel key={area} className={"m-4"}></TabPanel>
          )
        )}
      </Tabs>
      {currentArea !== CEREBROKEY && currentArea !== COMMITMENTRENEWALKEY && (
        <OverviewFilter
          categories={categories}
          categoryFilters={categoryFilters}
          resourceFilters={resourceFilters}
          searchTerm={searchTerm}
          currentArea={currentArea}
          overview={overview}
          advancedView={advancedView}
        />
      )}
      {currentTab}
      {canEdit && <Outlet />}
    </Container>
  );
};

export default Overview;
