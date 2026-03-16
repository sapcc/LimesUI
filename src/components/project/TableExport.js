// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Button } from "@cloudoperators/juno-ui-components/index";
import TableExportModal from "./TableExportModal";
import { useMutation, useQueries } from "@tanstack/react-query";
import { Workbook } from "@cj-tech-master/excelts";
import { Unit } from "../../lib/unit";
import { CustomZones } from "../../lib/constants";
import { useDomainStore } from "../StoreProvider";
import { formatTimeISO8160 } from "../../lib/utils";

const TableExport = (props) => {
  const { scope, service, currentResource, projects, filteredProjects, projectResourceAZMap, isCustomSort } = props;
  const { unit: unitName } = currentResource;
  const unit = React.useMemo(() => new Unit(unitName || ""), [unitName]);
  const hasActiveFilterOrSort = projects.length !== filteredProjects.length || isCustomSort;
  const domainData = useDomainStore((state) => state.domainData);
  const { metadata: domainMeta } = domainData ?? {};
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [exportSettings, setExportSettings] = React.useState({
    withCommitments: false,
    withCurrentFilter: false,
    withUnitFormat: false,
  });
  const { withCommitments, withCurrentFilter, withUnitFormat } = exportSettings;
  const [commitmentExportTriggered, setCommitmentExportTriggered] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const projectsToReport = React.useMemo(() => {
    return withCurrentFilter ? filteredProjects : projects;
  }, [withCurrentFilter, filteredProjects, projects]);

  const valueFormat = React.useCallback(
    (value) => {
      if (!withUnitFormat) return value;
      return unit.format(value);
    },
    [withUnitFormat, unit]
  );

  const domainDataByScope = React.useCallback(
    (clusterMeta, domainMeta) => {
      if (scope.isCluster()) {
        return { id: clusterMeta.domainID, name: clusterMeta.domainName };
      }
      if (scope.isDomain()) {
        return { id: domainMeta.id, name: domainMeta.name };
      }
      return { id: "", name: "" };
    },
    [scope]
  );

  const projectCommitmentQueries = useQueries({
    queries: projectsToReport.map((project) => {
      const projectDomainId = domainDataByScope(project.metadata, domainMeta).id;
      return {
        queryKey: ["commitmentData", project.metadata.id, projectDomainId],
        enabled: commitmentExportTriggered && withCommitments,
        refetchOnMount: false,
        staleTime: Infinity,
        retry: 3,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
      };
    }),
  });

  const { allCommitmentQueriesReady, isLoadingCommitments, _commitmentQueryErrors } = React.useMemo(() => {
    return {
      allCommitmentQueriesReady: projectCommitmentQueries.every((query) => !query.isLoading && !query.isFetching),
      isLoadingCommitments: projectCommitmentQueries.some((query) => query.isLoading || query.isFetching),
      _commitmentQueryErrors: projectCommitmentQueries.filter((query) => query.isError),
    };
  }, [projectCommitmentQueries]);

  // Process commitment query results into a Map
  const commitmentsMap = React.useMemo(() => {
    const map = new Map();
    if (!withCommitments) return map;

    projectsToReport.forEach((project, index) => {
      const queryResult = projectCommitmentQueries[index];
      const projectId = project.metadata.id;

      if (queryResult?.data?.commitments) {
        map.set(projectId, queryResult.data.commitments);
      } else {
        map.set(projectId, []);
      }
    });

    return map;
  }, [withCommitments, projectsToReport, projectCommitmentQueries]);

  React.useEffect(() => {
    if (commitmentExportTriggered && allCommitmentQueriesReady && !isLoadingCommitments) {
      tableExportMutation.mutate();
    }
  }, [commitmentExportTriggered, allCommitmentQueriesReady, isLoadingCommitments]);

  const tableExportMutation = useMutation({
    mutationFn: async () => {
      return commitmentsMap;
    },
    onSuccess: async (commitmentsMap) => {
      const workbook = new Workbook();
      const sheet = workbook.addWorksheet("Projects");

      let commitmentSheet = null;
      if (withCommitments) {
        commitmentSheet = workbook.addWorksheet("Commitments");
        commitmentSheet.addRow([
          "DomainID",
          "DomainName",
          "ProjectID",
          "ProjectName",
          "Service",
          "Resource",
          "CommitmentID",
          "AvailabilityZone",
          "Amount",
          "Unit",
          "Duration",
          "CreatedAt",
          "ConfirmBy",
          "ConfirmedAt",
          "ExpiresAt",
          "State",
        ]);
      }

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

      projectsToReport.forEach((project) => {
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

        // Add commitment details to the second sheet if withCommitments is enabled
        if (commitmentSheet) {
          const projectCommitments = commitmentsMap.get(metadata.id) || [];
          projectCommitments.forEach((commitment) => {
            commitmentSheet.addRow([
              domainDataByScope(metadata, domainMeta).id,
              domainDataByScope(metadata, domainData).name,
              metadata.id,
              metadata.name,
              commitment.service_type || service,
              commitment.resource_name || resource.name,
              commitment.id,
              commitment.availability_zone || "",
              valueFormat(commitment.amount),
              unitName,
              commitment.duration || "",
              formatTimeISO8160(commitment.created_at),
              formatTimeISO8160(commitment.confirm_by),
              formatTimeISO8160(commitment.confirmed_at),
              formatTimeISO8160(commitment.expires_at),
              commitment.state || "",
            ]);
          });
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
    onSettled: () => {
      setCommitmentExportTriggered(false);
    },
  });

  const onConfirm = () => {
    if (withCommitments) {
      startTransition(() => setCommitmentExportTriggered(true));
    } else {
      tableExportMutation.mutate();
    }
  };

  return (
    <>
      <Button label="Export" icon="contentCopy" size="small" onClick={() => setModalIsOpen(true)} />
      {modalIsOpen && (
        <TableExportModal
          title="Export project view"
          onConfirm={onConfirm}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          exportSettings={exportSettings}
          setExportSettings={setExportSettings}
          disableExportWithFilterDialog={!hasActiveFilterOrSort}
          isLoadingCommitments={isLoadingCommitments || isPending}
          isExporting={tableExportMutation.isPending}
          hasUnit={unit.name !== ""}
        />
      )}
    </>
  );
};

export default TableExport;
