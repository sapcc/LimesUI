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
import { labelTypes } from "../shared/LimesBadges";

const TableExport = (props) => {
  const {
    scope,
    labelFilter,
    service,
    currentResource,
    projects,
    filteredProjects,
    projectResourceAZMap,
    isCustomSort,
  } = props;
  const { unit: unitName } = currentResource;
  const unit = React.useMemo(() => new Unit(unitName || ""), [unitName]);
  const hasActiveFilterOrSort = projects.length !== filteredProjects.length || isCustomSort;
  const domainData = useDomainStore((state) => state.domainData);
  const { metadata: domainMeta } = domainData ?? {};
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [exportSettings, setExportSettings] = React.useState({
    withAllCommitments: false, // cluster admin exclusive
    withCommitments: false,
    withCurrentFilter: false,
    withUnitFormat: false,
  });
  const { withAllCommitments, withCommitments, withCurrentFilter, withUnitFormat } = exportSettings;
  const commitmentsIncluded = React.useMemo(
    () => withAllCommitments || withCommitments,
    [withAllCommitments, withCommitments]
  );
  const [commitmentExportTriggered, setCommitmentExportTriggered] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [exportError, setExportError] = React.useState(null);

  const projectsToReport = React.useMemo(() => {
    return withCurrentFilter ? filteredProjects : projects;
  }, [withCurrentFilter, filteredProjects, projects]);

  const valueFormat = React.useCallback(
    (value, u = unit) => {
      if (!withUnitFormat) return value;
      return u.format(value);
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
        enabled: commitmentExportTriggered && commitmentsIncluded && labelFilter !== labelTypes.EMPTY,
        refetchOnMount: false,
        staleTime: Infinity,
        retry: 3,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
      };
    }),
  });

  const { allCommitmentQueriesReady, isLoadingCommitments, commitmentQueryErrors } = React.useMemo(() => {
    return {
      allCommitmentQueriesReady: projectCommitmentQueries.every((query) => !query.isLoading && !query.isFetching),
      isLoadingCommitments: projectCommitmentQueries.some((query) => query.isLoading || query.isFetching),
      commitmentQueryErrors: projectCommitmentQueries.filter((query) => query.isError),
    };
  }, [projectCommitmentQueries]);

  const commitmentsMap = React.useMemo(() => {
    const map = new Map();
    if (!commitmentsIncluded) return map;

    const hasAnyData = projectCommitmentQueries.some((query) => query.data !== undefined);
    if (!hasAnyData) return map;

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
  }, [commitmentsIncluded, projectsToReport, projectCommitmentQueries]);

  const hasCommitmentErrors = commitmentQueryErrors.length > 0;

  React.useEffect(() => {
    if (commitmentExportTriggered && allCommitmentQueriesReady && !isLoadingCommitments && !hasCommitmentErrors) {
      tableExportMutation.mutate();
    }
  }, [commitmentExportTriggered, allCommitmentQueriesReady, isLoadingCommitments, hasCommitmentErrors]);

  React.useEffect(() => {
    if (allCommitmentQueriesReady && hasCommitmentErrors) {
      commitmentQueryErrors.forEach((query) => {
        console.error("Commitment query failed:", query.error.toString());
      });
    }
  }, [allCommitmentQueriesReady, hasCommitmentErrors, commitmentQueryErrors]);

  const tableExportMutation = useMutation({
    mutationFn: async () => {
      const workbook = new Workbook();
      const sheet = workbook.addWorksheet("Projects");

      const projectRowContent = ["DomainID", "DomainName", "ProjectID", "ProjectName"];
      if (!withAllCommitments) {
        const resourceSpecifics = ["Service", "Resource", "Usage", "ErrorUsage", "Quota", "CommitmentSum", "Unit"];
        projectRowContent.push(...resourceSpecifics);
      }
      sheet.addRow(projectRowContent);

      let commitmentSheet = null;
      if (commitmentsIncluded) {
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

      // Yield immediately to allow React to render isPending state
      await new Promise((resolve) => setTimeout(resolve, 0));

      for (let idx = 0; idx < projectsToReport.length; idx++) {
        // For large reports: Yield to the event loop periodically to prevent UI blocking
        if (idx > 0 && idx % 500 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 0));
        }
        const { metadata } = projectsToReport[idx];
        const { resource } = projectResourceAZMap.get(metadata.id);
        const errorUsage = resource?.per_az.find((az) => az?.name === CustomZones.UNKNOWN)?.usage ?? 0;
        const projectSheetContent = [
          domainDataByScope(metadata, domainMeta).id,
          domainDataByScope(metadata, domainData).name,
          metadata.id,
          metadata.name,
        ];
        if (!withAllCommitments) {
          const resourceSpecifics = [
            service,
            resource.name,
            valueFormat(resource.usage),
            valueFormat(errorUsage),
            valueFormat(resource.quota),
            valueFormat(resource.commitmentSum),
            unitName,
          ];
          projectSheetContent.push(...resourceSpecifics);
        }
        sheet.addRow(projectSheetContent);

        if (commitmentSheet && commitmentsIncluded) {
          const projectCommitments = commitmentsMap.get(metadata.id) || [];
          projectCommitments.forEach((commitment) => {
            const unit = new Unit(commitment?.unit || "");
            if (commitment.resource_name !== currentResource.name && !withAllCommitments) return;
            commitmentSheet.addRow([
              domainDataByScope(metadata, domainMeta).id,
              domainDataByScope(metadata, domainData).name,
              metadata.id,
              metadata.name,
              commitment.service_type || service,
              commitment.resource_name || resource.name,
              commitment.id,
              commitment.availability_zone || "",
              valueFormat(commitment.amount, unit),
              commitment?.unit || "",
              commitment.duration || "",
              formatTimeISO8160(commitment.created_at) || "",
              formatTimeISO8160(commitment.confirm_by) || "",
              formatTimeISO8160(commitment.confirmed_at) || "",
              formatTimeISO8160(commitment.expires_at) || "",
              commitment.state || "",
            ]);
          });
        }
      }
      return workbook;
    },
    onSuccess: async (workbook) => {
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
      console.error("Export failed:", error.toString());
      setExportError("Export failed:", error);
    },
    onSettled: () => {
      setCommitmentExportTriggered(false);
    },
  });

  const onConfirm = () => {
    if (hasCommitmentErrors) {
      commitmentQueryErrors.forEach((query) => query.refetch());
      return;
    }
    if (commitmentsIncluded && commitmentsMap.size === 0) {
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
          scope={scope}
          onConfirm={onConfirm}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          exportSettings={exportSettings}
          setExportSettings={setExportSettings}
          disableExportWithFilterDialog={!hasActiveFilterOrSort}
          isLoadingCommitments={isLoadingCommitments || isPending}
          isExporting={tableExportMutation.isPending}
          hasUnit={unit.name !== ""}
          hasCommitmentErrors={allCommitmentQueriesReady && hasCommitmentErrors}
          hasExportError={exportError}
        />
      )}
    </>
  );
};

export default TableExport;
