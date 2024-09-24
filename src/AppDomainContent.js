import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  domainStore,
  domainStoreActions,
  globalStoreActions,
} from "./components/StoreProvider";
import ContentRoutes from "./ContentRoutes";
import { LoadingIndicator, Message } from "@cloudoperators/juno-ui-components";
import useClusterAPI from "./hooks/useClusterAPI";

const AppDomainContent = (props) => {
  const { domainData } = domainStore();
  const { refetchDomainAPI } = domainStore();
  const { setRefetchDomainAPI } = domainStoreActions();
  const { setDomainData } = domainStoreActions();
  const { restructureReport } = globalStoreActions();
  const { cluster } = useClusterAPI({ isDetail: true });
  const domainQueryResult = useQuery({
    queryKey: ["domainData"],
  });
  const { data: domainAPIData } = domainQueryResult;

  React.useEffect(() => {
    // Initial Commitment-API data fetch.
    if (!domainAPIData) return;
    setDomainData(restructureReport(domainAPIData.domain));
  }, [domainAPIData]);

  React.useEffect(() => {
    if (!refetchDomainAPI) return;
    setRefetchDomainAPI(false);
    domainQueryResult.refetch();
  }, [refetchDomainAPI]);

  return cluster.isError ? (
    <Message>{cluster.error.message}</Message>
  ) : cluster.isLoading || !cluster.data ? (
    <LoadingIndicator className={"m-auto"} />
  ) : (
    <ContentRoutes
      queryResult={domainQueryResult}
      parsedData={domainData}
      canEdit={props.canEdit}
    />
  );
};

export default AppDomainContent;
