#include "common.wgsl"

@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<uniform> constant: ConstantUniforms;
@group(0) @binding(2) var<storage, read> temp_velocity: array<vec2f>;
@group(0) @binding(3) var<storage, read> temp_density: array<vec4f>;
@group(0) @binding(4) var<storage, read_write> velocity: array<vec2f>;
@group(0) @binding(5) var<storage, read_write> density: array<vec4f>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let idx = getIdx(id.xy, size.width);

    let pos = vec2f(id.xy);
    // let vel = velocity[idx];
    let vel = vec2f(-1, 0);
    let dt = constant.dt;
    let pos_back = pos - vel * dt;

    velocity[idx] = temp_velocity[getIdx(vec2u(pos_back), size.width)];
    density[idx] = temp_density[getIdx(vec2u(pos_back), size.width)];
}