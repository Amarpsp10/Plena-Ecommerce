export default function deepCopy<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item)) as unknown as T;
  }

  const copy: Partial<T> = {};

  for (const [key, value] of Object.entries(obj)) {
    copy[key as keyof T] = deepCopy(value);
  }

  return copy as T;
}
