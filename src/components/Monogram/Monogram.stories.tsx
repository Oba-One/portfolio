// @ts-nocheck -- Storybook stories still use legacy untyped wrappers.
import { Monogram } from 'components/Monogram'
import { StoryContainer } from '../../../.storybook/StoryContainer'

export default {
  title: 'Monogram',
}

export const Default = () => (
  <StoryContainer>
    <Monogram highlight />
  </StoryContainer>
)
