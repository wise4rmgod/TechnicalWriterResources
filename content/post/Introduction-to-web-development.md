+++
author = "Solomon"
title = "Introduction to Wed development "
date = "2022-10-01"
description = "Technical writing mentorship program fifth meetup"
+++
# Overview of Web Development
Web development is the work involved in developing a website for the Internet or an intranet. Web development can range from developing a simple single static page of plain text to complex web applications.
Before you can become a web developer, or start building those application, you need to understand the basics and fundamentals of web development.

You can read through the complete beginner guide to web development on [MDN](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web)

We will go further to explore different concepts that makes the web possible.

## What is the internet?
The Internet is a vast network that connects computers all over the world. Through the Internet, people can share information and communicate from anywhere with an Internet connection.

The information that can be communicated on the internet are files such as text, videos, audios, images, and hyperlinked documents.

This hyperlinked documents are sometimes refer to as a website.

## What is a Website?
A website is a collection of web pages and related content that is identified by a common domain name and published on at least one web server.

## How does the web work?
How the web works is essential to how we understand web development, when computers connected to the internet, they can be called clients and servers. The clients sends request to the server, while the server processes the request and returns a response back to the client.

![Client-Server Architecture](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works/simple-client-server.png)

The image above shows the interactions between clients and the servers. The concept makes the web possible because it exchages information during the request/response process.

## What is HTTP and how it evolves?
HTTP (HyperText Transfer Protocol) is a protocol for fetching resources such as HTML documents. It is the fundamental of any data exchange on the Web from browsing different pages, to sharing files, videos, images, or audios.

## Learn domains and Hosting
Web hosting is a process of deploying your website to the web and making it public accessible. To achieve this, you have to purchase a domain name that will represent your unique website and a hosting space on any public storage(hosting) space provider.

Examples of good hosting/cloud providers

- Amazon Web Services
- GCP (Google Cloud Provider)
- Verpex
- Whogohost
- GoDaddy

## Introduction to HTML
The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It is use to create web pages becuase it can be interpreted by the browser.

Basic HTML Elements

- Headers
  - H1 => It is used to represent document biggest header
  - H2 => It is used to represent document biggest header after H1
  - H3 => It is used to represent document biggest header after H2
  - H4 => It is used to represent document biggest header after H3
  - H5 => It is used to represent document biggest header after H4
  - H6 => It is used to represent document smallest header

Syntax

```html
<h1> This is the biggest header </h1>
<h2> This is the biggest header after H1 </h2>
<h3> This is the biggest header after H2 </h3>
.
.
.
<h6> This is the smallest header </h6>

```

- Paragraph (P) => This represent a single paragraph in a document.

Syntax

```html

<p> This is a long paragraph </p>

```

You can learn more about HTML and find a list of all the HTML elements [here.](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)

## Introduction to CSS

Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. When you combine CSS and HTML together, it's give beauty, color and sweet artistic to web pages.

There are many CSS selectors such as:

- CSS Element Selector => Used to select HTML element by the element name.

Syntax

```html

<!-- HTML -->

<p> This is a paragraph </p>


<!-- CSS -->

p {
  color: red;
}

```

- CSS Id Selector => Used to select HTML element by ID.

Syntax:

```html

<!-- HTML -->

<p id="para"> This is a paragraph </p>


<!-- CSS -->

#para {
  color: red;
}

```

- CSS Class Selector => Used to select HTML element by class name.

Syntax:

```html

<!-- HTML -->

<p class="para"> This is a paragraph </p>


<!-- CSS -->

.para {
  color: red;
}

```

You can learn more about CSS and find a list of all the CSS tags [here.](https://developer.mozilla.org/en-US/docs/Learn/CSS)

## Introduction to JavaScript

JavaScript, often abbreviated to JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. It is used to add functionalities to the webpage.

A simple usage of JavaScript could be to add datetime, process a form or chage state of a button.

Here is a simple JavaScript code to change the color of the Paragraph defined above.

```js
const p = document.getElementById('para')

p.style.color = 'green'

```

## Frontend Framework
A front-end framework is a scaffold for building your front end. It usually includes some way to structure your files (for example, via components or a CSS preprocessor), make AJAX requests, style your components, and associate data with DOM elements.

### Top 3 Frontend Frameworks

- React
- Vue
- Angular

# What is REST API

REST stands for Representational State Transfer and was created by computer scientist Roy Fielding in 2000. While API stands for the Application Programming Interface.

REST determines the structure of an API. There are specific rules developers need to commit to when designing an API.

When we combine the API with the REST design rule we say that it is a RESTful API

For an API to be considered RESTful, it must meet the following criteria:

- The client-server architecture is managed through HTTP(s).
- Cached data that simplifies the exchange of data between client and server.
- Clients should be able to use hyperlinks to access all other actions they may take.
- Client-server communication is stateless, which means no client information is kept between GET requests, and each request is separate and unrelated.
- Client messages have sufficient data and instructions to be processed by clients.
- A multi-tiered system that organizes servers of each type (responsible for security, load balancing)

So basically a REST API is simply creating a medium that involves a set of rules that gives different programs access to communicate with each other.

Now that we’ve known that REST API is simply a medium for two systems to communicate with each other.

## API Design Best Practices

- REST API must Accept and Respond with JSON
- Use Nouns Instead of Verbs in Endpoints
- Use Plural Nouns For Name Collections
- Use Status Codes in Error Handling
- Use Resource Nesting
- Use Filtering, Sorting, and Pagination to Retrieve the Data Requested
- Use SSL for Security
- Use Versioning Strategy
- Well-compiled API Documentation

You can explore in details all the best practices listed here on the [Masteringbackend blog.](https://masteringbackend.com/posts/api-design-best-practices)

# Design API Docs using Postman and Open API Spec

[PRACTICAL]

Before we delve into Postman to create our first API documentation, let's explore Postman a little.

## Overview of Postman

[Postman](https://www.postman.com/) is an API platform for developers to design, build, test and iterate their APIs. As of April 2022, Postman reports having more than 20 million registered users and 75,000 open APIs, which it says constitutes the world's largest public API hub.

# What is Open API Spec?
The OpenAPI Specification (OAS) defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.

An OpenAPI definition can then be used by documentation generation tools to display the API, code generation tools to generate servers and clients in various programming languages, testing tools, and many other use cases.

Ypu can learn more about Open API Spec from the [official website.'(https://swagger.io/specification/)
