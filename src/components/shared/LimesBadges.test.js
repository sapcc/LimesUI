// SPDX-FileCopyrightText: 2026 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { render, screen } from "@testing-library/react";
import { ProjectBadges, DomainBadges, labelTypes } from "./LimesBadges";

describe("LimesBadges", () => {
  describe("ProjectBadges", () => {
    test("should display pending and planned badge values correctly", () => {
      const az = {
        pending_commitments: {
          "1 year": 100,
          "2 years": 50,
        },
        planned_commitments: {
          "1 year": 1000,
          "3 years": 24,
        },
      };

      render(<ProjectBadges az={az} unit="B" displayValues={true} />);

      // Check that pending badge shows the sum of pending commitments (100 + 50 = 150)
      expect(screen.getByText("150 B", { exact: false })).toBeInTheDocument();
      expect(
        screen.getByText((content, element) => {
          return element.tagName.toLowerCase() === "b" && content.includes(labelTypes.PENDING);
        })
      ).toBeInTheDocument();

      // Check that planned badge shows the sum of planned commitments (200 + 75 = 275)
      expect(screen.getByText("+ 1 KiB planned")).toBeInTheDocument();
    });

    test("should not render badges when neither pending nor planned commitments exist", () => {
      const az = {
        usage: 100,
        commitmentSum: 50,
      };

      const { container } = render(<ProjectBadges az={az} unit="B" displayValues={true} />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe("DomainBadges", () => {
    test("should display underutilized and uncommitted badge values correctly", () => {
      const resource = {
        quota: 1000,
      };

      const az = {
        commitmentSum: 500,
        usage: 200,
      };

      render(<DomainBadges resource={resource} az={az} />);

      // Underutilized ratio: (1 - 200/500) * 100 = 60%
      expect(screen.getByText(`60% ${labelTypes.UNDERUTILIZED}`)).toBeInTheDocument();

      // Uncommitted badge should not appear since usage (200) < commitmentSum (500)
      expect(screen.queryByText(labelTypes.UNCOMMITTED, { exact: false })).not.toBeInTheDocument();
    });

    test("should display uncommitted badge when usage exceeds commitments", () => {
      const resource = {
        quota: 1000,
      };

      const az = {
        commitmentSum: 200,
        usage: 500,
      };

      render(<DomainBadges resource={resource} az={az} />);

      // No underutilized badge since usage > commitmentSum
      expect(screen.queryByText(labelTypes.UNDERUTILIZED)).not.toBeInTheDocument();

      // Uncommitted badge should appear since usage (500) > commitmentSum (200)
      expect(screen.getByText(labelTypes.UNCOMMITTED)).toBeInTheDocument();
    });

    it("should not render badges when quota is 0", () => {
      const resource = {
        quota: 0,
      };

      const az = {
        commitmentSum: 100,
        usage: 50,
      };

      const { container } = render(<DomainBadges resource={resource} az={az} />);

      expect(container.firstChild).toBeNull();
    });
    test("should not display underutilized badge when commitmentSum equals usage", () => {
      const resource = {
        quota: 1000,
      };

      const az = {
        commitmentSum: 500,
        usage: 500,
      };

      render(<DomainBadges resource={resource} az={az} />);

      expect(screen.queryByText(labelTypes.UNDERUTILIZED, { exact: false })).not.toBeInTheDocument();
      expect(screen.queryByText(labelTypes.UNCOMMITTED, { exact: false })).not.toBeInTheDocument();
    });
  });
});
