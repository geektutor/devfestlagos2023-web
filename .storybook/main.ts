import type { StorybookConfig } from "@storybook/nextjs";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

// module.exports = {
//   webpackFinal: async (config) => {
//     config.resolve.plugins = [
//       ...(config.resolve.plugins || []),
//       new TsconfigPathsPlugin({
//         extensions: config.resolve.extensions,
//       }),
//     ];
//     return config;
//   },
// };
const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/components/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/stories/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        sass: {
          // Require your Sass preprocessor here
          implementation: require("sass"),
        },
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.resolve!.plugins = [
      ...(config.resolve?.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve?.extensions,
      }),
    ];
    return config;
  },
};
export default config;
