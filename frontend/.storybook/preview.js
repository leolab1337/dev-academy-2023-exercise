import {RouterDecorator} from "./__mocks__/RouterDecorator";

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    (Story) => (
        RouterDecorator(Story)
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
