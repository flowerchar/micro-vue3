var Vue = (function (exports) {
    'use strict';

    var reactiveEffect = /** @class */ (function () {
        function reactiveEffect(fn) {
            this.fn = fn;
        }
        reactiveEffect.prototype.run = function () {
            return this.fn();
        };
        return reactiveEffect;
    }());
    function effect(fn) {
        var _effect = new reactiveEffect(fn);
        _effect.run();
    }
    function track(target, key) {
        console.log('开始依赖111222');
    }
    function trigger(target, key, newValue) {
        console.log('开始收集');
    }

    var get = createGetter();
    function createGetter() {
        return function get(target, key, receiver) {
            var res = Reflect.get(target, key, receiver);
            track();
            return res;
        };
    }
    var set = createSetter();
    function createSetter() {
        return function set(target, key, value, receiver) {
            var res = Reflect.set(target, key, value, receiver);
            trigger();
            return res;
        };
    }
    var mutableHandlers = {
        get: get,
        set: set
    };

    var reactiveMap = new WeakMap();
    function reactive(target) {
        return createReactiveObject(target, mutableHandlers, reactiveMap);
    }
    function createReactiveObject(target, baseHandlers, proxyMap) {
        var existingProxy = proxyMap.get(target);
        if (existingProxy) {
            return existingProxy;
        }
        var proxy = new Proxy(target, baseHandlers);
        proxyMap.set(target, proxy);
        return proxy;
    }

    exports.effect = effect;
    exports.reactive = reactive;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=vue.js.map
