// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

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
import { useGlobalStore, useDomainStore } from "../../StoreProvider";
import { formatTimeISO8160 } from "../../../lib/utils";
import { Scope } from "../../../lib/scope";
import { valueWithUnit } from "../../../lib/unit";
import { Unit } from "../../../lib/unit";
import DebouncedSearchInput from "../../shared/DebouncedSearchInput";

const label = "font-semibold";

const MarketplaceModal = (props) => {
  const { action, title, subText, onModalClose, project, commitment } = props;
  const { amount, availability_zone, duration, expires_at, transfer_token } = commitment;
  const unit = new Unit(commitment.unit);
  const { ConfirmInput, inputProps, checkInput } = useConfirmInput({
    confirmationText: subText,
  });
  const scope = new Scope(useGlobalStore((state) => state.scope));
  const isProjectView = scope.isProject();
  const projects = useDomainStore((state) => state.projects);
  const [nameFilter, setNameFilter] = React.useState("");
  const [targetProject, setTargetProject] = React.useState(isProjectView ? project : null);
  const disabled = !isProjectView && !targetProject;

  const sortedProjects = React.useMemo(() => {
    if (!projects) return [];
    const nameKey = scope.isCluster() ? "fullName" : "name";
    return projects
      .filter((project) => {
        const filter = nameFilter.toLocaleLowerCase().trim();
        if (!filter) return true;
        const projectName = project["metadata"][nameKey]?.toLowerCase() || "";
        return projectName.includes(filter);
      })
      .sort((a, b) => {
        return a["metadata"][nameKey].toLowerCase().localeCompare(b["metadata"][nameKey].toLowerCase());
      });
  }, [projects, scope, nameFilter]);

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
        {!isProjectView && (
          <DataGridRow>
            <DataGridCell className={label}>Target project:</DataGridCell>
            <DataGridCell>
              <Select
                data-testid={"targetProjectSelect"}
                disabled={sortedProjects.length == 0}
                onChange={(project) => {
                  setTargetProject(project);
                }}
              >
                <div
                  className="px-2 py-1"
                  onKeyDown={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <DebouncedSearchInput styling="w-full" onChange={setNameFilter} delay={300} />
                </div>
                {sortedProjects.map((project) => {
                  const projectName = scope.isDomain() ? project["metadata"]["name"] : project["metadata"]["fullName"];
                  return (
                    <SelectOption
                      className="block wrap-break-word w-56"
                      data-testid={`selectOption`}
                      key={project["metadata"]["id"]}
                      value={project}
                    >
                      {projectName}
                    </SelectOption>
                  );
                })}
              </Select>
            </DataGridCell>
          </DataGridRow>
        )}
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
      </DataGrid>
      <ConfirmInput disabled={disabled} subText={subText} {...inputProps} />
    </Modal>
  );
};

export default MarketplaceModal;
