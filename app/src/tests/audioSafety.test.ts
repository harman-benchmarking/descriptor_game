import { describe, expect, it } from "vitest";
import { isHeadphoneRecommended } from "../audio/engine/AudioSafety";

describe("audio safety", () => {
  it("recommends headphones for extreme bands", () => {
    expect(isHeadphoneRecommended([35, 1000])).toBe(true);
    expect(isHeadphoneRecommended([1000, 17000])).toBe(true);
    expect(isHeadphoneRecommended([500, 1000])).toBe(false);
  });
});
