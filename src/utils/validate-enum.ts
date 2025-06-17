/**
 * Checks if a given value is a valid member of the specified enum-like object.
 *
 * @typeParam T - The type of the enum-like object.
 * @param value - The value to validate against the enum.
 * @param enumObject - The enum-like object to check the value against.
 * @returns `true` if the value is a member of the enum, otherwise `false`.
 */
export function validateEnum<T extends object>(
  value: unknown,
  enumObject: T
): value is T[keyof T] {
  return Object.values(enumObject).includes(value as T[keyof T])
}
