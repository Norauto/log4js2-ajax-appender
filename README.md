# log4js2 AJAX appender

This module provide an AJAX appender for [log4js2](https://github.com/anigenero/log4js2) module.

[![Build Status](https://travis-ci.org/Norauto/log4js2-ajax-appender.svg?branch=master)](https://travis-ci.org/Norauto/log4js2-ajax-appender)
[![Coverage Status](https://coveralls.io/repos/github/Norauto/log4js2-ajax-appender/badge.svg?branch=master)](https://coveralls.io/github/Norauto/log4js2-ajax-appender?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/norauto/log4js2-ajax-appender/badge.svg?targetFile=package.json)](https://snyk.io/test/github/norauto/log4js2-ajax-appender?targetFile=package.json)

## Getting started

### Prerequisites

You will need the following things properly installed on your computer :

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) >= 7.0.0

### Installation

This module required log4js2 and axios on your project to work. Install it and these dependencies like so :

```
$ npm add log4js2 axios @norauto/log4js2-ajax-appender
```

### Usage

Create a javascript file to provide some log strategy.

```javascript
import * as log4js from 'log4js2'
import { AjaxAppenderProvider } from 'log4js2-ajax-appender'


log4js.addAppender(AjaxAppenderProvider({
    method: 'POST',
    url: '/logs',
    headers: {
      'Content-Type': 'text/plain'
    }
  }))

log4js.configure({
  layout: '%d{ISO8601} [%level] %logger - %message',
  appenders: [ 'ajaxAppender' ],
  loggers: [{
    logLevel: log4js.LogLevel.WARN
  }]
})

export log4js
```

Here you can use the `log4js` to send log through AJAX requests to your log endpoint.

## Development

In order to contribute and be able to start developing on the project, you will have to follow following steps :

```
$ git clone <repository>
$ cd <repository>
$ npm install
```

### Running tests

* `npm run test`

### Building

* `npm run build`

## Contacts

NorautoTechLab [![https://twitter.com/NorautoTechLab][1.1]][1]

[1]: https://twitter.com/NorautoTechLab
[1.1]: http://i.imgur.com/wWzX9uB.png
