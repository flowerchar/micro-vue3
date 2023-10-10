import { Dep, createDep } from './dep'

type KeyToDepMap = Map<any, Dep>
export let activeEffect: ReactiveEffect | undefined
const targetMap = new WeakMap<any, KeyToDepMap>()
export class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {}

  run() {
    activeEffect = this
    return this.fn()
  }
}

export function effect<T = any>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

export function track(target: object, key: unknown) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = createDep()))
  }
  trackEffects(dep)
}

export function trackEffects(dep: Dep) {
  dep.add(activeEffect!)
}

export function trigger(target: object, key: unknown, newValue: unknown) {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }

  const dep: Dep | undefined = depsMap.get(key)
  if (!dep) {
    return
  }
}

export function triggerEffects(dep: Dep) {
  // isArray
  // const effects = isArray(dep)?dep:[...dep]
}
