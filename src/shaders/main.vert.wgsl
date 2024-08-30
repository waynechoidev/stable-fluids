#include "common.wgsl"

@group(0) @binding(0) var densityMap: texture_2d<f32>;
@group(0) @binding(1) var mySampler: sampler;

@vertex fn vs(
  input: Vertex,
) -> VSOutput {
  var output: VSOutput;
  var position = input.position;
  var color:vec4f = textureSampleLevel(densityMap, mySampler, input.texCoord, 0);

  output.position = vec4f(position, 1.0);
  output.color = color;
  
  return output;
}