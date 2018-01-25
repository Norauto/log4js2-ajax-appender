import { expect } from 'chai'
import { assert, stub, sandbox } from 'sinon'
import axios from 'axios'

import { AjaxAppenderProvider } from '../src/ajax-appender'

describe('AjaxAppender...', () => {
  const expectedUrl = 'http://api.logs',
        expectedMethod = 'POST',
        expectedHeaders = { 'Content-Type': 'text/plain' }
  let toTest, _sandbox, _server

  before(() => {
    toTest = AjaxAppenderProvider({
      url: expectedUrl,
      method: expectedMethod,
      headers: expectedHeaders
    })()
    toTest.setLogLevel(400)
    toTest.setLayout('%message')
  })

  beforeEach(() => {
    _sandbox = sandbox.create()
    _server = _sandbox.useFakeServer()

    _sandbox.stub(axios, 'request').returns(Promise.resolve())
  })

  afterEach(() => {
    _sandbox.restore()
    _server.restore()
  })

  it('Should return appender\'s name when calling getName function.', () => {
    expect(toTest.getName()).to.equal('ajaxAppender')
  })

  it('Should do nothing when log event\'s log level param is greater than configured log level.', () => {
    toTest.append({ level: 500 })

    assert.notCalled(axios.request)
  })

  it('Should perform an HTTP request when log event\'s log level param is lower or equal to configured log level.', () => {
    toTest.append({ level: 300 })
    
    assert.called(axios.request)
  })

  it('Should perform an HTTP request with provided configuration when log event\'s log level param is lower or equal to configured log level.', () => {
    const expectedMessage = 'message'
    toTest.append({ level: 400, message: expectedMessage })

    assert.calledWith(axios.request, {
      url: expectedUrl,
      method: expectedMethod,
      headers: expectedHeaders,
      data: expectedMessage
    })
  })
})