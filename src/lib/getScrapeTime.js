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

function getAgeDisplay(minScrapedStr, maxScrapedStr) {
  const ageDisplay =
    minScrapedStr == maxScrapedStr
      ? minScrapedStr
      : `between ${minScrapedStr} and ${maxScrapedStr}`;
  return ageDisplay;
}

function getScrapeTime(currentServices, overview) {
  const { scrapedAt, minScrapedAt, maxScrapedAt } = overview;
  const currMinScrapedAt = currentServices
    .map((serviceType) => minScrapedAt[serviceType])
    .filter((x) => x !== undefined);
  const currMaxScrapedAt = currentServices
    .map((serviceType) => maxScrapedAt[serviceType])
    .filter((x) => x !== undefined);
  const currScrapedAt = currentServices
    .map((serviceType) => scrapedAt[serviceType])
    .filter((x) => x !== undefined);
  const minScrapedStr = moment
    .unix(Math.min(...currMinScrapedAt, ...currScrapedAt))
    .fromNow(true);
  const maxScrapedStr = moment
    .unix(Math.max(...currMaxScrapedAt, ...currScrapedAt))
    .fromNow(true);
  const ageDisplay = getAgeDisplay(minScrapedStr, maxScrapedStr);
  return ageDisplay;
}

function getCerebroTime(cerebroData) {
  const cerebroScrapes = cerebroData.filter((x) => x !== undefined);
  const minScrapedStr = moment.unix(Math.min(...cerebroScrapes)).fromNow(true);
  const maxScrapedStr = moment.unix(Math.max(...cerebroScrapes)).fromNow(true);
  const ageDisplay = getAgeDisplay(minScrapedStr, maxScrapedStr);
  return ageDisplay;
}

export { getScrapeTime, getCerebroTime };
