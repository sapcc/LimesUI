import React from "react";
import { fireEvent, render, screen, renderHook } from "@testing-library/react";
import EditPanel from "./EditPanel";
import useStore, { initialCommitmentObject } from "../../lib/store/store";

// TODO: use Cypress for this testsuite.

/*
const mockedUsedNavigate = jest.fn();
const mockedParams = {
  currentArea: "compute",
  categoryName: "compute",
  resourceName: "cores",
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => mockedParams,
}));

const durations = ["1 year", "2 years", "3 years"];

const projectData = {
  project: {
    id: "e9141fb24eee4b3e9f25ae69cda31132",
    name: "cc-demo",
    parent_id: "2bac466eed364d8a92e477459e908736",
    bursting: {
      enabled: false,
      multiplier: 0.1,
    },
    services: [
      {
        type: "compute",
        area: "compute",
        resources: [
          {
            name: "cores",
            quota_distribution_model: "hierarchical",
            commitment_config: {
              durations: durations,
            },
            per_az: {
              any: {
                usage: 160,
              },
            },
            quota: 4000,
            usable_quota: 4000,
            usage: 160,
            scales_with: {
              resource_name: "instances",
              service_type: "compute",
              factor: 2,
            },
            annotations: {
              can_autoscale: "true",
            },
          },
        ],
      },
    ],
  },
};

const commitment = [
  {
    id: 42023,
    service_type: "compute",
    resource_name: "cores",
    availability_zone: "any",
    amount: 100,
    duration: "2 years",
    requested_at: "",
    confirmed_at: "",
    expires_at: "",
  },
];

const { result } = renderHook(() => useStore());

describe("Edit commitments - Modaltests", () => {
  const inputValue = "500";
  let formattedData = {};
  let editButton;
  let commitmentInput;
  let durationInput;
  let submit;
  beforeAll(() => {
    formattedData = result.current.restructureReport(projectData);
    result.current.setCommitments(commitment);
  });

  beforeEach(() => {
    const duration = new RegExp(durations[0], "i");
    render(<EditPanel {...formattedData} />);
    //go through the UI until we reach the confirmation Modal.
    editButton = screen.getByText(/^Add Commitment$/i);
    fireEvent.click(editButton);
    commitmentInput = screen.getByDisplayValue(
      result.current.commitment.amount
    );
    fireEvent.change(commitmentInput, { target: { value: inputValue } });
    expect(commitmentInput.value).toEqual(inputValue);
    durationInput = screen.getByText(/select/i);
    fireEvent.click(durationInput);
    const year1 = screen.getByText(duration);
    fireEvent.click(year1);
    expect(year1.textContent).toEqual(durations[0]);
    submit = screen.getByText(/save/i);
    fireEvent.click(submit);
  });

  test("check modal values", () => {
    expect(result.current.commitment.amount).toEqual(parseInt(inputValue));
    expect(result.current.commitment.duration).toEqual(durations[0]);
  });

  test("check input fields after commit", () => {
    const confirm = screen.getByText(/^confirm$/i);
    fireEvent.click(confirm);
    expect(commitmentInput.value).toEqual(inputValue);
    expect(durationInput.textContent).toEqual(durations[0]);
  });

  test("check input fields after cancel", () => {
    const cancel = screen.getAllByText(/^cancel$/i)[1];
    fireEvent.click(cancel);
    expect(commitmentInput.value).toEqual(inputValue);
    expect(durationInput.textContent).toEqual(durations[0]);
  });

});
*/
