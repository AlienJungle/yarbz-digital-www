This is the site source for https://www.yarbz.digital! The site is built using Next.js + TypeScript.

## Getting started

To get set up locally, follow the steps below:

1. `git clone` the site to pull down a local copy
2. `npm i` in the cloned directory to install dependencies
3. `npm run prepare` to install Husky (used for pre-commit hooks)
4. `npm run dev` to start a development server
5. Point your browser to `localhost:3000` to view the site!

## Making changes

Next.js auto updates the web page when changes are made to the source code. To get started, checkout the 'Getting started' section above. If your changes aren't being reflected, try hard refreshing the page, or stopping/restarting the `npm run dev` step.

When making a commit, the pre-commit hook both lints and formats your code. If any linting errors are found, the build will fail. Formatting changes are applied automatically without throwing an error.

The following tasks are executed as part of the pre-commit hook whenever a commit is made:

- TS/JS files will be linted, and an error thrown if the lint fails at any stage
- prettier format will be run on all staged files to ensure all code follows the same format/styling
- prettier automatically tidies TS/JS imports/exports using the `prettier-plugin-organize-imports` plugin (see `.prettierrc file`)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
