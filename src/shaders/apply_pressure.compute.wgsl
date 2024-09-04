#include "common.wgsl"
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<storage, read> pressure_buffer: array<f32>;
@group(0) @binding(2) var<storage, read_write> velocity_buffer: array<vec2f>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let N:Neighbors = getNeighbors(x, y, size);

    let gradient:vec2f = vec2f(
    (pressure_buffer[getIdx(N.right, size.width)] - pressure_buffer[getIdx(N.left, size.width)]),
    (pressure_buffer[getIdx(N.up, size.width)] - pressure_buffer[getIdx(N.down, size.width)])
    ) * 0.25;

    let velocity = velocity_buffer[idx] - gradient;
    
    velocity_buffer[idx] = clampVelocity(velocity);
}