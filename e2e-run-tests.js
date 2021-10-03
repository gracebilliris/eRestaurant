const cypress = require('cypress')

cypress.run({
  reporter: 'junit',
  browser: 'chrome',
  config: {
    baseUrl: 'http://172.18.0.2/'
  },
  env: {
    login_url: '/login'
  },
})