import Container from "./container"

export declare interface IObjectType<T> {
  new (): T
}

export declare type ICombineActions<T> = {
  [P in keyof T]?: IObjectType<T[P]>
}

/**
 * 快速实例化，key: string value: Class
 * 可以将内部 inject 正确注入
 */
export function injectFactory<T>(obj: ICombineActions<T>): T {
  const container = new Container()
  Object.keys(obj).forEach(key => {
    let instance: any = new obj[key]()
    container.set((obj as any)[key], instance)
  })

  const injectObj = Object.keys(obj).reduce((result, key) => {
    result[key] = container.get(obj[key])
    return result
  }, {} as any)

  return injectObj
}