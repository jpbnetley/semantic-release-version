import { describe, it, expect } from "vitest";
import { updateSemanticVersion } from "./update-semantic-version";
import { SemanticReleaseType } from "./types/enum/semantic-release-type";
import { InvalidVersionFormatError } from "./messages/error/invalid-version-format";

describe("updateSemanticVersion", () => {
  it("increments major version and resets minor and patch", () => {
    expect(updateSemanticVersion("1.2.3", SemanticReleaseType.Major)).toBe(
      "2.0.0"
    );
    expect(updateSemanticVersion("0.9.9", SemanticReleaseType.Major)).toBe(
      "1.0.0"
    );
  });

  it("increments minor version and resets patch", () => {
    expect(updateSemanticVersion("1.2.3", SemanticReleaseType.Minor)).toBe(
      "1.3.0"
    );
    expect(updateSemanticVersion("2.0.9", SemanticReleaseType.Minor)).toBe(
      "2.1.0"
    );
  });

  it("increments patch version", () => {
    expect(updateSemanticVersion("1.2.3", SemanticReleaseType.Patch)).toBe(
      "1.2.4"
    );
    expect(updateSemanticVersion("0.0.0", SemanticReleaseType.Patch)).toBe(
      "0.0.1"
    );
  });

  it("throws error for invalid version format", () => {
    expect(() =>
      updateSemanticVersion("1.2", SemanticReleaseType.Patch)
    ).toThrow("Invalid version format");
    expect(() =>
      updateSemanticVersion("1.2.3.4", SemanticReleaseType.Patch)
    ).toThrow("Invalid version format");
    expect(() =>
      updateSemanticVersion("abc", SemanticReleaseType.Patch)
    ).toThrow("Invalid version format");
  });

  it("throws error for unknown release type", () => {
    // @ts-expect-error: testing invalid enum value
    expect(() => updateSemanticVersion("1.2.3", "invalid")).toThrow(
      "Unknown release type"
    );
    // @ts-expect-error: testing invalid enum value
    expect(() => updateSemanticVersion("1.2.3", "invalid sym")).toThrow(
      "Unknown release type"
    );
  });
});

describe("updateSemanticVersion - versionParts validation", () => {
  it("should throw an error if any version part is not a valid number", () => {
    // Invalid version string with a non-numeric part
    const invalidVersion = "1.2.x";
    expect(() =>
      updateSemanticVersion(invalidVersion, SemanticReleaseType.Patch)
    ).toThrow(InvalidVersionFormatError.message);
  });

  it("should not return a version with NaN", () => {
    // Another invalid version string
    const invalidVersion = "1.two.3";
    expect(() =>
      updateSemanticVersion(invalidVersion, SemanticReleaseType.Minor)
    ).toThrow(InvalidVersionFormatError.message);
  });

  it("should work for valid version strings", () => {
    const validVersion = "1.2.3";
    const result = updateSemanticVersion(
      validVersion,
      SemanticReleaseType.Patch
    );
    expect(result).toBe("1.2.4");
  });
});
