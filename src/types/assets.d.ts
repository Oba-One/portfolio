declare module "*.mp4" {
  const src: string
  export default src
}

declare module "*.glb" {
  const src: string
  export default src
}

declare module "*.woff2" {
  const src: string
  export default src
}

declare module "*.glsl" {
  const src: string
  export default src
}

declare module "nodemailer" {
  type SendMailOptions = Record<string, unknown>

  export type SentMessageInfo = {
    response: string
  }

  export type Transporter = {
    sendMail(options: SendMailOptions): Promise<SentMessageInfo>
  }

  const nodemailer: {
    createTransport(options: SendMailOptions): Transporter
  }

  export default nodemailer
}

declare module "storybook/actions" {
  export function action(name: string): (...args: unknown[]) => void
}

declare module "three" {
  export const Cache: {
    enabled: boolean
  }

  export const sRGBEncoding: unknown

  export const MathUtils: {
    degToRad(degrees: number): number
  }

  export class Color {
    constructor(color?: string | number)
    constructor(r: number, g: number, b: number)
    convertSRGBToLinear(): this
    copy(color: Color): this
  }

  export class Vector2 {
    constructor(x?: number, y?: number)
    x: number
    y: number
    set(x: number, y: number): this
    toArray(): [number, number]
  }

  export class Vector3 {
    constructor(x?: number, y?: number, z?: number)
    x: number
    y: number
    z: number
    set(x: number, y: number, z: number): this
    toArray(): [number, number, number]
  }

  export class Object3D {
    name: string
    parent: Object3D | null
    children: Object3D[]
    position: Vector3
    rotation: Vector3
    scale: Vector3
    visible: boolean
    material?: Material | Material[]
    geometry?: { dispose(): void }
    isMesh?: boolean
    [key: string]: unknown
    add(object: Object3D): this
    remove(object: Object3D): this
    rotateX(radians: number): this
    traverse(callback: (object: Object3D) => void): void
    clone(): this
  }

  export class Group extends Object3D {}

  export class Scene extends Object3D {
    background: unknown
    overrideMaterial: unknown
  }

  export class Material {
    isMaterial?: boolean
    color?: Color
    map?: unknown
    opacity?: number
    transparent?: boolean
    depthTest?: boolean
    depthWrite?: boolean
    uniforms?: Record<string, { value: unknown }>
    userData: Record<string, unknown>
    [key: string]: unknown
    clone(): this
    dispose(): void
  }

  export class MeshBasicMaterial extends Material {
    constructor(parameters?: Record<string, unknown>)
    color: Color
  }

  export class MeshPhongMaterial extends Material {
    constructor(parameters?: Record<string, unknown>)
    color: Color
    specular: Color
    emissive: Color
    emissiveIntensity: number
    shininess: number
    onBeforeCompile: (shader: {
      uniforms: Record<string, unknown>
      vertexShader: string
      fragmentShader: string
    }) => void
  }

  export class MeshDepthMaterial extends Material {
    onBeforeCompile: (shader: {
      uniforms: Record<string, unknown>
      fragmentShader: string
    }) => void
  }

  export class ShaderMaterial extends Material {
    constructor(parameters?: unknown)
    uniforms: Record<string, { value: unknown }>
  }

  export class PlaneGeometry {
    constructor(width?: number, height?: number)
    rotateX(radians: number): this
    dispose(): void
  }

  export class SphereGeometry {
    constructor(radius?: number, widthSegments?: number, heightSegments?: number)
    dispose(): void
  }

  export class Mesh extends Object3D {
    constructor(geometry?: unknown, material?: Material | Material[])
    material: Material | Material[]
  }

  export class AmbientLight extends Object3D {
    constructor(color?: string | number | Color, intensity?: number)
  }

  export class DirectionalLight extends Object3D {
    constructor(color?: string | number | Color, intensity?: number)
  }

  export class PerspectiveCamera extends Object3D {
    constructor(fov?: number, aspect?: number, near?: number, far?: number)
    aspect: number
    updateProjectionMatrix(): void
  }

  export class OrthographicCamera extends Object3D {
    constructor(
      left?: number,
      right?: number,
      top?: number,
      bottom?: number,
      near?: number,
      far?: number
    )
    updateProjectionMatrix(): void
  }

  export class Texture {
    encoding: unknown
    flipY: boolean
    anisotropy: number
    generateMipmaps: boolean
    dispose(): void
  }

  export class TextureLoader {
    loadAsync(src: string): Promise<Texture>
  }

  export class WebGLRenderTarget {
    constructor(width?: number, height?: number)
    texture: Texture
    dispose(): void
  }

  export class WebGLRenderer {
    constructor(parameters?: Record<string, unknown>)
    outputEncoding: unknown
    physicallyCorrectLights: boolean
    capabilities: {
      getMaxAnisotropy(): number
    }
    setPixelRatio(value: number): void
    setSize(width: number, height: number): void
    setRenderTarget(target: WebGLRenderTarget | null): void
    render(scene: Object3D, camera: Object3D): void
    initTexture(texture: Texture): Promise<void>
    dispose(): void
  }

  export const UniformsUtils: {
    merge(uniforms: unknown[]): Record<string, { value: unknown }>
  }
}
