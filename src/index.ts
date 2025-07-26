import closest from "./closest";

/**
 * Delegate event
 */
export type DelegateEvent = Event & { delegateTarget: Element };
/**
 * Delegate callback
 */
export type DelegateCallback = (e: DelegateEvent) => void;

/**
 * Delegate arguments
 */
export type DelegateArguments = [Element, string, string, DelegateCallback];

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {string} selector
 * @param {string} type
 * @param {Function} callback
 * @param {boolean} useCapture
 * @return {Object}
 */
// prettier-ignore
function _delegate(element: Element, selector: string, type: string, callback: DelegateCallback, useCapture?: boolean) {
  // prettier-ignore
  const listenerFn = listener.apply(this, arguments as unknown as DelegateArguments);

  element.addEventListener(type, listenerFn as (e: Event) => void, useCapture);

  return {
    destroy: function () {
      element.removeEventListener(
        type,
        listenerFn as (e: Event) => void,
        useCapture,
      );
    },
  };
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|string|Array} [elements]
 * @param {string | Element} selector
 * @param {string} type
 * @param {Function} callback
 * @param {boolean} useCapture
 * @return {Object}
 * @example
 * ```ts
 * const delegation = delegate(document.body, 'a', 'click', function (e) {})
 * // destroy (removeEventListener)
 * delegation.destroy();
 *
 * const delegation1 = delegate(".btn", "click", function (e) { console.log(e.delegateTarget)},false);
 * // destroy (removeEventListener)
 * delegation1.destroy();
 * ```
 */
// prettier-ignore
function delegate(elements: Element | string | Element[], selector: string, type: string, callback: DelegateCallback, useCapture?: boolean) {
  // Handle the regular Element usage
  if (typeof (elements as Element).addEventListener === "function") {
    return _delegate.apply(null, arguments as unknown as DelegateArguments);
  }

  // Handle Element-less usage, it defaults to global delegation
  if (typeof type === "function") {
    // Use `document` as the first parameter, then apply arguments
    // This is a short way to .unshift `arguments` without running into deoptimizations
    return _delegate
      .bind(null, document as unknown as Element)
      .apply(null, arguments as unknown as [string, string, DelegateCallback]);
  }

  // Handle Selector-based usage
  if (typeof elements === "string") {
    elements = document.querySelectorAll(elements) as unknown as Element[];
  }

  // Handle Array-like based usage
  return Array.prototype.map.call(elements, function (element: Element) {
    return _delegate(element, selector, type, callback, useCapture);
  });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {string} selector
 * @param {string} type
 * @param {Function} callback
 * @return {Function}
 */
// prettier-ignore
function listener(element: Element, selector: string, type: string, callback: DelegateCallback) {
  return function (e: DelegateEvent) {
    e.delegateTarget = closest(e.target as Element, selector) as Element;

    if (e.delegateTarget) {
      callback.call(element, e);
    }
  };
}

export default delegate;
