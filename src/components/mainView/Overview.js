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
import Category from "./Category";
import { createCommitmentStore } from "../StoreProvider";
import useResetCommitment from "../../hooks/useResetCommitment";
import { useParams, useNavigate, useLocation, Outlet } from "react-router";
import { t, byUIString } from "../../lib/utils";
import { ADVANCEDVIEW, CEREBROKEY } from "../../lib/constants";
import PAYGOverview from "../paygAvailability/bigVM/PAYGOverview";
import { Tabs, Tab, TabList, TabPanel, Container, Button, Box } from "@cloudoperators/juno-ui-components";
import { getScrapeTime } from "../../lib/getScrapeTime";

const Overview = (props) => {
  const { canEdit } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const editableAreas = props.overview.editableAreas;
  const { isEditing } = createCommitmentStore();
  const [advancedView, setAdvancedView] = React.useState(JSON.parse(localStorage.getItem(ADVANCEDVIEW)) || false);
  const allAreas = advancedView ? Object.keys(props.overview.areas) : editableAreas;
  const { currentArea = allAreas[0] } = useParams();
  const [currentTabIdx, setCurrentTabIdx] = React.useState(0);
  const { resetURLChangeState } = useResetCommitment();

  // EditPanel State should reset if the user changes the URL.
  React.useEffect(() => {
    resetURLChangeState();
  }, [location.pathname]);

  // Hitting edit view URL without edit permissions should lead to the main route.
  React.useEffect(() => {
    if (canEdit || location.pathname == `/${currentArea}`) return;
    navigate(`/${currentArea}`);
  }, [currentArea]);

  // Hitting backspace on the UI leads to the previous selected tab.
  React.useEffect(() => {
    setCurrentTabIdx(allAreas.findIndex((area) => area === currentArea));
  }, [currentArea]);

  // Hide tabs that should not be displayed in reduced resource view.
  function onTabChange(currentArea) {
    const areaIdx = allAreas.findIndex((area) => area === currentArea);
    if (areaIdx < 0) {
      setCurrentTabIdx(0);
      navigate(`/${allAreas[0]}`);
      return;
    }
    setCurrentTabIdx(areaIdx);
    navigate(`/${allAreas[areaIdx]}`);
  }

  // On custom tab, directly route to it.
  React.useEffect(() => {
    if (currentArea == CEREBROKEY) {
      const tabIdx = allAreas.length - 1;
      setCurrentTabIdx(tabIdx);
      navigate(`/${allAreas[tabIdx]}`);
      return;
    }
  }, [advancedView]);

  // Consider advanced view button click
  React.useEffect(() => {
    // Do not reroute on any other subroute. Matches: ("/", "/route", "/route/")
    // This would cause the refresh of the EditPanel to be rerouted to the main route.
    const exp = new RegExp("^/[a-zA-Z0-9]*/?$").exec(location.pathname);
    if (!exp) return;
    onTabChange(currentArea);
  }, [advancedView]);

  function renderArea() {
    const { areas, categories } = props.overview;
    const currentServices = areas[currentArea];

    if (!currentServices) {
      return <Box>Invalid Path.</Box>;
    }

    const ageDisplay = getScrapeTime(currentServices, props.overview);

    return (
      <>
        {currentServices
          .sort(byUIString)
          .map((serviceType) =>
            categories[serviceType].map((categoryName) => (
              <Category
                key={categoryName}
                categoryName={categoryName}
                category={props.categories[categoryName]}
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

  let currentTab;
  switch (currentArea) {
    case CEREBROKEY:
      currentTab = renderPAYG();
      break;
    default:
      currentTab = renderArea();
  }

  return (
    <Container px={false} className="mb-11">
      <Tabs selectedIndex={currentTabIdx} onSelect={() => {}}>
        <TabList>
          {allAreas.map((area) => (
            <Tab disabled={isEditing} onClick={() => onTabChange(area)} key={area}>
              {t(area)}
            </Tab>
          ))}
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

        {allAreas.map((area) => (
          <TabPanel key={area} className={"m-4"}></TabPanel>
        ))}
      </Tabs>
      {currentTab}
      {canEdit && <Outlet />}
    </Container>
  );
};

export default Overview;
