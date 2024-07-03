import React from "react";
import { Box, Icon, Stack } from "juno-ui-components";
import { Unit } from "../../../lib/unit";

const PhysicalUsage = (props) => {
  const { resource, unit: unitName } = props;
  const { usage } = resource;
  const physicalUsage = resource?.physical_usage;
  const isWarning = physicalUsage > usage;
  const unit = new Unit(unitName);
  const displayText = `Physical Usage: ${unit.format(physicalUsage)}`;

  return physicalUsage ? (
    <Box
      className={`max-w-max px-1 py-0 mt-1 ${
        isWarning && "bg-theme-warning bg-opacity-25"
      }`}
    >
      <Stack className="items-center" gap="1">
        {isWarning && <Icon icon="warning" size="12px" />}
        <span className="text-xs">{displayText}</span>
      </Stack>
    </Box>
  ) : null;
};

export default PhysicalUsage;
