// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { projectStoreActions } from "../StoreProvider";
import { Button, Stack } from "@cloudoperators/juno-ui-components";
import { createCommitmentStoreActions } from "../StoreProvider";
import { createUnit, valueWithUnit } from "../../lib/unit";
import InputWithUnit from "./InputWithUnit";

const useMaxQuotaSets = (props) => {
  const { project = {}, resource = {}, serviceType = "", postMaxQuota = getMaxQuotaQuery() } = props;
  const { setToast = () => {} } = createCommitmentStoreActions();
  const [maxQuotaState, setMaxQuotaState] = React.useState({
    invalidInput: false,
    isEditing: false,
    isLoading: false,
  });
  const maxQuota = resource?.max_quota;
  const unit = createUnit(resource?.unit);
  const maxQuotaDefaultInput = unit.formatForInput(maxQuota || 0, { ascii: true });
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
    postMaxQuota(parseTarget, domainID, projectID, setMaxQuotaState);
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
  } = props;
  const { styles = "", wrapperStyles = "" } = props;
  const { isEditing = false, invalidInput = false } = maxQuotaState;

  return isEditing ? (
    <InputWithUnit
      className={styles}
      wrapperClassName={wrapperStyles}
      inputRef={inputRef}
      invalid={invalidInput}
      onChange={(e) => handleInput(e)}
      unit={unit}
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
  const { setToast } = createCommitmentStoreActions();
  // maxQuota can be set for a project with n services and m resources.
  return function postMaxQuota(project, domainID, projectID, setMaxQuotaState) {
    if (!project) return;

    maxQuota.mutate(
      { payload: project, targetDomain: domainID, targetProject: projectID },
      {
        onSuccess: () => {
          setRefetchProjectAPI(true);
        },
        onError: (error) => {
          setToast(error.toString());
          setMaxQuotaState({ invalidInput: false, isEditing: true, isLoading: false });
        },
      }
    );
  };
}

export default useMaxQuotaSets;
