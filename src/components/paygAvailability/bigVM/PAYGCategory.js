import React from "react";
import { Grid, GridRow, GridColumn } from "juno-ui-components";
import { byUIString, t } from "../../../lib/utils";
import { categoryTitle } from "../stylescss";
import { globalStore } from "../../StoreProvider";
import { PAYG_AZUNAWARE_KEY } from "../../../lib/constants";
import PAYGLimebro from "./PAYGLimebro";
import { isAZUnaware } from "../../../lib/utils";

// Tailwind does not allow dynamic class insertion. F.E: col-span-${size}
// That's stupid, hence we might get 0-4 availability zones.
// Therefore we would need to check every single case and return the proper class.
// Example: Cols: 12; AZ's: 3; Required: col-span-3 (with title: col-span-2)
// Gladly the Juno Grid already did all those checks so I don't have to...
// Tailwind sucks.
const PAYGCategory = (props) => {
  const { categoryName, cerebro, category, areaAZs } = props;
  const { resources } = category;
  const editableResources = resources.filter(
    (res) => res.editableResource === true
  );
  const { scope } = globalStore();

  // Disable Baremetal Flavors
  if (categoryName === "per_flavor_baremetal") return;

  function filterAvailabilityZones(availabilityZones) {
    // some AZs are hidden for regular users and only shown for cluster admins:
    // - "any": Temporary AZ to store unassigned quota
    // - "unknown": pseudo-AZ for capacity not assigned to an AZ (mostly during buildup)
    // - "tempest-test-...": dummy AZ created by Tempest
    // - "cp...": pseudo-AZ for control plane nodes without AZ association
    const validAvailabilityZones = availabilityZones.filter(
      (az) => az != "unknown" && az != "any" && !/^tempest-|^cp/.test(az)
    );
    return validAvailabilityZones;
  }

  const [validAvailabilityZones, hasMixedAZAwareness] = React.useMemo(() => {
    // Q: We already have such a logic in the limes store to get the cluster data, why is something similar here?
    // A: The store logic views on area level (used to determine an evenly Grid span), this is on category level (used to display the correct AZ's).
    const availabilityZones = {};
    let includesAZAware = false;
    let includesAZUnaware = false;
    for (const resource of editableResources) {
      if (!resource?.per_az) continue;
      resource.per_az.forEach((az) => {
        // Handle AzUnaware resources mixed with azAware:
        // Display the resource values for the unaware resource, but the az values for the others.
        if (!isAZUnaware(resource.per_az)) {
          includesAZAware = true;
        } else {
          includesAZUnaware = true;
        }
        availabilityZones[az[0]] = true;
      });
    }
    const hasMixedAZAwareness = includesAZAware && includesAZUnaware;

    const azKeys = Object.keys(availabilityZones).sort();
    const validAvailabilityZones = filterAvailabilityZones(azKeys);

    // az-unaware resources receive a title.
    if (validAvailabilityZones.length == 0) {
      validAvailabilityZones.push(PAYG_AZUNAWARE_KEY);
    }

    return [validAvailabilityZones, hasMixedAZAwareness];
  }, [categoryName]);
  const azColumnWidth = Math.floor(
    12 / filterAvailabilityZones(areaAZs).length
  );
  const forwardProps = {
    validAvailabilityZones,
    azColumnWidth,
  };

  return (
    <div className="mb-10">
      {editableResources.length > 0 && (
        <>
          <div className={categoryTitle}>{t(categoryName)}</div>
          <Grid>
            <GridRow>
              {validAvailabilityZones.map((az, idx) => {
                return (
                  <GridColumn cols={azColumnWidth} key={az}>
                    <div className="font-bold mb-2">
                      {hasMixedAZAwareness && idx == 0
                        ? PAYG_AZUNAWARE_KEY + " / " + az
                        : az}
                    </div>
                  </GridColumn>
                );
              })}
            </GridRow>
          </Grid>
          <PAYGLimebro
            resources={editableResources.sort(byUIString)}
            cerebro={cerebro}
            {...forwardProps}
          />
        </>
      )}
    </div>
  );
};

export default PAYGCategory;