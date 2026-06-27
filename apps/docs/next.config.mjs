import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "beej-monorepo";

/** @type {import('next').NextConfig} */
const config = {
  serverExternalPackages: ["@takumi-rs/image-response"],
  output: "export",
  basePath: isGithubActions ? `/${repoName}` : "",
  assetPrefix: isGithubActions ? `/${repoName}/` : "",
  trailingSlash: true,
  reactStrictMode: true,
  transpilePackages: ["@thanka-digital/beej-component"],
};

export default withMDX(config);
