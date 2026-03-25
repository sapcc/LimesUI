// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { createProjectExportWorkbook } from "./TableExportContents";
import { Unit } from "../../lib/unit";

// Mock the tableStylings module
jest.mock("./TableExportStylings", () => ({
  applyAllStylings: jest.fn(),
}));

const createMockProjectData = () => {
  const projectsToReport = [
    {
      metadata: {
        id: "project-1",
        name: "Project1",
        domainID: "domain-1",
        domainName: "Domain1",
      },
    },
    {
      metadata: {
        id: "project-2",
        name: "Project2",
        domainID: "domain-1",
        domainName: "Domain1",
      },
    },
  ];

  const projectResourceAZMap = new Map();
  projectResourceAZMap.set("project-1", {
    resource: {
      name: "resource-1",
      usage: 10,
      quota: 100,
      commitmentSum: 5,
      per_az: [{ name: "az-1", usage: 5, committed: { "1 year": 5 } }],
    },
    az: { name: "az-1" },
  });
  projectResourceAZMap.set("project-2", {
    resource: {
      name: "resource-1",
      usage: 20,
      quota: 200,
      commitmentSum: 10,
      per_az: [{ name: "az-2", usage: 10, committed: { "1 year": 10 } }],
    },
    az: { name: "az-2" },
  });

  const commitmentsMap = new Map();
  commitmentsMap.set("project-1", [
    {
      uuid: "commitment-1",
      resource_name: "resource-1",
      availability_zone: "az-1",
      amount: 5,
      unit: "",
      duration: "1 year",
      status: "confirmed",
    },
    {
      uuid: "commitment-2",
      resource_name: "resource-2",
      availability_zone: "az-1",
      amount: 1024,
      unit: "MiB",
      duration: "1 year",
      status: "confirmed",
    },
  ]);
  commitmentsMap.set("project-2", [
    {
      uuid: "commitment-3",
      resource_name: "resource-1",
      availability_zone: "az-2",
      amount: 10,
      unit: "",
      duration: "2 years",
      status: "pending",
    },
    {
      uuid: "commitment-4",
      resource_name: "resource-1",
      availability_zone: "az-1",
      amount: 1,
      unit: "",
      duration: "2 years",
      status: "confirmed",
    },
  ]);

  return { projectsToReport, projectResourceAZMap, commitmentsMap };
};

const createMockResourceInfo = () => ({
  currentResource: { name: "resource-1", unit: "" },
  service: "service-1",
  unitName: "",
  valueFormat: (value) => value,
});

const createMockDomainInfo = () => ({
  domainMeta: { id: "domain-1", name: "Domain1" },
  domainDataByScope: (metadata) => ({
    id: metadata.domainID,
    name: metadata.domainName,
  }),
});

const createDefaultExportOptions = () => ({
  withAllCommitments: false,
  withCurrentFilter: false,
  commitmentsIncluded: false,
  isEmptyLabelFilterQuery: false,
});

