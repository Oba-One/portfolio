import { useTheme } from 'components/ThemeProvider'
import { Transition } from 'components/Transition'
import { useReducedMotion, useSpring } from 'framer-motion'
import { useInViewport, useWindowSize } from 'hooks'
import { startTransition, useEffect, useRef, type HTMLAttributes } from 'react'
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  UniformsUtils,
  Vector2,
  WebGLRenderer,
  sRGBEncoding,
} from 'three'
import { media, rgbToThreeColor } from 'utils/style'
import { cleanRenderer, cleanScene, removeLights } from 'utils/three'
import styles from './DisplacementSphere.module.scss'
import fragShader from './displacementSphereFragment.glsl'
import vertShader from './displacementSphereVertex.glsl'

const springConfig = {
  stiffness: 30,
  damping: 20,
  mass: 2,
}

type SphereUniforms = Record<string, { value: unknown }> & {
  time: { value: number }
  palettePrimary: { value: Color }
  paletteAccent: { value: Color }
  paletteBackground: { value: Color }
}

type DisplacementSphereProps = HTMLAttributes<HTMLCanvasElement>

const colorFromRgbToken = (rgb = '255 255 255') => {
  const [r = 1, g = 1, b = 1] = rgbToThreeColor(rgb)
  return new Color(r, g, b)
}

