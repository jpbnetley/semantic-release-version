import * as core from "@actions/core";
import { SemanticReleaseEnumSchema } from "./schemas/release-type-schema";
import { updateSemanticVersion } from "./update-semantic-version";

try {
  const initialVersion = core.getInput("version");
  const versionType = core.getInput("version-type");

  const enumValue = SemanticReleaseEnumSchema.parse(versionType);
  const newReleaseVersion = updateSemanticVersion(initialVersion, enumValue);

  core.setOutput("new_version", newReleaseVersion);
} catch (error) {
  if (error instanceof Error) {
    core.setFailed(error);
  } else {
    core.setFailed("An unknown error occurred");
  }
}
