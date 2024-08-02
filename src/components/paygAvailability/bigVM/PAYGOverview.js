import React from "react";
import { clusterStore } from "../../StoreProvider";
import { Message, LoadingIndicator } from "juno-ui-components";
import { byUIString, byNameIn } from "../../../lib/utils";
import PAYGCategory from "./PAYGCategory";
import { useQuery } from "@tanstack/react-query";
import { parseApiData } from "./parseApiData";

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

  React.useEffect(() => {
    if (!data) return;
    const parsedData = parseApiData(data);
    setPlaceableVMs(parsedData);
  }, [data]);

  function sortAreas(areas) {
    return areas.sort(byUIString);
  }

  function sortCategories(serviceType) {
    return categories[serviceType]?.sort(byNameIn(serviceType));
  }

  return (
    <>
      {isError && (
        <Message
          className="mb-2"
          variant="warning"
          text={error.toString()}
        />
      )}
      {isLoading ? (
        <LoadingIndicator className={`m-auto`} />
      ) : (
        sortAreas(Object.keys(areas)).map((area) =>
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
        )
      )}
    </>
  );
};

export default PAYGOverview;
