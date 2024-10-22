import React from "react";
import useLimesGetRequest from "../../shared/useLimesGetRequest";
import { createCommitmentStoreActions } from "../../StoreProvider";

const useGetConversions = ({ serviceType, resourceName }) => {
  const { setShowConversionOption } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();
  const conversionResult = useLimesGetRequest({
    queryKey: "getConversions",
    queryArgs: { serviceType: serviceType, resourceName: resourceName },
    queryOpts: { refetchOnMount: false, enabled: false },
    shouldRefetch: new RegExp("^instances_hana.").exec(resourceName)?.[0],
  });

  const { data, isLoading, isError, error } = conversionResult;

  React.useEffect(() => {
    if (isLoading) return;
    if (isError) {
      setToast(error.toString());
    }
    setShowConversionOption(true);
  }, [data, isError]);

  return conversionResult;
};

export default useGetConversions;
