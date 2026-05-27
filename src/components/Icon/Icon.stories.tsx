// @ts-nocheck -- Storybook stories still use legacy untyped wrappers.
import { Icon, icons } from 'components/Icon'
import { StoryContainer } from '../../../.storybook/StoryContainer'

export default {
  title: 'Icon',
}

export const Icons = () => {
  return (
    <StoryContainer>
      {Object.keys(icons).map(key => (
        <Icon key={key} icon={key} />
      ))}
    </StoryContainer>
  )
}
