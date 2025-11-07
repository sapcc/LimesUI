// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import useQueryClientFn from "./lib/apiClient";

const AsyncWorker = ({ mockAPI }) => {
  useQueryClientFn(mockAPI);
  return null;
};

export default AsyncWorker;
