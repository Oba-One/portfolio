import { animate, useReducedMotion, useSpring } from 'framer-motion'
import { useInViewport } from 'hooks'
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type MutableRefObject,
} from 'react'
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Texture,
  Vector3,
  WebGLRenderTarget,
  WebGLRenderer,
  sRGBEncoding,
  type Object3D,
} from 'three'
import type { ImageSource } from 'components/Image'
import { HorizontalBlurShader, VerticalBlurShader } from 'three-stdlib'
import { loadImageFromSrcSet } from 'utils/image'
import { classes, cssProps, numToMs } from 'utils/style'
import {
  cleanRenderer,
  cleanScene,
  modelLoader,
  removeLights,
  textureLoader,
} from 'utils/three'
import styles from './Model.module.css'
import { ModelAnimationType } from './deviceModels'

const MeshType = {
  Frame: 'Frame',
  Logo: 'Logo',
  Screen: 'Screen',
}

const rotationSpringConfig = {
  stiffness: 40,
  damping: 20,
  mass: 1.4,
  restSpeed: 0.001,
}

type VectorPosition = {
  x: number
  y: number
  z: number
}

type ModelTexture = {
  srcSet?: ImageSource[]
  placeholder: ImageSource
  sizes?: string
}

export type ModelConfig = {
  url: string
  width: number
  height: number
  position: VectorPosition
  animation: string
  texture: ModelTexture
}

export type ModelProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
  models: ModelConfig[]
  show?: boolean
  preload?: boolean
  showDelay?: number
  animateIn?: boolean
  loadTextureBeforeAnimation?: boolean
  fallback?: boolean
  onReadyChange?: (ready: boolean) => void
  cameraPosition?: VectorPosition
  style?: CSSProperties
  className?: string
  alt: string
}

type AnimationControls = {
  stop: () => void
}

type LoadDeviceResult = {
  loadFullResTexture?: () => Promise<void>
  playAnimation?: () => AnimationControls | void
  finishAnimation?: () => void
}

type LoadDeviceState = {
  start: (signal: AbortSignal) => Promise<LoadDeviceResult>
}

