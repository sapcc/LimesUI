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
import { useMutation } from "@tanstack/react-query";
import { projectStoreActions } from "../StoreProvider";
import { Button, Stack, TextInput } from "@cloudoperators/juno-ui-components";
import { createCommitmentStoreActions } from "../StoreProvider";
import { Unit, valueWithUnit } from "../../lib/unit";

const useMaxQuotaSets = (props) => {
  const { project = {}, resource = {}, serviceType = "", postMaxQuota = getMaxQuotaQuery() } = props;
  const { setToast = () => {} } = createCommitmentStoreActions();
  const [maxQuotaState, setMaxQuotaState] = React.useState({
    invalidInput: false,
    isEditing: false,
    isLoading: false,
  });
  const maxQuota = resource?.max_quota;
  const unit = new Unit(resource.unit);
  const maxQuotaDefaultInput = unit.format(maxQuota || 0, { ascii: true });
  const inputRef = React.useRef(maxQuotaDefaultInput);

  React.useEffect(() => {
    if (!maxQuotaState.isLoading) return;
    setMaxQuotaState({ ...maxQuotaState, isEditing: false, isLoading: false });
  }, [resource]);

  // Listeners for edit area
  function handleCancel() {
    setToast(null);
    inputRef.current = maxQuotaDefaultInput;
    setMaxQuotaState({
      ...maxQuotaState,
      isEditing: false,
      invalidInput: false,
    });
  }

  function handleEdit() {
    setMaxQuotaState({ ...maxQuotaState, isEditing: true });
  }

  function handleSave() {
    let parsedInput = unit.parse(inputRef.current, false);
    if (parsedInput == maxQuota) {
      setToast("Desired value already set.", "warning");
      return;
    }
    // input of "" sets the maxQuota to null in the database.
    if (inputRef.current == "") parsedInput = null;
    if (parsedInput?.error) {
      setMaxQuotaState({ ...maxQuotaState, invalidInput: true });
      setToast(parsedInput.error);
      return;
    }
    const parseTarget = serializeProject(parsedInput);
    const domainID = project?.metadata.domainID || null;
    const projectID = project?.metadata.id;
    setMaxQuotaState({ ...maxQuotaState, isLoading: true });
    postMaxQuota(parseTarget, domainID, projectID);
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

  // Listeners for input area
  function handleInput(e) {
    setMaxQuotaState({ ...maxQuotaState, invalidInput: false });
    setToast(null);
    inputRef.current = e.target.value;
  }

  const maxQuotaInputProps = {
    handleInput: handleInput,
    inputRef: inputRef,
    maxQuota: maxQuota,
    maxQuotaState: maxQuotaState,
    unit: unit,
  };

  const maxQuotaEditProps = {
    handleCancel: handleCancel,
    handleEdit: handleEdit,
    handleSave: handleSave,
    maxQuotaState: maxQuotaState,
  };

  return {
    MaxQuotaInput,
    maxQuotaInputProps,
    MaxQuotaEdit,
    maxQuotaEditProps,
  };
};

const MaxQuotaInput = (props) => {
  const {
    handleInput = () => {},
    inputRef = React.useRef(""),
    maxQuota = undefined,
    maxQuotaState = () => {},
    unit = "",
    // Custumizations set by the direct caller.
    reducedView = false,
  } = props;
  const { styles = "", wrapperStyles = "" } = props;
  const { isEditing = false, invalidInput = false } = maxQuotaState;

  return isEditing ? (
    <TextInput
      data-testid="maxQuotaInput"
      className={`${styles} ${reducedView && invalidInput && "border-theme-danger"}`}
      wrapperClassName={wrapperStyles}
      value={inputRef.current}
      invalid={!reducedView && invalidInput}
      autoFocus={true}
      onChange={(e) => handleInput(e)}
    />
  ) : maxQuota >= 0 ? (
    valueWithUnit(maxQuota, unit)
  ) : (
    "Not set"
  );
};

const MaxQuotaEdit = (props) => {
  const {
    handleCancel = () => {},
    handleEdit = () => {},
    handleSave = () => {},
    maxQuotaState = {},
    // Custumizations set by the direct caller.
    iconOnlyView = false,
    subduedView = false,
  } = props;
  const { styles = "" } = props;

  const { isEditing = false, isLoading = false } = maxQuotaState;

  return !isEditing ? (
    <Button
      data-testid="maxQuotaEdit"
      className={styles}
      icon="edit"
      size="small"
      variant={subduedView ? "subdued" : "primary"}
      onClick={() => {
        handleEdit();
      }}
    >
      {!iconOnlyView && "Edit"}
    </Button>
  ) : (
    <Stack gap="1">
      <Button
        data-testid="maxQuotaSave"
        className={styles}
        icon="check"
        size="small"
        variant="primary"
        progress={isLoading}
        onClick={() => {
          handleSave();
        }}
      >
        {!iconOnlyView && "Save"}
      </Button>
      <Button
        data-testid="maxQuotaCancel"
        className={styles}
        icon="close"
        size="small"
        onClick={() => {
          handleCancel();
        }}
      >
        {!iconOnlyView && "Cancel"}
      </Button>
    </Stack>
  );
};

function getMaxQuotaQuery() {
  const maxQuota = useMutation({ mutationKey: ["setMaxQuota"] });
  const { setRefetchProjectAPI } = projectStoreActions();
  // maxQuota can be set for a project with n services and m resources.
  return function postMaxQuota(project, domainID, projectID) {
    if (!project) return;

    maxQuota.mutate(
      { payload: project, targetDomain: domainID, targetProject: projectID },
      {
        onSuccess: () => {
          setRefetchProjectAPI(true);
        },
        onError: (error) => {
          setToast(error.toString());
        },
      }
    );
  };
}

export default useMaxQuotaSets;
