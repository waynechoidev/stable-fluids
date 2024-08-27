import { Vertex } from "@/engine/utils";
import { vec2, vec3 } from "gl-matrix";

export default function Surface(width: number, height: number) {
  const vertices: Vertex[] = [];
  const indices: [number, number, number][] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      vertices.push({
        position: vec3.fromValues(
          -1 + (2 * x) / (width - 1),
          1 - (2 * y) / (height - 1),
          0
        ),
        texCoord: vec2.fromValues(x / (width - 1), 1 - y / (height - 1)),
      });
    }
  }

  for (let y = 0; y < height - 1; y++) {
    for (let x = 0; x < width - 1; x++) {
      const topLeft = y * width + x;
      const topRight = topLeft + 1;
      const bottomLeft = (y + 1) * width + x;
      const bottomRight = bottomLeft + 1;

      indices.push(
        [topLeft, bottomLeft, topRight],
        [topRight, bottomLeft, bottomRight]
      );
    }
  }

  return { vertices, indices, length: indices.length * 3 };
}
