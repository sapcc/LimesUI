import React from "react";
import { t } from "../../lib/utils";
import ResourceBar from "../ResourceBar";
import { Stack, Button } from "juno-ui-components";
import { Link } from "react-router-dom";
import useStore from "../../lib/store/store";
import { Unit, valueWithUnit } from "../../lib/unit";

const barGroupContainer = `
    self-stretch 
    px-4 
    pt-2 
    pb-4 
    rounded 
    border 
    border-theme-background-lvl-5 
    hover:shadow 
    transition-all
`;
const barHeader = `
    mb-2 
    min-w-full
`;
const barTitle = `
    font-bold 
    text-theme-default
`;
const azTitle = `
    text-theme-default 
    text-sm
`;

const ProjectResource = (props) => {
  const isCommitting = useStore((state) => state.isCommitting);
  const setIsCommitting = useStore((state) => state.setIsCommitting);
  const hasAZs =
    Object.keys(props.resource.per_az || {}).length > 0 ? true : false;
  const hasDurations = props.resource?.commitment_config?.durations
    ? true
    : false;
  const displayName = t(props.resource.name);
  const { tracksQuota, parentResoure } = { ...props };
  const {
    quota: originalQuota, //commitment + right
    usage,
    usable_quota: usableQuota,
    backend_quota: backendQuota,
    unit: unitName,
    per_az: availabilityZones,
  } = props.resource;
  const unit = new Unit(unitName || "");
  const showEdit = props.canEdit && props.tracksQuota && hasDurations && hasAZs;

  //commitmentCalculation for the main status bar.
  const projectCommitmentSum = React.useMemo(() => {
    let totalCommitmentSum = 0;
    availabilityZones.forEach((az) => {
      const commitments = Object.values(az[1].committed || {});
      commitments.forEach((commitmentValue) => {
        totalCommitmentSum += commitmentValue;
      });
    });
    return totalCommitmentSum;
  }, [availabilityZones]);

  //Define values that should be shown on the UI as label text
  const commitmentOrQuota =
    projectCommitmentSum > 0 ? projectCommitmentSum : originalQuota;

  const showCommitmentOrUsage =
    usage > projectCommitmentSum && projectCommitmentSum > 0
      ? projectCommitmentSum
      : usage;

  const extraBarValue = originalQuota - projectCommitmentSum;

  const extraFillLabel =
    usage >= projectCommitmentSum ? usage - projectCommitmentSum : "0";

  return (
    <div className={`bar-card ${barGroupContainer}`}>
      <Stack distribution="between" className={`bar-header ${barHeader}`}>
        <div
          className={
            props.tracksQuota ? `bar-title ${barTitle}` : `az-title ${azTitle}`
          }
        >
          {displayName}
        </div>
        {showEdit && (
          <Link
            to={`/${props.area}/edit/${props.categoryName}/${props.resource.name}`}
            state={props}
          >
            <Button size="small" variant="subdued">
              Edit
            </Button>
          </Link>
        )}
        {props.isPanelView && (
          <Button
            onClick={() => setIsCommitting(true)}
            variant="primary"
            disabled={isCommitting}
          >
            Add Commitment
          </Button>
        )}
      </Stack>
      <ResourceBar
        capacity={tracksQuota ? commitmentOrQuota : parentResoure.quota}
        capacityLabel={valueWithUnit(
          commitmentOrQuota ? commitmentOrQuota : parentResoure.quota,
          unit
        )}
        extraFillLabel={valueWithUnit(extraFillLabel, unit)}
        extraCapacityLabel={valueWithUnit(extraBarValue, unit)}
        fill={usage}
        fillLabel={valueWithUnit(showCommitmentOrUsage, unit)}
        commitment={projectCommitmentSum}
        extraBarValue={extraBarValue}
        showsCapacity={false}
        labelIsUsageOnly={props.tracksQuota ? false : true}
        canEdit={showEdit || props.isPanelView}
      />
    </div>
  );
};

export default ProjectResource;
