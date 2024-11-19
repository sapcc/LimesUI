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
import useMaxQuotaSets from "../../shared/useMaxQuotaSets";
import { Unit, valueWithUnit } from "../../../lib/unit";

const MaxQuota = (props) => {
  const { project, resource, serviceType, postMaxQuota } = props;
  const { isPanelView = false } = props;
  const maxQuota = resource?.max_quota;
  const unit = new Unit(resource.unit);
  const { MaxQuotaInput, maxQuotaInputProps, MaxQuotaEdit, maxQuotaEditProps } = useMaxQuotaSets({
    project: project,
    resource: resource,
    serviceType: serviceType,
    postMaxQuota: postMaxQuota,
  });

  return isPanelView ? (
    <span className={"gap-1 inline-flex"}>
      Max Quota:{" "}
      <MaxQuotaInput {...maxQuotaInputProps} reducedView={true} styles="h-[1.75rem] py-0" wrapperStyles="w-28" />{" "}
      <MaxQuotaEdit {...maxQuotaEditProps} iconOnlyView={true} subduedView={true} />
    </span>
  ) : (
    <span>Max Quota: {valueWithUnit(maxQuota, unit)}</span>
  );
};

export default MaxQuota;
