import { InvalidVersionFormatError } from "./messages/error/invalid-version-format";
import { SemanticReleaseType } from "./types/enum/semantic-release-type";

/**
 * Updates a semantic version string based on the specified release type.
 *
 * @param currentVersion - The current version string in the format "x.y.z".
 * @param releaseType - The type of release to apply (major, minor, or patch).
 * @returns The updated semantic version string.
 * @throws {Error} If the current version format is invalid or the release type is unknown.
 */
export function updateSemanticVersion(
  currentVersion: string,
  releaseType: SemanticReleaseType
): string {
  const versionParts = currentVersion.split(".").map(Number);
  if (
    versionParts.length !== 3 ||
    !versionParts.every((part) => !isNaN(part))
  ) {
    throw InvalidVersionFormatError;
  }
  switch (releaseType) {
    case SemanticReleaseType.Major:
      versionParts[0] += 1;
      versionParts[1] = 0;
      versionParts[2] = 0;
      break;
    case SemanticReleaseType.Minor:
      versionParts[1] += 1;
      versionParts[2] = 0;
      break;
    case SemanticReleaseType.Patch:
      versionParts[2] += 1;
      break;
    default:
      throw new Error(
        `Unknown release type: ${releaseType}, valid types are: ${Object.values(
          SemanticReleaseType
        ).join(", ")}`
      );
  }
  return versionParts.join(".");
}
