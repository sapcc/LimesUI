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

//Object.fromEntries() is not supported by Chrome yet.
export const objectFromEntries = (entries) => {
  const result = {};
  for (let [k, v] of entries) {
    result[k] = v;
  }
  return result;
};

//Array.flatMap() is not supported on some older browsers that customers use.
export const arrayFlatMap = (inputs, callback) => {
  const outputs = [];
  for (let value of inputs) {
    outputs.push(...callback(value));
  }
  return outputs;
};
