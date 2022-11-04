+++
author = "Wisdom"
title = "Introduction to doc as code"
date = "2022-11-02"
description = "Technical writing mentorship program talking about doc as code"
+++

Writing, revising, and publishing procedures can be made more efficient using the documentation technique and practice known as "docs as code."

Docs as Code, as the name suggests, handles all documentation like a codebase. Docs as Code recommends writing in a plaintext markup language like Markdown, pushing that documentation through an automated pipeline that tests the quality of the writing, and ultimately building and publishing the documentation to the public.

The actual documents are managed using some version control like Git.

## Docs-as-code features

- Writing format
- Static site generator
- Version control system
- Continuous integration
- Collaborating with other writers using version control
- Running validation checks

## The advantages of using a docs-as-code approach?

- **Developer doc contribution:** It's easier for developers to contribute to the docs themselves. 

- **Collaboration:** Using the same tools and procedures facilitates collaboration between authors, developers, and users.

## How to set up docs as code
In this example, you will use docusaurus to create your documentation site.

### Prerequisite

- Install Vscode
- Install Nodejs

### Install docusaurus

The easiest way to install Docusaurus is to use the command line tool that helps you scaffold a skeleton Docusaurus website.
```js
npx create-docusaurus@latest my-website classic
```

### Running the development server
To preview your changes as you edit the files, you can run a local development server that will serve your website and reflect the latest changes.

### Change folder

```js
cd my-website
```

### Run the preview mode with the command below.

```js
npm run start
```

### Build​
Docusaurus is a modern static website generator, so we need to build the website into a directory of static contents and put it on a web server to view it. To build the website:

```js
npm run build
```