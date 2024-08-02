import React from "react";
import { Grid, GridRow, GridColumn, Box } from "juno-ui-components";
import { t } from "../../../lib/utils";
import PAYGResource from "./PAYGResource";

// PAYGResource is a mix of Limes and CEREBRO.
const PAYGLimebro = (props) => {
  const { resources, cerebro } = props;
  const { validAvailabilityZones, azColumnWidth } = props;

  function getMatchingCerebroResource(resource, azName) {
    const cerebroAZ = cerebro.find(
      (entity) => entity.availabilityZone == azName
    );
    // Identify the resource from cerebro.
    const matchingFlavor = cerebroAZ?.flavors.find(
      (flavor) => Object.keys(flavor)[0] == t(resource.name)
    );
    return matchingFlavor;
  }

  return (
    <Grid>
      <GridRow>
        {validAvailabilityZones.map((azName, idx) => {
          // Reject any resource AZ not matching the valid ones!
          if (!validAvailabilityZones.includes(azName)) return;
          return (
            <GridColumn key={azName} cols={azColumnWidth}>
              <Box className={`border-l-4`}>
                {resources.map((resource) => {
                  const az =
                    resource.per_az.find((az) => az[0] == azName) || {};
                  let matchingCerebroResource;
                  // Check for cerebro data being present.
                  if (cerebro.length > 0) {
                    matchingCerebroResource = getMatchingCerebroResource(
                      resource,
                      azName
                    );
                  }
                  return (
                    <PAYGResource
                      key={resource.name}
                      azIndex={idx}
                      resource={resource}
                      cerebro={matchingCerebroResource}
                      az={az}
                    />
                  );
                })}
              </Box>
            </GridColumn>
          );
        })}
      </GridRow>
    </Grid>
  );
};

export default PAYGLimebro;
