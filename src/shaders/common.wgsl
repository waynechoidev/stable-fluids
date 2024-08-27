struct VSOutput {
  @builtin(position) position: vec4f,
  @location(1) height: f32,
};

struct Vertex {
  @location(0) position: vec3f,
  @location(1) texCoord: vec2f,
};

struct WindowSizeUniforms {
  width:u32,
  height:u32,
};

fn getIdx(coord:vec2u, width:u32) -> u32 {
    return coord.x + coord.y * width;
}