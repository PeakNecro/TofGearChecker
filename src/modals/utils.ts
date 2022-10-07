export function randomEnum<T extends object>(anEnum: T, limit?: number): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * (!!limit && enumValues.length > limit ? limit : enumValues.length));
  const randomEnumValue = enumValues[randomIndex]
  return randomEnumValue;
}
