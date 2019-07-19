import { check, currentAuth } from "./auth";

describe("auth test", () => {
  it("empty auth", () => {
    currentAuth.splice(0, currentAuth.length);
    expect(check(["user"])).toEqual(false);
  });
});
