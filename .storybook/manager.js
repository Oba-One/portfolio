import { addons } from 'storybook/manager-api'
import { themes } from 'storybook/theming'

addons.setConfig({
  theme: {
    ...themes.dark,
    brandImage: 'https://afolabi.info/icon.svg',
    brandTitle: 'Afolabi Aiyeloja Components',
    brandUrl: 'https://afolabi.info',
  },
})
