#include "common.wgsl"
@group(0) @binding(0) var<storage, read> srcBuffer: array<f32>;
@group(0) @binding(1) var dstTexture: texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(2) var<uniform> size: WindowSizeUniforms;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let r:f32 = srcBuffer[idx];
    
    textureStore(dstTexture, vec2<i32>(i32(x), i32(y)), vec4<f32>(r, 0, 0, 255));
}