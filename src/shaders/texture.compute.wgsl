#include "common.wgsl"
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<storage, read> velocity_buffer: array<vec2f>;
@group(0) @binding(2) var<storage, read> density_buffer: array<vec4f>;
@group(0) @binding(3) var temp_velocity_buffer: texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(4) var temp_density_buffer: texture_storage_2d<rgba8unorm, write>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let velocity:vec2f = velocity_buffer[idx];
    let density:vec4f = density_buffer[idx];

    textureStore(temp_velocity_buffer, vec2<i32>(i32(x), i32(y)), vec4f(velocity, 0, 0));
    textureStore(temp_density_buffer, vec2<i32>(i32(x), i32(y)), density);
}