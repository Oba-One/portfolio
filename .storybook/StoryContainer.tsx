import type { CSSProperties, ReactNode } from 'react'

import './StoryContainer.css'

type StoryContainerProps = {
  padding?: number
  stretch?: boolean
  gutter?: number
  vertical?: boolean
  children?: ReactNode
  style?: CSSProperties
}

export const StoryContainer = ({
  padding = 32,
  stretch,
  gutter = 32,
  vertical,
  children,
  style,
}: StoryContainerProps) => (
  <div
    className="storyContainer"
    style={{
      padding,
      gap: gutter,
      flexDirection: vertical ? 'column' : 'row',
      alignItems: stretch ? 'stretch' : 'flex-start',
      justifyContent: stretch ? 'stretch' : 'flex-start',
      ...style,
    }}
  >
    {children}
  </div>
)
