import React from "react";
import moment from "moment";
import Category from "./Category";
import { createCommitmentStore } from "../StoreProvider";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { t, byUIString } from "../../lib/utils";
import { ADVANCEDVIEW } from "../../lib/constants";
import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
  Container,
  Button,
  Box,
} from "juno-ui-components";

const Overview = (props) => {
  const navigate = useNavigate();
  const { currentArea = allAreas[0] } = useParams();
  const editableAreas = props.overview.editableAreas;
  const { isEditing } = createCommitmentStore();
  const [currentTabIdx, setCurrentTabIdx] = React.useState(0);
  const [advancedView, setAdvancedView] = React.useState(
    JSON.parse(localStorage.getItem(ADVANCEDVIEW)) || false
  );
  const allAreas = advancedView
    ? Object.keys(props.overview.areas)
    : editableAreas;

  // Hide tabs that should not be displayed in reduced resource view.
  function onTabChange(currentArea) {
    const areaIdx = allAreas.findIndex((area) => area === currentArea);
    if (areaIdx > 0) {
      setCurrentTabIdx(areaIdx);
      navigate(`/${allAreas[areaIdx]}`);
      return;
    }
    setCurrentTabIdx(0);
    navigate(`/${allAreas[0]}`);
  }

  // Consider advanced view button click
  React.useEffect(() => {
    onTabChange(currentArea);
  }, [advancedView]);

  function renderArea() {
    const { areas, categories, scrapedAt, minScrapedAt, maxScrapedAt } =
      props.overview;
    const currentServices = areas[currentArea];

    if (!currentServices) {
      return <Box>Invalid Path.</Box>;
    }

    const currMinScrapedAt = currentServices
      .map((serviceType) => minScrapedAt[serviceType])
      .filter((x) => x !== undefined);
    const currMaxScrapedAt = currentServices
      .map((serviceType) => maxScrapedAt[serviceType])
      .filter((x) => x !== undefined);
    const currScrapedAt = currentServices
      .map((serviceType) => scrapedAt[serviceType])
      .filter((x) => x !== undefined);
    const minScrapedStr = moment
      .unix(Math.min(...currMinScrapedAt, ...currScrapedAt))
      .fromNow(true);
    const maxScrapedStr = moment
      .unix(Math.max(...currMaxScrapedAt, ...currScrapedAt))
      .fromNow(true);
    const ageDisplay =
      minScrapedStr == maxScrapedStr
        ? minScrapedStr
        : `between ${minScrapedStr} and ${maxScrapedStr}`;

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

  return (
    <Container px={false} className="mb-11">
      <Tabs selectedIndex={currentTabIdx} onSelect={() => {}}>
        <TabList>
          {allAreas.map((area) => (
            <Tab
              disabled={isEditing}
              onClick={() => onTabChange(area)}
              key={area}
            >
              {t(area)}
            </Tab>
          ))}
          <div className="m-auto mr-0">
            <Button
              size="small"
              variant="primary"
              onClick={() => {
                localStorage.setItem(
                  ADVANCEDVIEW,
                  JSON.stringify(!advancedView)
                );
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
      {renderArea()}
      <Outlet />
    </Container>
  );
};

export default Overview;
