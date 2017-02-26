import { injectSymbol } from './handlers'

export default <T>(injectClass: T) => (target: any, propertyKey: string | symbol) => {
    // 这个字段用来存储所有可能从注入中获取的数据
    if (!target[injectSymbol]) {
        target[injectSymbol] = new Map()
    }

    target[injectSymbol].set(propertyKey, injectClass)
}