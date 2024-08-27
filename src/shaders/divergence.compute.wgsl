#include "common.wgsl"
@group(0) @binding(0) var<storage, read_write> srcBuffer: array<f32>;
@group(0) @binding(1) var<storage, read_write> tempBuffer: array<f32>;
@group(0) @binding(2) var<storage, read_write> divergence: array<f32>;
@group(0) @binding(3) var<uniform> size: WindowSizeUniforms;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let left = vec2u(clamp(x-1, 0, size.width), y);
    let right = vec2u(clamp(x+1, 0, size.width), y);
    let up = vec2u(x, clamp(y+1, 0, size.height));
    let down = vec2u(x, clamp(y-1, 0, size.height));

    divergence[idx] = (srcBuffer[getIdx(right, size.width)] + srcBuffer[getIdx(left, size.width)] + srcBuffer[getIdx(up, size.width)] + srcBuffer[getIdx(down, size.width)] - 4 * srcBuffer[idx]) * 0.25;
    tempBuffer[idx] = srcBuffer[idx];
}