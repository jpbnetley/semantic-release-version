import { describe, it, expect } from 'vitest'
import { mapStringToEnum } from './map-string-to-enum'

enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}

enum NumericEnum {
  Zero,
  One,
  Two,
}

describe('mapStringToEnum', () => {
  it('should map a valid string to the corresponding string enum value', () => {
    expect(mapStringToEnum('RED', Color)).toBe(Color.Red)
    expect(mapStringToEnum('GREEN', Color)).toBe(Color.Green)
    expect(mapStringToEnum('BLUE', Color)).toBe(Color.Blue)
  })

  it('should return undefined for an invalid string in string enum', () => {
    expect(mapStringToEnum('YELLOW', Color)).toBeUndefined()
    expect(mapStringToEnum('', Color)).toBeUndefined()
  })

  it('should map a valid string to the corresponding numeric enum value', () => {
    expect(mapStringToEnum('0', NumericEnum)).toBe(0)
    expect(mapStringToEnum('1', NumericEnum)).toBe(1)
    expect(mapStringToEnum('2', NumericEnum)).toBe(2)
  })

  it('should return undefined for an invalid string in numeric enum', () => {
    expect(mapStringToEnum('3', NumericEnum)).toBeUndefined()
    expect(mapStringToEnum('One', NumericEnum)).toBeUndefined()
  })

  it('should return undefined if enumObject is empty', () => {
    expect(mapStringToEnum('anything', {})).toBeUndefined()
  })
})