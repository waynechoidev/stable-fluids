import main_vert from "@/shaders/main.vert.wgsl";
import main_frag from "@/shaders/main.frag.wgsl";
import add_source_compute from "@/shaders/add_source.compute.wgsl";
import divergence_compute from "@/shaders/divergence.compute.wgsl";
import jacobi_compute from "@/shaders/jacobi.compute.wgsl";
import texture_compute from "@/shaders/texture.compute.wgsl";
import RendererBackend from "./renderer_backend";
import Surface from "./geometry/surface";
import { vec2, vec4 } from "gl-matrix";
import { colors } from "./utils";

export default class Renderer extends RendererBackend {
  private _mainPipeline!: GPURenderPipeline;
  private _computeAddSourcePipeline!: GPUComputePipeline;
  private _computeDivergencePipeline!: GPUComputePipeline;
  private _computeJacobiPipeline!: GPUComputePipeline;
  private _computeTexturePipeline!: GPUComputePipeline;

  private _vertexBuffer!: GPUBuffer;
  private _indexBuffer!: GPUBuffer;
  private _indicesLength!: number;

  private _windowSizeUniformBuffer!: GPUBuffer;

  private _velocityBuffer!: GPUBuffer;
  private _tempVelocityBuffer!: GPUBuffer;
  private _densityBuffer!: GPUBuffer;
  private _tempDensityBuffer!: GPUBuffer;
  private _divergenceBuffer!: GPUBuffer;
  private _vorticityBuffer!: GPUBuffer;
  private _pressureBuffer!: GPUBuffer;
  private _tempPessureBuffer!: GPUBuffer;

  private _constantBuffer!: GPUBuffer;

  private _densityMapTexture!: GPUTexture;
  private _sampler!: GPUSampler;

  private _mainBindGroup!: GPUBindGroup;
  private _computeAddSourceBindGroup!: GPUBindGroup;
  private _computeDivergenceBindGroup!: GPUBindGroup;
  private _computeJacobiBindGroupOdd!: GPUBindGroup;
  private _computeJacobiBindGroupEven!: GPUBindGroup;
  private _computeTextureBindGroup!: GPUBindGroup;

  private _isTracking: boolean;
  private _prevMousePos: vec2;
  private _mouseVel: vec2;
  private _density: vec4;
  private _colorIdx: number;

  constructor() {
    super();
    this._isTracking = false;
    this._prevMousePos = vec2.fromValues(0, 0);
    this._mouseVel = vec2.fromValues(0, 0);
    this._density = vec4.fromValues(0, 0, 0, 0);
    this._colorIdx = 0;
  }

  // public methods
  public async initialize() {
    await this.requestDevice();
    await this.getCanvasContext();

    await this.createPipelines();

    await this.createVertexBuffers();
    await this.createOtherBuffers();

    await this.createTextures();

    await this.createBindGroups();

    this.addEvent();
  }

  public async run() {
    this.setFrameData();

    await this.updateBuffer();

    await this.createEncoder();

    await this.update();

    await this.draw();

    await this.submitCommandBuffer();

    requestAnimationFrame(() => this.run());
  }

  private async createPipelines() {
    this._mainPipeline = await this.createRenderPipeline({
      label: "main pipeline",
      vertexShader: main_vert,
      fragmentShader: main_frag,
      vertexBufferLayout: [
        {
          arrayStride: 5 * Float32Array.BYTES_PER_ELEMENT,
          attributes: [
            { shaderLocation: 0, offset: 0, format: "float32x3" }, // position
            {
              shaderLocation: 1,
              offset: 3 * Float32Array.BYTES_PER_ELEMENT,
              format: "float32x2",
            }, // texCoord
          ],
        },
      ],
    });

    this._computeAddSourcePipeline = await this.createComputePipeline({
      label: "initialize compute pipeline",
      computeShader: add_source_compute,
    });

    this._computeDivergencePipeline = await this.createComputePipeline({
      label: "divergence compute pipeline",
      computeShader: divergence_compute,
    });

    this._computeJacobiPipeline = await this.createComputePipeline({
      label: "jacobi compute pipeline",
      computeShader: jacobi_compute,
    });

    this._computeTexturePipeline = await this.createComputePipeline({
      label: "texture compute pipeline",
      computeShader: texture_compute,
    });
  }

