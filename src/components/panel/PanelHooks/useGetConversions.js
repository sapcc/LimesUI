/**
 * Copyright 2024 SAP SE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    if (data) {
      setShowConversionOption(true);
    }
  }, [data, isError]);

  return conversionResult;
};

export default useGetConversions;
