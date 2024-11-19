/**
 * Copyright 2024 SAP SE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import useMaxQuotaSets from "./useMaxQuotaSets";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import StoreProvider from "../StoreProvider";

const ExampleCMP = ({ project, resource, serviceType, postMaxQuota }) => {
  const { MaxQuotaInput, maxQuotaInputProps, MaxQuotaEdit, maxQuotaEditProps } = useMaxQuotaSets({
    project: project,
    resource: resource,
    serviceType: serviceType,
    postMaxQuota: postMaxQuota,
  });
  return (
    <div>
      <MaxQuotaInput {...maxQuotaInputProps} />
      <MaxQuotaEdit {...maxQuotaEditProps} />
    </div>
  );
};

describe("test useMaxQuotaSets", () => {
  test("no input props should render default", () => {
    render(
      <PortalProvider>
        <StoreProvider>
          <ExampleCMP />
        </StoreProvider>
      </PortalProvider>
    );
    expect(screen.queryByText(/not set/i)).not.toBe(null);
    expect(screen.queryByTestId("maxQuotaEdit")).not.toBe(null);
  });
  test("should successfully call max quota API", async () => {
    const project = { metadata: { name: "testProject", id: 12, domainID: 13 } };
    const resource = { usage: 8, quota: 10 };
    const postMaxQuota = jest.fn((object, domainID, projectID) => {
      expect(projectID).toEqual(12);
      expect(domainID).toEqual(13);
    });
    render(
      <PortalProvider>
        <StoreProvider>
          <ExampleCMP project={project} resource={resource} serviceType={"serviceA"} postMaxQuota={postMaxQuota} />
        </StoreProvider>
      </PortalProvider>
    );
    expect(screen.queryByText(/not set/i)).not.toBe(null);
    const editButton = screen.getByTestId("maxQuotaEdit");
    fireEvent.click(editButton);
    const saveButton = screen.getByTestId("maxQuotaSave");
    const quotaInput = screen.getByTestId("maxQuotaInput");
    fireEvent.change(quotaInput, { target: { value: 2 } });
    fireEvent.click(saveButton);
    await waitFor(() => {
      expect(postMaxQuota).toHaveBeenCalled();
    });
  });
  test("should display max quota value as default input", () => {
    const project = { metadata: { name: "testProject", id: 12, domainID: 13 } };
    const resource = { usage: 8, quota: 10, max_quota: 9 };
    render(
      <PortalProvider>
        <StoreProvider>
          <ExampleCMP project={project} resource={resource} serviceType={"serviceA"} />
        </StoreProvider>
      </PortalProvider>
    );
    const editButton = screen.getByTestId("maxQuotaEdit");
    fireEvent.click(editButton);
    const cancelButton = screen.getByTestId("maxQuotaCancel");
    const quotaInput = screen.getByTestId("maxQuotaInput");
    fireEvent.change(quotaInput, { target: { value: 2 } });
    fireEvent.click(cancelButton);
    const editButton2 = screen.getByTestId("maxQuotaEdit");
    fireEvent.click(editButton2);
    const quotaInput2 = screen.getByTestId("maxQuotaInput");
    expect(quotaInput2).toHaveValue("9");
  });
  test("should display correct unit values", () => {
    const project = { metadata: { name: "testProject", id: 12, domainID: 13 } };
    const resource = { usage: 512, quota: 1024, max_quota: 1024, unit: "MiB" };
    render(
      <PortalProvider>
        <StoreProvider>
          <ExampleCMP project={project} resource={resource} serviceType={"serviceA"} />
        </StoreProvider>
      </PortalProvider>
    );
    expect(screen.queryByText(/1 gib/i)).not.toBe(null);
    // false input (no unit)
    const editButton = screen.getByTestId("maxQuotaEdit");
    fireEvent.click(editButton);
    const quotaInput = screen.getByTestId("maxQuotaInput");
    fireEvent.change(quotaInput, { target: { value: 2 } });
    const saveButton = screen.getByTestId("maxQuotaSave");
    fireEvent.click(saveButton);
    expect(quotaInput.validity.tooShort).toBe(false);
  });
  test("reject value that is already set on the backend", async () => {
    const project = { metadata: { name: "testProject", id: 12, domainID: 13 } };
    const resource = { usage: 8, quota: 10, max_quota: 10 };
    const postMaxQuota = jest.fn(() => {});
    render(
      <PortalProvider>
        <StoreProvider>
          <ExampleCMP project={project} resource={resource} serviceType={"serviceA"} postMaxQuota={postMaxQuota} />
        </StoreProvider>
      </PortalProvider>
    );
    const editButton = screen.getByTestId("maxQuotaEdit");
    fireEvent.click(editButton);
    const quotaInput = screen.getByTestId("maxQuotaInput");
    fireEvent.change(quotaInput, { target: { value: 10 } });
    const saveButton = screen.getByTestId("maxQuotaSave");
    fireEvent.click(saveButton);
    await waitFor(() => {
      expect(postMaxQuota).not.toHaveBeenCalled();
    });
  });
});
