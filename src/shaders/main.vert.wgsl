#include "common.wgsl"

@group(0) @binding(0) var render_target: texture_2d<f32>;
@group(0) @binding(1) var my_sampler: sampler;

@vertex fn vs(
  input: Vertex,
) -> VSOutput {
  var output: VSOutput;
  var position = input.position;
  var color:vec4f = textureSampleLevel(render_target, my_sampler, input.tex_coord, 0);

  output.position = vec4f(position, 1.0);
  output.color = color;
  
  return output;
}