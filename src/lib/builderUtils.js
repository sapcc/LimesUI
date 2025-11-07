// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";

export const getChildrenOnDisplayName = (children, displayName) =>
  React.Children.map(children, (child) => (child.type.displayName === displayName ? child : null));