export const DisplacementSphere = (props: DisplacementSphereProps) => {
  const theme = useTheme()
  const { rgbAccent, rgbBackground, rgbBackgroundLight, rgbPrimary, rgbWhite, themeId } =
    theme
  const initialPalette = useRef({ rgbAccent, rgbBackgroundLight, rgbPrimary })
  const start = useRef(Date.now())
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouse = useRef<Vector2 | null>(null)
  const renderer = useRef<WebGLRenderer | null>(null)
  const camera = useRef<PerspectiveCamera | null>(null)
  const scene = useRef<Scene | null>(null)
  const lights = useRef<(AmbientLight | DirectionalLight)[]>([])
  const uniforms = useRef<SphereUniforms | null>(null)
  const material = useRef<MeshPhongMaterial | null>(null)
  const geometry = useRef<SphereGeometry | null>(null)
  const sphere = useRef<Mesh | null>(null)
  const reduceMotion = useReducedMotion()
  const isInViewport = useInViewport(canvasRef)
  const windowSize = useWindowSize()
  const rotationX = useSpring(0, springConfig)
  const rotationY = useSpring(0, springConfig)

  useEffect(() => {
    const { innerWidth, innerHeight } = window
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context =
      canvas.getContext('webgl', {
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: true,
      }) ||
      canvas.getContext('experimental-webgl', {
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: true,
      })

    if (!context) return undefined

    mouse.current = new Vector2(0.8, 0.5)
    const rendererInstance = new WebGLRenderer({
      canvas,
      context,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: true,
    })
    renderer.current = rendererInstance
    rendererInstance.setSize(innerWidth, innerHeight)
    rendererInstance.setPixelRatio(1)
    rendererInstance.outputEncoding = sRGBEncoding

    const cameraInstance = new PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 100)
    camera.current = cameraInstance
    cameraInstance.position.z = 52

    const sceneInstance = new Scene()
    scene.current = sceneInstance

    const materialInstance = new MeshPhongMaterial()
    material.current = materialInstance
    materialInstance.onBeforeCompile = shader => {
      const mergedUniforms = UniformsUtils.merge([
        shader.uniforms,
        {
          time: { value: 0 },
          palettePrimary: {
            value: colorFromRgbToken(initialPalette.current.rgbPrimary),
          },
          paletteAccent: {
            value: colorFromRgbToken(initialPalette.current.rgbAccent),
          },
          paletteBackground: {
            value: colorFromRgbToken(initialPalette.current.rgbBackgroundLight),
          },
        },
      ]) as SphereUniforms

      uniforms.current = mergedUniforms
      shader.uniforms = mergedUniforms
      shader.vertexShader = vertShader
      shader.fragmentShader = fragShader
    }

    startTransition(() => {
      const geometryInstance = new SphereGeometry(32, 128, 128)
      const sphereInstance = new Mesh(geometryInstance, materialInstance)
      geometry.current = geometryInstance
      sphere.current = sphereInstance
      sphereInstance.position.z = 0
      sphereInstance.modifier = Math.random()
      sceneInstance.add(sphereInstance)
    })

    return () => {
      cleanScene(scene.current)
      cleanRenderer(renderer.current)
    }
  }, [])

  useEffect(() => {
    const materialInstance = material.current
    if (!materialInstance) return undefined

    const primary = colorFromRgbToken(rgbPrimary)
    const accent = colorFromRgbToken(rgbAccent)
    const backgroundLight = colorFromRgbToken(rgbBackgroundLight)

    materialInstance.color.copy(primary)
    materialInstance.specular.copy(accent)
    materialInstance.emissive.copy(backgroundLight)
    materialInstance.emissiveIntensity = themeId === 'light' ? 0.08 : 0.14
    materialInstance.shininess = themeId === 'light' ? 28 : 36

    if (uniforms.current) {
      uniforms.current.palettePrimary.value.copy(primary)
      uniforms.current.paletteAccent.value.copy(accent)
      uniforms.current.paletteBackground.value.copy(backgroundLight)
    }

    if (renderer.current && scene.current && camera.current && reduceMotion) {
      const rendererInstance = renderer.current
      const sceneInstance = scene.current
      const cameraInstance = camera.current
      rendererInstance.render(sceneInstance, cameraInstance)
    }

    return undefined
  }, [rgbAccent, rgbBackgroundLight, rgbPrimary, reduceMotion, themeId])

  useEffect(() => {
    const sceneInstance = scene.current
    if (!sceneInstance) return undefined

    const dirLight = new DirectionalLight(colorFromRgbToken(rgbPrimary), 0.7)
    const ambientLight = new AmbientLight(
      colorFromRgbToken(rgbWhite),
      themeId === 'light' ? 0.7 : 0.16
    )

    dirLight.position.z = 200
    dirLight.position.x = 100
    dirLight.position.y = 100

    lights.current = [dirLight, ambientLight]
    sceneInstance.background = colorFromRgbToken(rgbBackground)
    lights.current.forEach(light => sceneInstance.add(light))

    return () => {
      removeLights(lights.current)
    }
  }, [rgbBackground, rgbPrimary, rgbWhite, themeId])

  useEffect(() => {
    if (!renderer.current || !camera.current || !sphere.current) return undefined

    const rendererInstance = renderer.current
    const cameraInstance = camera.current
    const sphereInstance = sphere.current
    const sceneInstance = scene.current
    const { width, height } = windowSize

    const adjustedHeight = height + height * 0.3
    rendererInstance.setSize(width, adjustedHeight)
    cameraInstance.aspect = width / adjustedHeight
    cameraInstance.updateProjectionMatrix()

    // Render a single frame on resize when not animating
    if (reduceMotion && sceneInstance) {
      rendererInstance.render(sceneInstance, cameraInstance)
    }

    if (width <= media.mobile) {
      sphereInstance.position.x = 14
      sphereInstance.position.y = 10
    } else if (width <= media.tablet) {
      sphereInstance.position.x = 18
      sphereInstance.position.y = 14
    } else {
      sphereInstance.position.x = 22
      sphereInstance.position.y = 16
    }
  }, [reduceMotion, windowSize])

  useEffect(() => {
    if (!sphere.current) return undefined

    const onMouseMove = (event: MouseEvent) => {
      const position = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      }

      rotationX.set(position.y / 2)
      rotationY.set(position.x / 2)
    }

    if (!reduceMotion && isInViewport) {
      window.addEventListener('mousemove', onMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [isInViewport, reduceMotion, rotationX, rotationY])

  useEffect(() => {
    if (!renderer.current || !scene.current || !camera.current || !sphere.current) {
      return undefined
    }

    const rendererInstance = renderer.current
    const sceneInstance = scene.current
    const cameraInstance = camera.current
    const sphereInstance = sphere.current

    let animation: number | undefined

    const animate = () => {
      animation = requestAnimationFrame(animate)

      const currentUniforms = uniforms.current
      if (currentUniforms) {
        currentUniforms.time.value = 0.00005 * (Date.now() - start.current)
      }

      sphereInstance.rotation.z += 0.001
      sphereInstance.rotation.x = rotationX.get()
      sphereInstance.rotation.y = rotationY.get()

      rendererInstance.render(sceneInstance, cameraInstance)
    }

    if (!reduceMotion && isInViewport) {
      animate()
    } else {
      rendererInstance.render(sceneInstance, cameraInstance)
    }

    return () => {
      if (animation !== undefined) {
        cancelAnimationFrame(animation)
      }
    }
  }, [isInViewport, reduceMotion, rotationX, rotationY])

  return (
    <Transition in timeout={3000}>
      {visible => (
        <canvas
          aria-hidden
          className={styles.canvas}
          data-visible={visible}
          ref={canvasRef}
          {...props}
        />
      )}
    </Transition>
  )
}
