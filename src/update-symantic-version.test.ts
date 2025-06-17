import { describe, it, expect } from 'vitest'
import { updateSemanticVersion } from './update-symantic-version'
import { SymantecReleaseType } from './types/enum/symantic-release-type'

describe('updateSemanticVersion', () => {
  it('increments major version and resets minor and patch', () => {
    expect(updateSemanticVersion('1.2.3', SymantecReleaseType.Major)).toBe(
      '2.0.0'
    )
    expect(updateSemanticVersion('0.9.9', SymantecReleaseType.Major)).toBe(
      '1.0.0'
    )
  })

  it('increments minor version and resets patch', () => {
    expect(updateSemanticVersion('1.2.3', SymantecReleaseType.Minor)).toBe(
      '1.3.0'
    )
    expect(updateSemanticVersion('2.0.9', SymantecReleaseType.Minor)).toBe(
      '2.1.0'
    )
  })

  it('increments patch version', () => {
    expect(updateSemanticVersion('1.2.3', SymantecReleaseType.Patch)).toBe(
      '1.2.4'
    )
    expect(updateSemanticVersion('0.0.0', SymantecReleaseType.Patch)).toBe(
      '0.0.1'
    )
  })

  it('throws error for invalid version format', () => {
    expect(() =>
      updateSemanticVersion('1.2', SymantecReleaseType.Patch)
    ).toThrow('Invalid version format')
    expect(() =>
      updateSemanticVersion('1.2.3.4', SymantecReleaseType.Patch)
    ).toThrow('Invalid version format')
    expect(() =>
      updateSemanticVersion('abc', SymantecReleaseType.Patch)
    ).toThrow('Invalid version format')
  })

  it('throws error for unknown release type', () => {
    // @ts-expect-error: testing invalid enum value
    expect(() => updateSemanticVersion('1.2.3', 'invalid')).toThrow(
      'Unknown release type'
    )
    // @ts-expect-error: testing invalid enum value
    expect(() => updateSemanticVersion('1.2.3', 'invalid sym')).toThrow(
      'Unknown release type'
    )
  })
})
