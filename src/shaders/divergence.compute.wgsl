#include "common.wgsl"
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<storage, read> velocity: array<vec2f>;
@group(0) @binding(2) var<storage, read_write> divergence: array<f32>;
@group(0) @binding(3) var<storage, read_write> pressure: array<f32>;
@group(0) @binding(4) var<storage, read_write> temp_pressure: array<f32>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let N:Neighbors = getNeighbors(x, y, size);

    divergence[idx] = 0.25 * 
    (velocity[getIdx(N.right, size.width)].x - velocity[getIdx(N.left, size.width)].x +
    velocity[getIdx(N.up, size.width)].y - velocity[getIdx(N.down, size.width)].y);
    
    pressure[idx] = 0;
    temp_pressure[idx] = 0;
}