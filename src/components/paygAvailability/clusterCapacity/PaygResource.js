import React from "react";
import { t, tracksQuota } from "../../../lib/utils";
import {
  Grid,
  GridRow,
  GridColumn,
  Icon,
  Stack,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "juno-ui-components";
import ResourceBarBuilder from "../../resourceBar/ResourceBarBuilder";
import { isAZUnaware } from "../../../lib/utils";

const resourceTitle = `text-sm text-right font-medium`;

function renderBar(resource, usage, capacity) {
  const { name, unit } = resource;
  return (
    <ResourceBarBuilder
      key={name}
      unit={unit}
      usage={usage}
      isAZ={true}
      quota={capacity}
      tracksQuota={tracksQuota(resource)}
      editableResource={true}
      equallySized={true}
      paygView={true}
    />
  );
}

function renderBarFromAZ(resource, azName) {
  const az = resource.per_az.find((az) => az[0] == azName) || {};
  const azValues = az[1];
  // Because we show capacity to users, we hide our commitments.
  // We treat them as usage and add uncommitted usage on top.
  const totalUsage = az?.commitmentSum + azValues?.uncommitted_usage || 0;
  const capacity = azValues?.capacity || 0;
  return renderBar(resource, totalUsage, capacity);
}

function renderBarFromResource(resource) {
  const totalUsage = resource.totalCommitments + resource.usagePerQuota;
  const capacity = resource.capacity;
  return renderBar(resource, totalUsage, capacity);
}

// TODO: We are currently uncertain if subcapacities should be shown. Needs to be cleared up with David Höller at some point.
/*
function getTotalSubCapacities(subCapacities) {
  let totalSubcapacity = {};
  subCapacities.map((subCapacity) => {
    if (!subCapacity.aggregate) return;
    let key = subCapacity.aggregate;
    // initialize
    if (!totalSubcapacity[key]) {
      totalSubcapacity[key] = {
        id: subCapacity.service_host,
        az: subCapacity.az,
        aggregate: subCapacity.aggregate.toLowerCase(),
        capacity: subCapacity.capacity,
        usage: subCapacity.usage,
      };
    } else {
      totalSubcapacity[key].capacity =
        totalSubcapacity[key].capacity + subCapacity.capacity;
      totalSubcapacity[key].usage =
        totalSubcapacity[key].usage + subCapacity.usage;
    }
  });

  let totalSubcapacities = Object.values(totalSubcapacity);
  totalSubcapacities = totalSubcapacities.sort(function (a, b) {
    if (a.aggregate < b.aggregate) return -1;
    if (b.aggregate > b.aggregate) return 1;
    return 0;
  });

  return totalSubcapacities;
}
  */

/*
function renderSubCapacityBar(resource, azName) {
  const subCapacities = resource?.subcapacities;
  if (!subCapacities || !azName) return;
  const totalSubcapacities = getTotalSubCapacities(subCapacities);
  let ocFactor = resource.capacity / resource.raw_capacity;

  return totalSubcapacities.map((subCapacity) => {
    if (subCapacity.az != azName) return;
    let capa = subCapacity.capacity;
    if (ocFactor) {
      capa = capa * ocFactor;
    }
    return (
      <Grid key={subCapacity.id} className="mt-2">
        <GridRow>
          <GridColumn cols={2} className="content-end px-0">
            <div className="text-xs text-right">{subCapacity.aggregate}</div>
          </GridColumn>
          <GridColumn cols={10} className="pl-1">
            {renderBar(resource, subCapacity.usage, capa)}
          </GridColumn>
        </GridRow>
      </Grid>
    );
  });
}
*/

function getAZUnawareResourceName(resource) {
  return (
    <Stack className="justify-end items-center" gap="1">
      <div className={resourceTitle}>{t(resource.name)}</div>
      <Tooltip triggerEvent="hover">
        <TooltipTrigger>
          <Icon size="14px" icon="info" />
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-sm p-0">Resource is AZ unaware.</span>
        </TooltipContent>
      </Tooltip>
    </Stack>
  );
}

const PaygResource = (props) => {
  const { resource } = props;
  const { validAvailabilityZones, titleWidth, azColumnWidth } = props;

  return (
    <Grid className="mb-4">
      <GridRow>
        <GridColumn className="content-end" cols={titleWidth}>
          {isAZUnaware(resource.per_az) ? (
            getAZUnawareResourceName(resource)
          ) : (
            <div className={resourceTitle}>{t(resource.name)}</div>
          )}
        </GridColumn>
        {validAvailabilityZones.map((azName, idx) => {
          return (
            <GridColumn key={azName} cols={azColumnWidth}>
              {isAZUnaware(resource.per_az) && idx == 0
                ? renderBarFromResource(resource)
                : renderBarFromAZ(resource, azName)}
            </GridColumn>
          );
        })}
      </GridRow>
      <GridRow className="mb-4">
        <GridColumn cols={titleWidth}></GridColumn>
        {/*
        validAvailabilityZones.map((azName) => {
          return (
            <GridColumn key={azName} cols={azColumnWidth}>
              {renderSubCapacityBar(resource, azName)}
            </GridColumn>
          );
        })*/}
      </GridRow>
    </Grid>
  );
};

export default PaygResource;
