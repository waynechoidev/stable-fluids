#include "common.wgsl"
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<uniform> constant: ConstantUniforms;
@group(0) @binding(2) var<storage, read> velocity_input: array<vec2f>;
@group(0) @binding(3) var<storage, read> density_input: array<vec4f>;
@group(0) @binding(4) var<storage, read_write> velocity_output: array<vec2f>;
@group(0) @binding(5) var<storage, read_write> density_output: array<vec4f>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let N:Neighbors = getNeighbors(x, y, size);

    let velocity = (velocity_input[idx]
    + constant.viscosity * constant.dt * (
    velocity_input[getIdx(N.right, size.width)] + velocity_input[getIdx(N.left, size.width)]
    + velocity_input[getIdx(N.up, size.width)] + velocity_input[getIdx(N.down, size.width)]
    )) / (1.0 + 4 * constant.viscosity * constant.dt);
    
    velocity_output[idx] = clampVelocity(velocity);
    
    let density = (density_input[idx]
    + constant.viscosity * constant.dt * (
    density_input[getIdx(N.right, size.width)] + density_input[getIdx(N.left, size.width)]
    + density_input[getIdx(N.up, size.width)] + density_input[getIdx(N.down, size.width)]
    )) / (1.0 + 4 * constant.viscosity * constant.dt);
    
    density_output[idx] = density;
}