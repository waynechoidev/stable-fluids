#include "common.wgsl"
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<storage, read> vorticity: array<f32>;
@group(0) @binding(2) var<storage, read_write> velocity: array<vec2f>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let N:Neighbors = getNeighbors(x, y, size);

    let dx = vec2f(1.0 / f32(size.width), 1.0 / f32(size.height));

    let eta = vec2f((abs(vorticity[getIdx(N.right, size.width)]) - abs(vorticity[getIdx(N.left, size.width)])) / (2.0 * f32(x)),
                    (abs(vorticity[getIdx(N.up, size.width)]) - abs(vorticity[getIdx(N.down, size.width)])) / (2.0 * f32(y)));

    if (length(eta) < 1e-5){
        return;
    }

    let psi = vec3f(normalize(eta).xy, 0.0);
    let omega = vec3f(0, 0, vorticity[idx]);

    // velocity[idx] += 0.2 * cross(psi, omega).xy * dx;
    let vel = velocity[idx];
}