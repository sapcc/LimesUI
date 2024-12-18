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
import { globalStore } from "../StoreProvider";
import { DataGridCell, DataGridRow, Stack } from "@cloudoperators/juno-ui-components";
import useMaxQuotaSets from "../shared/useMaxQuotaSets";
import { Unit, valueWithUnit } from "../../lib/unit";

// NOTE: setMaxQuota is not available on resources that have a parentResource.
const ProjectQuotaDetails = (props) => {
  const { serviceType, project, resource, setMaxQuota } = props;
  const { metadata } = project;
  const { name: projectName, id: projectID } = metadata;
  const usage = resource.usage;
  const quota = resource.quota;
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
        <MaxQuotaInput {...maxQuotaInputProps} />
      </DataGridCell>
      <DataGridCell>
        <MaxQuotaEdit {...maxQuotaEditProps} />
      </DataGridCell>
    </DataGridRow>
  );
};

export default ProjectQuotaDetails;
