import Container from "./container"

export declare interface IObjectType<T> {
  new(): T
}

export declare type ICombineActions<T> = {
  [P in keyof T]?: IObjectType<T[P]>
}

type Partial<T> = {
  [P in keyof T]?: T[P];
}

/**
 * 递归收集实例
 */
function collectGet(container: Container, obj: any) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      collectGet(container, obj[key])
    } else {
      let instance: any = new obj[key]()
      container.set(obj[key], instance)
    }
  })
}

/**
 * 快速实例化，key: string value: Class
 * 可以将内部 inject 正确注入
 */
export function injectFactory<T>(obj: ICombineActions<T>): Partial<T> {
  const container = new Container()

  collectGet(container, obj)

  const injectObj = Object.keys(obj).reduce((result, key) => {
    if (typeof (obj as any)[key] === 'object') {
      // 如果元素是对象，递归
      result[key] = injectFactory((obj as any)[key])
    } else {
      result[key] = container.get((obj as any)[key])
    }
    return result
  }, {} as any)

  return injectObj
}