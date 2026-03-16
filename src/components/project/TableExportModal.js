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
    disableExportWithFilterDialog,
    isLoadingCommitments,
    isExporting,
    hasUnit,
  } = props;

  return (
    <Modal
      title={title}
      open={modalIsOpen}
      onCancel={() => setModalIsOpen(false)}
      closeable={!isExporting && !isLoadingCommitments}
    >
      <DataGrid columns={2}>
        <DataGridRow>
          <DataGridCell>Export with commitments:</DataGridCell>
          <DataGridCell>
            <Checkbox
              checked={exportSettings.withCommitments}
              onClick={() => setExportSettings({ ...exportSettings, withCommitments: !exportSettings.withCommitments })}
            />
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell>
            <Stack gap="1">
              <span className={disableExportWithFilterDialog && "text-theme-disabled"}>
                Export with current filter settings:
              </span>
              {disableExportWithFilterDialog && (
                <ToolTipWrapper
                  trigger={<Icon icon="info" size="18" className="cursor-pointer" />}
                  content={
                    <span>
                      <b>This option is enabled when:</b> <br />
                      • project filters are applied or <br />• custom sorting is applied.
                    </span>
                  }
                />
              )}
            </Stack>
          </DataGridCell>
          <DataGridCell>
            <Checkbox
              disabled={disableExportWithFilterDialog}
              onClick={() =>
                setExportSettings({ ...exportSettings, withCurrentFilter: !exportSettings.withCurrentFilter })
              }
            />
          </DataGridCell>
        </DataGridRow>
        {hasUnit && (
          <DataGridRow>
            <DataGridCell>Export with unit formatted values</DataGridCell>
            <DataGridCell>
              <Checkbox
                onClick={() => setExportSettings({ ...exportSettings, withUnitFormat: !exportSettings.withUnitFormat })}
              />
            </DataGridCell>
          </DataGridRow>
        )}
      </DataGrid>
      <Stack className="mt-4 justify-center" alignment="center">
        <Button
          icon={"download"}
          variant="primary"
          label={isExporting || isLoadingCommitments ? "Exporting..." : "Export"}
          onClick={() => onConfirm()}
          disabled={isExporting || isLoadingCommitments}
        />
      </Stack>
    </Modal>
  );
};

export default TableExportModal;
