export function track(target: object, key: unknown) {
  console.log('开始依赖')
}

export function trigger(target: object, key: unknown, newValue: unknown) {
  console.log('开始收集')
}
