import React from "react";
import { Message, LoadingIndicator } from "juno-ui-components";
import { useQuery } from "@tanstack/react-query";

const useReceivedCommitment = ({ token, shouldFetch }) => {
  const commitByToken = useQuery({
    queryKey: ["commitmentByToken", token],
    refetchOnWindowFocus: false,
    retry: false,
    gcTime: 0, // Disable Caching. We don't want to display commitments that have been transferred already.
    enabled: false,
  });
  const { data, isFetching, isError, error } = commitByToken;
  const commitment = data?.commitment;

  React.useEffect(() => {
    if (!shouldFetch) return;
    commitByToken.refetch();
  }, [shouldFetch]);

  return { data: commitment, isFetching, isError, error };
};

export default useReceivedCommitment;
