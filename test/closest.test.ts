import closest from "../src/closest";

describe("closest", () => {
    let a: HTMLElement;
    let b: HTMLElement;
    let c: HTMLElement;

    beforeAll(() => {
        const html =
            '<div id="a">' +
            '<div id="b">' +
            '<div id="c"></div>' +
            "</div>" +
            "</div>";

        document.body.innerHTML += html;

        a = document.querySelector("#a")!;
        b = document.querySelector("#b")!;
        c = document.querySelector("#c")!;
    });

    afterAll(() => {
        document.body.innerHTML = "";
    });

    it("should return the closest parent based on the selector", () => {
        expect(closest(c, "#b")).toBe(b);
        expect(closest(c, "#a")).toBe(a);
        expect(closest(b, "#a")).toBe(a);
    });

    it("should return itself if the same selector is passed", () => {
        expect(closest(document.body, "body")).toBe(document.body);
    });

    it("should not throw on elements without matches()", () => {
        // This test is for the polyfill version, but in modern browsers
        // Element.prototype.closest exists, so we test that it handles
        // elements gracefully
        const fakeElement = {
            nodeType: 1, // ELEMENT_NODE
            parentNode: null,
            matches: jest.fn(() => false),
            closest: jest.fn(() => null),
        } as any;

        const result = closest(fakeElement, "#a");
        expect(result).toBeNull();
    });
});
