import { globalState } from "./utils"

interface INormalObject {
    [x: string]: any
}

export declare interface IObjectType<T> {
    new (): T
}

export default class Container {
    /**
     * 为类设置对应的实例，依赖注入时，将会从 set 时赋值的实例中寻找
     */
    public set<T extends INormalObject>(setClass: IObjectType<T>, instance: T) {
        if (!globalState.instances.has(setClass)) {
            globalState.instances.set(setClass, instance)
        }
    }

    /**
     * 拿到类的实例，如果提前 set 实例，优先获取此实例
     */
    public get<T>(getClass: IObjectType<T>): T {
        if (!globalState.instances.has(getClass)) {
            throw new Error(`${getClass.name} 未注册。先使用 set 方法注册，再使用 get 获取`)
        }

        const instance = globalState.instances.get(getClass)

        // 如果这个类没有 inject 过，就不会存在这个 symbol，直接返回实例
        if (!instance[globalState.injectSymbol]) {
            return instance
        }

        for (const [propertyKey, injectClass] of instance[globalState.injectSymbol]) {
            // 将其中所有标注注入的字段替换为注入值
            Object.defineProperty(instance, propertyKey, {
                enumerable: true,
                configurable: true,
                get: () => {
                    return globalState.instances.get(injectClass)
                },
                set: (newValue: any) => {
                    instance.propertyKey = newValue
                }
            })
        }

        return instance
    }
}