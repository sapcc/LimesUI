import React from "react";
import MaxQuota from "./MaxQuota";
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
            isPanelView={true}
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
