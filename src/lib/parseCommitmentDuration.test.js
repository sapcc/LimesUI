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

import { parseCommitmentDuration } from "./parseCommitmentDurations";
import moment from "moment";

describe("check parsing", () => {
  test("inputs", () => {
    const threeyears = moment().add(3, "y").unix();
    const result = parseCommitmentDuration("3 years");
    expect(result).toEqual(threeyears);
    const oneMonth = moment().add(1, "M").unix();
    const result2 = parseCommitmentDuration("1 month");
    expect(result2).toEqual(oneMonth);
    const result3 = parseCommitmentDuration(" months");
    expect(result3).toBe(false);
  });
});
