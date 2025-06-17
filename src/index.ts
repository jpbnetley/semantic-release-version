import * as core from '@actions/core'
import { updateSemanticVersion } from './update-symantic-version'
import { SymantecReleaseType } from './types/enum/symantic-release-type'
import { mapValueToEnum } from './utils/map-value-to-enum'

try {
  const initialVersion = core.getInput('version')
  const versionType = core.getInput('version_type')
  const enumValue = mapValueToEnum(versionType, SymantecReleaseType)
 
  if (enumValue === undefined) {
    throw new Error(
      `Value "${versionType}" is not a valid member of the SymantecReleaseType enum.`
    )
  }
  const newReleaseVersion = updateSemanticVersion(initialVersion, enumValue)
  core.setOutput('new_version', newReleaseVersion)
} catch (error) {
  if (error instanceof Error) {
    core.setFailed(error)
  } else {
    core.setFailed('An unknown error occurred')
  }
}
