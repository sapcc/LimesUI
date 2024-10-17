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
