// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import moment from "moment";

export function parseCommitmentDuration(duration) {
  const matcher = /^([0-9]*)\s*(second|minute|hour|day|month|year)s?$/;
  const match = matcher.exec(duration);
  if (match == null) {
    return false;
  }

  const amount = match[1];
  if (!amount || amount == 0) {
    return false;
  }

  const currentDate = moment();
  let result;
  switch (match[2]) {
    case "second":
      result = currentDate.add(amount, "s");
      break;
    case "minute":
      result = currentDate.add(amount, "m");
      break;
    case "hour":
      result = currentDate.add(amount, "h");
      break;
    case "day":
      result = currentDate.add(amount, "d");
      break;
    case "month":
      result = currentDate.add(amount, "M");
      break;
    case "year":
      result = currentDate.add(amount, "y");
      break;
  }

  return result.unix();
}
