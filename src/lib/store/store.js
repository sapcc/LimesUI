import { create } from "zustand";
import { COMMITMENTID } from "../constants";

const limesStore = (set) => ({
  //requery API after commit POST to get fresh commitment data for the resource bars.
  refetchProjectAPI: false,
  setRefetchProjectAPI: (refetchProjectAPI) =>
    set((state) => ({ refetchProjectAPI: refetchProjectAPI })),
  projectData: null,
  setProjectData: (projectData) =>
    set((state) => ({ projectData: projectData })),
  commitments: null,
  setCommitments: (commitments) =>
    set((state) => {
      commitments.sort((a, b) => {
        if (a.created_at < b.created_at) {
          return 1;
        }
        if (a.created_at > b.created_at) {
          return -1;
        }
        return 0;
      });
      return { ...state, commitments: commitments };
    }),
  addCommitment: (commitment) =>
    set((state) => {
      const commitments = [...state.commitments];
      commitments.unshift(commitment);
      return { ...state, commitments: commitments };
    }),

  ////////////////////////////////////////////////////////////////////////////////
  // helper that need to restructure a Limes JSON into a triplet of
  // (metadata, overview, categories)

  restructureReport: (data, resourceFilter = null) => {
    // This helper takes the `data` returned by Limes under any GET
    // endpoint and flattens it into several structures that reflect the
    // different levels of React components.
    //
    // Note that the outermost level of the JSON (containing only the key
    // "cluster", "domain" or "project") has already been removed in the
    // fetchData/fetchCapacity action.
    //
    // If `resourceFilter` is given, only resources matching this attribute are
    // included in the final result. (Services and categories without any
    // matching resources are removed from the result.)

    // `metadata` is what multiple levels need (e.g. bursting multiplier).
    var { services: serviceList, ...metadata } = data.project;

    //apply `resourceFilter`
    if (resourceFilter !== null) {
      serviceList = serviceList.map((srv) => ({
        ...srv,
        resources: srv.resources.filter(resourceFilter),
      }));
    }

    //skip services that do not have any resources (either because of the
    //`resourceFilter` above or because the service in question only reports
    //rates)
    serviceList = serviceList.filter((srv) => srv.resources.length > 0);

    // `categories` is what the Category component needs.
    const categories = {};
    for (let srv of serviceList) {
      const {
        resources: resourceList,
        type: serviceType,
        ...serviceData
      } = srv;

      for (let res of resourceList) {
        categories[res.category || serviceType] = {
          serviceType,
          ...serviceData,
          resources: [],
        };
      }

      for (let res of resourceList) {
        filterAZs(res);
        getQuotaNewOrOldModel(res);
        categories[res.category || serviceType].resources.push(res);
      }
    }

    // helper function: groupKeys transforms a list of key-value pairs into an
    // object just like Object.fromEntries(), but allows duplicate keys by
    // producing arrays of values
    //
    // e.g. groupKeys(["foo", 1], ["bar", 2], ["foo", 3])
    //      = { foo: [1, 3], bar: [2] }
    const groupKeys = (entries) => {
      const result = {};
      for (let [k, v] of entries) {
        result[k] = [];
      }
      for (let [k, v] of entries) {
        result[k].push(v);
      }
      return result;
    };

    // `overview` is what the Overview component needs.
    const overview = {
      //This field is only filled for project scope, and {} otherwise.
      scrapedAt: objectFromEntries(
        serviceList.map((srv) => [srv.type, srv.scraped_at])
      ),
      //These two fields are only filled for cluster/domain scope, and {} otherwise.
      minScrapedAt: objectFromEntries(
        serviceList.map((srv) => [srv.type, srv.min_scraped_at])
      ),
      maxScrapedAt: objectFromEntries(
        serviceList.map((srv) => [srv.type, srv.max_scraped_at])
      ),
      areas: groupKeys(
        serviceList.map((srv) => [srv.area || srv.type, srv.type])
      ),
      categories: groupKeys(
        Object.entries(categories).map(([catName, cat]) => [
          cat.serviceType,
          catName,
        ])
      ),
    };

    return { metadata, categories, overview };
  },
});

// Availability Zones will be received as objects. It is easier to handle them as an Array.
function filterAZs(res) {
  let validAZs;
  if (res?.per_az !== undefined) {
    validAZs = Object.entries(res.per_az);
    const filteredAZs = validAZs;
    res.per_az = filteredAZs;
  }
  return;
}

// old model: Resources have a quota attribute attached to them.
// new model: quota gets calculated after the quota of all availability zones.
function getQuotaNewOrOldModel(res) {
  if ("contained_in" in res) return;
  if ("quota" in res) return;
  let quotaSum = 0;
  res.per_az.forEach((az) => {
    return (quotaSum += az[1].quota || 0);
  });
  res.quota = quotaSum;
}

const objectFromEntries = (entries) => {
  const result = {};
  for (let [k, v] of entries) {
    result[k] = v;
  }
  return result;
};

//used to reset the last commitment to default values.
export const initialCommitmentObject = {
  id: COMMITMENTID,
  service_type: null,
  resource_name: null,
  availability_zone: null,
  amount: 0,
  unit: "",
  duration: "",
};
const createCommitmentStore = (set) => ({
  commitment: { ...initialCommitmentObject },
  setCommitment: (commitment) =>
    set((state) => ({ commitment: { ...commitment } })),
  // Toggle the edit mode and the commitment button.
  isCommitting: false,
  setIsCommitting: (setIsCommitting) =>
    set((state) => ({ isCommitting: setIsCommitting })),
  // Disable tabs on edit mode
  isEditing: false,
  setIsEditing: (isEditing) => set((state) => ({ isEditing: isEditing })),
  // Open the submit modal
  isSubmitting: false,
  setIsSubmitting: (isSubmitting) =>
    set((state) => ({ isSubmitting: isSubmitting })),
  // Indicate loading state on commitment save
  commitmentIsLoading: false,
  setCommitmentIsLoading: (loading) =>
    set((state) => ({ commitmentIsLoading: loading })),
  toast: { message: null },
  setToast: (toast) => set((state) => ({ toast: { message: toast } })),
  currentAZ: null,
  setCurrentAZ: (currentAZ) =>
    set((state) => {
      if (currentAZ === "unknown") return { ...state };
      return { ...state, currentAZ: currentAZ };
    }),
});

const apiStore = (set) => ({
  globalAPI: {
    apiReady: false,
    endpoint: "",
    token: "",
    projectID: "",
    domainID: "",
  },
  setGlobalAPI: (globalAPI) => set((state) => ({ globalAPI: globalAPI })),
  setToken: (token) =>
    set((state) => ({ globalAPI: { ...state.globalAPI, token: token } })),
  setApiReady: (isReady) => {
    set((state) => ({ globalAPI: { ...state.globalAPI, apiReady: isReady } }));
  },
});

const useStore = create((...a) => ({
  ...limesStore(...a),
  ...createCommitmentStore(...a),
  ...apiStore(...a),
}));

export default useStore;
