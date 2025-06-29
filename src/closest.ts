const DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== "undefined" && !Element.prototype.matches) {
    const proto = Element.prototype as Element & {
        matchesSelector?: typeof Element.prototype.matches;
        mozMatchesSelector?: typeof Element.prototype.matches;
        msMatchesSelector?: typeof Element.prototype.matches;
        oMatchesSelector?: typeof Element.prototype.matches;
        webkitMatchesSelector?: typeof Element.prototype.matches;
    };

    proto.matches =
        proto?.matchesSelector ||
        proto?.mozMatchesSelector ||
        proto?.msMatchesSelector ||
        proto?.oMatchesSelector ||
        proto?.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {string} selector
 * @return {Function}
 */
function closest(element: Element, selector: string) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (
            typeof element.matches === "function" &&
            element.matches(selector)
        ) {
            return element;
        }
        element = element.parentNode as Element;
    }
}

export default closest;
