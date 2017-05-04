import { Module } from 'magnet-core/module'
import * as bugsnag from 'bugsnag'

export default class MagnetBugsnag extends Module {
  get moduleName () { return 'bugsnag' }
  get defaultConfig () { return __dirname }

  async setup () {
    bugsnag.register(this.config.apiKey)
    this.app.koa.on('error', bugsnag.koaHandler)
    process.on('unhandledRejection', function (err, promise) {
      bugsnag.notify(err)
    })

    if (this.config.onBeforeNotify) {
      bugsnag.onBeforeNotify(this.config.onBeforeNotify)
    }

    this.insert(bugsnag)
  }
}
