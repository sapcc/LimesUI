// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { globalStore } from "../StoreProvider";
import { DataGridCell, DataGridRow, Icon, Stack } from "@cloudoperators/juno-ui-components";
import ToolTipWrapper from "../shared/ToolTipWrapper";
import useMaxQuotaSets from "../shared/useMaxQuotaSets";
import { Unit, valueWithUnit } from "../../lib/unit";

const ProjectQuotaDetails = (props) => {
  const { serviceType, project, resource, setMaxQuota } = props;
  const { metadata } = project;
  const { name: projectName, id: projectID } = metadata;
  const usage = resource.usage;
  const quota = resource.quota;
  const forbidAutogrowth = resource?.forbid_autogrowth ?? false;
  const { scope } = globalStore();
  const unit = new Unit(resource.unit);
  const { MaxQuotaInput, maxQuotaInputProps, MaxQuotaEdit, maxQuotaEditProps } = useMaxQuotaSets({
    project: project,
    resource: resource,
    serviceType: serviceType,
    postMaxQuota: setMaxQuota,
  });

  return (
    <DataGridRow>
      <DataGridCell>
        <Stack direction={"vertical"} className="w-full">
          <div className="truncate">{scope.isCluster() ? metadata.fullName : projectName}</div>
          <div className="text-xs truncate">{projectID}</div>
        </Stack>
      </DataGridCell>
      <DataGridCell>{valueWithUnit(usage, unit)}</DataGridCell>
      <DataGridCell>{valueWithUnit(quota, unit)}</DataGridCell>
      <DataGridCell>
        <Stack gap="1">
          {forbidAutogrowth && (
            <ToolTipWrapper
              trigger={<Icon data-testid="forbidAutogrowthInfo" icon="warning" size="18" />}
              content={
                <span>
                  Pay-As-You-Go is disabled on project level. <br />
                  This setting is more restrictive than Max-Quota.
                </span>
              }
            />
          )}
          <MaxQuotaInput {...maxQuotaInputProps} />
        </Stack>
      </DataGridCell>
      <DataGridCell>
        <MaxQuotaEdit {...maxQuotaEditProps} />
      </DataGridCell>
    </DataGridRow>
  );
};

export default ProjectQuotaDetails;
