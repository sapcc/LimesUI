import React from "react";
import { globalStore, createCommitmentStoreActions } from "../StoreProvider";
import {
  DataGridCell,
  DataGridRow,
  Stack,
  TextInput,
  Button,
} from "juno-ui-components";
import { Unit, valueWithUnit } from "../../lib/unit";

// NOTE: setMaxQuota is not available on resources that have a parentResource.
const ProjectQuotaDetails = (props) => {
  const { serviceType, project, resource, setMaxQuota } = props;
  const { metadata } = project;
  const { name: projectName, id: projectID } = metadata;
  const maxQuota = resource?.max_quota;
  const usage = resource.usage;
  const quota = resource.quota;
  const unit = new Unit(resource.unit);
  const maxQuotaDefaultInput = unit.format(maxQuota || 0, { ascii: true });
  const inputRef = React.useRef(maxQuotaDefaultInput);
  const { scope } = globalStore();
  const { setToast } = createCommitmentStoreActions();
  const [isEditing, setIsEditing] = React.useState(false);
  const [invalidInput, setInvalidInput] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading) return;
    setIsLoading(false);
    setIsEditing(false);
  }, [resource]);

  function handleInput(e) {
    setInvalidInput(false);
    setToast(null);
    inputRef.current = e.target.value;
  }

  function handleSave() {
    let parsedInput = unit.parse(inputRef.current, false);
    // input of "" sets the maxQuota to null in the database.
    if (inputRef.current == "") parsedInput = null;
    if (parsedInput?.error) {
      setInvalidInput(true);
      setToast(parsedInput.error);
      return;
    }
    const parseTarget = serializeProject(parsedInput);
    const domainID = project?.metadata.domainID || null;
    const projectID = project.metadata.id;
    setIsLoading(true);
    setMaxQuota(parseTarget, domainID, projectID);
  }

  function serializeProject(maxQuota) {
    const parseTarget = {
      project: {
        services: [
          {
            type: serviceType,
            resources: [
              {
                name: resource.name,
                max_quota: maxQuota,
                unit: resource.unit,
              },
            ],
          },
        ],
      },
    };

    return parseTarget;
  }

  return (
    <DataGridRow>
      <DataGridCell>
        <Stack direction={"vertical"} className="w-full">
          <div className="truncate">
            {scope.isCluster() ? metadata.fullName : projectName}
          </div>
          <div className="text-xs truncate">{projectID}</div>
        </Stack>
      </DataGridCell>
      <DataGridCell>{valueWithUnit(usage, unit)}</DataGridCell>
      <DataGridCell>{valueWithUnit(quota, unit)}</DataGridCell>
      <DataGridCell>
        {isEditing ? (
          <TextInput
            value={inputRef.current}
            invalid={invalidInput}
            autoFocus={true}
            onChange={(e) => handleInput(e)}
          />
        ) : maxQuota >= 0 ? (
          valueWithUnit(maxQuota, unit)
        ) : (
          "Not set"
        )}
      </DataGridCell>
      <DataGridCell>
        {!isEditing ? (
          <Button
            size="small"
            variant="primary"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
        ) : (
          <Stack alignment="horizontal">
            <Button
              size="small"
              variant="primary"
              progress={isLoading}
              onClick={() => {
                handleSave();
              }}
            >
              Save
            </Button>
            <Button
              className="ml-1"
              size="small"
              onClick={() => {
                setToast(null);
                setInvalidInput(false);
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </Stack>
        )}
      </DataGridCell>
    </DataGridRow>
  );
};

export default ProjectQuotaDetails;
