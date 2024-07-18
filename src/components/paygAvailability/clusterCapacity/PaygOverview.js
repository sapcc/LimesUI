import React from "react";
import { clusterStore } from "../../StoreProvider";
import { Message } from "juno-ui-components";
import { byUIString, byNameIn } from "../../../lib/utils";
import PaygCategory from "./PaygCategory";

const PaygOverview = () => {
  const { clusterData } = clusterStore();
  if (!clusterData) {
    return <Message>Unable to retrieve cluster data</Message>;
  }
  const { areas, categories } = clusterData.overview;

  function sortAreas(areas) {
    return areas.sort(byUIString);
  }

  function sortCategories(serviceType) {
    return categories[serviceType]?.sort(byNameIn(serviceType));
  }

  return (
    <>
      {sortAreas(Object.keys(areas)).map((area) =>
        sortAreas(areas[area]).map((serviceType) =>
          sortCategories(serviceType)?.map((categoryName) => {
            return (
              <PaygCategory
                key={categoryName}
                category={clusterData.categories[categoryName]}
                categoryName={categoryName}
                areaAZs={Object.keys(
                  clusterData.availabilityZones
                ).sort()}
              />
            );
          })
        )
      )}
    </>
  );
};

export default PaygOverview;