describe("createProjectExportWorkbook", () => {
  test("creates workbook sheet with correct headers", async () => {
    const projectData = createMockProjectData();
    const resourceInfo = createMockResourceInfo();
    const domainInfo = createMockDomainInfo();
    const exportOptions = createDefaultExportOptions();

    const workbook = await createProjectExportWorkbook({
      projectData,
      resourceInfo,
      domainInfo,
      exportOptions,
    });

    expect(workbook).toBeDefined();
    const projectsSheet = workbook.getWorksheet("Projects");
    expect(projectsSheet).toBeDefined();
    const commitmentsSheet = workbook.getWorksheet("Commitments");
    expect(commitmentsSheet).not.toBeDefined();

    // Header row
    const headerRow = projectsSheet.getRow(1);
    const headerValues = headerRow.values;
    expect(headerValues).toContain("DomainID");
    expect(headerValues).toContain("DomainName");
    expect(headerValues).toContain("ProjectID");
    expect(headerValues).toContain("ProjectName");
    expect(headerValues).toContain("Service");
    expect(headerValues).toContain("Resource");
    expect(headerValues).toContain("Usage");
    expect(headerValues).toContain("Quota");
    expect(headerValues).not.toContain("AvailabilityZone");

    // data row inspection
    const dataRow1 = projectsSheet.getRow(2);
    expect(dataRow1.values).toContain("project-1");
    expect(dataRow1.values).toContain("Project1");
  });

  test("includes AvailabilityZone column", async () => {
    const projectData = createMockProjectData();
    const resourceInfo = createMockResourceInfo();
    const domainInfo = createMockDomainInfo();
    const exportOptions = {
      ...createDefaultExportOptions(),
      withCurrentFilter: true,
    };

    const workbook = await createProjectExportWorkbook({
      projectData,
      resourceInfo,
      domainInfo,
      exportOptions,
    });

    const projectsSheet = workbook.getWorksheet("Projects");
    const headerRow = projectsSheet.getRow(1);

    expect(headerRow.values).toContain("AvailabilityZone");
  });

  test("creates Commitments sheet", async () => {
    const projectData = createMockProjectData();
    const resourceInfo = createMockResourceInfo();
    const domainInfo = createMockDomainInfo();
    const exportOptions = {
      ...createDefaultExportOptions(),
      commitmentsIncluded: true,
    };

    const workbook = await createProjectExportWorkbook({
      projectData,
      resourceInfo,
      domainInfo,
      exportOptions,
    });

    const commitmentsSheet = workbook.getWorksheet("Commitments");
    expect(commitmentsSheet).toBeDefined();

    const headerRow = commitmentsSheet.getRow(1);
    const headerValues = headerRow.values;
    expect(headerValues).toContain("CommitmentID");
    expect(headerValues).toContain("AvailabilityZone");
    expect(headerValues).toContain("Amount");
    expect(headerValues).toContain("Duration");
    expect(headerValues).toContain("State");

    const dataRow1 = commitmentsSheet.getRow(2);
    expect(dataRow1.values).toContain("commitment-1");
  });

  test("project without a matching resource will contain 0 values instead of NAN", async () => {
    // Create project data where the project has no matching resource
    const projectsToReport = [
      {
        metadata: {
          id: "project-3",
          name: "Project3",
          domainID: "domain-1",
          domainName: "Domain1",
        },
      },
    ];
    const projectResourceAZMap = new Map();
    const commitmentsMap = new Map();

    const projectData = { projectsToReport, projectResourceAZMap, commitmentsMap };
    const unit = new Unit("MiB");
    const resourceInfo = {
      currentResource: { name: "resource-1", unit: "MiB" },
      service: "service-1",
      unitName: "MiB",
      valueFormat: (value) => unit.format(value),
    };
    const domainInfo = createMockDomainInfo();
    const exportOptions = createDefaultExportOptions();

    const workbook = await createProjectExportWorkbook({
      projectData,
      resourceInfo,
      domainInfo,
      exportOptions,
    });

    const projectsSheet = workbook.getWorksheet("Projects");
    const dataRow = projectsSheet.getRow(2);
    const rowValues = dataRow.values;

    const headerRow = projectsSheet.getRow(1);
    const headerValues = headerRow.values;
    const usageIndex = headerValues.indexOf("Usage");
    const commitmentSumIndex = headerValues.indexOf("CommitmentSum");

    // Verify usage and commitmentSum are 0 values
    const usageValue = rowValues[usageIndex];
    const commitmentSumValue = rowValues[commitmentSumIndex];
    expect(usageValue).not.toContain("NaN");
    expect(commitmentSumValue).not.toContain("NaN");
    expect(usageValue).toMatch(/0\u202fMiB/);
    expect(commitmentSumValue).toMatch(/0\u202fMiB/);
  });

  test("filters commitments by resource name", async () => {
    const projectData = createMockProjectData();
    const resourceInfo = createMockResourceInfo();
    const domainInfo = createMockDomainInfo();
    const exportOptions = {
      ...createDefaultExportOptions(),
      commitmentsIncluded: true,
      withAllCommitments: false,
    };

    const workbook = await createProjectExportWorkbook({
      projectData,
      resourceInfo,
      domainInfo,
      exportOptions,
    });

    const commitmentsSheet = workbook.getWorksheet("Commitments");
    expect(commitmentsSheet).toBeDefined();

    const commitmentRow1 = commitmentsSheet.getRow(2);
    const commitmentRow2 = commitmentsSheet.getRow(3);
    const commitmentRow3 = commitmentsSheet.getRow(4);
    const commitmentRow4 = commitmentsSheet.getRow(5);

    expect(commitmentRow1.values).toContain("commitment-1");
    expect(commitmentRow2.values).toContain("commitment-3");
    expect(commitmentRow3.values).not.toContain("commitment-2");
    expect(commitmentRow3.values).toContain("commitment-4");
    expect(commitmentRow4.values).not.toContain("commitment-2");
  });

  test("filters commitments by AZ", async () => {
    const projectData = createMockProjectData();
    const resourceInfo = createMockResourceInfo();
    const domainInfo = createMockDomainInfo();
    const exportOptions = {
      ...createDefaultExportOptions(),
      commitmentsIncluded: true,
      withAllCommitments: false,
      withCurrentFilter: true,
    };

    const workbook = await createProjectExportWorkbook({
      projectData,
      resourceInfo,
      domainInfo,
      exportOptions,
    });

    const commitmentsSheet = workbook.getWorksheet("Commitments");
    expect(commitmentsSheet).toBeDefined();

    const commitmentRow1 = commitmentsSheet.getRow(2);
    const commitmentRow2 = commitmentsSheet.getRow(3);
    const commitmentRow3 = commitmentsSheet.getRow(4);

    expect(commitmentRow1.values).toContain("commitment-1");
    expect(commitmentRow2.values).toContain("commitment-3");
    expect(commitmentRow3.values).not.toContain("commitment-2");
    expect(commitmentRow3.values).not.toContain("commitment-4");
  });
});
