import { themes } from '@storybook/theming'
import { addons } from '@storybook/addons'

addons.setConfig({
  theme: {
    ...themes.dark,
    brandImage: 'https://afolabi.info/icon.svg',
    brandTitle: 'Afolabi Aiyeloja Components',
    brandUrl: 'https://afolabi.info',
  },
})
