const DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== "undefined" && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches =
        proto.matchesSelector ||
        proto.mozMatchesSelector ||
        proto.msMatchesSelector ||
        proto.oMatchesSelector ||
        proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Element}
 */
function closest(element, selector) {
    if (
        element &&
        typeof Element.prototype.closest === "function" &&
        typeof element.closest === "function"
    ) {
        return element.closest(selector);
    }

    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (
            typeof element.matches === "function" &&
            element.matches(selector)
        ) {
            return element;
        }
        element = element.parentNode;
    }
}

export default closest;
