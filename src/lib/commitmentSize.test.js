// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { checkForReasonableSizedCommitment, createWarning, REASON, FACTOR } from "./commitmentSize";

function buildResource(az = {}, extra = {}) {
  return {
    commitmentSum: 0,
    ...extra,
    per_az: [{ name: "az1", usage: 0, quota: 0, commitmentSum: 0, ...az }, ...(extra.per_az ?? [])],
  };
}

function check(amount, data) {
  return checkForReasonableSizedCommitment(amount, data, "az1");
}

const baseValue = 100;

describe("commitment size", () => {
  test.each([
    ["usage", "current usage"],
    ["quota", "available quota"],
    ["commitmentSum", "existing commitments"],
  ])("%s uses expected thresholds", (field, source) => {
    const resource =
      field === "commitmentSum"
        ? buildResource({}, { commitmentSum: baseValue })
        : buildResource({ [field]: baseValue });
    expect(check(baseValue * FACTOR.SMALL, resource)).toEqual(createWarning(REASON.SMALL, source, baseValue));
    expect(check(baseValue * FACTOR.LARGE, resource)).toEqual(createWarning(REASON.LARGE, source, baseValue));
    expect(check(baseValue * FACTOR.SMALL + 1, resource)).toEqual({});
    expect(check(baseValue * FACTOR.LARGE - 1, resource)).toEqual({});
  });

  describe("Commitment coverage and fallback", () => {
    test("AZ commitment sum covering positive usage returns a coverage warning", () => {
      const resource = buildResource({ usage: baseValue, commitmentSum: baseValue });
      expect(check(baseValue, resource)).toEqual(createWarning(REASON.COVERED, "commitments cover usage", baseValue));
    });

    test.each([undefined, null, 0])("AZ commitment sum %s falls back to the resource-wide sum", (commitmentSum) => {
      const resource = buildResource({ commitmentSum }, { commitmentSum: baseValue });
      expect(check(baseValue * FACTOR.LARGE, resource)).toEqual(
        createWarning(REASON.LARGE, "existing commitments", baseValue)
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
        createWarning(REASON.LARGE, "available quota", baseValue)
      );
    });

    test("uses top-level quota when AZ and any have no positive quota", () => {
      expect(check(baseValue * FACTOR.LARGE, buildResource({}, { quota: baseValue }))).toEqual(
        createWarning(REASON.LARGE, "available quota", baseValue)
      );
    });
  });
});
