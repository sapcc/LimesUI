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
    scope,
    onConfirm,
    modalIsOpen,
    setModalIsOpen,
    exportSettings,
    setExportSettings,
    isLoadingCommitments,
    isExporting,
    hasUnit,
    hasCommitmentErrors = false,
    exportError = null,
  } = props;
  const { withAllCommitments, withCommitments, withCurrentFilter, withUnitFormat } = exportSettings;

  return (
    <Modal
      title={title}
      open={modalIsOpen}
      onCancel={() => setModalIsOpen(false)}
      closeable={!isExporting && !isLoadingCommitments}
    >
      {(hasCommitmentErrors || exportError) && (
        <Message variant="danger" className="mt-4">
          {hasCommitmentErrors && (
            <>
              Failed to load commitments for some projects.
              <br />
              Check the browser&apos;s log to retrieve details.
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
        {scope.isCluster() && (
          <DataGridRow>
            <DataGridCell>
              <Stack data-testid={"exportClusterAdminOption"} gap="1">
                Region-wide commitment export:
                <ToolTipWrapper
                  trigger={<Icon icon="info" size="18" className="cursor-pointer" />}
                  content={
                    <span>
                      Exports all active commitments across the entire region.
                      <br />
                      Resource-specific details are omitted. <br />
                    </span>
                  }
                />
              </Stack>
            </DataGridCell>
            <DataGridCell>
              <Checkbox
                id="exportClusterAdminOptionCheckBox"
                checked={withAllCommitments}
                onClick={() =>
                  setExportSettings({
                    ...exportSettings,
                    withAllCommitments: !withAllCommitments,
                    withCommitments: false,
                    withUnitFormat: withAllCommitments ? false : withUnitFormat,
                    withCurrentFilter: false,
                  })
                }
              />
            </DataGridCell>
          </DataGridRow>
        )}
        <DataGridRow>
          <DataGridCell>
            <span
              data-testid={"exportWithCommitmentsOption"}
              className={withAllCommitments ? "text-theme-disabled" : ""}
            >
              Export with commitments:
            </span>
          </DataGridCell>
          <DataGridCell>
            <Checkbox
              id="exportWithCommitmentsOptionCheckBox"
              disabled={withAllCommitments}
              checked={withCommitments}
              onClick={() => setExportSettings({ ...exportSettings, withCommitments: !withCommitments })}
            />
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell>
            <Stack gap="1">
              <span
                data-testid={"exportWithCurrentFilterOption"}
                className={withAllCommitments ? "text-theme-disabled" : ""}
              >
                Export with current filter settings:
              </span>
              <ToolTipWrapper
                trigger={<Icon icon="info" size="18" className="cursor-pointer" />}
                content={
                  <span>
                    <b>This option is enabled when:</b> <br />
                    • project filters are applied or <br />• custom sorting is applied. <br />
                    Limits results to the current availability zone.
                  </span>
                }
              />
            </Stack>
          </DataGridCell>
          <DataGridCell>
            <Checkbox
              id="exportWithCurrentFilterOptionCheckBox"
              disabled={withAllCommitments}
              checked={withCurrentFilter}
              onClick={() => setExportSettings({ ...exportSettings, withCurrentFilter: !withCurrentFilter })}
            />
          </DataGridCell>
        </DataGridRow>
        {(hasUnit || withAllCommitments) && (
          <DataGridRow>
            <DataGridCell data-testid={"exportWithFormattedValuesOption"}>
              Export with unit formatted values:
            </DataGridCell>
            <DataGridCell>
              <Checkbox
                id="exportWithFormattedValuesOptionCheckBox"
                checked={withUnitFormat}
                onClick={() => setExportSettings({ ...exportSettings, withUnitFormat: !withUnitFormat })}
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
          label={isExporting || isLoadingCommitments ? "Exporting..." : hasCommitmentErrors ? "Retry" : "Export"}
          onClick={() => onConfirm()}
          disabled={isExporting || isLoadingCommitments}
        />
      </Stack>
    </Modal>
  );
};

export default TableExportModal;
