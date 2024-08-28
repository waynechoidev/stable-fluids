#include "common.wgsl"
@group(0) @binding(0) var<storage, read_write> velocityBuffer: array<vec2f>;
@group(0) @binding(1) var<storage, read_write> densityBuffer: array<vec4f>;
@group(0) @binding(2) var<uniform> constant: ConstantUniforms;
@group(0) @binding(3) var<uniform> size: WindowSizeUniforms;

fn smootherstep(x: f32, edge0: f32, edge1: f32) -> f32 {
    // Scale, and clamp x to 0..1 range
    let scaled_x = (x - edge0) / (edge1 - edge0);
    let clamped_x = clamp(scaled_x, 0.0, 1.0);

    // Compute smootherstep value
    return clamped_x * clamped_x * clamped_x * (3.0 * clamped_x * (2.0 * clamped_x - 5.0) + 10.0);
}

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);
    
    // let center_x: f32 = f32(size.width / 2u);
    // let center_y: f32 = f32(size.height / 2u);
    let center_x: f32 = constant.pos.x;
    let center_y: f32 = constant.pos.y;
    
    // let dx: u32 = u32(x) - center_x;
    // let dy: u32 = u32(y) - center_y;
    // let distance_sq: u32 = dx * dx + dy * dy;
    
    let radius: f32 = 50;
    // && distance_sq < radius_sq
    if (x < size.width && y < size.height && constant.isTracking == 1.0 ) {
        let dist = length(vec2f(f32(x), f32(y)) - vec2f(center_x, center_y)) / radius;
        let scale = smootherstep(1.0 - dist, 0.0, 1.0);
        velocityBuffer[idx] += constant.velocity * scale;
        densityBuffer[idx] += constant.density * scale;
    }
}