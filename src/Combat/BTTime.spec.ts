import { BTTime } from "./BTTime";

describe("BTTime", () =>
{
  it("should create an instance", () =>
  {
    expect(new BTTime(0, 0, 0)).toBeTruthy();
  });
});
