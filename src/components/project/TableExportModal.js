// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import {
  Button,
  Checkbox,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Icon,
  Message,
  Modal,
  Stack,
} from "@cloudoperators/juno-ui-components";
import ToolTipWrapper from "../shared/ToolTipWrapper";

const TableExportModal = (props) => {
  const {
    title,
    onConfirm,
    modalIsOpen,
    setModalIsOpen,
    exportSettings,
    setExportSettings,
    isExporting,
    hasUnit,
    hasCommitmentErrors = false,
    exportError = null,
  } = props;
  const { withAllCommitments, withCommitments, withCurrentFilter, withUnitFormat } = exportSettings;

  return (
    <Modal title={title} open={modalIsOpen} onCancel={() => setModalIsOpen(false)} closeable={!isExporting}>
      {(hasCommitmentErrors || exportError) && (
        <Message variant={hasCommitmentErrors ? "warning" : "danger"} className="mt-4">
          {hasCommitmentErrors && (
            <>
              Failed to load commitments for some projects.
              <br />
              Please retry the request.
            </>
          )}
          {exportError && (
            <>
              Failed to perform the export.
              <br />
              {exportError}
            </>
          )}
        </Message>
      )}
      <DataGrid columns={2}>
        <DataGridRow>
          <DataGridCell>
            <Stack data-testid={"exportAllCommitmentsOption"} gap="1">
              <ToolTipWrapper
                trigger={<Icon icon="info" size="18" className="cursor-pointer" />}
                content={
                  <span>
                    Exports commitments for all available resources.
                    <br />
                    Resource-specific details are omitted.
                  </span>
                }
              />
              Include commitments (all resources):
            </Stack>
          </DataGridCell>
          <DataGridCell>
            <Checkbox
              id="exportAllCommitmentsOptionCheckBox"
              checked={withAllCommitments}
              disabled={isExporting}
              onClick={() =>
                setExportSettings({
                  ...exportSettings,
                  withAllCommitments: !withAllCommitments,
                  withCommitments: false,
                  withUnitFormat: withUnitFormat && !withAllCommitments,
                  withCurrentFilter: false,
                })
              }
            />
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell>
            <Stack gap="1">
              <ToolTipWrapper
                trigger={<Icon icon="info" size="18" className="cursor-pointer" />}
                content={<span>Includes commitments for the current resource in the export.</span>}
              />
              <span
                data-testid={"exportWithCommitmentsOption"}
                className={withAllCommitments ? "text-theme-disabled" : ""}
              >
                Include commitments:
              </span>
            </Stack>
          </DataGridCell>
          <DataGridCell>
            <Checkbox
              id="exportWithCommitmentsOptionCheckBox"
              disabled={withAllCommitments || isExporting}
              checked={withCommitments}
              onClick={() => setExportSettings({ ...exportSettings, withCommitments: !withCommitments })}
            />
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell>
            <Stack gap="1">
              <ToolTipWrapper
                trigger={<Icon icon="info" size="18" className="cursor-pointer" />}
                content={
                  <span>
                    Filters the export to the currently selected AZ.
                    <br />
                    Applies any active project filters and custom sorting.
                  </span>
                }
              />
              <span
                data-testid={"exportWithCurrentAZOption"}
                className={withAllCommitments ? "text-theme-disabled" : ""}
              >
                Limit to current availability zone:
              </span>
            </Stack>
          </DataGridCell>
          <DataGridCell>
            <Checkbox
              id="exportWithCurrentAZOptionCheckBox"
              disabled={withAllCommitments || isExporting}
              checked={withCurrentFilter}
              onClick={() => setExportSettings({ ...exportSettings, withCurrentFilter: !withCurrentFilter })}
            />
          </DataGridCell>
        </DataGridRow>
        {(hasUnit || withAllCommitments) && (
          <DataGridRow>
            <DataGridCell data-testid={"exportWithFormattedValuesOption"}>Format values with units:</DataGridCell>
            <DataGridCell>
              <Checkbox
                id="exportWithFormattedValuesOptionCheckBox"
                checked={withUnitFormat}
                onClick={() => setExportSettings({ ...exportSettings, withUnitFormat: !withUnitFormat })}
                disabled={isExporting}
              />
            </DataGridCell>
          </DataGridRow>
        )}
      </DataGrid>
      <Stack className="mt-4 justify-center" alignment="center">
        <Button
          data-testid={"tableExportModalExportButton"}
          icon={"download"}
          variant="primary"
          label={isExporting ? "Exporting..." : hasCommitmentErrors ? "Retry" : "Export"}
          onClick={() => onConfirm()}
          disabled={isExporting}
        />
      </Stack>
    </Modal>
  );
};

export default TableExportModal;
