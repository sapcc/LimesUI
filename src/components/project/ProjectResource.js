import React from "react";
import { t } from "../../lib/utils";
import { Stack, Button } from "juno-ui-components";
import { Link } from "react-router-dom";
import useStore from "../../lib/store/store";
import ResourceBarBuilder from "./ResourceBarBuilder";

const barGroupContainer = `
    self-stretch  
    px-4 
    pt-3 
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
    self-start
`;
const azTitle = `
    text-theme-default 
    text-sm
    items-center
    pb-0
    self-start
`;
const azOverviewBar = `
    `;

const azContent = `
    grid
    gap-0
    grid-cols-[repeat(auto-fit,_minmax(37rem,_1fr))]
    pt-2
    `;
const azPanelContent = `  
    grid
    gap-2
    grid-cols-[repeat(auto-fit,_minmax(25rem,_1fr))]
    pt-2
    `;

const azContentHover = `
    cursor-pointer
    hover:bg-theme-background-lvl-2
    hover:border-theme-accent
    transition-all
    `;

const ProjectResource = (props) => {
  const isCommitting = useStore((state) => state.isCommitting);
  const setIsCommitting = useStore((state) => state.setIsCommitting);
  const setCurrentAZ = useStore((state) => state.setCurrentAZ);
  const hasAZs =
    Object.keys(props.resource.per_az || {}).length > 0 ? true : false;
  const hasDurations = props.resource?.commitment_config?.durations
    ? true
    : false;
  const displayName = t(props.resource.name);
  const { tracksQuota, parentResource, isPanelView } = { ...props };
  const {
    quota: originalQuota, //commitment + right
    usage,
    usable_quota: usableQuota,
    backend_quota: backendQuota,
    unit: unitName,
    per_az: availabilityZones,
  } = props.resource;
  const showEdit = props.canEdit && props.tracksQuota && hasDurations && hasAZs;

  function azCommitmentSum(az) {
    let commitmentSum = 0;
    const commitments = Object.values(az[1].committed || {});
    commitments.forEach((commitmentValue) => {
      commitmentSum += commitmentValue;
    });
    return commitmentSum;
  }

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

  return (
    <div
      className={
        !props.isPanelView ? `bar-card ${barGroupContainer}` : `bar-card-panel`
      }
    >
      <div
        className={` ${
          props.isPanelView
            ? `az-panel-container ${azPanelContent}`
            : `az-main-container ${azContent}`
        }`}
      ></div>
      <Stack distribution="between" className={`bar-header ${barHeader}`}>
        <div className={`bar-title ${barTitle}`}>{displayName}</div>
        {showEdit && (
          <Link
            to={`/${props.area}/edit/${props.categoryName}/${props.resource.name}`}
            state={props}
          >
            <Button size="small" variant="subdued" icon="edit">
              Edit
            </Button>
          </Link>
        )}
        {props.isPanelView && (
          <Button
            onClick={() => setIsCommitting(true)}
            variant="primary"
            disabled={isCommitting}
            icon="addCircle"
          >
            Add Commitment
          </Button>
        )}
      </Stack>
      <ResourceBarBuilder
        unit={unitName}
        usage={usage}
        commitment={projectCommitmentSum}
        quota={originalQuota}
        parentQuota={parentResource?.quota}
        tracksQuota={tracksQuota}
        isPanelView={props.isPanelView}
        showEdit={showEdit}
      />
      <div className={`az-container ${azPanelContent}`}>
        {props.resource.per_az.map(
          (az) =>
            az[0] !== "any" && (
              <div
                key={az[0]}
                className={`az-bar ${
                  props.isPanelView
                    ? `az-bar ${barGroupContainer} ${azContentHover}`
                    : `az-bar ${azOverviewBar}`
                }`}
                onClick={() => setCurrentAZ(az[0])}
              >
                <div className={`az-title pb-2 ${azTitle}`}>{az[0]}</div>
                <ResourceBarBuilder
                  unit={unitName}
                  usage={az[1].usage}
                  isAZ={true}
                  commitment={azCommitmentSum(az)}
                  quota={originalQuota}
                  parentQuota={parentResource?.quota}
                  tracksQuota={tracksQuota}
                  isPanelView={props.isPanelView}
                  showEdit={showEdit}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ProjectResource;
