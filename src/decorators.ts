import { injectSymbol } from './handlers'

export default <T>(injectClass: T) => (target: any, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => {
    descriptor.enumerable = true
    descriptor.configurable = true
    descriptor.writable = true

    // 这个字段用来存储所有可能从注入中获取的数据
    if (!target[injectSymbol]) {
        Object.defineProperty(target, injectSymbol, {
            enumerable: true,
            configurable: true,
            value: new Map()
        })
    }

    target[injectSymbol].set(propertyKey, injectClass)
}