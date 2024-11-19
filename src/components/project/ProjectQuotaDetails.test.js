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
import { act, fireEvent, renderHook, screen, waitFor } from "@testing-library/react";
import ProjectQuotaDetails from "./ProjectQuotaDetails";
import { createCommitmentStoreActions, globalStoreActions } from "../StoreProvider";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import { Scope } from "../../lib/scope";
import StoreProvider from "../StoreProvider";

describe("test project quota details", () => {
  test("should fire quota change listener", async () => {
    const project = { metadata: { name: "testProject", id: 12, domainID: 13 } };
    const resource = { usage: 8, quota: 10 };
    const scope = new Scope({ projectID: "123", domainID: "456" });
    const setMaxQuota = jest.fn((object, domainID, projectID) => {
      expect(projectID).toEqual(12);
      expect(domainID).toEqual(13);
    });
    const wrapper = ({ children }) => (
      <PortalProvider>
        <StoreProvider>
          <ProjectQuotaDetails
            key={1}
            serviceType={"serviceA"}
            project={project}
            resource={resource}
            setMaxQuota={setMaxQuota}
          />
          {children}
        </StoreProvider>
      </PortalProvider>
    );
    const { result } = await waitFor(() => {
      return renderHook(
        () => ({
          commitmentStoreActions: createCommitmentStoreActions(),
          globalStoreActions: globalStoreActions(),
        }),
        {
          wrapper,
        }
      );
    });
    act(() => {
      result.current.globalStoreActions.setScope(scope);
    });
    expect(screen.queryByText(/not set/i)).not.toBe(null);
    const editButton = screen.getByTestId("maxQuotaEdit");
    fireEvent.click(editButton);
    const cancelButton = screen.getByTestId("maxQuotaCancel");
    fireEvent.click(cancelButton);
    const editButton2 = screen.getByTestId("maxQuotaEdit");
    fireEvent.click(editButton2);
    const saveButton = screen.getByTestId("maxQuotaSave");
    const quotaInput = screen.getByTestId("maxQuotaInput");
    fireEvent.change(quotaInput, { target: { value: 2 } });
    fireEvent.click(saveButton);
    await waitFor(() => {
      expect(setMaxQuota).toHaveBeenCalled();
    });
  });
});
