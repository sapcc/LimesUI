// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import Category from "./Category";
import { useGlobalStore, useCreateCommitmentStore } from "../StoreProvider";
import useResetCommitment from "../../hooks/useResetCommitment";
import { useParams, useNavigate, useLocation, Outlet } from "react-router";
import { t, byUIString } from "../../lib/utils";
import { ADVANCEDVIEW, CEREBROKEY, COMMITMENTRENEWALKEY } from "../../lib/constants";
import PAYGOverview from "../paygAvailability/bigVM/PAYGOverview";
import RenewalManager from "../commitmentRenewal/RenewalManager";
import { Tabs, Tab, TabList, TabPanel, Container, Button, Box } from "@cloudoperators/juno-ui-components";
import { getScrapeTime } from "../../lib/getScrapeTime";

const Overview = (props) => {
  const { overview, canEdit } = props;
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

  // navigate to the selected area
  function onTabChange(selectedArea) {
    navigate(`/${selectedArea}`);
  }

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
                serviceType={serviceType}
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
      {currentTab}
      {canEdit && <Outlet />}
    </Container>
  );
};

export default Overview;
