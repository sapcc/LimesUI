// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import {
  Button,
  Checkbox,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Modal,
  Stack,
} from "@cloudoperators/juno-ui-components";

const TableExportModal = (props) => {
  const { title, onConfirm, modalIsOpen, setModalIsOpen, exportSettings, setExportSettings, isExporting, hasUnit } =
    props;

  return (
    <Modal title={title} open={modalIsOpen} onCancel={() => setModalIsOpen(false)} closeable={!isExporting}>
      <DataGrid columns={2}>
        <DataGridRow>
          <DataGridCell>Export with commitments:</DataGridCell>
          <DataGridCell>
            <Checkbox />
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell>Export with current filter settings:</DataGridCell>
          <DataGridCell>
            <Checkbox
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
          label={isExporting ? "Exporting..." : "Export"}
          variant="primary"
          onClick={() => onConfirm()}
          disabled={isExporting}
          progress={isExporting}
        />
      </Stack>
    </Modal>
  );
};

export default TableExportModal;
