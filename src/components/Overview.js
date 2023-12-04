import React from "react";
import moment from "moment";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import Category from "./Category";
import { t, byUIString } from "../lib/utils";
import { Tabs, Tab, TabList, TabPanel, Container } from "juno-ui-components";

const Overview = (props) => {
  const [allAreas, setAllAreas] = React.useState(
    Object.keys(props.overview.areas)
  );
  const { currentArea = allAreas[0] } = useParams();
  const navigate = useNavigate();
  const currentTabIdx = allAreas.findIndex((area) => area === currentArea);

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
          .map((serviceType) =>
            categories[serviceType].map((categoryName) => (
              <Category
                key={categoryName}
                categoryName={categoryName}
                category={props.categories[categoryName]}
                canEdit={props.canEdit}
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
            <Tab onClick={() => navigate(`/${area}`)} key={area}>
              {t(area)}
            </Tab>
          ))}
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
