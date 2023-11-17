import React from "react";
import { t } from "../../lib/utils";
import ResourceBar from "../ResourceBar";
import { Stack, Button, Icon } from "juno-ui-components";
import { Link } from "react-router-dom";
import useStore from "../../lib/store/store";
import { Unit } from "../../lib/unit";
import ResourceBarBuilder from "./ResourceBarBuilder";
import { $ } from "juno-ui-components/build/transition-9cc71dcd";

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
    items-center
`;
const barTitle = `
    font-bold 
    text-theme-default
    items-center
`;
const azTitle = `
    text-theme-default 
    text-sm
    items-center
    px-0.5
`;
const azContent = `
    grid
    auto-rows-fr
    gap-2
    grid-cols-[repeat(auto-fit,_minmax(25rem,_1fr))]
    pt-2
    `;
const azContentHover = `
    cursor-pointer
    hover:bg-theme-background-lvl-2
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
      {props.isPanelView && props.resource.per_az ? (
        <div className={`az-container ${azContent} `}>
          {props.resource.per_az.map(
            (az) =>
              az[0] !== "any" && (
                <div
                  key={az[0]}
                  className={`az-bar ${barGroupContainer} ${azContentHover}`}
                >
                  <div className={`az-title pb-2 ${azTitle}`}>
                    {az[0]}: Usage: {az[1].usage} Commitments:{" "}
                    {azCommitmentSum(az)} Quota: {originalQuota}
                  </div>
                  <ResourceBarBuilder
                    unit={unitName}
                    usage={az[1].usage}
                    isAZ={true}
                    commitment={azCommitmentSum(az)}
                    quota={originalQuota}
                    tracksQuota={tracksQuota}
                    isPanelView={props.isPanelView}
                    showEdit={showEdit}
                  />
                </div>
              )
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProjectResource;
