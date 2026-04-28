export const emptyToUndefined = <T>(value: T | null | undefined | ''): T | undefined => {
  return value === '' || value === null || value === undefined ? undefined : value
}
