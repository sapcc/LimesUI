import React from "react";
import moment from "moment";
import Category from "./Category";
import { createCommitmentStore } from "./StoreProvider";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { t, byUIString } from "../lib/utils";
import { ADVANCEDVIEW } from "../lib/constants";
import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
  Container,
  Button,
  Stack,
} from "juno-ui-components";

const Overview = (props) => {
  const allAreas = Object.keys(props.overview.areas);
  const { isEditing } = createCommitmentStore();
  const { currentArea = allAreas[0] } = useParams();
  const navigate = useNavigate();
  const currentTabIdx = allAreas.findIndex((area) => area === currentArea);
  const [advancedView, setAdvancedView] = React.useState(
    JSON.parse(localStorage.getItem(ADVANCEDVIEW)) || false
  );

  function renderArea() {
    const { areas, categories, scrapedAt, minScrapedAt, maxScrapedAt } =
      props.overview;
    const currentServices = areas[currentArea];

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
          .map((serviceType, idx) =>
            categories[serviceType].map((categoryName, index) => (
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
              onClick={() => navigate(`/${area}`)}
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
