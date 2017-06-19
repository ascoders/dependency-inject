import Container from "./container"

/**
 * 快速实例化，key: string value: Class
 * 可以将内部 inject 正确注入
 */
export function injectFactory(obj: {
  [name: string]: any
}) {
  const container = new Container()
  Object.keys(obj).forEach(key => {
    let instance = new obj[key]()
    container.set(obj[key], instance)
  })

  const injectObj = Object.keys(obj).reduce((result, key) => {
    result[key] = container.get(obj[key])
    return result
  }, {} as any)

  return injectObj
}