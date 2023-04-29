export function dealColorRGB(value: any) {
  if (Array.isArray(value) && value.length >= 3) {
    return value;
  } else if (typeof value == 'string' && value.startsWith('#')) {
    // value = value.substring(1);
    const vl = value.substring(1);

    if (vl.length == 3) {
      return vl.split('').map((m) => parseInt(m + m, 16) / 255.0);
    } else if (vl.length == 6) {
    }
  }

  return [1, 1, 1, 1];
}

export function dealColorRGBA(value: any) {}

export function dealSizeVl(value: any) {
  if (typeof value == 'number') {
    return value;
  }

  try {
    return parseFloat(value);
  } catch (e) {
    return 0;
  }
}

export function dealOffsetVl(value: any) {
  if (typeof value == 'number') {
    return value;
  }

  try {
    return parseFloat(value);
  } catch (e) {
    return 0;
  }
}

export function dealTexture(value: any) {
  if (typeof value == 'string') {
    return value;
  }
  return 'null';
}

export function dealUV(value: any) {
  if (Array.isArray(value) && value.length >= 2) {
    return value;
  }

  return [0, 0];
}

export function dealUVSize(value: any): number[] {
  if (Array.isArray(value) && value.length >= 2) {
    return value;
  }

  return [0, 0];
}
