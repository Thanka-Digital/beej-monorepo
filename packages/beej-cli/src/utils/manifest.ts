export interface DependencyConfig {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export const PACKAGE_MANIFEST: Record<string, DependencyConfig> = {
  // State Management
  jotai: {
    dependencies: { jotai: "^2.11.0" },
  },
  zustand: {
    dependencies: { zustand: "^4.5.0" },
  },
  redux: {
    dependencies: {
      "@reduxjs/toolkit": "^2.2.0",
      "react-redux": "^9.1.0",
    },
  },

  // API Management
  axios: {
    dependencies: { axios: "^1.7.0" },
  },
  "react-query": {
    dependencies: {
      "@tanstack/react-query": "^5.25.0",
    },
    devDependencies: {
      "@tanstack/react-query-devtools": "^5.25.0",
    },
  },

  // UI Libraries
  chakra: {
    dependencies: {
      "@chakra-ui/react": "^3.0.0",
      "@emotion/react": "^11.11.0",
      "@emotion/styled": "^11.11.0",
      "framer-motion": "^11.0.0",
      "next-themes": "^0.4.6",
      "iconsax-reactjs": "^0.0.8",
    },
  },
  mantine: {
    dependencies: {
      "@mantine/core": "^7.17.0",
      "@mantine/hooks": "^7.17.0",
    },
  },
  tailwindcss: {
    devDependencies: {
      tailwindcss: "^3.4.0",
      postcss: "^8.4.0",
      autoprefixer: "^10.4.0",
    },
  },
};
