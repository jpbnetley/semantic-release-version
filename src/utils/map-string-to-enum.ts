/**
 * Maps a string value to a corresponding value in the provided enum object.
 *
 * @typeParam T - The enum type to map the string to.
 * @param value - The string value to map to an enum member.
 * @param enumObject - The enum object to search for the value.
 * @returns The corresponding enum value if found; otherwise, `undefined`.
 * @throws {Error} If the provided value is not a valid member of the enum.
 */
export function mapStringToEnum<T extends object>(
  value: string,
  enumObject: T
): T[keyof T] | undefined {
  const enumValues = Object.values(enumObject)
  const index = enumValues.indexOf(value)
  
  if (index === -1) {
    return undefined
  }

  return enumValues[index] as T[keyof T]
}