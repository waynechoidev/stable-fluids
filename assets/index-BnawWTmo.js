var y=Object.defineProperty;var m=(t,n,e)=>n in t?y(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var o=(t,n,e)=>m(t,typeof n!="symbol"?n+"":n,e);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();var x=`struct VSOutput {
  @builtin(position) position: vec4f,
  @location(1) color: vec4f,
};

struct Vertex {
  @location(0) position: vec3f,
  @location(1) tex_coord: vec2f,
};

struct ConstantUniforms {
  pos:vec2f,
  velocity:vec2f,
  density:vec4f,
  dt:f32,
  viscosity:f32,
  is_tracking:f32,
}

struct WindowSizeUniforms {
  width:u32,
  height:u32,
};

fn getIdx(coord:vec2u, width:u32) -> u32 {
  return coord.x + coord.y * width;
}

struct Neighbors {
  left:vec2u,
  right:vec2u,
  up:vec2u,
  down:vec2u,
}

fn getNeighbors(x:u32, y:u32, size:WindowSizeUniforms) -> Neighbors {
  var left = vec2u(x - 1, y);
  var right = vec2u(x + 1, y);
  var down = vec2u(x, y - 1);
  var up = vec2u(x, y + 1);

  if (x == 0) {
      left.x = size.width - 1;
  }
  if (x == size.width - 1) {
      right.x = 0;
  }
  if (y == size.height - 1) {
      up.y = 0;
  }
  if (y == 0) {
      down.y = size.height - 1;
  }

  return Neighbors(left, right, up, down);
}

fn clampVelocity(v: vec2f) -> vec2f {
    return clamp(v, vec2f(-1.0), vec2f(1.0));
}

fn encodeVelocity(v: vec2f) -> vec4f {
    return vec4f(v * 0.5 + 0.5, 0, 0);
}

fn decodeVelocity(v: vec4f) -> vec2f {
    return v.xy * 2.0 - 1.0;
}

@group(0) @binding(0) var render_target: texture_2d<f32>;
@group(0) @binding(1) var my_sampler: sampler;

@vertex fn vs(
  input: Vertex,
) -> VSOutput {
  var output: VSOutput;
  var position = input.position;
  var color:vec4f = textureSampleLevel(render_target, my_sampler, input.tex_coord, 0);

  output.position = vec4f(position, 1.0);
  output.color = color;
  
  return output;
}`,b=`struct VSOutput {
  @builtin(position) position: vec4f,
  @location(1) color: vec4f,
};

struct Vertex {
  @location(0) position: vec3f,
  @location(1) tex_coord: vec2f,
};

struct ConstantUniforms {
  pos:vec2f,
  velocity:vec2f,
  density:vec4f,
  dt:f32,
  viscosity:f32,
  is_tracking:f32,
}

struct WindowSizeUniforms {
  width:u32,
  height:u32,
};

fn getIdx(coord:vec2u, width:u32) -> u32 {
  return coord.x + coord.y * width;
}

struct Neighbors {
  left:vec2u,
  right:vec2u,
  up:vec2u,
  down:vec2u,
}

fn getNeighbors(x:u32, y:u32, size:WindowSizeUniforms) -> Neighbors {
  var left = vec2u(x - 1, y);
  var right = vec2u(x + 1, y);
  var down = vec2u(x, y - 1);
  var up = vec2u(x, y + 1);

  if (x == 0) {
      left.x = size.width - 1;
  }
  if (x == size.width - 1) {
      right.x = 0;
  }
  if (y == size.height - 1) {
      up.y = 0;
  }
  if (y == 0) {
      down.y = size.height - 1;
  }

  return Neighbors(left, right, up, down);
}

fn clampVelocity(v: vec2f) -> vec2f {
    return clamp(v, vec2f(-1.0), vec2f(1.0));
}

fn encodeVelocity(v: vec2f) -> vec4f {
    return vec4f(v * 0.5 + 0.5, 0, 0);
}

fn decodeVelocity(v: vec4f) -> vec2f {
    return v.xy * 2.0 - 1.0;
}
@fragment fn fs(input: VSOutput) -> @location(0) vec4f {
  return vec4f(input.color);
}`,w=`struct VSOutput {
  @builtin(position) position: vec4f,
  @location(1) color: vec4f,
};

struct Vertex {
  @location(0) position: vec3f,
  @location(1) tex_coord: vec2f,
};

struct ConstantUniforms {
  pos:vec2f,
  velocity:vec2f,
  density:vec4f,
  dt:f32,
  viscosity:f32,
  is_tracking:f32,
}

struct WindowSizeUniforms {
  width:u32,
  height:u32,
};

fn getIdx(coord:vec2u, width:u32) -> u32 {
  return coord.x + coord.y * width;
}

struct Neighbors {
  left:vec2u,
  right:vec2u,
  up:vec2u,
  down:vec2u,
}

fn getNeighbors(x:u32, y:u32, size:WindowSizeUniforms) -> Neighbors {
  var left = vec2u(x - 1, y);
  var right = vec2u(x + 1, y);
  var down = vec2u(x, y - 1);
  var up = vec2u(x, y + 1);

  if (x == 0) {
      left.x = size.width - 1;
  }
  if (x == size.width - 1) {
      right.x = 0;
  }
  if (y == size.height - 1) {
      up.y = 0;
  }
  if (y == 0) {
      down.y = size.height - 1;
  }

  return Neighbors(left, right, up, down);
}

fn clampVelocity(v: vec2f) -> vec2f {
    return clamp(v, vec2f(-1.0), vec2f(1.0));
}

fn encodeVelocity(v: vec2f) -> vec4f {
    return vec4f(v * 0.5 + 0.5, 0, 0);
}

fn decodeVelocity(v: vec4f) -> vec2f {
    return v.xy * 2.0 - 1.0;
}
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<uniform> constant: ConstantUniforms;
@group(0) @binding(2) var<storage, read_write> velocity_buffer: array<vec2f>;
@group(0) @binding(3) var<storage, read_write> density_buffer: array<vec4f>;

const SRC_RADIUS:f32 = 50;
const DISSIPATION_FACTOR:f32 = 0.002;

fn smootherstep(x: f32, edge0: f32, edge1: f32) -> f32 {
    let scaled_x = (x - edge0) / (edge1 - edge0);
    let clamped_x = clamp(scaled_x, 0.0, 1.0);

    return clamped_x * clamped_x * clamped_x * (3.0 * clamped_x * (2.0 * clamped_x - 5.0) + 10.0);
}

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x:f32 = f32(id.x) + 0.5;
    let y:f32 = f32(id.y) + 0.5;
    let idx = getIdx(id.xy, size.width);
    
    
    density_buffer[idx] = max(density_buffer[idx] - vec4f(DISSIPATION_FACTOR), vec4f(0.0));
    
    if (constant.is_tracking == 1.0 ) {
        let dist = length(vec2f(f32(x), f32(y)) - constant.pos) / SRC_RADIUS;
        let scale = smootherstep(1.0 - dist, 0.0, 1.0);

        let velocity = velocity_buffer[idx] + constant.velocity * scale;
        let density = density_buffer[idx] + constant.density * scale;

        velocity_buffer[idx] = clampVelocity(velocity);
        density_buffer[idx] = density;
    }
}`,B=`struct VSOutput {
  @builtin(position) position: vec4f,
  @location(1) color: vec4f,
};

struct Vertex {
  @location(0) position: vec3f,
  @location(1) tex_coord: vec2f,
};

struct ConstantUniforms {
  pos:vec2f,
  velocity:vec2f,
  density:vec4f,
  dt:f32,
  viscosity:f32,
  is_tracking:f32,
}

struct WindowSizeUniforms {
  width:u32,
  height:u32,
};

fn getIdx(coord:vec2u, width:u32) -> u32 {
  return coord.x + coord.y * width;
}

struct Neighbors {
  left:vec2u,
  right:vec2u,
  up:vec2u,
  down:vec2u,
}

fn getNeighbors(x:u32, y:u32, size:WindowSizeUniforms) -> Neighbors {
  var left = vec2u(x - 1, y);
  var right = vec2u(x + 1, y);
  var down = vec2u(x, y - 1);
  var up = vec2u(x, y + 1);

  if (x == 0) {
      left.x = size.width - 1;
  }
  if (x == size.width - 1) {
      right.x = 0;
  }
  if (y == size.height - 1) {
      up.y = 0;
  }
  if (y == 0) {
      down.y = size.height - 1;
  }

  return Neighbors(left, right, up, down);
}

fn clampVelocity(v: vec2f) -> vec2f {
    return clamp(v, vec2f(-1.0), vec2f(1.0));
}

fn encodeVelocity(v: vec2f) -> vec4f {
    return vec4f(v * 0.5 + 0.5, 0, 0);
}

fn decodeVelocity(v: vec4f) -> vec2f {
    return v.xy * 2.0 - 1.0;
}
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<storage, read> velocity_buffer: array<vec2f>;
@group(0) @binding(2) var<storage, read_write> divergence_buffer: array<f32>;
@group(0) @binding(3) var<storage, read_write> pressure_buffer: array<f32>;
@group(0) @binding(4) var<storage, read_write> temp_pressure_buffer: array<f32>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let N:Neighbors = getNeighbors(x, y, size);

    divergence_buffer[idx] = 0.25 * 
    (velocity_buffer[getIdx(N.right, size.width)].x - velocity_buffer[getIdx(N.left, size.width)].x +
    velocity_buffer[getIdx(N.up, size.width)].y - velocity_buffer[getIdx(N.down, size.width)].y);
    
    pressure_buffer[idx] = 0;
    temp_pressure_buffer[idx] = 0;
}`,P=`struct VSOutput {
  @builtin(position) position: vec4f,
  @location(1) color: vec4f,
};

struct Vertex {
  @location(0) position: vec3f,
  @location(1) tex_coord: vec2f,
};

struct ConstantUniforms {
  pos:vec2f,
  velocity:vec2f,
  density:vec4f,
  dt:f32,
  viscosity:f32,
  is_tracking:f32,
}

struct WindowSizeUniforms {
  width:u32,
  height:u32,
};

fn getIdx(coord:vec2u, width:u32) -> u32 {
  return coord.x + coord.y * width;
}

struct Neighbors {
  left:vec2u,
  right:vec2u,
  up:vec2u,
  down:vec2u,
}

fn getNeighbors(x:u32, y:u32, size:WindowSizeUniforms) -> Neighbors {
  var left = vec2u(x - 1, y);
  var right = vec2u(x + 1, y);
  var down = vec2u(x, y - 1);
  var up = vec2u(x, y + 1);

  if (x == 0) {
      left.x = size.width - 1;
  }
  if (x == size.width - 1) {
      right.x = 0;
  }
  if (y == size.height - 1) {
      up.y = 0;
  }
  if (y == 0) {
      down.y = size.height - 1;
  }

  return Neighbors(left, right, up, down);
}

fn clampVelocity(v: vec2f) -> vec2f {
    return clamp(v, vec2f(-1.0), vec2f(1.0));
}

fn encodeVelocity(v: vec2f) -> vec4f {
    return vec4f(v * 0.5 + 0.5, 0, 0);
}

fn decodeVelocity(v: vec4f) -> vec2f {
    return v.xy * 2.0 - 1.0;
}
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
}`,z=`struct VSOutput {
  @builtin(position) position: vec4f,
  @location(1) color: vec4f,
};

struct Vertex {
  @location(0) position: vec3f,
  @location(1) tex_coord: vec2f,
};

struct ConstantUniforms {
  pos:vec2f,
  velocity:vec2f,
  density:vec4f,
  dt:f32,
  viscosity:f32,
  is_tracking:f32,
}

struct WindowSizeUniforms {
  width:u32,
  height:u32,
};

fn getIdx(coord:vec2u, width:u32) -> u32 {
  return coord.x + coord.y * width;
}

struct Neighbors {
  left:vec2u,
  right:vec2u,
  up:vec2u,
  down:vec2u,
}

fn getNeighbors(x:u32, y:u32, size:WindowSizeUniforms) -> Neighbors {
  var left = vec2u(x - 1, y);
  var right = vec2u(x + 1, y);
  var down = vec2u(x, y - 1);
  var up = vec2u(x, y + 1);

  if (x == 0) {
      left.x = size.width - 1;
  }
  if (x == size.width - 1) {
      right.x = 0;
  }
  if (y == size.height - 1) {
      up.y = 0;
  }
  if (y == 0) {
      down.y = size.height - 1;
  }

  return Neighbors(left, right, up, down);
}

fn clampVelocity(v: vec2f) -> vec2f {
    return clamp(v, vec2f(-1.0), vec2f(1.0));
}

fn encodeVelocity(v: vec2f) -> vec4f {
    return vec4f(v * 0.5 + 0.5, 0, 0);
}

fn decodeVelocity(v: vec4f) -> vec2f {
    return v.xy * 2.0 - 1.0;
}
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<uniform> constant: ConstantUniforms;
@group(0) @binding(2) var<storage, read> velocity_input: array<vec2f>;
@group(0) @binding(3) var<storage, read> density_input: array<vec4f>;
@group(0) @binding(4) var<storage, read_write> velocity_output: array<vec2f>;
@group(0) @binding(5) var<storage, read_write> density_output: array<vec4f>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let N:Neighbors = getNeighbors(x, y, size);

    let velocity = (velocity_input[idx]
    + constant.viscosity * constant.dt * (
    velocity_input[getIdx(N.right, size.width)] + velocity_input[getIdx(N.left, size.width)]
    + velocity_input[getIdx(N.up, size.width)] + velocity_input[getIdx(N.down, size.width)]
    )) / (1.0 + 4 * constant.viscosity * constant.dt);
    
    velocity_output[idx] = clampVelocity(velocity);
    
    let density = (density_input[idx]
    + constant.viscosity * constant.dt * (
    density_input[getIdx(N.right, size.width)] + density_input[getIdx(N.left, size.width)]
    + density_input[getIdx(N.up, size.width)] + density_input[getIdx(N.down, size.width)]
    )) / (1.0 + 4 * constant.viscosity * constant.dt);
    
    density_output[idx] = density;
}`,I=`struct VSOutput {
  @builtin(position) position: vec4f,
  @location(1) color: vec4f,
};

struct Vertex {
  @location(0) position: vec3f,
  @location(1) tex_coord: vec2f,
};

struct ConstantUniforms {
  pos:vec2f,
  velocity:vec2f,
  density:vec4f,
  dt:f32,
  viscosity:f32,
  is_tracking:f32,
}

struct WindowSizeUniforms {
  width:u32,
  height:u32,
};

fn getIdx(coord:vec2u, width:u32) -> u32 {
  return coord.x + coord.y * width;
}

struct Neighbors {
  left:vec2u,
  right:vec2u,
  up:vec2u,
  down:vec2u,
}

fn getNeighbors(x:u32, y:u32, size:WindowSizeUniforms) -> Neighbors {
  var left = vec2u(x - 1, y);
  var right = vec2u(x + 1, y);
  var down = vec2u(x, y - 1);
  var up = vec2u(x, y + 1);

  if (x == 0) {
      left.x = size.width - 1;
  }
  if (x == size.width - 1) {
      right.x = 0;
  }
  if (y == size.height - 1) {
      up.y = 0;
  }
  if (y == 0) {
      down.y = size.height - 1;
  }

  return Neighbors(left, right, up, down);
}

fn clampVelocity(v: vec2f) -> vec2f {
    return clamp(v, vec2f(-1.0), vec2f(1.0));
}

fn encodeVelocity(v: vec2f) -> vec4f {
    return vec4f(v * 0.5 + 0.5, 0, 0);
}

fn decodeVelocity(v: vec4f) -> vec2f {
    return v.xy * 2.0 - 1.0;
}
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<storage, read> pressure_buffer: array<f32>;
@group(0) @binding(2) var<storage, read_write> velocity_buffer: array<vec2f>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let N:Neighbors = getNeighbors(x, y, size);

    let gradient:vec2f = vec2f(
    (pressure_buffer[getIdx(N.right, size.width)] - pressure_buffer[getIdx(N.left, size.width)]),
    (pressure_buffer[getIdx(N.up, size.width)] - pressure_buffer[getIdx(N.down, size.width)])
    ) * 0.25;

    let velocity = velocity_buffer[idx] - gradient;
    
    velocity_buffer[idx] = clampVelocity(velocity);
}`,T=`struct VSOutput {
  @builtin(position) position: vec4f,
  @location(1) color: vec4f,
};

struct Vertex {
  @location(0) position: vec3f,
  @location(1) tex_coord: vec2f,
};

struct ConstantUniforms {
  pos:vec2f,
  velocity:vec2f,
  density:vec4f,
  dt:f32,
  viscosity:f32,
  is_tracking:f32,
}

struct WindowSizeUniforms {
  width:u32,
  height:u32,
};

fn getIdx(coord:vec2u, width:u32) -> u32 {
  return coord.x + coord.y * width;
}

struct Neighbors {
  left:vec2u,
  right:vec2u,
  up:vec2u,
  down:vec2u,
}

fn getNeighbors(x:u32, y:u32, size:WindowSizeUniforms) -> Neighbors {
  var left = vec2u(x - 1, y);
  var right = vec2u(x + 1, y);
  var down = vec2u(x, y - 1);
  var up = vec2u(x, y + 1);

  if (x == 0) {
      left.x = size.width - 1;
  }
  if (x == size.width - 1) {
      right.x = 0;
  }
  if (y == size.height - 1) {
      up.y = 0;
  }
  if (y == 0) {
      down.y = size.height - 1;
  }

  return Neighbors(left, right, up, down);
}

fn clampVelocity(v: vec2f) -> vec2f {
    return clamp(v, vec2f(-1.0), vec2f(1.0));
}

fn encodeVelocity(v: vec2f) -> vec4f {
    return vec4f(v * 0.5 + 0.5, 0, 0);
}

fn decodeVelocity(v: vec4f) -> vec2f {
    return v.xy * 2.0 - 1.0;
}
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<storage, read> velocity_buffer: array<vec2f>;
@group(0) @binding(2) var<storage, read_write> vorticity_buffer: array<f32>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let N:Neighbors = getNeighbors(x, y, size);

    vorticity_buffer[idx] = 0.25 * 
    (velocity_buffer[getIdx(N.right, size.width)].x - velocity_buffer[getIdx(N.left, size.width)].x +
    velocity_buffer[getIdx(N.up, size.width)].y - velocity_buffer[getIdx(N.down, size.width)].y);
}`,U=`struct VSOutput {
  @builtin(position) position: vec4f,
  @location(1) color: vec4f,
};

struct Vertex {
  @location(0) position: vec3f,
  @location(1) tex_coord: vec2f,
};

struct ConstantUniforms {
  pos:vec2f,
  velocity:vec2f,
  density:vec4f,
  dt:f32,
  viscosity:f32,
  is_tracking:f32,
}

struct WindowSizeUniforms {
  width:u32,
  height:u32,
};

fn getIdx(coord:vec2u, width:u32) -> u32 {
  return coord.x + coord.y * width;
}

struct Neighbors {
  left:vec2u,
  right:vec2u,
  up:vec2u,
  down:vec2u,
}

fn getNeighbors(x:u32, y:u32, size:WindowSizeUniforms) -> Neighbors {
  var left = vec2u(x - 1, y);
  var right = vec2u(x + 1, y);
  var down = vec2u(x, y - 1);
  var up = vec2u(x, y + 1);

  if (x == 0) {
      left.x = size.width - 1;
  }
  if (x == size.width - 1) {
      right.x = 0;
  }
  if (y == size.height - 1) {
      up.y = 0;
  }
  if (y == 0) {
      down.y = size.height - 1;
  }

  return Neighbors(left, right, up, down);
}

fn clampVelocity(v: vec2f) -> vec2f {
    return clamp(v, vec2f(-1.0), vec2f(1.0));
}

fn encodeVelocity(v: vec2f) -> vec4f {
    return vec4f(v * 0.5 + 0.5, 0, 0);
}

fn decodeVelocity(v: vec4f) -> vec2f {
    return v.xy * 2.0 - 1.0;
}
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<storage, read> vorticity_buffer: array<f32>;
@group(0) @binding(2) var<storage, read_write> velocity_buffer: array<vec2f>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let N:Neighbors = getNeighbors(x, y, size);

    let dx = vec2f(1.0 / f32(size.width), 1.0 / f32(size.height));

    let eta = vec2f((abs(vorticity_buffer[getIdx(N.right, size.width)]) - abs(vorticity_buffer[getIdx(N.left, size.width)])) / (2.0 * f32(x)),
                    (abs(vorticity_buffer[getIdx(N.up, size.width)]) - abs(vorticity_buffer[getIdx(N.down, size.width)])) / (2.0 * f32(y)));

    if (length(eta) < 1e-5){
        return;
    }

    let psi = vec3f(normalize(eta).xy, 0.0);
    let omega = vec3f(0, 0, vorticity_buffer[idx]);

    let velocity = velocity_buffer[idx] + 0.2 * cross(psi, omega).xy * dx;
    
    velocity_buffer[idx] = clampVelocity(velocity);
}`,G=`struct VSOutput {
  @builtin(position) position: vec4f,
  @location(1) color: vec4f,
};

struct Vertex {
  @location(0) position: vec3f,
  @location(1) tex_coord: vec2f,
};

struct ConstantUniforms {
  pos:vec2f,
  velocity:vec2f,
  density:vec4f,
  dt:f32,
  viscosity:f32,
  is_tracking:f32,
}

struct WindowSizeUniforms {
  width:u32,
  height:u32,
};

fn getIdx(coord:vec2u, width:u32) -> u32 {
  return coord.x + coord.y * width;
}

struct Neighbors {
  left:vec2u,
  right:vec2u,
  up:vec2u,
  down:vec2u,
}

fn getNeighbors(x:u32, y:u32, size:WindowSizeUniforms) -> Neighbors {
  var left = vec2u(x - 1, y);
  var right = vec2u(x + 1, y);
  var down = vec2u(x, y - 1);
  var up = vec2u(x, y + 1);

  if (x == 0) {
      left.x = size.width - 1;
  }
  if (x == size.width - 1) {
      right.x = 0;
  }
  if (y == size.height - 1) {
      up.y = 0;
  }
  if (y == 0) {
      down.y = size.height - 1;
  }

  return Neighbors(left, right, up, down);
}

fn clampVelocity(v: vec2f) -> vec2f {
    return clamp(v, vec2f(-1.0), vec2f(1.0));
}

fn encodeVelocity(v: vec2f) -> vec4f {
    return vec4f(v * 0.5 + 0.5, 0, 0);
}

fn decodeVelocity(v: vec4f) -> vec2f {
    return v.xy * 2.0 - 1.0;
}

@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<uniform> constant: ConstantUniforms;
@group(0) @binding(2) var my_sampler: sampler;
@group(0) @binding(3) var velocity_texture: texture_2d<f32>;
@group(0) @binding(4) var density_texture: texture_2d<f32>;
@group(0) @binding(5) var render_target: texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(6) var<storage, read_write> velocity_buffer: array<vec2f>;
@group(0) @binding(7) var<storage, read_write> density_buffer: array<vec4f>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = f32(id.x);
    let y = f32(id.y);
    let idx = getIdx(id.xy, size.width);
    let pos = vec2<f32>((x + 0.5)/f32(size.width), (y + 0.5)/f32(size.height));

    let velocity = velocity_buffer[idx];

    let dt = constant.dt * 0.0001;
    let pos_back = pos - velocity * dt;

    var back_velocity:vec2f = decodeVelocity(textureSampleLevel(velocity_texture, my_sampler, pos_back, 0));
    back_velocity = clampVelocity(back_velocity);
    let back_density:vec4f = textureSampleLevel(density_texture, my_sampler, pos_back, 0);

    textureStore(render_target, vec2<i32>(i32(x), i32(y)), back_density);
    velocity_buffer[idx] = clampVelocity(back_velocity);
    density_buffer[idx] = back_density;
}`,S=`struct VSOutput {
  @builtin(position) position: vec4f,
  @location(1) color: vec4f,
};

struct Vertex {
  @location(0) position: vec3f,
  @location(1) tex_coord: vec2f,
};

struct ConstantUniforms {
  pos:vec2f,
  velocity:vec2f,
  density:vec4f,
  dt:f32,
  viscosity:f32,
  is_tracking:f32,
}

struct WindowSizeUniforms {
  width:u32,
  height:u32,
};

fn getIdx(coord:vec2u, width:u32) -> u32 {
  return coord.x + coord.y * width;
}

struct Neighbors {
  left:vec2u,
  right:vec2u,
  up:vec2u,
  down:vec2u,
}

fn getNeighbors(x:u32, y:u32, size:WindowSizeUniforms) -> Neighbors {
  var left = vec2u(x - 1, y);
  var right = vec2u(x + 1, y);
  var down = vec2u(x, y - 1);
  var up = vec2u(x, y + 1);

  if (x == 0) {
      left.x = size.width - 1;
  }
  if (x == size.width - 1) {
      right.x = 0;
  }
  if (y == size.height - 1) {
      up.y = 0;
  }
  if (y == 0) {
      down.y = size.height - 1;
  }

  return Neighbors(left, right, up, down);
}

fn clampVelocity(v: vec2f) -> vec2f {
    return clamp(v, vec2f(-1.0), vec2f(1.0));
}

fn encodeVelocity(v: vec2f) -> vec4f {
    return vec4f(v * 0.5 + 0.5, 0, 0);
}

fn decodeVelocity(v: vec4f) -> vec2f {
    return v.xy * 2.0 - 1.0;
}
@group(0) @binding(0) var<uniform> size: WindowSizeUniforms;
@group(0) @binding(1) var<storage, read> velocity_buffer: array<vec2f>;
@group(0) @binding(2) var<storage, read> density_buffer: array<vec4f>;
@group(0) @binding(3) var velocity_texture: texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(4) var density_texture: texture_storage_2d<rgba8unorm, write>;

@compute @workgroup_size(16, 16, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
    let x = id.x;
    let y = id.y;
    let idx = getIdx(id.xy, size.width);

    let velocity:vec2f = velocity_buffer[idx];
    let density:vec4f = density_buffer[idx];

    textureStore(velocity_texture, vec2<i32>(i32(x), i32(y)), encodeVelocity(velocity));
    textureStore(density_texture, vec2<i32>(i32(x), i32(y)), density);
}`;async function v(t){const e=await(await fetch(t)).blob();return await createImageBitmap(e,{colorSpaceConversion:"none"})}async function p(t,n){let e=t;const i=[e];let r=0;for(;r<n&&(e.width>1||e.height>1);)e=await E(e),i.push(e),r++;return i}async function E(t){const n=Math.max(1,t.width/2|0),e=Math.max(1,t.height/2|0),i=document.createElement("canvas");i.width=n,i.height=e;const r=i.getContext("2d");if(!r)throw new Error("Unable to get 2D context");return r.drawImage(t,0,0,n,e),createImageBitmap(i)}const l=[[1,0,0,.5],[0,0,1,.5],[1,.3,0,.5],[.5,0,.5,.5],[1,1,0,.5],[0,.5,1,.5],[0,1,0,.5]];class N{constructor(){o(this,"_canvas");o(this,"_device");o(this,"_canvasContext");o(this,"_commandEncoder");o(this,"WIDTH");o(this,"HEIGHT");o(this,"WORKGROUP_SIZE",16);o(this,"_fps");o(this,"_drag");o(this,"_warning");o(this,"_previousFrameTime");o(this,"_previousFpsUpdateTime");o(this,"_delta");o(this,"_frameCount");this.WIDTH=Math.floor(window.innerWidth/this.WORKGROUP_SIZE)*this.WORKGROUP_SIZE,this.HEIGHT=Math.floor(window.innerHeight/this.WORKGROUP_SIZE)*this.WORKGROUP_SIZE,this._previousFrameTime=performance.now(),this._previousFpsUpdateTime=performance.now(),this._delta=0,this._frameCount=0,this._fps=document.getElementById("fps"),this._drag=document.getElementById("drag"),this._warning=document.getElementById("warning")}async requestDevice(){var e;const n=await((e=navigator.gpu)==null?void 0:e.requestAdapter());this._device=await(n==null?void 0:n.requestDevice()),this._device||(console.error("Cannot find a device"),alert("Your device does not support WebGPU"))}async getCanvasContext(){this._canvas=document.querySelector("canvas"),this._canvas||console.error("Cannot find a canvas"),this._canvas.width=this.WIDTH,this._canvas.height=this.HEIGHT,this._canvasContext=this._canvas.getContext("webgpu"),this._canvasContext||console.error("Cannot find a canvas context");const n={device:this._device,format:navigator.gpu.getPreferredCanvasFormat(),usage:GPUTextureUsage.RENDER_ATTACHMENT,alphaMode:"opaque"};this._canvasContext.configure(n)}async createRenderPipeline({label:n,vertexShader:e,fragmentShader:i,vertexBufferLayout:r,topology:s="triangle-list",bindGroupLayouts:c}){const u={label:n,layout:c?this._device.createPipelineLayout({bindGroupLayouts:c}):"auto",vertex:{module:this._device.createShaderModule({label:`${n} vertex shader`,code:e}),buffers:r},fragment:{module:this._device.createShaderModule({label:`${n} fragment shader`,code:i}),targets:[{format:navigator.gpu.getPreferredCanvasFormat()}]},primitive:{topology:s,cullMode:"back"},depthStencil:{depthWriteEnabled:!0,depthCompare:"less-equal",format:"depth24plus"}};return this._device.createRenderPipeline(u)}async createComputePipeline({label:n,computeShader:e}){const i={label:n,layout:"auto",compute:{module:this._device.createShaderModule({label:`${n} compute shader`,code:e})}};return this._device.createComputePipeline(i)}async createCubemapTexture(n,e=0){const i=await Promise.all(n.map(v)),r=this._device.createTexture({label:"yellow F on red",size:[i[0].width,i[0].height,i.length],mipLevelCount:e+1,format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});r||console.error("Failed to load cubemap texture");for(let s=0;s<6;s++)(await p(i[s],e)).forEach((u,f)=>{this._device.queue.copyExternalImageToTexture({source:u,flipY:!1},{texture:r,origin:[0,0,s],mipLevel:f},{width:u.width,height:u.height})});return r}async createTexture(n,e=0){const i=await v(n),r=await p(i,e),s=this._device.createTexture({label:"yellow F on red",size:[r[0].width,r[0].height],mipLevelCount:r.length,format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return s||console.error("Failed to load texture"),r.forEach((c,u)=>{this._device.queue.copyExternalImageToTexture({source:c,flipY:!1},{texture:s,mipLevel:u},{width:c.width,height:c.height})}),s}getVerticesData(n){const e=[];for(let i=0;i<n.length;i++){const{position:r,texCoord:s}=n[i];e.push(...r,...s)}return e}async getRenderPassDesc(){const n=this._canvasContext.getCurrentTexture(),e=this._device.createTexture({size:[n.width,n.height],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),i={view:n.createView(),clearValue:[1,1,1,1],loadOp:"clear",storeOp:"store"},r={view:e.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"};return{label:"render pass",colorAttachments:[i],depthStencilAttachment:r}}async createEncoder(){this._commandEncoder=this._device.createCommandEncoder({label:"encoder"})}async submitCommandBuffer(){const n=this._commandEncoder.finish();this._device.queue.submit([n])}setFrameData(){const n=performance.now(),e=n-this._previousFrameTime;this._delta=this._delta*.9+e*.1,this._frameCount++,n-this._previousFpsUpdateTime>=1e3&&(this._fps.innerHTML=`FPS: ${this._frameCount}`,this._frameCount<30?this._warning.hidden=!1:this._warning.hidden=!0,this._frameCount=0,this._previousFpsUpdateTime=n),this._previousFrameTime=n}initializeVecNArray(n){return new Float32Array(this.WIDTH*this.HEIGHT*n)}createSurfaceBuffer(n,e){const i=this._device.createBuffer({label:`${n} storage buffer`,size:this.WIDTH*this.HEIGHT*e*Float32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST});return this._device.queue.writeBuffer(i,0,this.initializeVecNArray(e)),i}}var a=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var t=0,n=arguments.length;n--;)t+=arguments[n]*arguments[n];return Math.sqrt(t)});function V(){var t=new a(3);return a!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function O(t,n,e){var i=new a(3);return i[0]=t,i[1]=n,i[2]=e,i}(function(){var t=V();return function(n,e,i,r,s,c){var u,f;for(e||(e=3),i||(i=0),r?f=Math.min(r*e+i,n.length):f=n.length,u=i;u<f;u+=e)t[0]=n[u],t[1]=n[u+1],t[2]=n[u+2],s(t,t,c),n[u]=t[0],n[u+1]=t[1],n[u+2]=t[2];return n}})();function D(){var t=new a(4);return a!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[3]=0),t}function h(t,n,e,i){var r=new a(4);return r[0]=t,r[1]=n,r[2]=e,r[3]=i,r}(function(){var t=D();return function(n,e,i,r,s,c){var u,f;for(e||(e=4),i||(i=0),r?f=Math.min(r*e+i,n.length):f=n.length,u=i;u<f;u+=e)t[0]=n[u],t[1]=n[u+1],t[2]=n[u+2],t[3]=n[u+3],s(t,t,c),n[u]=t[0],n[u+1]=t[1],n[u+2]=t[2],n[u+3]=t[3];return n}})();function R(){var t=new a(2);return a!=Float32Array&&(t[0]=0,t[1]=0),t}function C(t){var n=new a(2);return n[0]=t[0],n[1]=t[1],n}function d(t,n){var e=new a(2);return e[0]=t,e[1]=n,e}function W(t,n,e){return t[0]=n[0]-e[0],t[1]=n[1]-e[1],t}(function(){var t=R();return function(n,e,i,r,s,c){var u,f;for(e||(e=2),i||(i=0),r?f=Math.min(r*e+i,n.length):f=n.length,u=i;u<f;u+=e)t[0]=n[u],t[1]=n[u+1],s(t,t,c),n[u]=t[0],n[u+1]=t[1];return n}})();function A(t,n){const e=[],i=[];for(let r=0;r<n;r++)for(let s=0;s<t;s++)e.push({position:O(-1+2*s/(t-1),1-2*r/(n-1),0),texCoord:d(s/(t-1),1-r/(n-1))});for(let r=0;r<n-1;r++)for(let s=0;s<t-1;s++){const c=r*t+s,u=c+1,f=(r+1)*t+s,_=f+1;i.push([c,f,u],[u,f,_])}return{vertices:e,indices:i,length:i.length*3}}class H extends N{constructor(){super();o(this,"_mainPipeline");o(this,"_computeAddImpulsePipeline");o(this,"_computeDivergencePipeline");o(this,"_computePressureDisturbancePipeline");o(this,"_computeApplyPressurePipeline");o(this,"_computeDiffusionPipeline");o(this,"_computeVorticityPipeline");o(this,"_computeVorticityForcePipeline");o(this,"_computeAdvectionPipeline");o(this,"_computeTexturePipeline");o(this,"_vertexBuffer");o(this,"_indexBuffer");o(this,"_indicesLength");o(this,"_windowSizeUniformBuffer");o(this,"_velocityBuffer");o(this,"_tempVelocityBuffer");o(this,"_densityBuffer");o(this,"_tempDensityBuffer");o(this,"_divergenceBuffer");o(this,"_vorticityBuffer");o(this,"_pressureBuffer");o(this,"_tempPessureBuffer");o(this,"_constantBuffer");o(this,"_velocityTexture");o(this,"_densityTexture");o(this,"_renderTarget");o(this,"_sampler");o(this,"_mainBindGroup");o(this,"_computeAddImpulseBindGroup");o(this,"_computeDivergenceBindGroup");o(this,"_computePressureDisturbanceBindGroupOdd");o(this,"_computePressureDisturbanceBindGroupEven");o(this,"_computeApplyPressureBindGroup");o(this,"_computeDiffusionBindGroupOdd");o(this,"_computeDiffusionBindGroupEven");o(this,"_computeVorticityBindGroup");o(this,"_computeVorticityForceBindGroup");o(this,"_computeAdvectionBindGroup");o(this,"_computeTextureBindGroup");o(this,"_isTracking");o(this,"_prevMousePos");o(this,"_mouseVel");o(this,"_density");o(this,"_colorIdx");o(this,"JACOBI_FACTOR",20);this._isTracking=!1,this._prevMousePos=d(0,0),this._mouseVel=d(0,0),this._density=h(0,0,0,0),this._colorIdx=0}async initialize(){await this.requestDevice(),await this.getCanvasContext(),await this.createPipelines(),await this.createVertexBuffers(),await this.createOtherBuffers(),await this.createTextures(),await this.createBindGroups(),this.addEvent()}async run(){this.setFrameData(),await this.updateBuffer(),await this.createEncoder(),await this.update(),await this.draw(),await this.submitCommandBuffer(),requestAnimationFrame(()=>this.run())}async createPipelines(){this._mainPipeline=await this.createRenderPipeline({label:"main pipeline",vertexShader:x,fragmentShader:b,vertexBufferLayout:[{arrayStride:5*Float32Array.BYTES_PER_ELEMENT,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:3*Float32Array.BYTES_PER_ELEMENT,format:"float32x2"}]}]}),this._computeAddImpulsePipeline=await this.createComputePipeline({label:"add impulse compute pipeline",computeShader:w}),this._computeDivergencePipeline=await this.createComputePipeline({label:"divergence compute pipeline",computeShader:B}),this._computePressureDisturbancePipeline=await this.createComputePipeline({label:"pressure disturbance compute pipeline",computeShader:P}),this._computeApplyPressurePipeline=await this.createComputePipeline({label:"apply pressure compute pipeline",computeShader:I}),this._computeDiffusionPipeline=await this.createComputePipeline({label:"diffusion compute pipeline",computeShader:z}),this._computeVorticityPipeline=await this.createComputePipeline({label:"vorticity compute pipeline",computeShader:T}),this._computeVorticityForcePipeline=await this.createComputePipeline({label:"vorticity force compute pipeline",computeShader:U}),this._computeAdvectionPipeline=await this.createComputePipeline({label:"advection compute pipeline",computeShader:G}),this._computeTexturePipeline=await this.createComputePipeline({label:"texture compute pipeline",computeShader:S})}async createVertexBuffers(){const e=A(this.WIDTH,this.HEIGHT),i=new Float32Array(this.getVerticesData(e.vertices));this._vertexBuffer=this._device.createBuffer({label:"surface vertex buffer",size:i.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this._device.queue.writeBuffer(this._vertexBuffer,0,i);const r=new Uint32Array(e.indices.flat());this._indicesLength=e.length,this._indexBuffer=this._device.createBuffer({label:"surface index buffer",size:r.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),this._device.queue.writeBuffer(this._indexBuffer,0,r)}async createOtherBuffers(){this._velocityBuffer=this.createSurfaceBuffer("velocity",2),this._tempVelocityBuffer=this.createSurfaceBuffer("temp velocity",2),this._densityBuffer=this.createSurfaceBuffer("density",4),this._tempDensityBuffer=this.createSurfaceBuffer("temp density",4),this._divergenceBuffer=this.createSurfaceBuffer("divergence",1),this._vorticityBuffer=this.createSurfaceBuffer("vorticity",2),this._pressureBuffer=this.createSurfaceBuffer("pressure",1),this._tempPessureBuffer=this.createSurfaceBuffer("temp pressure",1),this._constantBuffer=this._device.createBuffer({label:"constant storage buffer",size:12*Float32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),this._windowSizeUniformBuffer=this._device.createBuffer({label:"window size uniforms",size:2*Uint32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._device.queue.writeBuffer(this._windowSizeUniformBuffer,0,new Uint32Array([this.WIDTH,this.HEIGHT]))}async createTextures(){this._renderTarget=this._device.createTexture({label:"render target texture",size:[this.WIDTH,this.HEIGHT],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING}),this._densityTexture=this._device.createTexture({label:"density texture",size:[this.WIDTH,this.HEIGHT],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING}),this._velocityTexture=this._device.createTexture({label:"velocity texture",size:[this.WIDTH,this.HEIGHT],format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING}),this._sampler=this._device.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"})}async createBindGroups(){this._mainBindGroup=this._device.createBindGroup({label:"main bind group",layout:this._mainPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:this._renderTarget.createView()},{binding:1,resource:this._sampler}]}),this._computeAddImpulseBindGroup=this._device.createBindGroup({label:"compute initialize bind group",layout:this._computeAddImpulsePipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this._windowSizeUniformBuffer}},{binding:1,resource:{buffer:this._constantBuffer}},{binding:2,resource:{buffer:this._velocityBuffer}},{binding:3,resource:{buffer:this._densityBuffer}}]}),this._computeDivergenceBindGroup=this._device.createBindGroup({label:"compute divergence bind group",layout:this._computeDivergencePipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this._windowSizeUniformBuffer}},{binding:1,resource:{buffer:this._velocityBuffer}},{binding:2,resource:{buffer:this._divergenceBuffer}},{binding:3,resource:{buffer:this._pressureBuffer}},{binding:4,resource:{buffer:this._tempPessureBuffer}}]}),this._computePressureDisturbanceBindGroupOdd=this._device.createBindGroup({label:"compute pressure disturbance bind group odd",layout:this._computePressureDisturbancePipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this._windowSizeUniformBuffer}},{binding:1,resource:{buffer:this._divergenceBuffer}},{binding:2,resource:{buffer:this._pressureBuffer}},{binding:3,resource:{buffer:this._tempPessureBuffer}}]}),this._computePressureDisturbanceBindGroupEven=this._device.createBindGroup({label:"compute pressure disturbance bind group even",layout:this._computePressureDisturbancePipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this._windowSizeUniformBuffer}},{binding:1,resource:{buffer:this._divergenceBuffer}},{binding:2,resource:{buffer:this._tempPessureBuffer}},{binding:3,resource:{buffer:this._pressureBuffer}}]}),this._computeApplyPressureBindGroup=this._device.createBindGroup({label:"compute apply pressure bind group",layout:this._computeApplyPressurePipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this._windowSizeUniformBuffer}},{binding:1,resource:{buffer:this._pressureBuffer}},{binding:2,resource:{buffer:this._velocityBuffer}}]}),this._computeDiffusionBindGroupOdd=this._device.createBindGroup({label:"compute viscous diffusion bind group Odd",layout:this._computeDiffusionPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this._windowSizeUniformBuffer}},{binding:1,resource:{buffer:this._constantBuffer}},{binding:2,resource:{buffer:this._velocityBuffer}},{binding:3,resource:{buffer:this._densityBuffer}},{binding:4,resource:{buffer:this._tempVelocityBuffer}},{binding:5,resource:{buffer:this._tempDensityBuffer}}]}),this._computeDiffusionBindGroupEven=this._device.createBindGroup({label:"compute viscous diffusion bind group Even",layout:this._computeDiffusionPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this._windowSizeUniformBuffer}},{binding:1,resource:{buffer:this._constantBuffer}},{binding:2,resource:{buffer:this._tempVelocityBuffer}},{binding:3,resource:{buffer:this._tempDensityBuffer}},{binding:4,resource:{buffer:this._velocityBuffer}},{binding:5,resource:{buffer:this._densityBuffer}}]}),this._computeVorticityBindGroup=this._device.createBindGroup({label:"compute vorticity bind group Even",layout:this._computeVorticityPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this._windowSizeUniformBuffer}},{binding:1,resource:{buffer:this._velocityBuffer}},{binding:2,resource:{buffer:this._vorticityBuffer}}]}),this._computeVorticityForceBindGroup=this._device.createBindGroup({label:"compute vorticity force bind group Even",layout:this._computeVorticityForcePipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this._windowSizeUniformBuffer}},{binding:1,resource:{buffer:this._vorticityBuffer}},{binding:2,resource:{buffer:this._velocityBuffer}}]}),this._computeTextureBindGroup=this._device.createBindGroup({label:"compute texture bind group",layout:this._computeTexturePipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this._windowSizeUniformBuffer}},{binding:1,resource:{buffer:this._velocityBuffer}},{binding:2,resource:{buffer:this._densityBuffer}},{binding:3,resource:this._velocityTexture.createView()},{binding:4,resource:this._densityTexture.createView()}]}),this._computeAdvectionBindGroup=this._device.createBindGroup({label:"compute advection bind group Even",layout:this._computeAdvectionPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this._windowSizeUniformBuffer}},{binding:1,resource:{buffer:this._constantBuffer}},{binding:2,resource:this._sampler},{binding:3,resource:this._velocityTexture.createView()},{binding:4,resource:this._densityTexture.createView()},{binding:5,resource:this._renderTarget.createView()},{binding:6,resource:{buffer:this._velocityBuffer}},{binding:7,resource:{buffer:this._densityBuffer}}]})}addEvent(){window.addEventListener("resize",function(){location.reload()});const e=()=>{this._isTracking=!0,this._mouseVel=d(0,0),this._colorIdx==l.length&&(this._colorIdx=0);const s=l[this._colorIdx++];this._density=h(s[0],s[1],s[2],s[3]),this._drag.hidden=!0},i=(s,c)=>{const u=this._canvas.getBoundingClientRect(),f=d(s-u.left,u.bottom-c);this._isTracking&&(this._mouseVel=W(this._mouseVel,f,this._prevMousePos)),this._prevMousePos=C(f)},r=()=>{this._isTracking=!1,this._mouseVel=d(0,0)};this._canvas.addEventListener("mousedown",e),this._canvas.addEventListener("mousemove",s=>{i(s.clientX,s.clientY)}),this._canvas.addEventListener("mouseup",r),this._canvas.addEventListener("touchstart",s=>{e();const c=s.touches[0];i(c.clientX,c.clientY)}),this._canvas.addEventListener("touchmove",s=>{const c=s.touches[0];i(c.clientX,c.clientY)}),this._canvas.addEventListener("touchend",r)}async updateBuffer(){this._device.queue.writeBuffer(this._constantBuffer,0,new Float32Array([...this._prevMousePos,...this._mouseVel,...this._density,this._delta,0,this._isTracking?1:0]))}async draw(){const e=await this.getRenderPassDesc(),i=this._commandEncoder.beginRenderPass(e);i.setPipeline(this._mainPipeline),i==null||i.setBindGroup(0,this._mainBindGroup),i.setVertexBuffer(0,this._vertexBuffer),i.setIndexBuffer(this._indexBuffer,"uint32"),i.drawIndexed(this._indicesLength),i.end()}async update(){const e=this._commandEncoder.beginComputePass({label:"compute pass"});e.setPipeline(this._computeAddImpulsePipeline),e.setBindGroup(0,this._computeAddImpulseBindGroup),e.dispatchWorkgroups(this.WIDTH/this.WORKGROUP_SIZE,this.HEIGHT/this.WORKGROUP_SIZE,1),e.setPipeline(this._computeDivergencePipeline),e.setBindGroup(0,this._computeDivergenceBindGroup),e.dispatchWorkgroups(this.WIDTH/this.WORKGROUP_SIZE,this.HEIGHT/this.WORKGROUP_SIZE,1),e.setPipeline(this._computePressureDisturbancePipeline);for(let i=1;i<=this.JACOBI_FACTOR;i++)i%2>0?e.setBindGroup(0,this._computePressureDisturbanceBindGroupOdd):e.setBindGroup(0,this._computePressureDisturbanceBindGroupEven),e.dispatchWorkgroups(this.WIDTH/this.WORKGROUP_SIZE,this.HEIGHT/this.WORKGROUP_SIZE,1);e.setPipeline(this._computeApplyPressurePipeline),e.setBindGroup(0,this._computeApplyPressureBindGroup),e.dispatchWorkgroups(this.WIDTH/this.WORKGROUP_SIZE,this.HEIGHT/this.WORKGROUP_SIZE,1),e.setPipeline(this._computeDiffusionPipeline);for(let i=1;i<=this.JACOBI_FACTOR;i++)i%2>0?e.setBindGroup(0,this._computeDiffusionBindGroupOdd):e.setBindGroup(0,this._computeDiffusionBindGroupEven),e.dispatchWorkgroups(this.WIDTH/this.WORKGROUP_SIZE,this.HEIGHT/this.WORKGROUP_SIZE,1);e.setPipeline(this._computeVorticityPipeline),e.setBindGroup(0,this._computeVorticityBindGroup),e.dispatchWorkgroups(this.WIDTH/this.WORKGROUP_SIZE,this.HEIGHT/this.WORKGROUP_SIZE,1),e.setPipeline(this._computeVorticityForcePipeline),e.setBindGroup(0,this._computeVorticityForceBindGroup),e.dispatchWorkgroups(this.WIDTH/this.WORKGROUP_SIZE,this.HEIGHT/this.WORKGROUP_SIZE,1),e.setPipeline(this._computeTexturePipeline),e.setBindGroup(0,this._computeTextureBindGroup),e.dispatchWorkgroups(this.WIDTH/this.WORKGROUP_SIZE,this.HEIGHT/this.WORKGROUP_SIZE,1),e.setPipeline(this._computeAdvectionPipeline),e.setBindGroup(0,this._computeAdvectionBindGroup),e.dispatchWorkgroups(this.WIDTH/this.WORKGROUP_SIZE,this.HEIGHT/this.WORKGROUP_SIZE,1),e.end()}}const g=new H;async function F(){await g.initialize(),await g.run()}F();
