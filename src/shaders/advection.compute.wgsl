#include "common.wgsl"

@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<uniform> constant: ConstantUniforms;
@group(0) @binding(2) var<storage, read> temp_velocity: array<vec2f>;
@group(0) @binding(3) var<storage, read> temp_density: array<vec4f>;
@group(0) @binding(4) var<storage, read_write> velocity: array<vec2f>;
@group(0) @binding(5) var<storage, read_write> density: array<vec4f>;

fn wrap(value: f32, max: f32) -> f32 {
    return value - max * floor(value / max);
}

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let idx = getIdx(id.xy, size.width);

    let pos = vec2f(id.xy);
    let vel = velocity[idx];
    let dt = constant.dt;
    var pos_back = pos - vel * dt;
    pos_back = vec2f(
        wrap(pos_back.x, f32(size.width)),
        wrap(pos_back.y, f32(size.height))
    );

    let vel2 = velocity[idx];
    let vel3 = temp_velocity[idx];
    velocity[idx] = temp_velocity[getIdx(vec2u(pos_back), size.width)];
    density[idx] = temp_density[getIdx(vec2u(pos_back), size.width)];
}