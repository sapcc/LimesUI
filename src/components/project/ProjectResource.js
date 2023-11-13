import React from "react";
import { t } from "../../lib/utils";
import ResourceBar from "../ResourceBar";
import { GridRow, GridColumn, Button } from "juno-ui-components";
import { Link } from "react-router-dom";
import useStore from "../../lib/store/store";
import { Unit, valueWithUnit } from "../../lib/unit";

const ProjectResource = (props) => {
  const commitments = useStore((state) => state.commitments);
  const isCommitting = useStore((state) => state.isCommitting);
  const setIsCommitting = useStore((state) => state.setIsCommitting);
  const hasAZs = Object.keys(props.resource.per_az || {}).length > 0 ? true : false
  const hasDurations = props.resource?.commitment_config?.durations ? true : false
  const displayName = t(props.resource.name);
  const {
    quota: originalQuota,
    usage,
    usable_quota: usableQuota,
    backend_quota: backendQuota,
    unit: unitName,
  } = props.resource;
  const unit = new Unit(unitName || "");
  const actualBackendQuota = backendQuota == null ? usableQuota : backendQuota;
  const isDanger = usage > usableQuota || usableQuota != actualBackendQuota;
  const isEditing = props.edit ? true : false;

  //commitmentCalculation
  const projectCommitmentSum = React.useMemo(() => {
    let commitmentSum = 0;
    commitments.forEach((commitment) => {
      if (commitment.resource_name === props.resource.name) {
        commitmentSum += commitment.amount;
      }
    });
    return commitmentSum;
  }, [commitments]);

  // TODO: commitment is a hardcoded value. Replace it with the real value when available.
  return (
    <GridRow
      className={`${
        props.tracksQuota ? "mb-1" : "row usage-only"
      } items-center`}
    >
      <GridColumn cols={2}>
        <div
          className={`${
            props.tracksQuota ? "text-base break-words" : "text-xs"
          }`}
        >
          {displayName}
        </div>
      </GridColumn>
      <GridColumn cols={isEditing ? 5 : 4}>
        <ResourceBar
          capacity={
            props.tracksQuota ? originalQuota : props.parentResoure.quota
          }
          capacityLabel={valueWithUnit(originalQuota, unit)}
          fill={usage}
          fillLabel={valueWithUnit(usage, unit)}
          commitment={projectCommitmentSum}
          isDanger={isDanger}
          showsCapacity={false}
          labelIsUsageOnly={props.tracksQuota ? false : true}
        />
      </GridColumn>
      {props.canEdit && props.tracksQuota && hasDurations && hasAZs &&(
        <GridColumn cols={1}>
          <Link
            to={`/${props.area}/edit/${props.categoryName}/${props.resource.name}`}
            state={props}
          >
            <Button>Edit</Button>
          </Link>
        </GridColumn>
      )}
      {props.isPanelView && (
        <GridColumn auto className={"flex items-center justify-end"}>
          <Button
            onClick={() => setIsCommitting(true)}
            variant="primary"
            disabled={isCommitting}
          >
            Add Commitment
          </Button>
        </GridColumn>
      )}
    </GridRow>
  );
};

export default ProjectResource;
