import AppClusterContent from "../AppClusterContent";
import AppDomainContent from "../AppDomainContent";
import AppResourceContent from "../AppResourceContent";

//matches the part of the URL path for any scope's main view
//
//     /domainname/projectname/pluginname/subroute
//     ^^^^^^^^^^^^^^^^^^^^^^^
const urlBaseRx = new RegExp("/?[^/]+/[^/]+");
export const getBaseURL = () => {
  return urlBaseRx.exec(window.location.pathname) + "/resources/v2/project";
};

const cerebroBaseRx = new RegExp("/v2/.+");
export const getCerebroBaseURL = () => {
  const basePath = window.location.pathname;
  // Cerebro does not have the v2 suffix on its path.
  const fixedBasePath = basePath.replace(
    cerebroBaseRx.exec(window.location.pathname)[0],
    "/project"
  );
  return fixedBasePath;
};

/*
 * There are three scopes the UI handles depending of the environment variables used as input:
 *      projectScope = new Scope({ domainID, projectID });
 *      domainScope  = new Scope({ domainID });
 *      clusterScope = new Scope({ });
 * The general components can access scoped components via this class.
 */
export class Scope {
  constructor(scopeData) {
    this.domainID = scopeData.domainID;
    this.projectID = scopeData.projectID;
  }
  appComponent() {
    if (this.projectID) return AppResourceContent;
    if (this.domainID) return AppDomainContent;
    return AppClusterContent;
  }
  isProject() {
    return this.projectID && this.domainID ? true : false;
  }
  isDomain() {
    return !this.projectID && this.domainID ? true : false;
  }
  isCluster() {
    return !this.projectID && !this.domainID ? true : false;
  }
}
