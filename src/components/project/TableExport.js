// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Button } from "@cloudoperators/juno-ui-components/index";
import TableExportModal from "./TableExportModal";
import { useMutation, useQueries } from "@tanstack/react-query";
import { Unit } from "../../lib/unit";
import { useDomainStore } from "../StoreProvider";
import { labelTypes } from "../shared/LimesBadges";
import { createProjectExportWorkbook } from "./TableExportContents";

const TableExport = (props) => {
  const { scope, labelFilter, service, currentResource, projects, filteredProjects, projectResourceAZMap } = props;
  const { unit: unitName } = currentResource;
  const unit = React.useMemo(() => new Unit(unitName || ""), [unitName]);
  const domainData = useDomainStore((state) => state.domainData);
  const { metadata: domainMeta } = domainData ?? {};
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [exportSettings, setExportSettings] = React.useState({
    withAllCommitments: false, // exports commitments of all committable resources
    withCommitments: false, // includes commitments to the default, resource based export
    withCurrentFilter: false, // limits exports to AZ level
    withUnitFormat: false,
  });
  const { withAllCommitments, withCommitments, withCurrentFilter, withUnitFormat } = exportSettings;
  const commitmentsIncluded = React.useMemo(
    () => withAllCommitments || withCommitments,
    [withAllCommitments, withCommitments]
  );
  const isEmptyLabelFilterQuery = React.useMemo(
    () => labelFilter === labelTypes.EMPTY && withCurrentFilter,
    [labelFilter, withCurrentFilter]
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
        enabled: commitmentExportTriggered && commitmentsIncluded && !isEmptyLabelFilterQuery,
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
    if (!commitmentsIncluded || !allCommitmentQueriesReady) return map;

    // Ensure all queries have actually fetched data (and don't just idle)
    const queriesHaveData = projectCommitmentQueries.every((query) => query.data !== undefined);
    if (!queriesHaveData) return map;

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
  }, [commitmentsIncluded, allCommitmentQueriesReady, projectsToReport, projectCommitmentQueries]);

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

  const generateExportFilename = React.useCallback(() => {
    const parts = ["limes-export"];

    if (!withAllCommitments) {
      // Include service and resource name for resource-specific exports
      if (service) parts.push(service);
      if (currentResource?.name) parts.push(currentResource.name);

      // Include AZ name when filtering by current AZ
      if (withCurrentFilter && projectsToReport.length > 0) {
        const firstProject = projectsToReport[0];
        const projectData = projectResourceAZMap.get(firstProject.metadata.id);
        if (projectData?.az?.name) {
          parts.push(projectData.az.name);
        }
      }
    } else {
      parts.push("all-commitments");
    }

    return `${parts.join("-")}.xlsx`;
  }, [withAllCommitments, withCurrentFilter, service, currentResource, projectsToReport, projectResourceAZMap]);

  const tableExportMutation = useMutation({
    mutationFn: async () => {
      return createProjectExportWorkbook({
        projectData: { projectsToReport, projectResourceAZMap, commitmentsMap },
        resourceInfo: { service, currentResource, unitName, valueFormat },
        domainInfo: { domainMeta, domainDataByScope },
        exportOptions: { withAllCommitments, withCurrentFilter, commitmentsIncluded, isEmptyLabelFilterQuery },
      });
    },
    onSuccess: async (workbook) => {
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = generateExportFilename();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Give the browser time to read the blob and process the download.
      setTimeout(() => URL.revokeObjectURL(url), 0);
    },
    onError: (error) => {
      console.error(error);
      setExportError(error.toString());
    },
    onSettled: () => {
      setCommitmentExportTriggered(false);
    },
  });

  const onConfirm = () => {
    if (exportError) {
      setExportError(null);
    }
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
      <Button
        data-testid={"tableExportButton"}
        label="Export"
        icon="contentCopy"
        size="small"
        onClick={() => setModalIsOpen(true)}
      />
      {modalIsOpen && (
        <TableExportModal
          title="Export project view"
          onConfirm={onConfirm}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          exportSettings={exportSettings}
          setExportSettings={setExportSettings}
          isLoadingCommitments={isLoadingCommitments || isPending}
          isExporting={tableExportMutation.isPending}
          hasUnit={unit.name !== ""}
          hasCommitmentErrors={allCommitmentQueriesReady && hasCommitmentErrors}
          exportError={exportError}
        />
      )}
    </>
  );
};

export default TableExport;
