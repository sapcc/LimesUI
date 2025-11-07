// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { clusterStore } from "../../StoreProvider";
import { Message, LoadingIndicator } from "@cloudoperators/juno-ui-components";
import { byUIString, byNameIn } from "../../../lib/utils";
import PAYGCategory from "./PAYGCategory";
import { useQuery } from "@tanstack/react-query";
import { parseApiData } from "./parseApiData";
import { getCerebroTime } from "../../../lib/getScrapeTime";

const PAYGOverview = () => {
  const { clusterData } = clusterStore();
  if (!clusterData) {
    return <Message>Unable to retrieve cluster data</Message>;
  }
  const { areas, categories } = clusterData.overview;
  // Get CEREBRO data. It will be merged with the Limes data to get a better estimate about availability.
  const cerebroQueryResult = useQuery({
    queryKey: ["cerebro"],
    retry: false,
  });
  const { data, isError, error, isLoading } = cerebroQueryResult;
  const [placeableVMs, setPlaceableVMs] = React.useState([]);
  const [ageDisplay, setAgeDisplay] = React.useState(null);

  React.useEffect(() => {
    if (!data) return;
    const parsedData = parseApiData(data);
    setPlaceableVMs(parsedData);
  }, [data]);

  React.useEffect(() => {
    if (placeableVMs.length == 0) return;
    let timeStamps = [];
    placeableVMs.forEach((placeable) => {
      timeStamps.push(placeable.scrapeTime);
    });

    const cerebroScrapeAge = getCerebroTime(timeStamps);
    setAgeDisplay(cerebroScrapeAge);
  }, [placeableVMs]);

  function sortAreas(areas) {
    return areas.sort(byUIString);
  }

  function sortCategories(serviceType) {
    return categories[serviceType]?.sort(byNameIn(serviceType));
  }

  function dismantleError(error) {
    try {
      return JSON.parse(error.message).error;
    } catch {
      return error.toString();
    }
  }

  return (
    <>
      {isError && <Message className="mb-2" variant="warning" text={dismantleError(error)} />}
      {placeableVMs.length > 0 && (
        <Message className="mb-4 font-medium" variant="info">
          <div>
            HANA resources estimated with Cerebro share their available capacity with others in the same category.
          </div>
          <div>Creating a HANA VM of one flavor might reduce the availability of the others.</div>
        </Message>
      )}
      {isLoading && <LoadingIndicator className={`m-auto`} />}
      {sortAreas(Object.keys(areas)).map((area) =>
        sortAreas(areas[area]).map((serviceType) =>
          sortCategories(serviceType)?.map((categoryName) => {
            return (
              <PAYGCategory
                key={categoryName}
                category={clusterData.categories[categoryName]}
                categoryName={categoryName}
                cerebro={placeableVMs}
                areaAZs={Object.keys(clusterData.availabilityZones).sort()}
              />
            );
          })
        )
      )}
      {ageDisplay && <div>Cerebro last updated {ageDisplay} ago.</div>}
    </>
  );
};

export default PAYGOverview;
