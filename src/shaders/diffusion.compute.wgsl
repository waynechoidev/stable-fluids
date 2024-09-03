#include "common.wgsl"
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<uniform> constant: ConstantUniforms;
@group(0) @binding(2) var<storage, read> temp_velocity: array<vec2f>;
@group(0) @binding(3) var<storage, read_write> velocity: array<vec2f>;
@group(0) @binding(4) var<storage, read> temp_density: array<vec4f>;
@group(0) @binding(5) var<storage, read_write> density: array<vec4f>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let N:Neighbors = getNeighbors(x, y, size);

    // let dt = constant.dt;
    // velocity[idx] = temp_velocity[idx];
    velocity[idx] = (temp_velocity[idx]
    + constant.viscosity * constant.dt * (
    temp_velocity[getIdx(N.right, size.width)] + temp_velocity[getIdx(N.left, size.width)]
    + temp_velocity[getIdx(N.up, size.width)] + temp_velocity[getIdx(N.down, size.width)]
    )) / (1.0 + 4 * constant.viscosity * constant.dt);
    
    density[idx] = temp_density[idx];
    // density[idx] = (temp_density[idx]
    // + constant.viscosity * constant.dt * (
    // temp_density[getIdx(N.right, size.width)] + temp_density[getIdx(N.left, size.width)]
    // + temp_density[getIdx(N.up, size.width)] + temp_density[getIdx(N.down, size.width)]
    // )) / (1.0 + 4 * constant.viscosity * constant.dt);
}