// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import {
  Message,
  Modal,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Pagination,
  Select,
  SelectOption,
  Stack,
} from "@cloudoperators/juno-ui-components";
import BaseFooter from "./BaseComponents/BaseFooter";
import useConfirmInput from "./BaseComponents/useConfirmInput";
import { useGlobalStore, useDomainStore } from "../../StoreProvider";
import { formatTimeISO8160 } from "../../../lib/utils";
import { Scope } from "../../../lib/scope";
import { valueWithUnit } from "../../../lib/unit";
import { Unit } from "../../../lib/unit";
import DebouncedSearchInput from "../../shared/DebouncedSearchInput";
import { chunkProjects } from "../../../lib/utils";

const label = "font-semibold";

// Fix to hide project ID in selected value display but show in dropdown
const selectOptionStyles = `
  .select-option {
    display: none;
  }
  [role="listbox"] .select-option {
    display: inline;
  }
`;

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
  const [currentPage, setCurrentPage] = React.useState(0);
  const disabled = !isProjectView && !targetProject;
  function getProjectNameByScope(project) {
    return scope.isCluster() ? project["metadata"]["fullName"] : project["metadata"]["name"];
  }

  const sortedProjects = React.useMemo(() => {
    if (!projects) return [];
    const nameKey = scope.isCluster() ? "fullName" : "name";
    return projects
      .filter((project) => {
        const filter = nameFilter.toLocaleLowerCase().trim();
        if (!filter) return true;
        const projectName = getProjectNameByScope(project).toLocaleLowerCase();
        const projectID = project.metadata.id || "";
        return projectName.includes(filter) || projectID.includes(filter);
      })
      .sort((a, b) => {
        return a["metadata"][nameKey]
          .toLowerCase()
          .localeCompare(b["metadata"][nameKey].toLowerCase(), undefined, { numeric: true, sensivity: "base" });
      });
  }, [projects, scope, nameFilter]);

  const chunkSize = 50;
  const paginatedProjects = React.useMemo(() => {
    return chunkProjects(sortedProjects, chunkSize);
  }, [sortedProjects]);

  function onConfirm() {
    if (disabled) return;
    action(targetProject, commitment, transfer_token);
    onModalClose();
  }

  return (
    <>
      <style>{selectOptionStyles}</style>
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
                  <Stack
                    className="px-2 py-1 w-96"
                    gap="2"
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <DebouncedSearchInput styling="w-full" onChange={setNameFilter} delay={300} />
                    {projects.length > chunkSize && (
                      <Pagination
                        data-testid="Pagination"
                        currentPage={currentPage + 1}
                        onPressPrevious={(page) => {
                          setCurrentPage(page - 1);
                        }}
                        onPressNext={(page) => {
                          setCurrentPage(page - 1);
                        }}
                        pages={paginatedProjects.length}
                        onKeyPress={(page) => {
                          if (isNaN(page)) return;
                          setCurrentPage(page - 1);
                        }}
                        variant="number"
                      />
                    )}
                  </Stack>
                  {paginatedProjects[currentPage]?.map((project) => {
                    const projectName = getProjectNameByScope(project);
                    const projectID = project.metadata.id || "";
                    return (
                      <SelectOption
                        className="wrap-break-word w-full"
                        data-testid={`selectOption`}
                        key={projectID || projectName}
                        value={project}
                      >
                        {projectName}
                        <br className="select-option" />
                        <span className="text-xs text-sap-grey-4 select-option">{projectID}</span>
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
    </>
  );
};

export default MarketplaceModal;
