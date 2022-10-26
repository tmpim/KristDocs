const { description } = require("../../package")

module.exports = {
  title: "Krist Documentation",
  description: description,

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

  theme: "yuu",
  themeConfig: {
    repo: "tmpim/Krist",
    docsRepo: "tmpim/KristDocs",
    docsDir: "src",
    docsBranch: "master",
    editLinks: true,
    editLinkText: "Edit this page",
    lastUpdated: false,
    nav: [
      {
        text: "Documentation",
        link: "/docs/",
      },
      {
        text: "Krist API Reference",
        link: "https://krist.dev/docs/"
      }
    ],
    sidebar: {
      "/docs/": [
        {
          title: "Documentation",
          collapsable: false,
          children: [
            "",
            ["https://krist.dev/docs/", "HTTP API reference"],
            "wallet-formats",
            "commonmeta",
            "kristql",
            "uri"
          ]
        },        
        {
          title: "Libraries",
          collapsable: false,
          children: [
            ["libraries/k-lua", "k.lua (Lua/Jua)"],
            ["libraries/krist-js", "krist.js (JavaScript/TypeScript)"],
            ["https://docs.krist.dev/library/krist.js/modules/", "krist.js API reference"],
          ]
        },
      ],
    }
  },

  plugins: [
    "@vuepress/plugin-back-to-top",
  ]
}
