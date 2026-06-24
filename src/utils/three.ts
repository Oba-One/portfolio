import { Cache, TextureLoader } from 'three'
import { DRACOLoader, GLTFLoader } from 'three-stdlib'

type Disposable = {
  dispose: () => void
}

type TextureLike = Disposable & {
  minFilter?: unknown
  source?: {
    data?: {
      close?: () => void
    }
  }
}

type MaterialLike = Disposable & {
  isMaterial?: boolean
  [key: string]: unknown
}

type MeshLike = {
  isMesh?: boolean
  geometry?: Disposable
  material?: MaterialLike | MaterialLike[]
}

type ObjectLike = MeshLike & {
  name?: string
  traverse: (callback: (child: ObjectLike) => void) => void
}

type RendererLike = Disposable

type LightLike = {
  parent: {
    remove: (light: never) => void
  } | null
}

// Enable caching for all loaders
Cache.enabled = true

const dracoLoader = new DRACOLoader()
const gltfLoader = new GLTFLoader()
dracoLoader.setDecoderPath('/draco/')
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * GLTF model loader configured with draco decoder
 */
export const modelLoader = gltfLoader
export const textureLoader = new TextureLoader()

/**
 * Clean up a scene's materials and geometry
 */
export const cleanScene = (scene: ObjectLike | null | undefined) => {
  scene?.traverse(object => {
    if (!object.isMesh) return

    object.geometry?.dispose()

    if (!object.material) return

    if (!Array.isArray(object.material) && object.material.isMaterial) {
      cleanMaterial(object.material)
    } else {
      for (const material of Array.isArray(object.material)
        ? object.material
        : [object.material]) {
        cleanMaterial(material)
      }
    }
  })
}

/**
 * Clean up and dispose of a material
 */
export const cleanMaterial = (material: MaterialLike) => {
  material.dispose()

  for (const key of Object.keys(material)) {
    const value = material[key] as TextureLike | undefined
    if (value && typeof value === 'object' && 'minFilter' in value) {
      value.dispose()

      // Close GLTF bitmap textures
      value.source?.data?.close?.()
    }
  }
}

/**
 * Clean up and dispose of a renderer
 */
export const cleanRenderer = (renderer: RendererLike | null | undefined) => {
  if (!renderer) return
  renderer.dispose()
}

/**
 * Clean up lights by removing them from their parent
 */
export const removeLights = (lights: LightLike[]) => {
  for (const light of lights) {
    light.parent?.remove(light as never)
  }
}

/**
 * Get child by name
 */
export const getChild = (name: string, object: ObjectLike) => {
  let node: ObjectLike | undefined

  object.traverse(child => {
    if (child.name === name) {
      node = child
    }
  })

  return node
}
