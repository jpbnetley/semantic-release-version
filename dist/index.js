import * as core from "@actions/core";
import { z } from "zod/v4";

//#region src/types/enum/semantic-release-type.ts
let SemanticReleaseType = /* @__PURE__ */ function(SemanticReleaseType$1) {
	SemanticReleaseType$1["Major"] = "major";
	SemanticReleaseType$1["Minor"] = "minor";
	SemanticReleaseType$1["Patch"] = "patch";
	return SemanticReleaseType$1;
}({});

//#endregion
//#region src/schemas/release-type-schema.ts
const SemanticReleaseEnumSchema = z.enum(SemanticReleaseType);

//#endregion
//#region src/messages/error/invalid-version-format.ts
const InvalidVersionFormatError = new Error("Invalid version format. Expected format: x.y.z");

//#endregion
//#region src/update-semantic-version.ts
/**
* Updates a semantic version string based on the specified release type.
*
* @param currentVersion - The current version string in the format "x.y.z".
* @param releaseType - The type of release to apply (major, minor, or patch).
* @returns The updated semantic version string.
* @throws {Error} If the current version format is invalid or the release type is unknown.
*/
function updateSemanticVersion(currentVersion, releaseType) {
	const versionParts = currentVersion.split(".").map(Number);
	if (versionParts.length !== 3 || !versionParts.every((part) => !isNaN(part))) throw InvalidVersionFormatError;
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
		default: throw new Error(`Unknown release type: ${releaseType}, valid types are: ${Object.values(SemanticReleaseType).join(", ")}`);
	}
	return versionParts.join(".");
}

//#endregion
//#region src/index.ts
try {
	const initialVersion = core.getInput("version");
	const versionType = core.getInput("version_type");
	const enumValue = SemanticReleaseEnumSchema.parse(versionType);
	const newReleaseVersion = updateSemanticVersion(initialVersion, enumValue);
	core.setOutput("new_version", newReleaseVersion);
} catch (error) {
	if (error instanceof Error) core.setFailed(error);
	else core.setFailed("An unknown error occurred");
}
//#endregion