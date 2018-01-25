import * as log4js from 'log4js2'
import axios from 'axios'

class AjaxAppender extends log4js.LogAppender {
  constructor (configuration) {
    super()
    this.endpoint = configuration.url
    this.httpMethod = configuration.method
    this.httpHeaders = configuration.headers
  }

  getName () {
    return 'ajaxAppender'
  }

  /**
   * Appends the log event.
   * @param logEvent
   */
  append (logEvent) {
    if (logEvent.level <= this.getLogLevel()) {
      const message = this.format(logEvent)

      axios.request({
        url: this.endpoint,
        method: this.httpMethod,
        headers: this.httpHeaders,
        data: message
      }).catch(e => {
        throw new Error(e.toString())
      })
    }
  }
}

/**
 * Provide a new AjaxAppender instance through an executable function.
 * @param {} configuration An object that provide http configuration for the appender.
 * 
 * @return An executable function that will create a new instance of AjaxAppender with provided configuration object.
 */
export function AjaxAppenderProvider (configuration) {
  return () => new AjaxAppender(configuration)
}
