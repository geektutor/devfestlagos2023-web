/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      mergePaths: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
  transpilePackages: ["gsap"],
};

module.exports = nextConfig;
