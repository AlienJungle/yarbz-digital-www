---
title: "WordPress & tailwindcss: quickly build responsive WordPress themes"
type: blog
image: /blog-images/tailwind-and-wordpress.jpg
backgroundImage: /blog-images/tailwind-and-wordpress.jpg
date: Tue Nov 22 2022 14:38:10 GMT+0100 (British Summer Time)
excerpt: "Want to build quality WordPress themes at-speed? Introducing: tailwindcss"
---

## What is tailwindcss?

Tailwind CSS is a modern CSS framework that super-charges website development by giving developers access to hundreds of CSS utility classes, flexible configuration and super helpful tooling. Roll all of this together, and you've got a modern, super fast toolkit for rapdily building fast, beautiful and functional websites.

> A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.

_from [tailwindcss.com](https://tailwindcss.com/)_

## Benefits of using tailwindcss

Tailwind CSS brings with it a host of benefits both for the developer, and for the user:

- **It's modern:** Fantastic support for CSS preprocessors out of the box, enabling the developer to work with technologies like Sass, Less and Stylus
- **It's mobile-first:** Stellar support for mobile-first and responsive design, providing breakpoint classes to make styling your elements at different screen sizes a breeze
- **It's scalable:** A comprehensive, intuitive design system that scales with your team
- **It's optimised:** Unused CSS is removed and the compiled CSS minimised, contributing to quick page loads and reducing the bandwidth needed for users to load your site.

Learn more about tailwindcss from the developers that made it. Check out [tailwindcss.com](https://tailwindcss.com/)

## Installation

Before setting up tailwindcss, the following requirements need to be met:

- [npm](https://docs.npmjs.com/cli/v7/configuring-npm/install)

The following npm depdencies are used:

- **autoprefixer:** automatically adds vendor-specific preixes (`::-moz, ::webkit`, etc.) to your CSS selectors so you don't have to. This dependency is required by tailwindcss
- **cross-env:** lets us run our scripts (defined under "scripts" in package.json) with environment variables across multiple platforms
- **postcss:** used to transpile modern CSS syntaxes (sass, scss, less, etc.) to vanilla CSS that a browser can read
- **postcss-cli:** enables us to trigger postcss in our package.json scripts

Create a new file called `package.json` in your theme's directory and add the following:

```
{
  "devDependencies": {
    "autoprefixer": "^10.4.7",
    "cross-env": "^7.0.3",
    "postcss": "^8.4.14",
    "postcss-cli": "^9.1.0",
    "tailwindcss": "^3.1.3"
  },
  "scripts": {
    "watch": "cross-env TAILWIND_MODE=watch postcss src/css/tailwind.css -o build/css/tailwind.css -w",
    "build": "cross-env NODE_ENV=production TAILWIND_MODE=build postcss src/css/tailwind.css -o build/css/tailwind.css"
  }
}
```

Once saved, run an `npm install` to install the required dependencies.

## Configuration

### postcss.config.js

In order to tell postcss to use tailwind and autoprefixer, you need to create a postcss.config.js file in your theme directory:

```
// postcss.config.js
module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
}
```

### tailwind.config.js

You must also create a tailwind.config.js file in order to tell tailwind which files to keep an eye on. The following config will get you started:

```
module.exports = {
  content: ["**/*.php", "*.php"],
  theme: {},
  plugins: []
}
```

### Enqueuing tailwind's CSS

Both the watch and build commands define the output path (the path where tailwindcss will spit its transpiled, optimised, vanilla CSS) as build/css/tailwind.css. Feel free to change this, but make sure you enqueue the CSS file somewhere so WordPress picks it up and delivers it.

```
add_action('wp_enqueue_scripts', function ()
{
    $rel_path_build_css = '/build/css/tailwind.css';
    wp_enqueue_style(
        'site-style',
        get_template_directory_uri() . $rel_path_build_css,
        array(),
        filemtime(get_stylesheet_directory() . $rel_path_build_css)
    );
}
```

## Running tailwindcss

Once you've installed all the dependencies and told WordPress where to find the transpiled CSS, you can run tailwindcss by running `npm run build` to quick off the build process.

Alternatively - and this is easier while developing - you can ask tailwindcss to wait for changes and automatically build by running `npm run watch`.

## Development

tailwindcss will look for any tailwind classes used in your \*.php files and add them to the output CSS file defined in the previous steps. All you need to do is use a class and run `npm run build`, or run `npm run watch` and simply save your PHP file to kick off the build process automatically.

That's it! You now have the full power of tailwindcss at your fingertips to use in your WordPress theme.

## Further reading

- [Get started with Tailwind CSS (tailwindcss.com)](https://tailwindcss.com/docs/installation/using-postcss)
- [Tailwind in 100 seconds (Fireship on youtube.com)](https://www.youtube.com/watch?v=mr15Xzb1Ook)
