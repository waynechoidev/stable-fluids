#include "common.wgsl"
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<storage, read> pressure: array<f32>;
@group(0) @binding(2) var<storage, read_write> velocity_buffer: array<vec2f>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let N:Neighbors = getNeighbors(x, y, size);

    let gradient:vec2f = vec2f(
    (pressure[getIdx(N.right, size.width)] - pressure[getIdx(N.left, size.width)]),
    (pressure[getIdx(N.up, size.width)] - pressure[getIdx(N.down, size.width)])
    ) * 0.25;

    velocity_buffer[idx] -= gradient;
}