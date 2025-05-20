import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    "portfolio",
    {
      text: "Quick Start",
      icon: "lightbulb",
      link: "quick-start/",
    },
    {
      text: "Best Practices",
      icon: "lightbulb",
      link: "best-practices/",
    },
    {
      text: "Demo",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "Docs",
      icon: "book",
      prefix: "guide/",
      children: "structure",
    },
    {
      text: "Slides",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/plugins/markdown/revealjs/demo.html",
    },
  ],
});
