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