// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Button } from "@cloudoperators/juno-ui-components/index";
import TableExportModal from "./TableExportModal";
import { useMutation } from "@tanstack/react-query";
import { Workbook } from "@cj-tech-master/excelts";
import { Unit } from "../../lib/unit";
import { CustomZones } from "../../lib/constants";
import { useDomainStore } from "../StoreProvider";

const TableExport = (props) => {
  const { scope, service, currentResource, projects, filteredProjects, projectResourceAZMap } = props;
  const { unit: unitName } = currentResource;
  const unit = React.useMemo(() => new Unit(unitName || ""), [unitName]);
  const domainData = useDomainStore((state) => state.domainData);
  const { metadata: domainMeta } = domainData ?? {};
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [exportSettings, setExportSettings] = React.useState({
    withCommitments: false,
    withCurrentFilter: false,
    withUnitFormat: false,
  });
  const { withCurrentFilter, withUnitFormat } = exportSettings;

  const projectsToReport = React.useMemo(() => {
    return withCurrentFilter ? filteredProjects : projects;
  }, [withCurrentFilter]);

  const valueFormat = React.useCallback(
    (value) => {
      if (!withUnitFormat) return value;
      return unit.format(value);
    },
    [withUnitFormat, unit]
  );

  const domainDataByScope = React.useCallback((clusterMeta, domainMeta) => {
    if (scope.isCluster()) {
      return { id: clusterMeta.domainID, name: clusterMeta.domainName };
    }
    if (scope.isDomain()) {
      return { id: domainMeta.id, name: domainMeta.name };
    }
    return { id: "", name: "" };
  });

  const tableExportMutation = useMutation({
    mutationFn: async () => {
      const workbook = new Workbook();
      const sheet = workbook.addWorksheet("Data");
      // TODO: implement sheet2 for commitment details. const sheet2 = workbook.addWorksheet("Data2");
      sheet.addRow([
        "DomainID",
        "DomainName",
        "ProjectID",
        "ProjectName",
        "Service",
        "Resource",
        "Usage",
        "ErrorUsage",
        "Quota",
        "CommitmentSum",
        "Unit",
      ]);

      projectsToReport.forEach(async (project, idx) => {
        const { metadata } = project;
        const { resource } = projectResourceAZMap.get(metadata.id);
        const errorUsage = resource?.per_az.find((az) => az?.name === CustomZones.UNKNOWN)?.usage ?? 0;
        sheet.addRow([
          domainDataByScope(metadata, domainMeta).id,
          domainDataByScope(metadata, domainData).name,
          metadata.id,
          metadata.name,
          service,
          resource.name,
          valueFormat(resource.usage),
          valueFormat(errorUsage),
          valueFormat(resource.quota),
          valueFormat(resource.commitmentSum),
          unitName,
        ]);

        // For large reports: Yield to the event loop to prevent UI blocking
        if ((idx + 1) % 500 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 0));
        }
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "limes-export.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Give the browser time to read the blob and process the download.
      setTimeout(() => URL.revokeObjectURL(url), 0);
    },
    onError: (error) => {
      console.error("Export failed:", error);
    },
  });

  const onConfirm = () => {
    tableExportMutation.mutate();
  };

  return (
    <>
      <Button label="Export" icon="contentCopy" size="small" onClick={() => setModalIsOpen(true)} />
      <TableExportModal
        title="Export project view"
        onConfirm={onConfirm}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        exportSettings={exportSettings}
        setExportSettings={setExportSettings}
        isExporting={tableExportMutation.isPending}
        hasUnit={unit.name !== ""}
      />
    </>
  );
};

export default TableExport;
