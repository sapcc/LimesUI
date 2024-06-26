import React from "react";
import { LoadingIndicator, Message, Box, Stack } from "juno-ui-components";
import { t } from "../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { parseApiData } from "./parseApiData";

const columnsPerRow = 3;
const categoryTitle = `
    text-lg 
    mb-4 
    font-bold 
    col-span-full 
    text-theme-hig
    `;
const categoryContent = `
    grid
    gap-4 
    grid-cols-${columnsPerRow}
    `;
const barTitle = `
    font-bold 
    text-theme-default
    self-start
    mb-2
`;

// structure of the UI:
// eu-de-1a | eu-de-1b | eu-de-1c
// flavors  | flavors  | flavors
// ------------------------------
// eu-de-1d |
// flavors  |
// ...

const AvailableBigVMResource = (props) => {
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

  const itemChunks = React.useMemo(() => {
    if (!placeableVMs) return [];
    const result = [];
    for (let i = 0; i < placeableVMs.length; i += columnsPerRow) {
      const availabilityZonesChunk = placeableVMs.slice(i, i + columnsPerRow);
      result.push(availabilityZonesChunk);
    }
    return result;
  }, [placeableVMs]);

  return (
    <div className="mb-4">
      <h1 className={`category-title ${categoryTitle}`}>
        {t(props.categoryName)}
      </h1>
      {isLoading ? (
        <LoadingIndicator className={`m-auto`} />
      ) : isError ? (
        <Message variant="error" text={error.toString()} />
      ) : placeableVMs.length === 0 ? (
        <Message variant="warning" text="No resources available." />
      ) : (
        data &&
        itemChunks.map((chunk, idx) => {
          return (
            <React.Fragment key={idx}>
              <div className={`category-content ${categoryContent}`}>
                {chunk.map((azData) => {
                  const azName = azData.availabilityZone;
                  return (
                    <div key={azName} className={`title ${barTitle}`}>
                      {azData.availabilityZone}
                    </div>
                  );
                })}
              </div>
              <div className={`category-content ${categoryContent}`}>
                {chunk.map((azData) => {
                  const azName = azData.availabilityZone;
                  const hasFlavors = azData.flavors.length > 0;
                  const headLine = hasFlavors
                    ? "VM deployment possible from these flavors:"
                    : "No resources available";
                  return (
                    <Box
                      key={azName}
                      className={`border-l-4 ${
                        hasFlavors
                          ? `border-l-theme-info`
                          : `border-l-theme-warning`
                      } text-bold
                      `}
                    >
                      <div className="font-bold mb-2">{headLine}</div>
                      {azData.flavors.map((flavor) => {
                        const flavorName = Object.keys(flavor)[0];
                        const availableFlavors = Object.values(flavor)[0];
                        return (
                          <Stack
                            key={flavorName}
                            direction="horizontal"
                            gap="1"
                          >
                            <span className="font-medium">{flavorName}</span>
                            <span className="text-xs">
                              ({availableFlavors} VMs available)
                            </span>
                          </Stack>
                        );
                      })}
                    </Box>
                  );
                })}
              </div>
            </React.Fragment>
          );
        })
      )}
    </div>
  );
};

export default AvailableBigVMResource;
