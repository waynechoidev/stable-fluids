#include "common.wgsl"

@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<uniform> constant: ConstantUniforms;
@group(0) @binding(2) var my_sampler: sampler;
@group(0) @binding(3) var temp_velocity_texture: texture_2d<f32>;
@group(0) @binding(4) var temp_density_texture: texture_2d<f32>;
@group(0) @binding(5) var velocity_texture: texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(6) var density_texture: texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(7) var<storage, read_write> velocity_buffer: array<vec2f>;
@group(0) @binding(8) var<storage, read_write> density_buffer: array<vec4f>;

fn wrap(value: f32, max: f32) -> f32 {
    return value - max * floor(value / max);
}

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = f32(id.x);
    let y = f32(id.y);
    let idx = getIdx(id.xy, size.width);
    let pos = vec2<f32>((x + 0.5)/f32(size.width), (y + 0.5)/f32(size.height));

    let velocity = velocity_buffer[idx];

    let dt = constant.dt * 0.0001;
    let pos_back = pos - velocity * dt;

    var back_velocity:vec2f = decodeVelocity(textureSampleLevel(temp_velocity_texture, my_sampler, pos_back, 0));
    back_velocity = clampVelocity(back_velocity);
    let back_density:vec4f = textureSampleLevel(temp_density_texture, my_sampler, pos_back, 0);

    textureStore(velocity_texture, vec2<i32>(i32(x), i32(y)), encodeVelocity(back_velocity));
    textureStore(density_texture, vec2<i32>(i32(x), i32(y)), back_density);

    velocity_buffer[idx] = clampVelocity(back_velocity);
    density_buffer[idx] = back_density;
}