/* tslint:disable no-namespace */
// 之所以不写 import debug from '@alipay/bigfish/util/debug'; 是因为这样会使得
// 下面的 declare const yunyou 失效。这也算是一种投机取巧。
// 否则可以用 declare global { const yunyou : {...} } 来声明 yunyou。
const debug = require('debug');

const debugWarn = debug('yunyou:warn');
const debugError = debug('yunyou:error');
const debugInfo = debug('yunyou:info');

// https://www.npmjs.com/package/debug#output-streams
// eslint-disable-next-line no-console
debugWarn.log = console.warn.bind(console); /* tslint:disable-line no-console */
// eslint-disable-next-line no-console
debugInfo.log = console.info.bind(console); /* tslint:disable-line no-console */
/** ******** global function ************ */

((global: any) => {
  // eslint-disable-next-line no-param-reassign
  global.yunyou = {
    throwError(...args: any[]) {
      const reason = args[0];
      // eslint-disable-next-line no-console
      console.error.apply(console.error, args); /* tslint:disable-line no-console */
      throw new Error(reason);
    },
    warn: debugWarn,
    error: debugError,
    info: debugInfo,
  };
})(window);

declare const yunyou: {
  throwError(...args: any[]): never;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  info(...args: any[]): void;
};

/**
 * To enable debug,
 * set localStorage.debug = 'yunyou:*' for all namespace,
 * or = 'yunyou:warn' for single namespace,
 * or = 'yunyou:warn, yunyou:error' to enable multiple namespaces,
 */
