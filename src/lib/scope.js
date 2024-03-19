import AppClusterContent from "../AppClusterContent";
import AppDomainContent from "../AppDomainContent";
import AppResourceContent from "../AppResourceContent";

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
