// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { checkForReasonablySizedCommitment, createWarning, FACTOR, REASON, SOURCE } from "./commitmentSize";

function buildResource(az = {}, extra = {}) {
  return {
    commitmentSum: 0,
    ...extra,
    per_az: [{ name: "az1", usage: 0, quota: 0, commitmentSum: 0, ...az }, ...(extra.per_az ?? [])],
  };
}

function check(amount, data) {
  return checkForReasonablySizedCommitment(amount, data, "az1");
}

const baseValue = 100;

describe("Commitment size", () => {
  test("usage thresholds", () => {
    const resource = buildResource({ usage: baseValue });
    expect(check(baseValue * FACTOR.SMALL, resource)).toEqual(
      createWarning(REASON.SMALL, SOURCE.USAGE, baseValue * FACTOR.SMALL, baseValue)
    );
    expect(check(baseValue * FACTOR.SMALL + 1, resource)).toEqual({});
    expect(check(baseValue * FACTOR.LARGE - 1, resource)).toEqual({});
    expect(check(baseValue * FACTOR.LARGE, resource)).toEqual(
      createWarning(REASON.LARGE, SOURCE.USAGE, baseValue * FACTOR.LARGE, baseValue)
    );
  });

  describe("commitment coverage and fallback", () => {
    test("AZ commitment sum covering usage returns a warning", () => {
      const usage = baseValue;
      const commitmentSum = baseValue;
      const resource = buildResource({ usage: usage, commitmentSum: commitmentSum });
      const noUsageResource = buildResource({ usage: 0, commitmentSum: commitmentSum });
      const allowedAmount = usage * FACTOR.LARGE - commitmentSum;
      expect(check(allowedAmount + 1, resource)).toEqual(
        createWarning(REASON.LARGE, SOURCE.USAGE, commitmentSum + allowedAmount + 1, baseValue)
      );
      expect(check(allowedAmount, noUsageResource)).toEqual(
        createWarning(REASON.LARGE, SOURCE.USAGE, commitmentSum + allowedAmount, 0)
      );
      expect(check(usage * FACTOR.SMALL, resource)).toEqual(
        createWarning(REASON.SMALL, SOURCE.USAGE, usage * FACTOR.SMALL, baseValue)
      );
    });

    test("Check covered usage against the resulting commitment sum", () => {
      const usage = baseValue;
      const commitmentSum = baseValue;
      const allowedAmount = usage * FACTOR.LARGE - 1 - commitmentSum;
      const resource = buildResource({ usage: baseValue, commitmentSum: baseValue });
      expect(check(allowedAmount, resource)).toEqual({});
      expect(check(allowedAmount + 1, resource)).toEqual(
        createWarning(REASON.LARGE, SOURCE.USAGE, commitmentSum + allowedAmount + 1, baseValue)
      );
    });

    test("Check uncovered usage against the resulting commitment sum", () => {
      const usage = baseValue + baseValue / 2;
      const commitmentSum = baseValue;
      const allowedAmount = usage * FACTOR.LARGE - 1 - commitmentSum;
      const resource = buildResource({ usage, commitmentSum });
      expect(check(allowedAmount, resource)).toEqual({});
      expect(check(allowedAmount + 1, resource)).toEqual(
        createWarning(REASON.LARGE, SOURCE.USAGE, commitmentSum + allowedAmount + 1, usage)
      );
    });

    test.each([undefined, null, 0])("AZ commitment sum %s falls back to the resource-wide sum", (commitmentSum) => {
      const resource = buildResource({ commitmentSum }, { commitmentSum: baseValue });
      expect(check(baseValue * FACTOR.LARGE, resource)).toEqual(
        createWarning(REASON.LARGE, SOURCE.COMMITMENTS, baseValue * FACTOR.LARGE, baseValue)
      );
    });
  });

  describe("Quota based hierarchy", () => {
    test("AZ quota > 0 is used as base without checking other quota sources", () => {
      const resource = buildResource({ quota: baseValue }, { quota: 1000, per_az: [{ name: "any", quota: 1000 }] });
      expect(check(baseValue * FACTOR.SMALL + 1, resource)).toEqual({});
    });

    test.each([undefined, null, 0])("AZ quota %s falls back to any (base) quota before top-level quota", (quota) => {
      const resource = buildResource({ quota }, { quota: 10000, per_az: [{ name: "any", quota: baseValue }] });
      expect(check(baseValue * FACTOR.LARGE, resource)).toEqual(
        createWarning(REASON.LARGE, SOURCE.QUOTA, baseValue * FACTOR.LARGE, baseValue)
      );
    });

    test("uses top-level quota when AZ and any have no positive quota", () => {
      expect(check(baseValue * FACTOR.LARGE, buildResource({}, { quota: baseValue }))).toEqual(
        createWarning(REASON.LARGE, SOURCE.QUOTA, baseValue * FACTOR.LARGE, baseValue)
      );
    });
  });
});
