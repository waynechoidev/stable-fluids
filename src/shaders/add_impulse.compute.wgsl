#include "common.wgsl"
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<uniform> constant: ConstantUniforms;
@group(0) @binding(2) var<storage, read_write> velocity: array<vec2f>;
@group(0) @binding(3) var<storage, read_write> density: array<vec4f>;

const SRC_RADIUS:f32 = 50;
const DISSIPATION_FACTOR:f32 = 0.005;

fn smootherstep(x: f32, edge0: f32, edge1: f32) -> f32 {
    let scaled_x = (x - edge0) / (edge1 - edge0);
    let clamped_x = clamp(scaled_x, 0.0, 1.0);

    return clamped_x * clamped_x * clamped_x * (3.0 * clamped_x * (2.0 * clamped_x - 5.0) + 10.0);
}

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);
    
    // Dissipation
    density[idx] = max(density[idx] - vec4f(DISSIPATION_FACTOR), vec4f(0.0));
    
    if (constant.isTracking == 1.0 ) {
        let dist = length(vec2f(f32(x), f32(y)) - constant.pos) / SRC_RADIUS;
        let scale = smootherstep(1.0 - dist, 0.0, 1.0);
        velocity[idx] += constant.velocity * scale;
        density[idx] += constant.density * scale;
    }
}