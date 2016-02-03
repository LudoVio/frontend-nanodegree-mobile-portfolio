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
* inline all files but fonts into index.html to save some http requests

# Optimizations: pizza.html

* Put the read of document.body.scrollTop outside of the loop to avoid relayout on each iteration