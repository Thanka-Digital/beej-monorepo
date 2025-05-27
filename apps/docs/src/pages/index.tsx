import type { ReactNode } from "react";
// import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
// import HomepageFeatures from "@site/src/components/HomepageFeatures";

import { Button } from "@thanka-digital/beej-component";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div>
      <div className="max-w-5xl mx-auto flex flex-col items-center py-12">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="text-center text-xl">{siteConfig.tagline}</p>
        <a href="docs/overview/getting-started">
          <Button colorscheme="primary" className="rounded-md underline-none">
            Documentation
          </Button>
        </a>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Quickly get started with your next project in matters of minitues"
    >
      <HomepageHeader />
      {/* <main>
        <HomepageFeatures />
      </main> */}
    </Layout>
  );
}
