/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.with-paths\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    mergePaths: false,
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

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
      exclude: /\.with-paths\.svg$/,
    });

    return config;
  },
  transpilePackages: ["gsap"],
};

module.exports = nextConfig;
