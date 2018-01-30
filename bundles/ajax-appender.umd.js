(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('log4js2'), require('axios')) :
	typeof define === 'function' && define.amd ? define(['exports', 'log4js2', 'axios'], factory) :
	(factory((global.log4js = global.log4js || {}, global.log4js['ajax-appender'] = {}),global.log4js,global.axios));
}(this, (function (exports,log4js,axios) { 'use strict';

axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var AjaxAppender = function (_log4js$LogAppender) {
  inherits(AjaxAppender, _log4js$LogAppender);

  function AjaxAppender(configuration) {
    classCallCheck(this, AjaxAppender);

    var _this = possibleConstructorReturn(this, (AjaxAppender.__proto__ || Object.getPrototypeOf(AjaxAppender)).call(this));

    _this.endpoint = configuration.url;
    _this.httpMethod = configuration.method;
    _this.httpHeaders = configuration.headers;
    return _this;
  }

  createClass(AjaxAppender, [{
    key: 'getName',
    value: function getName() {
      return 'ajaxAppender';
    }

    /**
     * Appends the log event.
     * @param logEvent
     */

  }, {
    key: 'append',
    value: function append(logEvent) {
      if (logEvent.level <= this.getLogLevel()) {
        var message = this.format(logEvent);

        axios.request({
          url: this.endpoint,
          method: this.httpMethod,
          headers: this.httpHeaders,
          data: message
        }).catch(function (e) {
          throw new Error(e.toString());
        });
      }
    }
  }]);
  return AjaxAppender;
}(log4js.LogAppender);

/**
 * Provide a new AjaxAppender instance through an executable function.
 * @param {} configuration An object that provide http configuration for the appender.
 * 
 * @return An executable function that will create a new instance of AjaxAppender with provided configuration object.
 */


function AjaxAppenderProvider(configuration) {
  return function () {
    return new AjaxAppender(configuration);
  };
}

exports.AjaxAppenderProvider = AjaxAppenderProvider;

Object.defineProperty(exports, '__esModule', { value: true });

})));
