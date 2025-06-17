import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mapStringToEnum } from './map-string-to-enum'
import * as validateEnumModule from './validate-enum'

enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}

describe('mapStringToEnum', () => {
  const enumObject = Color

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns the correct enum value when value is valid', () => {
    vi.spyOn(validateEnumModule, 'validateEnum').mockReturnValue(true)
    expect(mapStringToEnum('RED', enumObject)).toBe(Color.Red)
    expect(mapStringToEnum('GREEN', enumObject)).toBe(Color.Green)
    expect(mapStringToEnum('BLUE', enumObject)).toBe(Color.Blue)
  })

  it('returns undefined if value is not found in enum values but validateEnum returns true', () => {
    vi.spyOn(validateEnumModule, 'validateEnum').mockReturnValue(true)
    expect(mapStringToEnum('YELLOW', enumObject)).toBeUndefined()
  })

  it('throws an error if validateEnum returns false', () => {
    vi.spyOn(validateEnumModule, 'validateEnum').mockReturnValue(false)
    expect(() => mapStringToEnum('RED', enumObject)).toThrowError(
      'Value "RED" is not a valid member of the enum.'
    )
  })

  it('calls validateEnum with correct arguments', () => {
    const spy = vi
      .spyOn(validateEnumModule, 'validateEnum')
      .mockReturnValue(true)
    mapStringToEnum('RED', enumObject)
    expect(spy).toHaveBeenCalledWith('RED', enumObject)
  })
})
