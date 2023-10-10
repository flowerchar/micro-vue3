export let activeEffect: reactiveEffect | undefined

export class reactiveEffect<T = any> {
  constructor(public fn: () => T) {}

  run() {
    activeEffect = this
    return this.fn()
  }
}

export function effect<T = any>(fn: () => T) {
  const _effect = new reactiveEffect(fn)
  _effect.run()
}

export function track(target: object, key: unknown) {
  console.log('开始依赖111222')
}

export function trigger(target: object, key: unknown, newValue: unknown) {
  console.log('开始收集')
}
