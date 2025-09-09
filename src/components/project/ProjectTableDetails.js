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
import ResourceBarBuilder from "../resourceBar/ResourceBarBuilder";
import CommitmentTable from "../commitment/CommitmentTable";
import AddCommitments from "../shared/AddCommitments";
import ToolTipWrapper from "../shared/ToolTipWrapper";
import {
  globalStore,
  projectStore,
  projectStoreActions,
  createCommitmentStore,
  createCommitmentStoreActions,
} from "../StoreProvider";
import { useQuery } from "@tanstack/react-query";
import { DataGridRow, DataGridCell, Stack, Icon, LoadingIndicator, Button } from "@cloudoperators/juno-ui-components";
import { DomainBadges, ProjectBadges } from "../shared/LimesBadges";
import useResetCommitment from "../../hooks/useResetCommitment";
import { getResourceDurations } from "../../lib/utils";

const ProjectTableDetails = (props) => {
  const {
    index,
    showCommitments,
    updateShowCommitments,
    handleCommitmentTransfer,
    serviceType,
    currentCategory,
    project,
    resource,
    az,
    currentAZ,
    colSpan,
    mergeOps,
  } = props;
  const { metadata } = project;
  const { name: projectName, id: projectID } = metadata;
  const { unit } = resource;
  const isEditableResource = resource.editableResource;
  const hasDurations = getResourceDurations(resource).length > 0;
  const { commitments } = projectStore();
  const { currentProject } = createCommitmentStore();
  const { refetchCommitmentAPI } = createCommitmentStore();
  const { setCommitments } = projectStoreActions();
  const { setRefetchCommitmentAPI } = createCommitmentStoreActions();
  const { isCommitting } = createCommitmentStore();
  const { transferCommitment } = createCommitmentStore();
  const { isTransferring } = createCommitmentStore();
  const { setCommitmentIsFetching } = createCommitmentStoreActions();
  const { setIsCommitting } = createCommitmentStoreActions();
  const { setTransferCommitment } = createCommitmentStoreActions();
  const { setCommitmentsToMerge, setMergeIsActive } = mergeOps;
  const { resetCommitmentTransfer } = useResetCommitment();
  // commitment query requires a domain ID that differs on cluster level.
  const { scope } = globalStore();
  const domainID = scope.isCluster() ? metadata.domainID : null;
  // Be careful here! If enabled state is passed in as undefined, the useQuery hook spams the limes API for all projects!
  const commitQueryResult = useQuery({ queryKey: ["commitmentData", projectID, domainID], enabled: showCommitments });
  const { data: commitmentData, isLoading, isFetching } = commitQueryResult;
  const [moveCommitment, setMoveCommitment] = React.useState(false);
  const [originProject, setOriginProject] = React.useState(false);

  React.useEffect(() => {
    if (!showCommitments || !commitmentData) return;
    setCommitments(commitmentData.commitments);
  }, [showCommitments, commitmentData]);

  React.useEffect(() => {
    setCommitmentIsFetching(isFetching);
  }, [isFetching]);

  React.useEffect(() => {
    if (!refetchCommitmentAPI || !showCommitments) return;
    setRefetchCommitmentAPI(false);
    commitQueryResult.refetch();
  }, [refetchCommitmentAPI]);

  // only display the move commitment button on projects with a commitment on them.
  React.useEffect(() => {
    az.hasCommitments ? setMoveCommitment(true) : setMoveCommitment(false);
  }, [showCommitments, az]);

  // Only display transfer button on other projects except the origin project which a commitments transfers from.
  React.useEffect(() => {
    if (!currentProject) {
      setOriginProject(false);
    } else {
      setOriginProject(project.metadata.id == currentProject.metadata.id);
    }
  }, [currentProject]);

  const displayedName = scope.isCluster() ? metadata.fullName : projectName;
  return (
    <React.Fragment>
      <DataGridRow>
        <DataGridCell key={metadata.name} className={"pl-0"}>
          <Stack className="items-center">
            {isEditableResource ? (
              <Icon
                data-testid={"committableTableEntry"}
                icon={showCommitments ? "expandMore" : "chevronRight"}
                onClick={() => {
                  if (isTransferring) return;
                  resetCommitmentTransfer();
                  setMoveCommitment(false);
                  setIsCommitting(false);
                  setCommitmentsToMerge([]);
                  setMergeIsActive(false);
                  updateShowCommitments(index);
                }}
              />
            ) : (
              <ToolTipWrapper
                trigger={<Icon data-testid={"uncommittableTableEntry"} icon="info" size="18" />}
                content="Commitments are disabled for this resource"
              />
            )}
            <Stack direction={"vertical"} className="w-full">
              <div className="truncate" title={displayedName}>
                {displayedName}
              </div>
              <div className="text-xs truncate">{projectID}</div>
            </Stack>
          </Stack>
        </DataGridCell>
        <DataGridCell>
          <ResourceBarBuilder
            scope={scope}
            resource={resource}
            az={az}
            unit={unit}
            barType={"granular"}
            isEditableResource={isEditableResource}
          />
        </DataGridCell>
        <DataGridCell>
          <div key={metadata.name}>
            <Stack>
              <DomainBadges resource={resource} az={az} />
            </Stack>
            <Stack>
              <ProjectBadges az={az} />
            </Stack>
          </div>
        </DataGridCell>
        <DataGridCell>
          {isEditableResource && (
            <>
              {!isTransferring || originProject ? (
                <div>
                  {hasDurations && (
                    <AddCommitments
                      label="Add"
                      disabled={!showCommitments || transferCommitment || isLoading}
                      size="small"
                    />
                  )}
                  <Button
                    className={"ml-1"}
                    data-cy="moveCommitment"
                    variant="primary"
                    disabled={!showCommitments || !moveCommitment || transferCommitment || isCommitting || isLoading}
                    size="small"
                    onClick={() => {
                      setTransferCommitment(true);
                    }}
                  >
                    Move
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => {
                    handleCommitmentTransfer(project);
                  }}
                >
                  Transfer Commitment
                </Button>
              )}
            </>
          )}
        </DataGridCell>
      </DataGridRow>
      {showCommitments && (
        <div className={`${colSpan} mt-2 mb-5`}>
          {commitments && !isLoading ? (
            <>
              {az.hasCommitments && <p className="font-semibold mb-5">Commitments:</p>}
              <CommitmentTable
                serviceType={serviceType}
                currentCategory={currentCategory}
                currentResource={resource}
                resource={resource}
                currentAZ={currentAZ}
                commitmentData={commitments}
                mergeOps={mergeOps}
              />
            </>
          ) : (
            <LoadingIndicator className={"m-auto"} />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default ProjectTableDetails;
