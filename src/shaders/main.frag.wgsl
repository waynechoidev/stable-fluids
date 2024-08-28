#include "common.wgsl"
@fragment fn fs(input: VSOutput) -> @location(0) vec4f {
  return vec4f(input.color);
}