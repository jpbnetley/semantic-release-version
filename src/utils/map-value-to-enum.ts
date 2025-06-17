/**
 * Maps a value to a corresponding value in the provided enum object.
 *
 * @typeParam T - The enum type to map the value to.
 * @param value - The value to map to an enum member.
 * @param enumObject - The enum object to search for the value.
 * @returns The corresponding enum value if found; otherwise, `undefined`.
 */
export function mapValueToEnum<T extends { [key: string]: string | number }>(
  value: string,
  enumObj: T
): T[keyof T] | undefined {
  if (Object.keys(enumObj).length === 0) {
    return undefined
  }
  const indexedValue = enumObj[value] 

  if (indexedValue != undefined && (indexedValue.toString() !== value)) {
    return undefined
  }

  const enumValues = Object.values(enumObj).filter(
    (enumValue) =>
      typeof enumValue !== 'string' ||
      isNaN(Number(enumValue)) ||
      Object.keys(enumObj).includes(enumValue)
  )
  // Try to match as string
  const found = enumValues.find((v) => String(v) === value)
  if (found !== undefined) return found as T[keyof T]
  // Try to match as number (for numeric enums)
  const num = Number(value)
  if (isNaN(num)) return undefined

  const foundNumber = enumValues.find((v) => {
    const valueNumber = Number(v)
    return !isNaN(valueNumber) && valueNumber === num
  })

  if (foundNumber !== undefined) return foundNumber as T[keyof T]

  return undefined
}
