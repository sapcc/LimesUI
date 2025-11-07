// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { renderHook, act } from "@testing-library/react";
import StoreProvider, { projectStore, projectStoreActions, globalStoreActions } from "../../components/StoreProvider";

// Expected is a dual bar display at the UI
// Because only qa-de-1a has commitments: usagePerCommitted only takes this into account
// The remaining AZ's don't have commitments: They get added to usagePerQuota
const commitmentSum = 30;

const projectData = {
  project: {
    id: "123",
    services: [
      {
        type: "compute",
        resources: [
          {
            name: "cores",
            area: "compute",
            commitment_config: {
              durations: ["1 year", "2 years", "3 years"],
            },
            per_az: {
              "qa-de-1a": {
                usage: 10,
                quota: 10,
                committed: {
                  "1 year": 20,
                  "2 years": 10,
                },
              },
              "qa-de-1b": {
                usage: 20,
                quota: 20,
              },
              "qa-de-1d": {
                usage: 30,
                quota: 30,
              },
            },
            // quota: 60, | quota gets added manually for the testcases.
            usable_quota: 60,
            usage: 60,
          },
        ],
      },
    ],
  },
};

describe("limesStore", () => {
  let store;
  beforeEach(() => {
    const wrapper = ({ children }) => <StoreProvider>{children}</StoreProvider>;
    store = renderHook(
      () => ({
        globalStoreActions: globalStoreActions(),
        projectStore: projectStore(),
        projectStoreActions: projectStoreActions(),
      }),
      { wrapper }
    );
  });

  describe("project", () => {
    test("restructure report - new model", () => {
      act(() => {
        const structuredData = store.result.current.globalStoreActions.restructureReport(projectData.project);
        store.result.current.projectStoreActions.setProjectData(structuredData);
      });
      expect(store.result.current.projectStore.projectData.categories.compute.resources[0].quota).toEqual(60);
      expect(store.result.current.projectStore.projectData.metadata.id).toEqual("123");
      expect(store.result.current.projectStore.projectData.overview.areas.compute[0]).toEqual("compute");
    });

    test("restructure report - old model", () => {
      act(() => {
        const copy = { ...projectData };
        copy.project.services[0].resources[0].quota = 100;
        const structuredData = store.result.current.globalStoreActions.restructureReport(copy.project);
        store.result.current.projectStoreActions.setProjectData(structuredData);
      });
      expect(store.result.current.projectStore.projectData.categories.compute.resources[0].quota).toEqual(100);
    });

    test("values of added attributes", () => {
      act(() => {
        const structuredData = store.result.current.globalStoreActions.restructureReport(projectData.project);
        store.result.current.projectStoreActions.setProjectData(structuredData);
      });
      expect(store.result.current.projectStore.projectData.categories.compute.resources[0].commitmentSum).toEqual(
        commitmentSum
      );
    });
  });
});
