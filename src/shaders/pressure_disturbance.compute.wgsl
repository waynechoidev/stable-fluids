#include "common.wgsl"
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<storage, read> divergence: array<f32>;
@group(0) @binding(2) var<storage, read> pressure_input: array<f32>;
@group(0) @binding(3) var<storage, read_write> pressure_output: array<f32>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let N:Neighbors = getNeighbors(x, y, size);

    pressure_output[idx] = (pressure_input[getIdx(N.right, size.width)] + pressure_input[getIdx(N.left, size.width)]
    + pressure_input[getIdx(N.up, size.width)] + pressure_input[getIdx(N.down, size.width)] - divergence[idx] * 4.0) * 0.25;
}