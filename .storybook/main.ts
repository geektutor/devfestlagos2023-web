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

    // @ts-ignore Find the rule that handles images (usually SVGs are handled there)
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test(".svg"));

    // @ts-ignore Exclude SVG files from the default file-loader rule
    fileLoaderRule.exclude = /\.svg$/;

    // Add a new rule for SVGs to use @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
export default config;
