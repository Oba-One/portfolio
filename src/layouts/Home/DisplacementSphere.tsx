// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
import { useTheme } from 'components/ThemeProvider'
import { Transition } from 'components/Transition'
import { useReducedMotion, useSpring } from 'framer-motion'
import { useInViewport, useWindowSize } from 'hooks'
import { startTransition, useEffect, useRef } from 'react'
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereBufferGeometry,
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

const colorFromRgbToken = (rgb = '255 255 255') => new Color(...rgbToThreeColor(rgb))

export const DisplacementSphere = props => {
  const theme = useTheme()
  const { rgbAccent, rgbBackground, rgbBackgroundLight, rgbPrimary, rgbWhite, themeId } =
    theme
  const initialPalette = useRef({ rgbAccent, rgbBackgroundLight, rgbPrimary })
  const start = useRef(Date.now())
  const canvasRef = useRef()
  const mouse = useRef()
  const renderer = useRef()
  const camera = useRef()
  const scene = useRef()
  const lights = useRef()
  const uniforms = useRef()
  const material = useRef()
  const geometry = useRef()
  const sphere = useRef()
  const reduceMotion = useReducedMotion()
  const isInViewport = useInViewport(canvasRef)
  const windowSize = useWindowSize()
  const rotationX = useSpring(0, springConfig)
  const rotationY = useSpring(0, springConfig)

  useEffect(() => {
    const { innerWidth, innerHeight } = window
    const canvas = canvasRef.current
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
    renderer.current = new WebGLRenderer({
      canvas,
      context,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: true,
    })
    renderer.current.setSize(innerWidth, innerHeight)
    renderer.current.setPixelRatio(1)
    renderer.current.outputEncoding = sRGBEncoding

    camera.current = new PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 100)
    camera.current.position.z = 52

    scene.current = new Scene()

    material.current = new MeshPhongMaterial()
    material.current.onBeforeCompile = shader => {
      uniforms.current = UniformsUtils.merge([
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
      ])

      shader.uniforms = uniforms.current
      shader.vertexShader = vertShader
      shader.fragmentShader = fragShader
    }

    startTransition(() => {
      geometry.current = new SphereBufferGeometry(32, 128, 128)
      sphere.current = new Mesh(geometry.current, material.current)
      sphere.current.position.z = 0
      sphere.current.modifier = Math.random()
      scene.current.add(sphere.current)
    })

    return () => {
      cleanScene(scene.current)
      cleanRenderer(renderer.current)
    }
  }, [])

  useEffect(() => {
    if (!material.current) return undefined

    const primary = colorFromRgbToken(rgbPrimary)
    const accent = colorFromRgbToken(rgbAccent)
    const backgroundLight = colorFromRgbToken(rgbBackgroundLight)

    material.current.color.copy(primary)
    material.current.specular.copy(accent)
    material.current.emissive.copy(backgroundLight)
    material.current.emissiveIntensity = themeId === 'light' ? 0.08 : 0.14
    material.current.shininess = themeId === 'light' ? 28 : 36

    if (uniforms.current) {
      uniforms.current.palettePrimary.value.copy(primary)
      uniforms.current.paletteAccent.value.copy(accent)
      uniforms.current.paletteBackground.value.copy(backgroundLight)
    }

    if (renderer.current && scene.current && camera.current && reduceMotion) {
      renderer.current.render(scene.current, camera.current)
    }

    return undefined
  }, [rgbAccent, rgbBackgroundLight, rgbPrimary, reduceMotion, themeId])

  useEffect(() => {
    if (!scene.current) return undefined

    const dirLight = new DirectionalLight(colorFromRgbToken(rgbPrimary), 0.7)
    const ambientLight = new AmbientLight(
      colorFromRgbToken(rgbWhite),
      themeId === 'light' ? 0.7 : 0.16
    )

    dirLight.position.z = 200
    dirLight.position.x = 100
    dirLight.position.y = 100

    lights.current = [dirLight, ambientLight]
    scene.current.background = new Color(...rgbToThreeColor(rgbBackground))
    lights.current.forEach(light => scene.current.add(light))

    return () => {
      removeLights(lights.current)
    }
  }, [rgbBackground, rgbPrimary, rgbWhite, themeId])

  useEffect(() => {
    if (!renderer.current || !camera.current || !sphere.current) return undefined

    const { width, height } = windowSize

    const adjustedHeight = height + height * 0.3
    renderer.current.setSize(width, adjustedHeight)
    camera.current.aspect = width / adjustedHeight
    camera.current.updateProjectionMatrix()

    // Render a single frame on resize when not animating
    if (reduceMotion) {
      renderer.current.render(scene.current, camera.current)
    }

    if (width <= media.mobile) {
      sphere.current.position.x = 14
      sphere.current.position.y = 10
    } else if (width <= media.tablet) {
      sphere.current.position.x = 18
      sphere.current.position.y = 14
    } else {
      sphere.current.position.x = 22
      sphere.current.position.y = 16
    }
  }, [reduceMotion, windowSize])

  useEffect(() => {
    if (!sphere.current) return undefined

    const onMouseMove = event => {
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

    let animation

    const animate = () => {
      animation = requestAnimationFrame(animate)

      if (uniforms.current !== undefined) {
        uniforms.current.time.value = 0.00005 * (Date.now() - start.current)
      }

      sphere.current.rotation.z += 0.001
      sphere.current.rotation.x = rotationX.get()
      sphere.current.rotation.y = rotationY.get()

      renderer.current.render(scene.current, camera.current)
    }

    if (!reduceMotion && isInViewport) {
      animate()
    } else {
      renderer.current.render(scene.current, camera.current)
    }

    return () => {
      cancelAnimationFrame(animation)
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
