import React from "react";
import useMaxQuotaSets from "../../shared/useMaxQuotaSets";
import { Unit, valueWithUnit } from "../../../lib/unit";

const MaxQuota = (props) => {
  const { project, resource, serviceType, postMaxQuota } = props;
  const { isPanelView = false } = props;
  const maxQuota = resource?.max_quota;
  const unit = new Unit(resource.unit);
  const { MaxQuotaInput, maxQuotaInputProps, MaxQuotaEdit, maxQuotaEditProps } =
    useMaxQuotaSets({
      project: project,
      resource: resource,
      serviceType: serviceType,
      postMaxQuota: postMaxQuota,
    });

  return isPanelView ? (
    <span className={"gap-1 inline-flex"}>
      Max Quota:{" "}
      <MaxQuotaInput
        {...maxQuotaInputProps}
        reducedView={true}
        styles="h-[1.75rem] py-0"
        wrapperStyles="w-28"
      />{" "}
      <MaxQuotaEdit
        {...maxQuotaEditProps}
        iconOnlyView={true}
        subduedView={true}
      />
    </span>
  ) : (
    <span>Max Quota: {valueWithUnit(maxQuota, unit)}</span>
  );
};

export default MaxQuota;
