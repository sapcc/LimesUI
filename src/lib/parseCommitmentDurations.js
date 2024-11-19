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
