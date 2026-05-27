// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
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
