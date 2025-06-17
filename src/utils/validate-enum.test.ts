import { describe, it, expect } from 'vitest'
import { validateEnum } from './validate-enum'

enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

const StringEnum = {
  Foo: 'foo',
  Bar: 'bar',
  Baz: 'baz',
} as const

describe('validateEnum', () => {
  it('returns true for valid enum values (TypeScript enum)', () => {
    expect(validateEnum(Color.Red, Color)).toBe(true)
    expect(validateEnum('green', Color)).toBe(true)
    expect(validateEnum('blue', Color)).toBe(true)
  })

  it('returns false for invalid enum values (TypeScript enum)', () => {
    expect(validateEnum('yellow', Color)).toBe(false)
    expect(validateEnum('', Color)).toBe(false)
    expect(validateEnum(undefined, Color)).toBe(false)
    expect(validateEnum(null, Color)).toBe(false)
    expect(validateEnum(123, Color)).toBe(false)
  })

  it('returns true for valid values in a string enum-like object', () => {
    expect(validateEnum('foo', StringEnum)).toBe(true)
    expect(validateEnum('bar', StringEnum)).toBe(true)
    expect(validateEnum('baz', StringEnum)).toBe(true)
  })

  it('returns false for invalid values in a string enum-like object', () => {
    expect(validateEnum('qux', StringEnum)).toBe(false)
    expect(validateEnum('', StringEnum)).toBe(false)
    expect(validateEnum(undefined, StringEnum)).toBe(false)
    expect(validateEnum(null, StringEnum)).toBe(false)
    expect(validateEnum(0, StringEnum)).toBe(false)
  })

  it('works with number enums', () => {
    enum Status {
      Pending = 0,
      Success = 1,
      Failed = 2,
    }
    expect(validateEnum(0, Status)).toBe(true)
    expect(validateEnum(1, Status)).toBe(true)
    expect(validateEnum(2, Status)).toBe(true)
    expect(validateEnum(3, Status)).toBe(false)
    expect(validateEnum('0', Status)).toBe(false)
  })

  it('returns false if enumObject is empty', () => {
    expect(validateEnum('anything', {})).toBe(false)
  })
})
