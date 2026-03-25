// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { Workbook } from "@cj-tech-master/excelts";
import { Unit } from "../../lib/unit";
import { formatTimeISO8160 } from "../../lib/utils";
import { CustomZones } from "../../lib/constants";
import tableStylings from "./TableExportStylings";

export async function createProjectExportWorkbook({ projectData, resourceInfo, domainInfo, exportOptions }) {
  const { projectsToReport, projectResourceAZMap, commitmentsMap } = projectData;
  const { service, currentResource, unitName, valueFormat } = resourceInfo;
  const { domainMeta, domainDataByScope } = domainInfo;
  const { withAllCommitments, withCurrentFilter, commitmentsIncluded, isEmptyLabelFilterQuery } = exportOptions;

  const workbook = new Workbook();
  const sheet = workbook.addWorksheet("Projects");

  const projectRowContent = ["DomainID", "DomainName", "ProjectID", "ProjectName"];
  if (!withAllCommitments) {
    const resourceSpecifics = ["Service", "Resource"];
    if (withCurrentFilter) {
      resourceSpecifics.push("AvailabilityZone");
    }
    resourceSpecifics.push("Usage", "ErrorUsage", "Quota", "CommitmentSum", "Unit");
    projectRowContent.push(...resourceSpecifics);
  }
  sheet.addRow(projectRowContent);

  let commitmentSheet = null;
  // A filterQuery with empty labels should add the commitment worksheet and its headers,
  // despite the worksheet itself not carrying commitment data.
  if (commitmentsIncluded || isEmptyLabelFilterQuery) {
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
    const projectMapData = projectResourceAZMap.get(metadata.id) ?? {};
    const resource = projectMapData.resource ?? { usage: 0, quota: 0, commitmentSum: 0 };
    const az = projectMapData.az ?? {};
    const perAz = resource.per_az ?? [];
    const errorUsage = perAz.find((zone) => zone?.name === CustomZones.UNKNOWN)?.usage ?? 0;
    const projectSheetContent = [
      domainDataByScope(metadata, domainMeta).id,
      domainDataByScope(metadata, domainMeta).name,
      metadata.id,
      metadata.name,
    ];
    if (!withAllCommitments) {
      const resourceSpecifics = [service, resource.name];
      if (withCurrentFilter) {
        resourceSpecifics.push(az.name);
      }
      resourceSpecifics.push(
        valueFormat(resource.usage),
        valueFormat(errorUsage),
        valueFormat(resource.quota),
        valueFormat(resource.commitmentSum),
        unitName
      );
      projectSheetContent.push(...resourceSpecifics);
    }
    sheet.addRow(projectSheetContent);

    if (commitmentSheet && commitmentsIncluded) {
      const projectCommitments = commitmentsMap.get(metadata.id) || [];
      projectCommitments.forEach((commitment) => {
        const unit = new Unit(commitment?.unit || "");
        if (!withAllCommitments) {
          if (commitment.resource_name !== currentResource.name) {
            return;
          }
          if (withCurrentFilter && commitment.availability_zone !== az.name) {
            return;
          }
        }
        commitmentSheet.addRow([
          domainDataByScope(metadata, domainMeta).id,
          domainDataByScope(metadata, domainMeta).name,
          metadata.id,
          metadata.name,
          commitment.service_type || service,
          commitment.resource_name || resource.name,
          commitment.uuid || "",
          commitment.availability_zone || "",
          valueFormat(commitment.amount, unit),
          commitment?.unit || "",
          commitment.duration || "",
          formatTimeISO8160(commitment.created_at) || "",
          formatTimeISO8160(commitment.confirm_by) || "",
          formatTimeISO8160(commitment.confirmed_at) || "",
          formatTimeISO8160(commitment.expires_at) || "",
          commitment.status || "",
        ]);
      });
    }
  }

  tableStylings.applyAllStylings(sheet);
  if (commitmentSheet) {
    tableStylings.applyAllStylings(commitmentSheet);
  }

  return workbook;
}