export const Model = ({
  models,
  show = true,
  preload = false,
  showDelay = 0,
  animateIn = true,
  loadTextureBeforeAnimation = false,
  fallback = true,
  onReadyChange,
  cameraPosition = { x: 0, y: 0, z: 8 },
  style,
  className,
  alt,
  ...rest
}: ModelProps) => {
  const [readyDevices, setReadyDevices] = useState(0)
  const [webglReady, setWebglReady] = useState(true)
  const [rendererReady, setRendererReady] = useState(false)
  const [fallbackVisible, setFallbackVisible] = useState(false)
  const container = useRef<HTMLDivElement | null>(null)
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const camera = useRef<PerspectiveCamera | null>(null)
  const modelGroup = useRef<Group | null>(null)
  const scene = useRef<Scene | null>(null)
  const renderer = useRef<WebGLRenderer | null>(null)
  const shadowGroup = useRef<Group | null>(null)
  const renderTarget = useRef<WebGLRenderTarget | null>(null)
  const renderTargetBlur = useRef<WebGLRenderTarget | null>(null)
  const shadowCamera = useRef<OrthographicCamera | null>(null)
  const depthMaterial = useRef<MeshDepthMaterial | null>(null)
  const horizontalBlurMaterial = useRef<ShaderMaterial | null>(null)
  const verticalBlurMaterial = useRef<ShaderMaterial | null>(null)
  const plane = useRef<Mesh | null>(null)
  const lights = useRef<(AmbientLight | DirectionalLight)[]>([])
  const blurPlane = useRef<Mesh | null>(null)
  const fillPlane = useRef<Mesh | null>(null)
  const isInViewport = useInViewport(container, false, { threshold: 0.2 })
  const reduceMotion = useReducedMotion()
  const rotationX = useSpring(0, rotationSpringConfig)
  const rotationY = useSpring(0, rotationSpringConfig)
  const fallbackImages = fallback
    ? models.map(model => model.texture.srcSet?.[0] || model.texture.placeholder)
    : []
  const ready = readyDevices === models.length && webglReady && !fallbackVisible

  const onDeviceReady = useCallback(() => {
    setReadyDevices(count => count + 1)
  }, [])

  useEffect(() => {
    onReadyChange?.(ready)
  }, [onReadyChange, ready])

  useEffect(() => () => onReadyChange?.(false), [onReadyChange])

  useEffect(() => {
    const canvasElement = canvas.current
    if (!container.current || !canvasElement) return undefined

    const { clientWidth, clientHeight } = container.current
    const context =
      canvasElement.getContext('webgl', {
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: true,
      }) ||
      canvasElement.getContext('experimental-webgl', {
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: true,
      })

    if (!context) {
      setWebglReady(false)
      setFallbackVisible(true)
      return undefined
    }

    const rendererInstance = new WebGLRenderer({
      canvas: canvasElement,
      context,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: true,
    })
    renderer.current = rendererInstance

    rendererInstance.setPixelRatio(2)
    rendererInstance.setSize(clientWidth, clientHeight)
    rendererInstance.outputEncoding = sRGBEncoding
    rendererInstance.physicallyCorrectLights = true

    const cameraInstance = new PerspectiveCamera(36, clientWidth / clientHeight, 0.1, 100)
    camera.current = cameraInstance
    cameraInstance.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)

    const sceneInstance = new Scene()
    scene.current = sceneInstance

    const modelGroupInstance = new Group()
    modelGroup.current = modelGroupInstance
    sceneInstance.add(modelGroupInstance)

    // Lighting
    const ambientLight = new AmbientLight(0xffffff, 1.2)
    const keyLight = new DirectionalLight(0xffffff, 1.1)
    const fillLight = new DirectionalLight(0xffffff, 0.8)

    fillLight.position.set(-6, 2, 2)
    keyLight.position.set(0.5, 0, 0.866)
    lights.current = [ambientLight, keyLight, fillLight]
    lights.current.forEach(light => sceneInstance.add(light))

    // The shadow container, if you need to move the plane just move this
    const shadowGroupInstance = new Group()
    shadowGroup.current = shadowGroupInstance
    sceneInstance.add(shadowGroupInstance)
    shadowGroupInstance.position.set(0, 0, -0.8)
    shadowGroupInstance.rotateX(Math.PI / 2)

    const renderTargetSize = 512
    const planeWidth = 8
    const planeHeight = 8
    const cameraHeight = 1.5
    const shadowOpacity = 0.8
    const shadowDarkness = 3

    // The render target that will show the shadows in the plane texture
    const renderTargetInstance = new WebGLRenderTarget(renderTargetSize, renderTargetSize)
    renderTarget.current = renderTargetInstance
    renderTargetInstance.texture.generateMipmaps = false

    // The render target that we will use to blur the first render target
    const renderTargetBlurInstance = new WebGLRenderTarget(
      renderTargetSize,
      renderTargetSize
    )
    renderTargetBlur.current = renderTargetBlurInstance
    renderTargetBlurInstance.texture.generateMipmaps = false

    // Make a plane and make it face up
    const planeGeometry = new PlaneGeometry(planeWidth, planeHeight).rotateX(Math.PI / 2)

    const planeMaterial = new MeshBasicMaterial({
      map: renderTargetInstance.texture,
      opacity: shadowOpacity,
      transparent: true,
    })

    const planeInstance = new Mesh(planeGeometry, planeMaterial)
    plane.current = planeInstance
    // The y from the texture is flipped!
    planeInstance.scale.y = -1
    shadowGroupInstance.add(planeInstance)

    // The plane onto which to blur the texture
    const blurPlaneInstance = new Mesh(planeGeometry)
    blurPlane.current = blurPlaneInstance
    blurPlaneInstance.visible = false
    shadowGroupInstance.add(blurPlaneInstance)

    // The plane with the color of the ground
    const fillMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0,
      transparent: true,
    })

    const fillPlaneInstance = new Mesh(planeGeometry, fillMaterial)
    fillPlane.current = fillPlaneInstance
    fillPlaneInstance.rotateX(Math.PI)
    fillPlaneInstance.position.y -= 0.00001
    shadowGroupInstance.add(fillPlaneInstance)

    // The camera to render the depth material from
    const shadowCameraInstance = new OrthographicCamera(
      -planeWidth / 2,
      planeWidth / 2,
      planeHeight / 2,
      -planeHeight / 2,
      0,
      cameraHeight
    )
    shadowCamera.current = shadowCameraInstance
    // Get the camera to look up
    shadowCameraInstance.rotation.x = Math.PI / 2
    shadowGroupInstance.add(shadowCameraInstance)

    // Like MeshDepthMaterial, but goes from black to transparent
    const depthMaterialInstance = new MeshDepthMaterial()
    depthMaterial.current = depthMaterialInstance
    depthMaterialInstance.userData.darkness = { value: shadowDarkness }
    depthMaterialInstance.onBeforeCompile = shader => {
      shader.uniforms.darkness = depthMaterialInstance.userData.darkness
      shader.fragmentShader = `
        uniform float darkness;
        ${shader.fragmentShader.replace(
          'gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );',
          'gl_FragColor = vec4( vec3( 0.0 ), ( 1.0 - fragCoordZ ) * darkness );'
        )}
      `
    }
    depthMaterialInstance.depthTest = false
    depthMaterialInstance.depthWrite = false

    const horizontalBlurMaterialInstance = new ShaderMaterial(HorizontalBlurShader)
    horizontalBlurMaterial.current = horizontalBlurMaterialInstance
    horizontalBlurMaterialInstance.depthTest = false

    const verticalBlurMaterialInstance = new ShaderMaterial(VerticalBlurShader)
    verticalBlurMaterial.current = verticalBlurMaterialInstance
    verticalBlurMaterialInstance.depthTest = false

    const unsubscribeX = rotationX.onChange(renderFrame)
    const unsubscribeY = rotationY.onChange(renderFrame)
    const handleContextLost = () => {
      setWebglReady(false)
      setFallbackVisible(true)
    }
    canvasElement.addEventListener('webglcontextlost', handleContextLost)
    setRendererReady(true)

    return () => {
      canvasElement.removeEventListener('webglcontextlost', handleContextLost)
      renderTarget.current?.dispose()
      renderTargetBlur.current?.dispose()
      removeLights(lights.current)
      cleanScene(scene.current)
      cleanRenderer(renderer.current)
      unsubscribeX()
      unsubscribeY()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const blurShadow = useCallback((amount: number) => {
    if (
      !renderer.current ||
      !renderTarget.current ||
      !renderTargetBlur.current ||
      !blurPlane.current ||
      !shadowCamera.current ||
      !horizontalBlurMaterial.current ||
      !verticalBlurMaterial.current
    ) {
      return
    }

    const rendererInstance = renderer.current
    const renderTargetInstance = renderTarget.current
    const renderTargetBlurInstance = renderTargetBlur.current
    const blurPlaneInstance = blurPlane.current
    const shadowCameraInstance = shadowCamera.current
    const horizontalMaterial = horizontalBlurMaterial.current
    const verticalMaterial = verticalBlurMaterial.current

    blurPlaneInstance.visible = true

    // Blur horizontally and draw in the renderTargetBlur
    blurPlaneInstance.material = horizontalMaterial
    horizontalMaterial.uniforms.tDiffuse.value = renderTargetInstance.texture
    horizontalMaterial.uniforms.h.value = amount * (1 / 256)

    rendererInstance.setRenderTarget(renderTargetBlurInstance)
    rendererInstance.render(blurPlaneInstance, shadowCameraInstance)

    // Blur vertically and draw in the main renderTarget
    blurPlaneInstance.material = verticalMaterial
    verticalMaterial.uniforms.tDiffuse.value = renderTargetBlurInstance.texture
    verticalMaterial.uniforms.v.value = amount * (1 / 256)

    rendererInstance.setRenderTarget(renderTargetInstance)
    rendererInstance.render(blurPlaneInstance, shadowCameraInstance)

    blurPlaneInstance.visible = false
  }, [])

  // Handle render passes for a single frame
  const renderFrame = useCallback(() => {
    if (
      !renderer.current ||
      !scene.current ||
      !camera.current ||
      !shadowCamera.current ||
      !depthMaterial.current ||
      !renderTarget.current ||
      !modelGroup.current
    ) {
      return
    }

    const rendererInstance = renderer.current
    const sceneInstance = scene.current
    const cameraInstance = camera.current
    const shadowCameraInstance = shadowCamera.current
    const depthMaterialInstance = depthMaterial.current
    const renderTargetInstance = renderTarget.current
    const modelGroupInstance = modelGroup.current
    const blurAmount = 5

    // Remove the background
    const initialBackground = sceneInstance.background
    sceneInstance.background = null

    // Force the depthMaterial to everything
    // cameraHelper.visible = false;
    sceneInstance.overrideMaterial = depthMaterialInstance

    // Render to the render target to get the depths
    rendererInstance.setRenderTarget(renderTargetInstance)
    rendererInstance.render(sceneInstance, shadowCameraInstance)

    // And reset the override material
    sceneInstance.overrideMaterial = null

    blurShadow(blurAmount)

    // A second pass to reduce the artifacts
    // (0.4 is the minimum blur amout so that the artifacts are gone)
    blurShadow(blurAmount * 0.4)

    // Reset and render the normal scene
    rendererInstance.setRenderTarget(null)
    sceneInstance.background = initialBackground

    modelGroupInstance.rotation.x = rotationX.get()
    modelGroupInstance.rotation.y = rotationY.get()

    rendererInstance.render(sceneInstance, cameraInstance)
  }, [blurShadow, rotationX, rotationY])

  // Handle mouse move animation
  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window

      const position = {
        x: (event.clientX - innerWidth / 2) / innerWidth,
        y: (event.clientY - innerHeight / 2) / innerHeight,
      }

      rotationY.set(position.x / 2)
      rotationX.set(position.y / 2)
    }

    if (isInViewport && !reduceMotion) {
      window.addEventListener('mousemove', onMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [isInViewport, reduceMotion, rotationX, rotationY])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!container.current || !renderer.current || !camera.current) return

      const { clientWidth, clientHeight } = container.current

      renderer.current.setSize(clientWidth, clientHeight)
      camera.current.aspect = clientWidth / clientHeight
      camera.current.updateProjectionMatrix()

      renderFrame()
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [renderFrame])

  return (
    <div
      className={classes(styles.model, className)}
      data-loaded={ready || fallbackVisible || !fallback}
      style={cssProps({ delay: numToMs(showDelay) }, style)}
      ref={container}
      role={!fallback && !ready ? 'group' : 'img'}
      aria-label={alt}
      {...rest}
    >
      <canvas className={styles.canvas} data-visible={ready} ref={canvas} />
      {!fallback && !ready && (
        <span className={styles.status} role="status">
          {fallbackVisible ? '3D preview unavailable' : 'Loading 3D preview…'}
        </span>
      )}
      {fallbackImages.length > 0 && (
        <div
          aria-hidden="true"
          className={styles.fallback}
          data-visible={fallbackVisible}
          data-count={fallbackImages.length}
        >
          {fallbackImages.map((image, index) => (
            <img
              key={`${image.src}-${index}`}
              className={styles.fallbackImage}
              data-index={index}
              src={image.src}
              width={image.width}
              height={image.height}
              alt=""
              decoding="async"
              loading="lazy"
            />
          ))}
        </div>
      )}
      {webglReady &&
        rendererReady &&
        models.map((model, index) => (
          <Device
            key={JSON.stringify(model.position)}
            renderer={renderer}
            modelGroup={modelGroup}
            webglReady={webglReady}
            show={show}
            preload={preload}
            ready={ready}
            showDelay={showDelay}
            animateIn={animateIn}
            loadTextureBeforeAnimation={loadTextureBeforeAnimation}
            renderFrame={renderFrame}
            index={index}
            onReady={onDeviceReady}
            setFallbackVisible={setFallbackVisible}
            model={model}
          />
        ))}
    </div>
  )
}

