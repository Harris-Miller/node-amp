let mapStore;

function getBoundSuper(instance, fn) {
  if (typeof WeakMap === 'undefined') {
    throw new Error(`Using @bind on ${fn.name}() requires WeakMap support due to its use of super.${fn.name}()`);
  }

  if (!mapStore) {
    mapStore = new WeakMap();
  }

  if (mapStore.has(instance) === false) {
    mapStore.set(instance, new WeakMap());
  }

  const superStore = mapStore.get(instance);

  if (superStore.has(fn) === false) {
    superStore.set(fn, fn.bind(instance));
  }

  return superStore.get(fn);
}

export default function bind(target, key, { value: fn, configurable, enumerable }) {
  if (typeof fn !== 'function') {
    throw new SyntaxError(`@autobind can only be used on functions, not: ${fn}`);
  }

  const { constructor } = target;

  return {
    configurable,
    enumerable,

    get() {
      // Class.prototype.key lookup
      // Someone accesses the property directly on the prototype on which it is
      // actually defined on, i.e. Class.prototype.hasOwnProperty(key)
      if (this === target) {
        return fn;
      }

      // Class.prototype.key lookup
      // Someone accesses the property directly on a prototype but it was found
      // up the chain, not defined directly on it
      // i.e. Class.prototype.hasOwnProperty(key) == false && key in Class.prototype
      if (this.constructor !== constructor && Object.getPrototypeOf(this).constructor === constructor) {
        return fn;
      }

      // Autobound method calling super.sameMethod() which is also autobound and so on.
      if (this.constructor !== constructor && key in this.constructor.prototype) {
        return getBoundSuper(this, fn);
      }

      const boundFn = fn.bind(this);

      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        // NOT enumerable when it's a bound method
        enumerable: false,
        value: boundFn
      });

      return boundFn;
    },
    set(newValue) {
      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        // IS enumerable when reassigned by the outside word
        enumerable: true,
        value: newValue
      });

      return newValue;
    }
  };
}
