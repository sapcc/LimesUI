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
import { Grid, GridRow, GridColumn, Box } from "@cloudoperators/juno-ui-components";
import { t } from "../../../lib/utils";
import PAYGResource from "./PAYGResource";

// PAYGResource is a mix of Limes and CEREBRO.
const PAYGLimebro = (props) => {
  const { resources, cerebro } = props;
  const { validAvailabilityZones, azColumnWidth } = props;

  function getMatchingCerebroResource(resource, azName) {
    const cerebroAZ = cerebro.find((entity) => entity.availabilityZone == azName);
    // Identify the resource from cerebro.
    const matchingFlavor = cerebroAZ?.flavors.find((flavor) => Object.keys(flavor)[0] == t(resource.name));
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
                  const az = resource.per_az.find((az) => az.name == azName) || {};
                  let matchingCerebroResource;
                  // Check for cerebro data being present.
                  if (cerebro.length > 0) {
                    matchingCerebroResource = getMatchingCerebroResource(resource, azName);
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