  private async createVertexBuffers() {
    const surface = Surface(this.WIDTH, this.HEIGHT);
    const cubeVertexValues = new Float32Array(
      this.getVerticesData(surface.vertices)
    );
    this._vertexBuffer = this._device.createBuffer({
      label: "surface vertex buffer",
      size: cubeVertexValues.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    this._device.queue.writeBuffer(this._vertexBuffer, 0, cubeVertexValues);
    const cubeIndexValues = new Uint32Array(surface.indices.flat());
    this._indicesLength = surface.length;
    this._indexBuffer = this._device.createBuffer({
      label: "surface index buffer",
      size: cubeIndexValues.byteLength,
      usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
    });
    this._device.queue.writeBuffer(this._indexBuffer, 0, cubeIndexValues);
  }

  private async createOtherBuffers() {
    this._velocityBuffer = this.createSurfaceBuffer("velocity", 2);
    this._tempVelocityBuffer = this.createSurfaceBuffer("temp velocity", 2);
    this._densityBuffer = this.createSurfaceBuffer("density", 4);
    this._tempDensityBuffer = this.createSurfaceBuffer("temp density", 4);
    this._divergenceBuffer = this.createSurfaceBuffer("divergence", 1);
    this._vorticityBuffer = this.createSurfaceBuffer("vorticity", 2);
    this._pressureBuffer = this.createSurfaceBuffer("pressure", 1);
    this._tempPessureBuffer = this.createSurfaceBuffer("temp pressure", 1);

    this._constantBuffer = this._device.createBuffer({
      label: "constant storage buffer",
      size: 12 * Float32Array.BYTES_PER_ELEMENT,
      usage:
        GPUBufferUsage.UNIFORM |
        GPUBufferUsage.COPY_SRC |
        GPUBufferUsage.COPY_DST,
    });

    this._windowSizeUniformBuffer = this._device.createBuffer({
      label: "window size uniforms",
      size: 2 * Uint32Array.BYTES_PER_ELEMENT,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    this._device.queue.writeBuffer(
      this._windowSizeUniformBuffer,
      0,
      new Uint32Array([this.WIDTH, this.HEIGHT])
    );
  }

  private async createTextures() {
    this._densityMapTexture = this._device.createTexture({
      label: "height map texture",
      size: [this.WIDTH, this.HEIGHT],
      format: "rgba8unorm",
      usage:
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.STORAGE_BINDING,
    });

    this._sampler = this._device.createSampler({
      magFilter: "linear",
      minFilter: "linear",
      mipmapFilter: "linear",
    });
  }

  private async createBindGroups() {
    this._mainBindGroup = this._device.createBindGroup({
      label: "main bind group",
      layout: this._mainPipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: this._densityMapTexture.createView() },
        { binding: 1, resource: this._sampler },
      ],
    });

    this._computeAddSourceBindGroup = this._device.createBindGroup({
      label: "compute initialize bind group",
      layout: this._computeAddSourcePipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this._velocityBuffer } },
        { binding: 1, resource: { buffer: this._densityBuffer } },
        { binding: 2, resource: { buffer: this._constantBuffer } },
        { binding: 3, resource: { buffer: this._windowSizeUniformBuffer } },
      ],
    });

