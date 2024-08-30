#include "common.wgsl"
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<uniform> constant: ConstantUniforms;
@group(0) @binding(2) var<storage, read> temp_buffer: array<vec2f>;
@group(0) @binding(3) var<storage, read_write> buffer: array<vec2f>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let N:Neighbors = getNeighbors(x, y, size);

    buffer[idx] = (temp_buffer[idx]
    + constant.viscosity * constant.dt * (
    temp_buffer[getIdx(N.right, size.width)] + temp_buffer[getIdx(N.left, size.width)]
    + temp_buffer[getIdx(N.up, size.width)] + temp_buffer[getIdx(N.down, size.width)]
    )) / (1.0 + 4 * constant.viscosity * constant.dt);
}