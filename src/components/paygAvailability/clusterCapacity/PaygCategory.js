import React from "react";
import { Grid, GridRow, GridColumn } from "juno-ui-components";
import { byUIString, t } from "../../../lib/utils";
import { categoryTitle } from "../stylescss";
import { globalStore } from "../../StoreProvider";
import { PAYG_AZUNAWARE_KEY } from "../../../lib/constants";
import PaygResource from "./PaygResource";

// Tailwind does not allow dynamic class insertion. F.E: col-span-${size}
// That's stupid, hence we might get 0-4 availability zones.
// Therefore we would need to check every single case and return the proper class.
// Example: Cols: 12; AZ's: 3; Required: col-span-3 (with title: col-span-2)
// Gladly the Juno Grid already did all those checks so I don't have to...
// Tailwind sucks.
const PaygCategory = (props) => {
  const { categoryName, category, areaAZs } = props;
  const { serviceType, resources } = category;
  const editableResources = resources.filter(
    (res) => res.editableResource === true
  );
  const { scope } = globalStore();

  function filterAvailabilityZones(availabilityZones) {
    // some AZs are hidden for regular users and only shown for cluster admins:
    // - "any": Temporary AZ to store unassigned quota
    // - "unknown": pseudo-AZ for capacity not assigned to an AZ (mostly during buildup)
    // - "tempest-test-...": dummy AZ created by Tempest
    // - "cp...": pseudo-AZ for control plane nodes without AZ association
    const validAvailabilityZones = scope.isCluster()
      ? availabilityZones.filter((az) => az != "any")
      : availabilityZones.filter(
          (az) => az != "unknown" && az != "any" && !/^tempest-|^cp/.test(az)
        );
    return validAvailabilityZones;
  }

  const validAvailabilityZones = React.useMemo(() => {
    // Q: We already have such a logic in the limes store to get the cluster data, why is something similar here?
    // A: The store logic views on area level (used to determine an evenly Grid span), this is on category level (used to display the correct AZ's).
    const availabilityZones = {};
    for (const resource of category.resources) {
      if (!resource?.per_az) continue;
      for (const azCapacity of resource.per_az) {
        availabilityZones[azCapacity[0]] = true;
      }
    }
    const azKeys = Object.keys(availabilityZones).sort();
    const validAvailabilityZones = filterAvailabilityZones(azKeys);

    // az-unaware resources receive a title.
    if (validAvailabilityZones.length == 0) {
      validAvailabilityZones.push(PAYG_AZUNAWARE_KEY);
    }

    return validAvailabilityZones;
  }, [category]);

  // We calculate with 12 Grid columns total.
  const titleWidth = 2;
  const azColumnWidth = Math.floor(
    10 / filterAvailabilityZones(areaAZs).length
  );
  const forwardProps = {
    validAvailabilityZones,
    titleWidth,
    azColumnWidth,
    scope,
  };

  return (
    <div className="mb-10">
      {editableResources.length > 0 && (
        <>
          <div className={categoryTitle}>{t(categoryName)}</div>
          <Grid>
            <GridRow>
              <GridColumn cols={titleWidth}>
                <div></div>
              </GridColumn>
              {validAvailabilityZones.map((az) => {
                return (
                  <GridColumn cols={azColumnWidth} key={az}>
                    <div className="font-bold mb-2">{az}</div>
                  </GridColumn>
                );
              })}
            </GridRow>
          </Grid>
        </>
      )}
      {editableResources.sort(byUIString).map((res) => {
        return <PaygResource key={res.name} resource={res} {...forwardProps} />;
      })}
    </div>
  );
};

export default PaygCategory;
