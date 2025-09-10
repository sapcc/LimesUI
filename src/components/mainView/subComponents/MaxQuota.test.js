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
import { MaxQuota } from "./MaxQuota";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import StoreProvider from "../../StoreProvider";

describe("test max quota project level", () => {
  test("should set max quota", async () => {
    const project = { metadata: { name: "testProject", id: 12, domainID: 13 } };
    const resource = { usage: 8, quota: 10 };
    const setMaxQuota = jest.fn((object, domainID, projectID) => {
      expect(projectID).toEqual(12);
      expect(domainID).toEqual(13);
    });
    render(
      <PortalProvider>
        <StoreProvider>
          <MaxQuota
            project={project}
            resource={resource}
            serviceType="serviceA"
            postMaxQuota={setMaxQuota}
            editMode={true}
          />
        </StoreProvider>
      </PortalProvider>
    );
    const editButton = screen.getByTestId("maxQuotaEdit");
    fireEvent.click(editButton);
    const inputText = screen.getByTestId("maxQuotaInput");
    fireEvent.change(inputText, { target: { value: 10 } });
    const saveButton = screen.getByTestId("maxQuotaSave");
    fireEvent.click(saveButton);
    await waitFor(() => {
      expect(setMaxQuota).toHaveBeenCalled();
    });
  });
});
