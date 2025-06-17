import { describe, it, expect } from 'vitest'
import { mapValueToEnum } from './map-value-to-enum'

enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}

enum NumericEnum {
  Zero = 0,
  One = 1,
  Two = 2,
}

describe('mapValueToEnum', () => {
  it('should map a valid string to the corresponding string enum value', () => {
    expect(mapValueToEnum('RED', Color)).toBe(Color.Red)
    expect(mapValueToEnum('GREEN', Color)).toBe(Color.Green)
    expect(mapValueToEnum('BLUE', Color)).toBe(Color.Blue)
  })

  it('should return undefined for an invalid string in string enum', () => {
    expect(mapValueToEnum('YELLOW', Color)).toBeUndefined()
    expect(mapValueToEnum('', Color)).toBeUndefined()
  })

  it('should map a valid string to the corresponding numeric enum value', () => {
    expect(mapValueToEnum('0', NumericEnum)).toBe(0)
    expect(mapValueToEnum('1', NumericEnum)).toBe(1)
    expect(mapValueToEnum('2', NumericEnum)).toBe(2)
  })

  it('should return undefined for an invalid string in numeric enum', () => {
    expect(mapValueToEnum('3', NumericEnum)).toBeUndefined()
    expect(mapValueToEnum('One', NumericEnum)).toBeUndefined()
  })

  it('should return undefined if enumObject is empty', () => {
    expect(mapValueToEnum('anything', {})).toBeUndefined()
  })
})
