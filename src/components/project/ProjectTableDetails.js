// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import ResourceBarBuilder from "../resourceBar/ResourceBarBuilder";
import CommitmentTable from "../commitment/CommitmentTable";
import AddCommitments from "../shared/AddCommitments";
import ToolTipWrapper from "../shared/ToolTipWrapper";
import {
  useGlobalStore,
  projectStoreActions,
  createCommitmentStoreActions,
  useProjectStore,
  useCreateCommitmentStore,
} from "../StoreProvider";
import { useQuery } from "@tanstack/react-query";
import { DataGridRow, DataGridCell, Stack, Icon, LoadingIndicator, Button } from "@cloudoperators/juno-ui-components";
import { DomainBadges, ProjectBadges } from "../shared/LimesBadges";
import useResetCommitment from "../../hooks/useResetCommitment";

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
    currentTab,
    mergeOps,
  } = props;
  const { metadata } = project;
  const { name: projectName, id: projectID } = metadata;
  const { unit } = resource;
  const isEditableResource = resource.editableResource;
  const commitments = useProjectStore((state) => state.commitments);
  const currentProject = useCreateCommitmentStore((state) => state.currentProject);
  const refetchCommitmentAPI = useCreateCommitmentStore((state) => state.refetchCommitmentAPI);
  const { setCommitments } = projectStoreActions();
  const { setRefetchCommitmentAPI } = createCommitmentStoreActions();
  const isCommitting = useCreateCommitmentStore((state) => state.isCommitting);
  const transferCommitment = useCreateCommitmentStore((state) => state.transferCommitment);
  const isTransferring = useCreateCommitmentStore((state) => state.isTransferring);
  const { setIsCommitting } = createCommitmentStoreActions();
  const { setTransferCommitment } = createCommitmentStoreActions();
  const { setCommitmentsToMerge, setMergeIsActive } = mergeOps;
  const { resetCommitmentTransfer } = useResetCommitment();
  // commitment query requires a domain ID that differs on cluster level.
  const scope = useGlobalStore((state) => state.scope);
  const domainID = scope.isCluster() ? metadata.domainID : null;
  // only display the move commitment button on projects with a commitment on them.
  const moveCommitment = React.useMemo(() => {
    return showCommitments && az.hasCommitments;
  }, [showCommitments, az.hasCommitments]);
  // Only display transfer button on other projects except the origin project which a commitments transfers from.
  const originProject = React.useMemo(() => {
    if (!currentProject) return false;
    return project.metadata.id === currentProject.metadata.id;
  }, [currentProject, project.metadata.id]);
  // Be careful here! If enabled state is passed in as undefined, the useQuery hook spams the limes API for all projects!
  const commitQueryResult = useQuery({ queryKey: ["commitmentData", projectID, domainID], enabled: showCommitments });
  const { data: commitmentData, isLoading } = commitQueryResult;

  React.useEffect(() => {
    if (!showCommitments || !commitmentData) return;
    setCommitments(commitmentData.commitments);
  }, [showCommitments, commitmentData]);

  React.useEffect(() => {
    if (!refetchCommitmentAPI || !showCommitments) return;
    setRefetchCommitmentAPI(false);
    commitQueryResult.refetch();
  }, [refetchCommitmentAPI, showCommitments]);

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
                <Stack gap="1">
                  <AddCommitments
                    label="Add"
                    resource={resource}
                    disabled={!showCommitments || transferCommitment || isLoading}
                    size="small"
                  />
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
                </Stack>
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
        <div className={`col-span-4 mt-2 mb-5`}>
          {commitments && !isLoading ? (
            <>
              {az.hasCommitments && <p className="font-semibold mb-5">Commitments:</p>}
              <CommitmentTable
                serviceType={serviceType}
                currentCategory={currentCategory}
                currentResource={resource}
                resource={resource}
                currentTab={currentTab}
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

// Memorize component to prevent unnecessary re-renders when parent updates
export default React.memo(ProjectTableDetails, (prevProps, nextProps) => {
  return (
    prevProps.project.metadata.id === nextProps.project.metadata.id &&
    prevProps.showCommitments === nextProps.showCommitments &&
    prevProps.currentTab === nextProps.currentTab &&
    prevProps.mergeOps === nextProps.mergeOps &&
    // It is important to check the object.
    // This way the memo listens to commitment creation or transfer and reacts to them properly.
    prevProps.resource === nextProps.resource
  );
});
