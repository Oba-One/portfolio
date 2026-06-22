// @ts-nocheck -- Storybook stories still use legacy untyped wrappers.
import { Loader } from 'components/Loader'
import { StoryContainer } from '../../../.storybook/StoryContainer'

export default {
  title: 'Loader',
}

export const Default = () => (
  <StoryContainer>
    <Loader size={48} />
  </StoryContainer>
)
