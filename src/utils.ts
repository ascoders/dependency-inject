const tag = "ascoders-dependency-inject"

declare var global: any

const globalOrWindow: any = (typeof self === 'object' && self.self === self && self) ||
  (typeof global === 'object' && global.global === global && global)

class GlobalState {
  /**
   * 所有通过 get 访问过的 class 实例
   */
  public instances = new WeakMap()

  public injectSymbol = Symbol()
}

let globalState = new GlobalState()

if (globalOrWindow[tag]) {
  globalState = globalOrWindow[tag]
} else {
  globalOrWindow[tag] = globalState
}

export { globalState }
