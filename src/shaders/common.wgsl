struct VSOutput {
  @builtin(position) position: vec4f,
  @location(1) color: vec4f,
};

struct Vertex {
  @location(0) position: vec3f,
  @location(1) texCoord: vec2f,
};

struct ConstantUniforms {
  pos:vec2f,
  velocity:vec2f,
  density:vec4f,
  dt:f32,
  viscosity:f32,
  isTracking:f32,
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

// clamp velocity between -1 and 1
fn clampVelocity(v: vec2f) -> vec2f {
    return clamp(v, vec2f(-1.0), vec2f(1.0));
}

// encode velocity with -1..1 range to texture with 0..1 range
fn encodeVelocity(v: vec2f) -> vec4f {
    return vec4f(v * 0.5 + 0.5, 0, 0);
}

// decode texture with 0..1 range to velocity with -1..1 range
fn decodeVelocity(v: vec4f) -> vec2f {
    return v.xy * 2.0 - 1.0;
}