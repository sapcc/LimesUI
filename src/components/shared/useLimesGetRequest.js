// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

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
