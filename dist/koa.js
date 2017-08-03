"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("magnet-core/module");
const bugsnag = require("bugsnag");
class MagnetBugsnag extends module_1.Module {
    init() {
        this.moduleName = 'bugsnag';
        this.defaultConfig = __dirname;
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            bugsnag.register(this.config.apiKey);
            this.app.koa.on('error', bugsnag.koaHandler);
            process.on('unhandledRejection', function (err, promise) {
                bugsnag.notify(err);
            });
            if (this.config.onBeforeNotify) {
                bugsnag.onBeforeNotify(this.config.onBeforeNotify);
            }
            this.insert(bugsnag);
        });
    }
}
exports.default = MagnetBugsnag;
//# sourceMappingURL=koa.js.map