import React from "react";
import { globalStore } from "../StoreProvider";
import { t } from "../../lib/utils";
import {
  getCapacityForAZLevel,
  getQuotaForAZLevel,
  getUsageForAZLevel,
} from "../../lib/resourceBarValues";
import { Stack, Button } from "juno-ui-components";
import { Link } from "react-router-dom";
import { ProjectBadges } from "../shared/LimesBadges";
import ResourceBarBuilder from "../resourceBar/ResourceBarBuilder";
import useResetCommitment from "../../hooks/useResetCommitment";
import AddCommitments from "../shared/AddCommitments";

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

const Resource = (props) => {
  const {
    totalCommitments,
    usagePerCommitted,
    usagePerQuota,
    quota: originalQuota, //commitment + right
    capacity,
    unit: unitName,
    editableResource,
  } = props.resource;
  const { scope } = globalStore();
  const { tracksQuota, parentResource, isPanelView } = {
    ...props,
  };
  const displayName = t(props.resource.name);
  // displayedUsage ensures that resources without commitments get the project usage displayed.
  const displayedUsage =
    usagePerCommitted > 0 ? usagePerCommitted : usagePerQuota;
  const { resetCommitment } = useResetCommitment();
  // Bar length on project/domain level is Quota. On Cluster level it is capacity.
  const capacityOrQuota = scope.isCluster() ? capacity || 0 : originalQuota;

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
        {props.canEdit && editableResource && (
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
              Manage
            </Button>
          </Link>
        )}
        {scope.isProject() && props.isPanelView && (
          <AddCommitments label="Add Commitment" />
        )}
      </Stack>
      <ResourceBarBuilder
        unit={unitName}
        usage={displayedUsage}
        usageBurstSum={usagePerQuota}
        commitment={totalCommitments}
        quota={capacityOrQuota}
        parentQuota={parentResource?.quota}
        tracksQuota={tracksQuota}
        isPanelView={isPanelView}
        editableResource={editableResource}
      />
      <div
        className={
          props.isPanelView &&
          `az-container ${azPanelContent} ${props.isPanelView && "gap-2"}`
        }
      >
        {props.resource.per_az?.map((az) => {
          const azName = az[0];
          const commitmentsInAZ = az[1];
          const azQuotaOrCapacity = scope.isCluster()
            ? getCapacityForAZLevel(az[1], capacity)
            : getQuotaForAZLevel(az[1], originalQuota);
          return (
            azName !== "any" && (
              <div
                key={azName}
                className={`az-bar ${
                  props.isPanelView
                    ? `az-bar ${barGroupContainer} ${
                        azName !== "unknown" && azContentHover
                      }`
                    : `az-bar ${azOverviewBar}`
                }`}
                onClick={() => {
                  resetCommitment(az);
                }}
              >
                <div className={`az-title ${azTitle} flex justify-between`}>
                  {azName} <ProjectBadges az={commitmentsInAZ} />
                </div>
                <ResourceBarBuilder
                  unit={unitName}
                  usage={getUsageForAZLevel(commitmentsInAZ)}
                  isAZ={true}
                  commitment={az.commitmentSum}
                  quota={azQuotaOrCapacity}
                  parentQuota={parentResource?.quota}
                  tracksQuota={tracksQuota}
                  isPanelView={isPanelView}
                  editableResource={editableResource}
                />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Resource;
