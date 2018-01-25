declare interface HttpHeaders {
  [index: string]: string
}

declare interface AjaxAppenderConfiguration {
  url: string
  method: string
  headers: HttpHeaders
}

export function AjaxAppenderProvider(configuration: AjaxAppenderConfiguration): Function