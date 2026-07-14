// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { renderHook } from "@testing-library/react";
import useCommitmentFilter from "./useCommitmentFilter";

const mockCommitments = [
  {
    id: 1,
    service_type: "compute",
    resource_name: "first",
    availability_zone: "az-1",
    amount: 100,
  },
  {
    id: 2,
    service_type: "compute",
    resource_name: "second",
    availability_zone: "az-2",
    amount: 200,
  },
  {
    id: 3,
    service_type: "compute",
    resource_name: "third",
    availability_zone: "az-1",
    amount: 1024,
  },
  {
    id: 4,
    service_type: "storage",
    resource_name: "first",
    availability_zone: "az-1",
    amount: 50,
  },
  {
    id: 5,
    service_type: "storage",
    resource_name: "second",
    availability_zone: "az-1",
    amount: 500,
  },
];

jest.mock("../components/StoreProvider", () => ({
  useProjectStore: jest.fn((selector) => selector({ commitments: mockCommitments })),
}));

describe("useCommitmentFilter", () => {
  describe("filterCommitments", () => {
    test("should filter commitments by service_type, resource_name, and availability_zone", () => {
      const { result } = renderHook(() => useCommitmentFilter());

      const filtered = result.current.filterCommitments("compute", "first", "az-1");

      expect(filtered).toHaveLength(1);
      expect(filtered[0]).toEqual({
        id: 1,
        service_type: "compute",
        resource_name: "first",
        availability_zone: "az-1",
        amount: 100,
      });
    });

    test("should filter by service_type correctly", () => {
      const { result } = renderHook(() => useCommitmentFilter());

      // Same resource_name and az, but different service_type
      const computeFiltered = result.current.filterCommitments("compute", "first", "az-1");
      const storageFiltered = result.current.filterCommitments("storage", "first", "az-1");

      expect(computeFiltered).toHaveLength(1);
      expect(computeFiltered[0].id).toBe(1);

      expect(storageFiltered).toHaveLength(1);
      expect(storageFiltered[0].id).toBe(4);
    });

    test("should return empty array when no commitments match", () => {
      const { result } = renderHook(() => useCommitmentFilter());

      const filtered = result.current.filterCommitments("nonexistent", "cores", "az-1");

      expect(filtered).toHaveLength(0);
    });

    test("should filter by all three criteria simultaneously", () => {
      const { result } = renderHook(() => useCommitmentFilter());

      // Test that changing any one criterion changes the result
      const result1 = result.current.filterCommitments("compute", "first", "az-1");
      const result2 = result.current.filterCommitments("compute", "second", "az-2");
      const result3 = result.current.filterCommitments("compute", "third", "az-1");
      const result4 = result.current.filterCommitments("storage", "first", "az-1");

      expect(result1[0].id).toBe(1);
      expect(result2[0].id).toBe(2);
      expect(result3[0].id).toBe(3);
      expect(result4[0].id).toBe(4);
    });
  });
});
