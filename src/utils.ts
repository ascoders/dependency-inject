const tag = "ascoders-dependency-inject"

const globalOrWindow = (typeof self === 'object' && self.self === self && self) ||
  (typeof global === 'object' && global.global === global && global) ||
  this

class GlobalState {
  /**
   * 所有通过 get 访问过的 class 实例
   */
  instances = new WeakMap()

  injectSymbol = Symbol()
}

let globalState = new GlobalState()

if (globalOrWindow[tag]) {
  globalState = globalOrWindow[tag]
} else {
  globalOrWindow[tag] = globalState
}

export { globalState }
