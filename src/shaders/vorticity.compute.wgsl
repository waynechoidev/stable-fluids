#include "common.wgsl"
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<storage, read> velocity_buffer: array<vec2f>;
@group(0) @binding(2) var<storage, read_write> vorticity_buffer: array<f32>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let N:Neighbors = getNeighbors(x, y, size);

    vorticity_buffer[idx] = 0.25 * 
    (velocity_buffer[getIdx(N.right, size.width)].x - velocity_buffer[getIdx(N.left, size.width)].x +
    velocity_buffer[getIdx(N.up, size.width)].y - velocity_buffer[getIdx(N.down, size.width)].y);
}