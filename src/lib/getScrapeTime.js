// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import moment from "moment";

function getAgeDisplay(minScrapedStr, maxScrapedStr) {
  const ageDisplay = minScrapedStr == maxScrapedStr ? minScrapedStr : `between ${minScrapedStr} and ${maxScrapedStr}`;
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
  const currScrapedAt = currentServices.map((serviceType) => scrapedAt[serviceType]).filter((x) => x !== undefined);
  const minScrapedStr = moment.unix(Math.min(...currMinScrapedAt, ...currScrapedAt)).fromNow(true);
  const maxScrapedStr = moment.unix(Math.max(...currMaxScrapedAt, ...currScrapedAt)).fromNow(true);
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
