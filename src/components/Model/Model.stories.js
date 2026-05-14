import phoneTexture2Placeholder from 'assets/mira-flow/flow-mobile-collections-ph.webp'
import phoneTexture2 from 'assets/mira-flow/flow-mobile-collections.webp'
import phoneTexturePlaceholder from 'assets/mira-flow/flow-mobile-profile-ph.webp'
import phoneTexture from 'assets/mira-flow/flow-mobile-profile.webp'
import laptopTexturePlaceholder from 'assets/mira-connect/connect-report-p1-ph.webp'
import laptopTexture from 'assets/mira-connect/connect-report-p1.webp'
import { Model } from 'components/Model/Model'
import { StoryContainer } from '../../../.storybook/StoryContainer'
import { deviceModels } from './deviceModels'

export default {
  title: 'Model',
}

const modelStyle = { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }

export const Phone = () => (
  <StoryContainer padding={0}>
    <Model
      style={modelStyle}
      cameraPosition={{ x: 0, y: 0, z: 11.5 }}
      alt="Phone models"
      models={[
        {
          ...deviceModels.phone,
          position: { x: -0.6, y: 0.8, z: 0.1 },
          texture: {
            srcSet: [phoneTexture],
            placeholder: phoneTexturePlaceholder,
          },
        },
        {
          ...deviceModels.phone,
          position: { x: 0.6, y: -0.8, z: 0.4 },
          texture: {
            srcSet: [phoneTexture2],
            placeholder: phoneTexture2Placeholder,
          },
        },
      ]}
    />
  </StoryContainer>
)

export const Laptop = () => (
  <StoryContainer padding={0}>
    <Model
      style={modelStyle}
      cameraPosition={{ x: 0, y: 0, z: 8 }}
      alt="Laptop model"
      models={[
        {
          ...deviceModels.laptop,
          position: { x: 0, y: 0, z: 0 },
          texture: {
            srcSet: [laptopTexture],
            placeholder: laptopTexturePlaceholder,
          },
        },
      ]}
    />
  </StoryContainer>
)
