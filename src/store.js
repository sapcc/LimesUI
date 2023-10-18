import { create } from "zustand"

const useLimesStore = create((set) => ({
    restructureReport: (data) => {
        var { services: serviceList, ...metadata } = data.data.project;

        serviceList = serviceList.filter(srv => srv.resources.length > 0);

        // `categories` is what the Category component needs.
        const categories = {};
        for (let srv of serviceList) {
            const { resources: resourceList, type: serviceType, ...serviceData } = srv;

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

        const groupKeys = (entries) => {
            const result = {};
            for (let [k, v] of entries) { result[k] = []; }
            for (let [k, v] of entries) { result[k].push(v); }
            return result;
        };

        // `overview` is what the Overview component needs.
        const overview = {
            //This field is only filled for project scope, and {} otherwise.
            scrapedAt: objectFromEntries(
                serviceList.map(srv => [srv.type, srv.scraped_at]),
            ),
            //These two fields are only filled for cluster/domain scope, and {} otherwise.
            minScrapedAt: objectFromEntries(
                serviceList.map(srv => [srv.type, srv.min_scraped_at]),
            ),
            maxScrapedAt: objectFromEntries(
                serviceList.map(srv => [srv.type, srv.max_scraped_at]),
            ),
            areas: groupKeys(serviceList.map((srv) => [srv.area || srv.type, srv.type])),
            categories: groupKeys(Object.entries(categories).map(([catName, cat]) => [cat.serviceType, catName])),
        };

        return { metadata, categories, overview }
    },
}))


const objectFromEntries = (entries) => {
    const result = {};
    for (let [k,v] of entries) {
      result[k] = v;
    }
    return result;
  };

export default useLimesStore
