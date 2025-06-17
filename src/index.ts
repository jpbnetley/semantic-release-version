import * as core from "@actions/core";
import { updateSemanticVersion } from "./update-symantic-version";
import { SymantecReleaseType } from "./types/enum/symantic-release-type";
import { mapStringToEnum } from "./utils/map-string-to-enum";

try {
  const initialVersion = core.getInput("version");
  const versionType = core.getInput("version_type");
  const enumValue = mapStringToEnum(versionType, SymantecReleaseType)
  if (!enumValue) {
    throw new Error(`Value "${versionType}" is not a valid member of the SymantecReleaseType enum.`);
  }
  const newReleaseVersion = updateSemanticVersion(initialVersion, enumValue)
  core.setOutput("new_version", newReleaseVersion);
} catch (error) {
  if (error instanceof Error) {
    core.setFailed(error.message);
  } else {
    core.setFailed("An unknown error occurred");
  }
}