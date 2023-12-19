import React from "react";
import { t } from "../../lib/utils";
import { Stack, Button } from "juno-ui-components";
import { Link } from "react-router-dom";
import ResourceBarBuilder from "./ResourceBarBuilder";
import useResetCommitment from "../../hooks/useResetCommitment";
import {
  createCommitmentStore,
  createCommitmentStoreActions,
} from "../StoreProvider";

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
    h-7
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
    gap-0
    grid-cols-[repeat(auto-fit,_minmax(30rem,_1fr))]
    pt-2
    `;

const azContentHover = `
    cursor-pointer
    hover:bg-theme-background-lvl-2
    hover:border-theme-accent
    transition-all
    `;

const ProjectResource = (props) => {
  const {
    totalCommitments,
    usagePerCommitted,
    usagePerQuota,
    quota: originalQuota, //commitment + right
    usage,
    usable_quota: usableQuota,
    backend_quota: backendQuota,
    unit: unitName,
    per_az: availabilityZones,
  } = props.resource;
  // displayedUsage ensures that resources without commitments get the project usage displayed.
  const displayedUsage = usagePerCommitted > 0 ? usagePerCommitted : usagePerQuota
  const hasAZs =
    Object.keys(props.resource.per_az || {}).length > 0 ? true : false;
  const hasDurations = props.resource?.commitment_config?.durations
    ? true
    : false;
  const displayName = t(props.resource.name);
  const { tracksQuota, parentResource, isPanelView } = { ...props };
  const showEdit = props.canEdit && tracksQuota && hasDurations && hasAZs;
  const resetCommitment = useResetCommitment();
  const { isCommitting } = createCommitmentStore();
  const { setIsCommitting } = createCommitmentStoreActions();

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
            <Button
              data-cy={`edit/${props.resource.name}`}
              size="small"
              variant="subdued"
              icon="edit"
            >
              Edit
            </Button>
          </Link>
        )}
        {props.isPanelView && (
          <Button
            data-cy="addCommitment"
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
        usage={displayedUsage}
        usageBurstSum={usagePerQuota}
        commitment={totalCommitments}
        quota={originalQuota}
        parentQuota={parentResource?.quota}
        tracksQuota={tracksQuota}
        isPanelView={isPanelView}
        showEdit={showEdit}
      />
      <div
        className={`az-container ${azPanelContent} ${
          props.isPanelView && "gap-2"
        }`}
      >
        {props.resource.per_az.map(
          (az) =>
            az[0] !== "any" && (
              <div
                key={az[0]}
                className={`az-bar ${
                  props.isPanelView
                    ? `az-bar ${barGroupContainer} ${
                        az[0] !== "unknown" && azContentHover
                      }`
                    : `az-bar ${azOverviewBar}`
                }`}
                onClick={() => {
                  resetCommitment(az);
                }}
              >
                <div className={`az-title ${azTitle}`}>{az[0]}</div>
                <ResourceBarBuilder
                  unit={unitName}
                  usage={az[1].usage}
                  isAZ={true}
                  commitment={az.commitmentSum}
                  quota={originalQuota}
                  parentQuota={parentResource?.quota}
                  tracksQuota={tracksQuota}
                  isPanelView={isPanelView}
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
