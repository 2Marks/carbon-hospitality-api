export function isLengthy<T>(data: T[]): boolean {
  return data && data.length > 0;
}

export function isNotLengthy<T>(data: T[] | undefined): boolean {
  return !data || data.length <= 0;
}

export function isTruthy<T>(data: T): boolean {
  return data && data !== undefined;
}

export function isFalsy<T>(data: T): boolean {
  return !data || data === undefined || data === null;
}

export function isEmpty(data: any): boolean {
  return !data || data === undefined || data === null || data === "";
}

export function isNotEmpty(data: any): boolean {
  return data !== undefined && data !== null && data !== "";
}
