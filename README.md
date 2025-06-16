# vxc.github.io
Venkatesh Home Pages

# TODOs

- [x] Generate bib pdf
- [x] ~Add an embedding page under biography~ added bibliography directly using citations.js
- [ ] Github actions for deployment
- [x] Contact details update
- [x] Spell checks
- [x] Poem page and link from footer


Other QoL improvements
- [ ] remove section if no content
- [ ] use `hr` and others for spacing
- [ ] design improvements





## Getting Started

Instructions for getting started.

## Features

- Dark & light mode
- Customizable colors
- 100 / 100 Lighthouse score
- Fully accessible
- Fully responsive
- Type-safe
- SEO-friendly

## Customization

The entire theme is fully customizable. The theme is setup a specific way to make it easy to customize.

### Colors

You can customize the colors of the theme by editing the `src/styles/global.css` file.
This file uses Tailwind CSS and CSS variables to customize the colors of the theme.
Zaggonaut uses the following CSS variables:

- `--color-zag-dark`: The dark color of the theme
- `--color-zag-light`: The light color of the theme
- `--color-zag-dark-muted`: The dark color of the theme with a slight opacity
- `--color-zag-light-muted`: The light color of the theme with a slight opacity
- `--color-zag-accent-light`: The light accent color of the theme
- `--color-zag-accent-light-muted`: The light accent color of the theme with a slight opacity
- `--color-zag-accent-dark`: The dark accent color of the theme
- `--color-zag-accent-dark-muted`: The dark accent color of the theme with a slight opacity

### Text

You can customize the text of the theme by editing the `src/lib/variables.ts` file.
This file contains all of the text used throughout the theme.

For example, you can change the `username` variable to your own username and everywhere the username is used will be replaced with your username.

```typescript
export const GLOBAL = {
  // Site metadata
  username: "zaggonaut-fan123",

  // ...

  // Menu items
  menu: {
    home: "/",
    projects: "/projects",
    blog: "/blog",
  }
};
```
