import React from "react";
import {
  Stack,
  Icon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "juno-ui-components";
import { t } from "../../../lib/utils";
import { Unit } from "../../../lib/unit";
import { isAZUnaware } from "../../../lib/utils";

function createTooltip(resource, tooltipContent) {
  return (
    <Stack className="justify-end items-center" gap="1">
      <Tooltip triggerEvent="hover">
        <TooltipTrigger>
          <Icon size="12px" icon="info" />
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-sm p-0">{tooltipContent}</span>
        </TooltipContent>
      </Tooltip>
    </Stack>
  );
}

const PAYGResource = (props) => {
  const { resource, cerebro, az, azIndex } = props;
  const azValues = az[1];
  const unit = new Unit(resource.unit);
  const azUnaware = isAZUnaware(resource.per_az);

  // Guard clause - Prevent AZ unaware resource from displaying under other AZ's!
  if (azUnaware && azIndex > 0) {
    return;
  }

  function getAZUnawareAvailability() {
    const totalUsage = resource.totalCommitments + resource.usagePerQuota;
    const capacity = resource.capacity;
    return capacity - totalUsage;
  }

  function getAvailableResourcesFromAZ() {
    const totalUsage =
      az?.commitmentSum + azValues?.uncommitted_usage || 0;
    const capacity = azValues?.capacity || 0;
    let availableResources = capacity - totalUsage;
    return availableResources;
  }

  function getAvailableResourcesFromCerebro() {
    // All other resources get handled exclusively by limes.
    if (!cerebro) {
      return getAvailableResourcesFromAZ();
    }
    const availableCerebroFlavors = Object.values(cerebro);
    const unusedCommitments = azValues?.unused_commitments || 0;

    return availableCerebroFlavors - unusedCommitments;
  }

  const availableResources = azUnaware
    ? getAZUnawareAvailability()
    : getAvailableResourcesFromCerebro();

  return (
    <Stack
      key={resource.name}
      direction="horizontal"
      gap="1"
      className="items-center"
    >
      <span
        className={`box-border h-2 w-2 ${
          availableResources < 0
            ? "bg-theme-error"
            : availableResources > 0
            ? "bg-theme-success"
            : "bg-theme-warning"
        } rounded-full`}
      ></span>
      <Stack gap="1" className="items-center">
        <span className="font-medium">{t(resource.name)}</span>
        {cerebro && createTooltip(resource, "Estimated with Cerebro")}
        {azUnaware && createTooltip(resource, "Resource is AZ unaware.")}
      </Stack>
      <span className="text-xs">
        {unit.format(availableResources)} available
      </span>
    </Stack>
  );
};

export default PAYGResource;
