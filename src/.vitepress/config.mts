import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Krist Documentation",
  description: "Documentation for Krist and related libraries.",

  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],

    ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "64x64", href: "/favicon-64x64.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "128x128", href: "/favicon-128x128.png" }],
    ["link", { rel: "shortcut icon", href: "/favicon.ico" }],
  ],

  themeConfig: {
    logo: "/favicon-128x128.png",

    // https://vitepress.dev/reference/default-theme-config
    nav: [{
      text: "Documentation",
      link: "/",
    }, {
      text: "Krist API Reference",
      link: "https://krist.dev/docs/"
    }, {
      text: "Issue Tracker",
      link: "https://github.com/tmpim/Krist/issues"
    }],

    editLink: {
      pattern: "https://github.com/tmpim/KristDocs/edit/master/src/:path",
      text: "Edit this page on GitHub",
    },

    lastUpdated: {},
    docFooter: {},

    search: {
      provider: "local"
    },

    sidebar: [
      {
        text: "Documentation",
        link: "/",
        items: [
          { link: "https://krist.dev/docs/", text: "HTTP API reference" },
          { link: "/wallet-formats", text: "Wallet privatekey formats" },
          { link: "/commonmeta", text: "CommonMeta" },
          { link: "/kristql", text: "KristQL" },
          { link: "/uri", text: "Krist URI format" },
        ]
      },
      {
        text: "Libraries",
        items: [
          { link: "/libraries/k-lua", text: "k.lua (Lua/Jua)" },
          { link: "/libraries/krist-js", text: "krist.js (JavaScript/TypeScript)" },
          { link: "https://docs.krist.dev/library/krist.js/modules/", text: "krist.js API reference" },
        ]
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/tmpim/Krist" },
    ]
  }
});
