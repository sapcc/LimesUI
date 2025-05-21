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
import { t } from "../../lib/utils";
import { PanelType } from "../../lib/constants";
import {
  getCapacityForAZLevel,
  getQuotaForAZLevel,
  getUsageForAZLevel,
  getUsageForLeftBar,
  getUsageForRightBar,
  getTotalUsageForLeftBar,
  getTotalUsageForRightBar,
} from "../../lib/resourceBarValues";
import { Stack, Button } from "@cloudoperators/juno-ui-components";
import { Link } from "react-router";
import { ProjectBadges } from "../shared/LimesBadges";
import { isAZUnaware } from "../../lib/utils";
import ResourceBarBuilder from "../resourceBar/ResourceBarBuilder";
import useResetCommitment from "../../hooks/useResetCommitment";
import HistoricalUsage from "./subComponents/HistoricalUsage";
import MaxQuota from "./subComponents/MaxQuota";
import PhysicalUsage from "./subComponents/PhysicalUsage";

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
  const { canEdit, project, resource, isPanelView, subRoute, setCurrentAZ, serviceType, setIsMerging, tracksQuota } =
    props;
  const {
    totalCommitments,
    usagePerCommitted,
    usagePerQuota,
    quota: originalQuota, //commitment + right
    capacity,
    unit: unitName,
    editableResource,
  } = resource;
  const { scope } = globalStore();
  const displayName = t(props.resource.name);
  // displayedUsage ensures that resources without commitments get the project usage displayed.
  const displayedUsage = usagePerCommitted > 0 ? (tracksQuota ? usagePerCommitted : resource.usage) : usagePerQuota;
  const { resetCommitment } = useResetCommitment();
  // Bar length on project/domain level is Quota. On Cluster level it is capacity.
  const capacityOrQuota = scope.isCluster() ? capacity || 0 : originalQuota;

  function getQuotaOrCapacityForAZResource(az, capacity, quota) {
    return scope.isCluster() ? getCapacityForAZLevel(az, capacity) : getQuotaForAZLevel(az, quota);
  }

  const maxQuotaForwardProps = {
    editMode: isPanelView || (canEdit && !editableResource),
    project: project,
    resource: resource,
    serviceType: serviceType,
  };

  if (tracksQuota === undefined) {
    throw new Error("Missing property: tracksQuota");
  }

  return (
    <div className={!props.isPanelView ? `bar-card ${barGroupContainer}` : `bar-card-panel`}>
      <div
        className={` ${props.isPanelView ? `az-panel-container ${azPanelContent}` : `az-main-container ${azContent}`}`}
      ></div>
      <Stack distribution="between" className={`bar-header ${barHeader}`}>
        <Stack
          className={`bar-title ${barTitle} w-full`}
          gap="1"
          distribution={!editableResource && !isPanelView && "between"}
        >
          {displayName}
          {scope.isProject() && (
            <span className="font-light">
              <MaxQuota {...maxQuotaForwardProps} />
            </span>
          )}
        </Stack>
        {canEdit && (
          <Stack className="items-center" gap="1">
            {isAZUnaware(props.resource.per_az) && (
              <ProjectBadges az={props.resource.per_az[0][1]} unit={unitName} displayValues={true} />
            )}
            {canEdit && !isPanelView && editableResource && (
              <Link to={`/${props.area}/edit/${props.categoryName}/${props.resource.name}`} state={props}>
                <Button
                  data-cy={`edit/${props.resource.name}`}
                  data-testid={`edit/${props.resource.name}`}
                  size="small"
                  variant="subdued"
                  icon="edit"
                >
                  {scope.isProject() ? "Manage" : "Commitments"}
                </Button>
              </Link>
            )}
            {!scope.isProject() && tracksQuota && (
              <Link
                to={`/${props.area}/edit/${props.categoryName}/${props.resource.name}/${PanelType.quota.name}`}
                state={props}
              >
                <Button data-testid={"setMaxQuotaPanel"} className="ml-1" size="small" icon="edit">
                  Quota
                </Button>
              </Link>
            )}
          </Stack>
        )}
      </Stack>
      <ResourceBarBuilder
        unit={unitName}
        usage={scope.isProject() ? displayedUsage : getTotalUsageForLeftBar(props.resource)}
        usageBurstSum={scope.isProject() ? usagePerQuota : getTotalUsageForRightBar(props.resource)}
        commitment={totalCommitments}
        quota={capacityOrQuota}
        tracksQuota={tracksQuota}
        isPanelView={isPanelView}
        editableResource={editableResource}
      />
      {isAZUnaware(props.resource.per_az) && <PhysicalUsage resource={props.resource} unit={unitName} />}
      <div className={props.isPanelView && `az-container ${azPanelContent} ${props.isPanelView && "gap-2"}`}>
        {props.resource.per_az?.map((az) => {
          const azName = az[0];
          const commitmentsInAZ = az[1];
          const azQuotaOrCapacity = getQuotaOrCapacityForAZResource(az[1], capacity, originalQuota);
          return (
            azName !== "any" && (
              <div
                key={azName}
                className={`az-bar ${
                  props.isPanelView
                    ? `az-bar ${barGroupContainer} ${!subRoute && azName !== "unknown" && azContentHover}`
                    : `az-bar ${azOverviewBar}`
                }`}
                onClick={() => {
                  if (!props.isPanelView || subRoute || azName == "unknown") return;
                  setCurrentAZ(azName);
                  setIsMerging(false);
                  resetCommitment();
                }}
              >
                <div className={`az-title ${azTitle} flex justify-between`}>
                  <Stack className={"mt-2"} alignment="center" gap="1">
                    {azName}
                    <HistoricalUsage resource={az[1]} />
                  </Stack>
                  <ProjectBadges az={commitmentsInAZ} unit={unitName} displayValues={true} />
                </div>
                <ResourceBarBuilder
                  unit={unitName}
                  usage={scope.isProject() ? getUsageForAZLevel(commitmentsInAZ) : getUsageForLeftBar(commitmentsInAZ)}
                  usageBurstSum={scope.isProject() ? null : getUsageForRightBar(commitmentsInAZ)}
                  isAZ={true}
                  commitment={az.commitmentSum}
                  quota={azQuotaOrCapacity}
                  tracksQuota={tracksQuota}
                  isPanelView={isPanelView}
                  editableResource={editableResource}
                />
                <PhysicalUsage resource={az[1]} resourceName={props.resource.name} unit={unitName} />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Resource;
