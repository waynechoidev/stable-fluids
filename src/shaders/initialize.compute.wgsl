#include "common.wgsl"
@group(0) @binding(0) var<storage, read_write> srcBuffer: array<f32>;
@group(0) @binding(1) var<uniform> size: WindowSizeUniforms;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);
    
    let center_x: u32 = u32(size.width / 2u);
    let center_y: u32 = u32(size.height / 2u);
    
    let dx: u32 = u32(x) - center_x;
    let dy: u32 = u32(y) - center_y;
    let distance_sq: u32 = dx * dx + dy * dy;
    
    let radius_sq: u32 = 10 * size.width;
    
    if (x < size.width && y < size.height && distance_sq < radius_sq) {
        srcBuffer[idx] = 1.0;
    } else {
        srcBuffer[idx] = 0.0;
    }
}