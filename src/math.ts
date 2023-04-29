export class Matrix4f {
  m00: number = 0;
  m01: number = 0;
  m02: number = 0;
  m03: number = 0;
  m10: number = 0;
  m11: number = 0;
  m12: number = 0;
  m13: number = 0;
  m20: number = 0;
  m21: number = 0;
  m22: number = 0;
  m23: number = 0;
  m30: number = 0;
  m31: number = 0;
  m32: number = 0;
  m33: number = 0;

  public identity(): Matrix4f {
    this.m00 = 1;
    this.m01 = 0;
    this.m02 = 0;
    this.m03 = 0;
    this.m10 = 0;
    this.m11 = 1;
    this.m12 = 0;
    this.m13 = 0;
    this.m20 = 0;
    this.m21 = 0;
    this.m22 = 1;
    this.m23 = 0;
    this.m30 = 0;
    this.m31 = 0;
    this.m32 = 0;
    this.m33 = 1;
    return this;
  }

  public setOrtho(left: number, right: number, bottom: number, top: number, zNear: number, zFar: number) {
    const rm00 = 2.0 / (right - left);
    const rm11 = 2.0 / (top - bottom);
    const rm22 = 2.0 / (zNear - zFar);
    const rm30 = (left + right) / (left - right);
    const rm31 = (top + bottom) / (bottom - top);
    const rm32 = (zFar + zNear) / (zNear - zFar);

    this.m30 = this.m00 * rm30 + this.m10 * rm31 + this.m20 * rm32 + this.m30;
    this.m31 = this.m01 * rm30 + this.m11 * rm31 + this.m21 * rm32 + this.m31;
    this.m32 = this.m02 * rm30 + this.m12 * rm31 + this.m22 * rm32 + this.m32;
    this.m33 = this.m03 * rm30 + this.m13 * rm31 + this.m23 * rm32 + this.m33;
    this.m00 *= rm00;
    this.m01 *= rm00;
    this.m02 *= rm00;
    this.m03 *= rm00;
    this.m10 *= rm11;
    this.m11 *= rm11;
    this.m12 *= rm11;
    this.m13 *= rm11;
    this.m20 *= rm22;
    this.m21 *= rm22;
    this.m22 *= rm22;
    this.m23 *= rm22;
    return this;
  }

  public translate(x: number, y: number, z: number) {
    this.m30 = this.m00 * x + this.m10 * y + this.m20 * z + this.m30;
    this.m31 = this.m01 * x + this.m11 * y + this.m21 * z + this.m31;
    this.m32 = this.m02 * x + this.m12 * y + this.m22 * z + this.m32;
    this.m33 = this.m03 * x + this.m13 * y + this.m23 * z + this.m33;
    return this;
  }

  public scale(x: number, y: number, z: number) {
    this.m00 *= x;
    this.m01 *= x;
    this.m02 *= x;
    this.m03 *= x;
    this.m10 *= y;
    this.m11 *= y;
    this.m12 *= y;
    this.m13 *= y;
    this.m20 *= z;
    this.m21 *= z;
    this.m22 *= z;
    this.m23 *= z;
    return this;
  }

  public toArray() {
    return [this.m00, this.m01, this.m02, this.m03, this.m10, this.m11, this.m12, this.m13, this.m20, this.m21, this.m22, this.m23, this.m30, this.m31, this.m32, this.m33];
  }

  public get(buffer: Float32Array) {
    buffer[0] = this.m00;
    buffer[1] = this.m01;
    buffer[2] = this.m02;
    buffer[3] = this.m03;
    buffer[4] = this.m10;
    buffer[5] = this.m11;
    buffer[6] = this.m12;
    buffer[7] = this.m13;
    buffer[8] = this.m20;
    buffer[9] = this.m21;
    buffer[10] = this.m22;
    buffer[11] = this.m23;
    buffer[12] = this.m30;
    buffer[13] = this.m31;
    buffer[14] = this.m32;
    buffer[15] = this.m33;
    return buffer;
  }
}
