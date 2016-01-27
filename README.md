# Introduction

This is the project 4 of the Udacity's Front-End Web Developer Nanodegree.
You can see the website online [here](http://ludovio.github.io/frontend-nanodegree-mobile-portfolio).

## Install

```sh
$ npm install --global gulp && npm install
```

## Build

```sh
$ gulp build
```

## Serve

```sh
$ gulp serve
```

# Optimizations: index.html

* Html, javascript and css files are all minified
* pizzeria.jpg was resized and optimized
* All javascripts are placed juste before `</body>`
* Fonts are loaded asynchronously
* `media="print"` was added to the `link` element that load "print.css"
* style.css is pretty small so it's now inlined directly inside the html for save an http request