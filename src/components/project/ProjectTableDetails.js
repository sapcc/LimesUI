import React from "react";
import ResourceBarBuilder from "../resourceBar/ResourceBarBuilder";
import CommitmentTable from "../commitment/CommitmentTable";
import AddCommitments from "../shared/AddCommitments";
import {
  projectStore,
  projectStoreActions,
  createCommitmentStore,
  createCommitmentStoreActions,
} from "../StoreProvider";
import { useQuery } from "@tanstack/react-query";
import { tracksQuota } from "../../lib/utils";
import {
  DataGridRow,
  DataGridCell,
  Stack,
  Icon,
  LoadingIndicator,
  Button,
} from "juno-ui-components";
import { DomainBadges, ProjectBadges } from "../shared/LimesBadges";
import useResetCommitment from "../../hooks/useResetCommitment";

const ProjectTableDetails = (props) => {
  const {
    index,
    showCommitments,
    updateShowCommitments,
    handleCommitmentTransfer,
    currentCategory,
    project,
    resource,
    az,
    currentAZ,
    colSpan,
  } = props;
  const { metadata } = project;
  const { name: projectName, id: projectID } = metadata;
  const { quota, unit } = resource;
  const commitmentsInAZ = az[1];
  const { commitments } = projectStore();
  const { currentProject } = createCommitmentStore();
  const { refetchCommitmentAPI } = createCommitmentStore();
  const { setCommitments } = projectStoreActions();
  const { setRefetchCommitmentAPI } = createCommitmentStoreActions();
  const { isCommitting } = createCommitmentStore();
  const { transferCommitment } = createCommitmentStore();
  const { isTransferring } = createCommitmentStore();
  const { setIsCommitting } = createCommitmentStoreActions();
  const { setTransferCommitment } = createCommitmentStoreActions();
  const { resetCommitmentTransfer } = useResetCommitment();
  // Be careful here! If enabled state is passed in as undefined, the useQuery hook spams the limes API for all projects!
  const commitQueryResult = useQuery({
    queryKey: ["commitmentData", projectID],
    enabled: showCommitments,
  });
  const { data: commitmentData, isLoading } = commitQueryResult;
  const [moveCommitment, setMoveCommitment] = React.useState(false);
  const [originProject, setOriginProject] = React.useState(false);

  React.useEffect(() => {
    if (!showCommitments || !commitmentData) return;
    setCommitments(commitmentData.commitments);
  }, [showCommitments, commitmentData]);

  React.useEffect(() => {
    if (!refetchCommitmentAPI || !showCommitments) return;
    setRefetchCommitmentAPI(false);
    commitQueryResult.refetch();
  }, [refetchCommitmentAPI]);

  // only display the move commitment button on projects with a commitment on them.
  React.useEffect(() => {
    az.commitmentSum > 0 ? setMoveCommitment(true) : setMoveCommitment(false);
  }, [showCommitments, az]);

  // Only display transfer button on other projects except the origin project which a commitments transfers from.
  React.useEffect(() => {
    if (!currentProject) {
      setOriginProject(false);
    } else {
      setOriginProject(project.metadata.id == currentProject.metadata.id);
    }
  }, [currentProject]);

  // TODO: As soon as the limes API is ready, activate the transfer commitment (move) button.
  return (
    <React.Fragment>
      <DataGridRow>
        <DataGridCell key={metadata.name} className={"pl-0"}>
          <Stack>
            <Icon
              icon={showCommitments ? "expandMore" : "chevronRight"}
              onClick={() => {
                resetCommitmentTransfer();
                setMoveCommitment(false);
                setIsCommitting(false);
                updateShowCommitments(index);
              }}
            />
            <Stack direction={"vertical"}>
              {projectName}
              <div className="text-xs">{projectID}</div>
            </Stack>
          </Stack>
        </DataGridCell>
        <DataGridCell>
          <ResourceBarBuilder
            key={metadata.name}
            unit={unit}
            usage={commitmentsInAZ.usage}
            isAZ={true}
            commitment={az.commitmentSum}
            quota={quota}
            tracksQuota={tracksQuota(resource)}
            editableResource={true}
            equallySized={true}
          />
        </DataGridCell>
        <DataGridCell>
          <div key={metadata.name}>
            <Stack>
              <DomainBadges resource={resource} az={az} />
            </Stack>
            <Stack>
              <ProjectBadges az={az[1]} />
            </Stack>
          </div>
        </DataGridCell>
        <DataGridCell>
          {!isTransferring || originProject ? (
            <div>
              <AddCommitments
                label="Add"
                disabled={!showCommitments || transferCommitment}
                size="small"
              />
              {false && (
                <Button
                  className={"ml-1"}
                  data-cy="moveCommitment"
                  variant="primary"
                  icon="edit"
                  disabled={
                    !showCommitments ||
                    !moveCommitment ||
                    transferCommitment ||
                    isCommitting
                  }
                  size="small"
                  onClick={() => {
                    setTransferCommitment(true);
                  }}
                >
                  Move
                </Button>
              )}
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
        </DataGridCell>
      </DataGridRow>
      {showCommitments && (
        <div className={`${colSpan} mt-2 mb-5`}>
          {commitments && !isLoading ? (
            <>
              {az.commitmentSum > 0 && (
                <p className="font-semibold mb-5">Commitments:</p>
              )}
              <CommitmentTable
                currentCategory={currentCategory}
                currentResource={resource.name}
                resource={resource}
                currentAZ={currentAZ}
                commitmentData={commitments}
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