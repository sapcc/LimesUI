/**
 * Copyright 2025 SAP SE
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
import {
  Message,
  Modal,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Select,
  SelectOption,
} from "@cloudoperators/juno-ui-components";
import BaseFooter from "./BaseComponents/BaseFooter";
import useConfirmInput from "./BaseComponents/useConfirmInput";
import { domainStore, globalStore } from "../../StoreProvider";
import { formatTimeISO8160 } from "../../../lib/utils";
import { valueWithUnit } from "../../../lib/unit";
import { Unit } from "../../../lib/unit";

const label = "font-semibold";

const MarketplaceModal = (props) => {
  const { action, title, subText, onModalClose, project, commitment } = props;
  const { amount, availability_zone, duration, expires_at, transfer_token } = commitment;
  const unit = new Unit(commitment.unit);
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({
    confirmationText: subText,
  });
  const { scope } = globalStore();
  const isProjectView = scope.isProject();
  const { projects } = domainStore();
  const sortedProjects = React.useMemo(() => {
    return (
      projects?.sort((a, b) => {
        if (scope.isCluster()) {
          return a["metadata"]["fullName"].toLowerCase().localeCompare(b["metadata"]["fullName"].toLowerCase());
        } else {
          return a["metadata"]["name"].toLowerCase().localeCompare(b["metadata"]["name"].toLowerCase());
        }
      }) || []
    );
  }, [projects]);
  const [targetProject, setTargetProject] = React.useState(isProjectView ? project : null);
  const disabled = !isProjectView && !targetProject;

  function onConfirm() {
    if (disabled) return;
    action(targetProject, commitment, transfer_token);
    onModalClose();
  }

  return (
    <Modal
      className="max-h-full"
      title={title}
      open={true}
      modalFooter={
        <BaseFooter
          disabled={disabled}
          onModalClose={onModalClose}
          guardFns={[checkInput]}
          actionFn={onConfirm}
          variant={"primary"}
        />
      }
      onCancel={() => {
        onModalClose();
      }}
    >
      {disabled && (
        <Message variant="info" className="ml-auto">
          Select a target project.
        </Message>
      )}
      <DataGrid columns={2} columnMaxSize="1fr">
        <DataGridRow>
          <DataGridCell className={label}>Availability Zone:</DataGridCell>
          <DataGridCell>{availability_zone}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className={label}>Amount:</DataGridCell>
          <DataGridCell>{valueWithUnit(amount, unit)}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className={label}>Duration:</DataGridCell>
          <DataGridCell>{duration}</DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell className={label}>Expires at:</DataGridCell>
          <DataGridCell>{formatTimeISO8160(expires_at)}</DataGridCell>
        </DataGridRow>
        {!isProjectView && (
          <DataGridRow>
            <DataGridCell className={label}>Target project:</DataGridCell>
            <DataGridCell>
              <Select
                disabled={sortedProjects.length == 0}
                onChange={(project) => {
                  setTargetProject(project);
                }}
              >
                {sortedProjects.map((project) => (
                  <SelectOption key={project["metadata"]["id"]} value={project}>
                    {scope.isDomain() && project["metadata"]["name"]}
                    {scope.isCluster() && project["metadata"]["fullName"]}
                  </SelectOption>
                ))}
              </Select>
            </DataGridCell>
          </DataGridRow>
        )}
      </DataGrid>
      <ConfirmInput disabled={disabled} subText={subText} {...inputProps} />
    </Modal>
  );
};

export default MarketplaceModal;
