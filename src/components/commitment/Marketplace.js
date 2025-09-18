import React from "react";
import { useQuery } from "@tanstack/react-query";

const Marketplace = (props) => {
  const { serviceType, resource } = props;
  const publicCommitmentQuery = useQuery({
    queryKey: ["publicCommitments", { service: serviceType, resource: resource.name }],
  });
  const { data, isLoading, isError } = publicCommitmentQuery;
  return <div>{JSON.stringify(data)}</div>;
};

export default Marketplace;
