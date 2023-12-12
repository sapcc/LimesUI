import React from "react";
import { renderHook, act } from "@testing-library/react";
import StoreProvider, {
  limesStore,
  limesStoreActions,
} from "../../components/StoreProvider";

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

const commitments = [{ created_at: 1 }, { created_at: 2 }];

describe("limesStore", () => {
  let store;
  beforeEach(() => {
    const wrapper = ({ children }) => <StoreProvider>{children}</StoreProvider>;
    store = renderHook(
      () => ({
        limesStore: limesStore(),
        limesStoreActions: limesStoreActions(),
      }),
      { wrapper }
    );
  });
  describe("project", () => {
    test("restructure report - new model", () => {
      act(() => {
        const structuredData =
          store.result.current.limesStoreActions.restructureReport(projectData);
        store.result.current.limesStoreActions.setProjectData(structuredData);
      });
      expect(
        store.result.current.limesStore.projectData.categories.compute
          .resources[0].quota
      ).toEqual(60);
      expect(store.result.current.limesStore.projectData.metadata.id).toEqual(
        "123"
      );
      expect(
        store.result.current.limesStore.projectData.overview.areas.compute[0]
      ).toEqual("compute");
    });

    test("restructure report - old model", () => {
      act(() => {
        const copy = { ...projectData };
        copy.project.services[0].resources[0].quota = 100;
        const structuredData =
          store.result.current.limesStoreActions.restructureReport(copy);
        store.result.current.limesStoreActions.setProjectData(structuredData);
      });
      expect(
        store.result.current.limesStore.projectData.categories.compute
          .resources[0].quota
      ).toEqual(100);
    });
  });

  describe("commitments", () => {
    test("commitmentOrdering", () => {
      act(() => {
        store.result.current.limesStoreActions.setCommitments(commitments);
      });
      expect(store.result.current.limesStore.commitments[0].created_at).toEqual(
        2
      );
    });
  });
});
