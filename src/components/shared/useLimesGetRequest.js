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
import { useQuery } from "@tanstack/react-query";

const useLimesGetRequest = ({
  queryKey,
  queryArgs = {},
  queryOpts = {},
  // use only if a fetch should be triggered manually by the application.
  // Requires enabled = false within the queryOpts.
  shouldRefetch = false,
}) => {
  const queryResult = useQuery({
    queryKey: [queryKey, queryArgs],
    ...queryOpts,
  });
  const { data, isLoading, isFetching, isError, error } = queryResult;

  React.useEffect(() => {
    if (!shouldRefetch) return;
    if (queryOpts["enabled"]) return;
    queryResult.refetch();
  }, [shouldRefetch]);

  return { data, isLoading, isFetching, isError, error };
};

export default useLimesGetRequest;
