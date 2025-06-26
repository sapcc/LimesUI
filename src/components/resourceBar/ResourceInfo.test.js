import React from "react";
import ResourceInfo from "./ResourceInfo";
import { screen } from "shadow-dom-testing-library";
import { render } from "@testing-library/react";
import { resourceBar } from "./ResourceBar";
import { Unit } from "../../lib/unit";
import { CustomZones } from "../../lib/constants";
import { Scope } from "../../lib/scope";

describe("Resource info tests", () => {
  test("renders AZ error state info", async () => {
    const props = {
      resource: {},
      az: { name: CustomZones.UNKNOWN },
      leftBar: {},
      rightBar: {},
    };
    render(<ResourceInfo {...props} />);
    expect(screen.getByTestId(/UnknownAZ/i)).toBeInTheDocument();
  });

  test("renders committed usage info when leftBar has values", () => {
    const props = {
      resource: {},
      az: { name: "AZ1" },
      unit: new Unit("MiB"),
      leftBar: { utilized: 1024, available: 1024 },
      rightBar: resourceBar,
    };

    const { rerender } = render(<ResourceInfo {...props} />);
    expect(screen.getByTestId(/CommittedUsage.FULLY_UTILIZED/i)).toBeInTheDocument();

    props.leftBar = { utilized: 1024, available: 4096 };
    rerender(<ResourceInfo {...props} />);
    expect(screen.getByTestId(/CommittedUsage.UNUSED/i)).toBeInTheDocument();
    expect(screen.getByText("3 GiB")).toBeInTheDocument();

    props.leftBar = { utilized: 1024, available: 512 };
    rerender(<ResourceInfo {...props} />);
    expect(screen.getByTestId(/CommittedUsage.INVALID/i)).toBeInTheDocument();

    // resources without committed usage should not display info
    props.leftBar = resourceBar;
    rerender(<ResourceInfo {...props} />);
    expect(screen.queryByTestId(/CommittedUsage.FULLY_UTILIZED/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/CommittedUsage.UNUSED/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/CommittedUsage.INVALID/i)).not.toBeInTheDocument();
  });

  test("renders PAYG info when rightBar has values", () => {
    const props = {
      resource: {},
      az: { name: "AZ1" },
      unit: new Unit("MiB"),
      leftBar: resourceBar,
      rightBar: { utilized: 1024, available: 1024 },
    };

    const { rerender } = render(<ResourceInfo {...props} />);
    expect(screen.getByTestId(/PAYG.AVAILABLE/i)).toBeInTheDocument();
    expect(screen.getByText("1 GiB")).toBeInTheDocument();

    props.rightBar = { utilized: -1024, available: 1024 };
    rerender(<ResourceInfo {...props} />);
    expect(screen.getByTestId(/PAYG.INVALID/i)).toBeInTheDocument();

    // resources without pay as you go usage should not display info.
    props.rightBar = resourceBar;
    rerender(<ResourceInfo {...props} />);
    expect(screen.queryByTestId(/PAYG.AVAILABLE/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/PAYG.INVALID/i)).not.toBeInTheDocument();
  });

  test("renders base quota info", () => {
    const props = {
      scope: new Scope({ projectID: 1, domainID: 2 }),
      resource: {
        per_az: [
          { name: CustomZones.ANY, quota: 1024 },
          { name: "AZ1", quota: 1024 },
        ],
      },
      az: null,
      unit: new Unit("MiB"),
      leftBar: {},
      rightBar: {},
    };
    const { rerender } = render(<ResourceInfo {...props} />);
    expect(screen.getByTestId(/BaseQuota.AVAILABLE/i)).toBeInTheDocument();
    expect(screen.getByText("1 GiB")).toBeInTheDocument();
    // AZ info should not be displayed for resource level info.
    expect(screen.queryByTestId(/BaseQuota.ADDITION/i)).not.toBeInTheDocument();

    // AZ info should contain the info addition.
    props.az = { name: "AZ1" };
    rerender(<ResourceInfo {...props} />);
    expect(screen.getByTestId(/BaseQuota.AVAILABLE/i)).toBeInTheDocument();
    expect(screen.getByText("1 GiB")).toBeInTheDocument();
    expect(screen.getByTestId(/BaseQuota.ADDITION/i)).toBeInTheDocument();
    expect(screen.getByTestId(/BaseQuota.AZ/i)).toBeInTheDocument();

    // unknown AZ info should contain specific info.
    props.az = { name: CustomZones.UNKNOWN };
    rerender(<ResourceInfo {...props} />);
    expect(screen.getByTestId(/BaseQuota.ADDITION/i)).toBeInTheDocument();
    expect(screen.getByTestId(/BaseQuota.UNKNOWN/i)).toBeInTheDocument();

    // Provided AZ's without a base quota AZ should not display info.
    props.resource = {
      per_az: [
        { name: "AZ1", quota: 1024 },
        { name: "AZ2", quota: 1024 },
      ],
    };
    rerender(<ResourceInfo {...props} />);
    expect(screen.queryByTestId(/BaseQuota.AVAILABLE/i)).not.toBeInTheDocument();

    // AZ unaware resources should not display info.
    props.resource = {
      per_az: [{ name: CustomZones.ANY, quota: 1024 }],
    };
    rerender(<ResourceInfo {...props} />);
    expect(screen.queryByTestId(/BaseQuota.AVAILABLE/i)).not.toBeInTheDocument();

    // Cluster level should not display info.
    props.scope = new Scope({});
    rerender(<ResourceInfo {...props} />);
    expect(screen.queryByTestId(/BaseQuota.AVAILABLE/i)).not.toBeInTheDocument();
  });
  test("renders negative remaining quota info and refresh link when not in cluster scope", () => {
    const props = {
      scope: new Scope({}),
      resource: {
        per_az: [{ name: CustomZones.ANY }, { name: "AZ1" }],
      },
      az: { name: "AZ1" },
      unit: new Unit("MiB"),
      leftBar: {},
      rightBar: { available: -1024 },
    };
    const { rerender } = render(<ResourceInfo {...props} />);
    expect(screen.getByTestId(/NegativeRemainingQuota.CAPACITY/i)).toBeInTheDocument();

    props.scope = new Scope({ projectID: 1, domainID: 2 });
    rerender(<ResourceInfo {...props} />);
    expect(screen.getByTestId(/NegativeRemainingQuota.QUOTA/i)).toBeInTheDocument();
    expect(screen.getByTestId(/NegativeRemainingQuota.REFRESH/i)).toBeInTheDocument();
  });
});