    this._computeDivergenceBindGroup = this._device.createBindGroup({
      label: "compute divergence bind group",
      layout: this._computeDivergencePipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this._velocityBuffer } },
        { binding: 1, resource: { buffer: this._divergenceBuffer } },
        { binding: 2, resource: { buffer: this._pressureBuffer } },
        { binding: 3, resource: { buffer: this._tempPessureBuffer } },
        { binding: 4, resource: { buffer: this._windowSizeUniformBuffer } },
      ],
    });

    // this._computeJacobiBindGroupOdd = this._device.createBindGroup({
    //   label: "compute jacobi bind group odd",
    //   layout: this._computeJacobiPipeline.getBindGroupLayout(0),
    //   entries: [
    //     { binding: 0, resource: { buffer: this._heightMapTempStorageBuffer } },
    //     { binding: 1, resource: { buffer: this._heightMapStorageBuffer } },
    //     { binding: 2, resource: { buffer: this._divergenceStorageBuffer } },
    //     { binding: 3, resource: { buffer: this._windowSizeUniformBuffer } },
    //   ],
    // });

    // this._computeJacobiBindGroupEven = this._device.createBindGroup({
    //   label: "compute jacobi bind group even",
    //   layout: this._computeJacobiPipeline.getBindGroupLayout(0),
    //   entries: [
    //     { binding: 0, resource: { buffer: this._heightMapStorageBuffer } },
    //     { binding: 1, resource: { buffer: this._heightMapTempStorageBuffer } },
    //     { binding: 2, resource: { buffer: this._divergenceStorageBuffer } },
    //     { binding: 3, resource: { buffer: this._windowSizeUniformBuffer } },
    //   ],
    // });

    this._computeTextureBindGroup = this._device.createBindGroup({
      label: "compute texture bind group",
      layout: this._computeTexturePipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this._densityBuffer } },
        { binding: 1, resource: this._densityMapTexture.createView() },
        { binding: 2, resource: { buffer: this._windowSizeUniformBuffer } },
      ],
    });
  }

  private addEvent() {
    this._canvas.addEventListener("mousedown", () => {
      this._isTracking = true;
      this._mouseVel = vec2.fromValues(0, 0);
      if (this._colorIdx == colors.length) this._colorIdx = 0;
      const color = colors[this._colorIdx++];
      this._density = vec4.fromValues(color[0], color[1], color[2], color[3]);
    });

    this._canvas.addEventListener("mousemove", (e) => {
      const rect = this._canvas.getBoundingClientRect();
      const mousePos = vec2.fromValues(
        e.clientX - rect.left,
        rect.bottom - e.clientY
      );

      if (this._isTracking) {
        this._mouseVel = vec2.subtract(
          this._mouseVel,
          mousePos,
          this._prevMousePos
        );
      }

      this._prevMousePos = vec2.clone(mousePos);
    });

    this._canvas.addEventListener("mouseup", () => {
      this._isTracking = false;
      this._mouseVel = vec2.fromValues(0, 0);
    });
  }

  private async updateBuffer() {
    this._device.queue.writeBuffer(
      this._constantBuffer,
      0,
      new Float32Array([
        ...this._prevMousePos,
        ...this._mouseVel,
        ...this._density,
        this._delta,
        0,
        this._isTracking ? 1 : 0,
      ])
    );
  }

  private async draw() {
    const renderPassDesc: GPURenderPassDescriptor =
      await this.getRenderPassDesc();
    const renderPassEncoder: GPURenderPassEncoder =
      this._commandEncoder.beginRenderPass(renderPassDesc);

    renderPassEncoder.setPipeline(this._mainPipeline);
    renderPassEncoder?.setBindGroup(0, this._mainBindGroup);
    renderPassEncoder.setVertexBuffer(0, this._vertexBuffer);
    renderPassEncoder.setIndexBuffer(this._indexBuffer, "uint32");
    renderPassEncoder.drawIndexed(this._indicesLength);

    renderPassEncoder.end();
  }

  private async update() {
    const computePassEncoder = this._commandEncoder.beginComputePass({
      label: "compute pass",
    });

    computePassEncoder.setPipeline(this._computeAddSourcePipeline);
    computePassEncoder.setBindGroup(0, this._computeAddSourceBindGroup);
    computePassEncoder.dispatchWorkgroups(
      this.WIDTH / this.WORKGROUP_SIZE,
      this.HEIGHT / this.WORKGROUP_SIZE,
      1
    );

    // computePassEncoder.setPipeline(this._computeDivergencePipeline);
    // computePassEncoder.setBindGroup(0, this._computeDivergenceBindGroup);
    // computePassEncoder.dispatchWorkgroups(
    //   this.WIDTH / this.WORKGROUP_SIZE,
    //   this.HEIGHT / this.WORKGROUP_SIZE,
    //   1
    // );

    // computePassEncoder.setPipeline(this._computeJacobiPipeline);
    // for (let i = 0; i < 40; i++) {
    //   if (i % 2 == 0) {
    //     computePassEncoder.setBindGroup(0, this._computeJacobiBindGroupOdd);
    //   } else {
    //     computePassEncoder.setBindGroup(0, this._computeJacobiBindGroupEven);
    //   }
    //   computePassEncoder.dispatchWorkgroups(
    //     this.WIDTH / this.WORKGROUP_SIZE,
    //     this.HEIGHT / this.WORKGROUP_SIZE,
    //     1
    //   );
    // }

    computePassEncoder.setPipeline(this._computeTexturePipeline);
    computePassEncoder.setBindGroup(0, this._computeTextureBindGroup);
    computePassEncoder.dispatchWorkgroups(
      this.WIDTH / this.WORKGROUP_SIZE,
      this.HEIGHT / this.WORKGROUP_SIZE,
      1
    );

    computePassEncoder.end();
  }
}
