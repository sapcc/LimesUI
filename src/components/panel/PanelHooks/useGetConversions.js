// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import useLimesGetRequest from "../../shared/useLimesGetRequest";
import { createCommitmentStoreActions } from "../../StoreProvider";

const useGetConversions = ({ serviceType, resourceName }) => {
  const { setShowConversionOption } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();
  const conversionResult = useLimesGetRequest({
    queryKey: "getConversions",
    queryArgs: { serviceType: serviceType, resourceName: resourceName },
    queryOpts: { refetchOnMount: false },
  });

  const { data, isLoading, isError, error } = conversionResult;

  React.useEffect(() => {
    if (isLoading) return;
    if (isError) {
      setToast(error.toString());
    }
    const hasConversions = data?.conversions?.length > 0;
    setShowConversionOption(hasConversions);
  }, [data, isError]);

  return conversionResult;
};

export default useGetConversions;
