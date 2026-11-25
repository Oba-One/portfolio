import { useReducedMotion, useSpring } from 'framer-motion'
import { memo, useEffect, useRef, type HTMLAttributes } from 'react'
import { VisuallyHidden } from 'components/VisuallyHidden'
import { classes } from 'utils/style'
import styles from './DecoderText.module.scss'

// prettier-ignore
const glyphs = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', 'ユ', 'ヨ', 'ー',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', 'ヰ', 'ヱ', 'ヲ', 'ン',
  'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
  'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
  'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
  'バ', 'ビ', 'ブ', 'ベ', 'ボ',
  'パ', 'ピ', 'プ', 'ペ', 'ポ',
];

const CharType = {
  Glyph: 'glyph',
  Value: 'value',
} as const

type CharTypeValue = (typeof CharType)[keyof typeof CharType]

type Character = {
  type: CharTypeValue
  value: string
}

type DecoderTextProps = HTMLAttributes<HTMLSpanElement> & {
  text: string
  start?: boolean
  delay?: number
  className?: string
}

function shuffle(content: string[], output: Character[], position: number) {
  return content.map((value, index) => {
    if (index < position) {
      return { type: CharType.Value, value }
    }

    if (position % 1 < 0.5) {
      const rand = Math.floor(Math.random() * glyphs.length)
      return { type: CharType.Glyph, value: glyphs[rand] }
    }

    return { type: CharType.Glyph, value: output[index]?.value ?? value }
  })
}

export const DecoderText = memo(
  ({
    text,
    start = true,
    delay: startDelay = 0,
    className,
    ...rest
  }: DecoderTextProps) => {
    const output = useRef<Character[]>([{ type: CharType.Glyph, value: '' }])
    const container = useRef<HTMLSpanElement | null>(null)
    const reduceMotion = useReducedMotion()
    const decoderSpring = useSpring(0, { stiffness: 8, damping: 5 })

    useEffect(() => {
      const containerInstance = container.current
      const content = text.split('')
      if (!containerInstance || !start || reduceMotion) return
      const renderOutput = () => {
        const characterMap = output.current.map(item => {
          const char = document.createElement('span')
          char.className = styles[item.type]
          char.textContent = item.value
          return char
        })
        containerInstance.replaceChildren(...characterMap)
      }

      const unsubscribeSpring = decoderSpring.onChange(value => {
        output.current = shuffle(content, output.current, value)
        renderOutput()
      })

      const timer = setTimeout(() => decoderSpring.set(content.length), startDelay)

      return () => {
        clearTimeout(timer)
        unsubscribeSpring?.()
        decoderSpring.stop()
        containerInstance.textContent = text
      }
    }, [decoderSpring, reduceMotion, start, startDelay, text])

    return (
      <span className={classes(styles.text, className)} {...rest}>
        <VisuallyHidden>{text}</VisuallyHidden>
        <span aria-hidden className={styles.content} ref={container}>
          {text}
        </span>
      </span>
    )
  }
)