type DeviceProps = {
  renderer: MutableRefObject<WebGLRenderer | null>
  model: ModelConfig
  modelGroup: MutableRefObject<Group | null>
  webglReady: boolean
  renderFrame: () => void
  index: number
  showDelay: number
  animateIn: boolean
  loadTextureBeforeAnimation: boolean
  onReady: () => void
  setFallbackVisible: (visible: boolean) => void
  show: boolean
  preload: boolean
  ready: boolean
}

const getPrimaryMaterial = (mesh: Mesh) => {
  return Array.isArray(mesh.material) ? mesh.material[0] : mesh.material
}

const isMesh = (node: Object3D): node is Mesh => {
  return Boolean(node.isMesh || node.material)
}

const Device = ({
  renderer,
  model,
  modelGroup,
  webglReady,
  renderFrame,
  index,
  showDelay,
  animateIn,
  loadTextureBeforeAnimation,
  onReady,
  setFallbackVisible,
  show,
  preload,
  ready,
}: DeviceProps) => {
  const [loadDevice, setLoadDevice] = useState<LoadDeviceState | null>(null)
  const [loadedDevice, setLoadedDevice] = useState<LoadDeviceResult | null>(null)
  const animationStarted = useRef(false)
  const reduceMotion = useReducedMotion()
  const shouldLoad = show || preload
  const usePlaceholderTexture = animateIn && !loadTextureBeforeAnimation
  const placeholderScreen = useRef<Mesh | null>(null)

  useEffect(() => {
    if (!webglReady || !renderer.current || !modelGroup.current) return undefined

    const rendererInstance = renderer.current
    const modelGroupInstance = modelGroup.current

    const applyScreenTexture = (texture: Texture, node: Mesh) => {
      const material = getPrimaryMaterial(node)
      if (!material) return

      texture.encoding = sRGBEncoding
      texture.flipY = false
      texture.anisotropy = rendererInstance.capabilities.getMaxAnisotropy()
      texture.generateMipmaps = false
      texture.needsUpdate = true

      // Decode the texture to prevent jank on first render
      rendererInstance.initTexture(texture)

      material.color = new Color(0xffffff)
      material.transparent = true
      material.map = texture
    }

    // Generate promises to await when ready
    const load = async (signal: AbortSignal): Promise<LoadDeviceResult> => {
      const { texture, position, url } = model
      let loadFullResTexture: (() => Promise<void>) | undefined
      let playAnimation: (() => AnimationControls | void) | undefined

      const loadFullTexture = async () => {
        const src = texture.srcSet?.[0]?.src || texture.placeholder.src
        const image = await loadImageFromSrcSet({ src, ...texture })
        return new Texture(image)
      }
      const [initialTexture, modelResult] = await Promise.allSettled([
        usePlaceholderTexture
          ? textureLoader.loadAsync(texture.placeholder.src)
          : loadFullTexture(),
        modelLoader.loadAsync(url),
      ])

      if (
        signal.aborted ||
        initialTexture.status === 'rejected' ||
        modelResult.status === 'rejected'
      ) {
        if (initialTexture.status === 'fulfilled') initialTexture.value.dispose()
        if (modelResult.status === 'fulfilled') cleanScene(modelResult.value.scene)
        if (signal.aborted) return {}
        throw new Error('Could not load the device preview')
      }

      const screenTexture = initialTexture.value
      const gltf = modelResult.value
      let hasScreen = false
      gltf.scene.traverse((node: Object3D) => {
        if (isMesh(node)) {
          const material = getPrimaryMaterial(node)
          if (material) {
            material.color = new Color(0x1f2025)
            material.color.convertSRGBToLinear()
          }
        }

        if (node.name === MeshType.Screen && isMesh(node) && node.parent) {
          const material = getPrimaryMaterial(node)
          if (!material) return
          hasScreen = true
          if (!usePlaceholderTexture) {
            applyScreenTexture(screenTexture, node)
            return
          }

          // Create a copy of the screen mesh so we can fade it out
          // over the full resolution screen texture
          const clonedScreen = node.clone()
          clonedScreen.material = material.clone()
          node.parent.add(clonedScreen)
          placeholderScreen.current = clonedScreen

          const placeholderMaterial = getPrimaryMaterial(clonedScreen)
          placeholderMaterial.opacity = 1
          clonedScreen.position.z += 0.001

          applyScreenTexture(screenTexture, clonedScreen)

          loadFullResTexture = async () => {
            if (!texture.srcSet?.length) return
            const fullSize = await loadFullTexture()
            if (signal.aborted) {
              fullSize.dispose()
              return
            }
            applyScreenTexture(fullSize, node)

            animate(1, 0, {
              onUpdate: value => {
                const currentPlaceholder = placeholderScreen.current
                if (!currentPlaceholder || signal.aborted) return
                const currentMaterial = getPrimaryMaterial(currentPlaceholder)
                currentMaterial.opacity = value
                renderFrame()
              },
            })
          }
        }
      })

      const targetPosition = new Vector3(position.x, position.y, position.z)

      if (!hasScreen) {
        screenTexture.dispose()
        cleanScene(gltf.scene)
        throw new Error('The model is missing a screen mesh')
      }
      modelGroupInstance.add(gltf.scene)

      const frameNode = gltf.scene.children.find(node => node.name === MeshType.Frame)
      const finishAnimation = () => {
        gltf.scene.position.set(...targetPosition.toArray())
        if (frameNode) frameNode.rotation.x = 0
        renderFrame()
      }

      gltf.scene.position.set(...targetPosition.toArray())
      if (!reduceMotion && animateIn) {
        if (model.animation === ModelAnimationType.SpringUp) {
          gltf.scene.position.y -= 1
        }
        if (model.animation === ModelAnimationType.LaptopOpen) {
          if (frameNode) frameNode.rotation.x = MathUtils.degToRad(90)
        }
      }

      // Simple slide up animation
      if (model.animation === ModelAnimationType.SpringUp) {
        playAnimation = () => {
          const startPosition = new Vector3(
            targetPosition.x,
            targetPosition.y - 1,
            targetPosition.z
          )

          gltf.scene.position.set(...startPosition.toArray())

          return animate(startPosition.y, targetPosition.y, {
            type: 'spring',
            delay: (300 * index + showDelay) / 1000,
            stiffness: 60,
            damping: 20,
            mass: 1,
            restSpeed: 0.0001,
            restDelta: 0.0001,
            onUpdate: value => {
              gltf.scene.position.y = value
              renderFrame()
            },
          })
        }
      }

      // Swing the laptop lid open
      if (model.animation === ModelAnimationType.LaptopOpen) {
        playAnimation = () => {
          if (!frameNode) return undefined

          const startRotation = new Vector3(MathUtils.degToRad(90), 0, 0)
          const endRotation = new Vector3(0, 0, 0)

          gltf.scene.position.set(...targetPosition.toArray())
          frameNode.rotation.set(...startRotation.toArray())

          return animate(startRotation.x, endRotation.x, {
            type: 'spring',
            delay: (300 * index + showDelay + 300) / 1000,
            stiffness: 80,
            damping: 20,
            restSpeed: 0.0001,
            restDelta: 0.0001,
            onUpdate: value => {
              frameNode.rotation.x = value
              renderFrame()
            },
          })
        }
      }

      return { loadFullResTexture, playAnimation, finishAnimation }
    }

    setLoadDevice({ start: load })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!webglReady || !loadDevice || !shouldLoad) return undefined
    const controller = new AbortController()

    const onLoad = async () => {
      try {
        const { loadFullResTexture, playAnimation, finishAnimation } =
          await loadDevice.start(controller.signal)
        if (controller.signal.aborted) return

        renderFrame()
        setLoadedDevice({ playAnimation, finishAnimation })
        onReady()
        await loadFullResTexture?.()
      } catch {
        if (!controller.signal.aborted) setFallbackVisible(true)
      }
    }

    startTransition(() => {
      onLoad()
    })

    return () => {
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadDevice, shouldLoad])

  useEffect(() => {
    if (!loadedDevice || !show || !ready) return
    if (reduceMotion || !animateIn) {
      loadedDevice.finishAnimation?.()
      animationStarted.current = true
      return
    }
    if (animationStarted.current) return
    animationStarted.current = true
    const animation = loadedDevice.playAnimation?.()
    return () => animation?.stop()
  }, [loadedDevice, show, ready, reduceMotion, animateIn])

  return null
}
