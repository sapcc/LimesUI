// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import ContentRoutes from "./ContentRoutes";
import useClusterAPI from "./hooks/useClusterAPI";

const AppClusterContent = (props) => {
  const { cluster } = useClusterAPI({ isDetail: false });

  return <ContentRoutes queryResult={cluster} parsedData={cluster.data} canEdit={props.canEdit} />;
};

export default AppClusterContent;
