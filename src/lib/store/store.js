import { create } from "zustand";

const limesStore = (set) => ({
  commitments: null,
  setCommitments: (commitments) =>
    set((state) => ({ commitments: commitments })),

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
    var { services: serviceList, ...metadata } = data.data.project;

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

const objectFromEntries = (entries) => {
  const result = {};
  for (let [k, v] of entries) {
    result[k] = v;
  }
  return result;
};

const useStore = create((...a) => ({
  ...limesStore(...a),
}));

export default useStore;
