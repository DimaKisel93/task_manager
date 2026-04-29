export const emptyToUndefined = <T>(value: T | null | undefined | ''): T | undefined => {
  return value === '' || value === null || value === undefined ? undefined : value
}

export const toSelectValue = <T>(value: T | null | undefined): T | '' => {
  return value ?? ''
}

export const fromSelectValue = <T>(value: T | ''): T | null => {
  return value === '' ? null : value
}
