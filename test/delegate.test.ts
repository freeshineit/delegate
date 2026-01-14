import delegate from "../src/index";

describe("delegate", () => {
    let container: HTMLElement;
    let anchor: HTMLElement;

    beforeAll(() => {
        const html =
            "<ul>" +
            "<li><a>Item 1</a></li>" +
            "<li><a>Item 2</a></li>" +
            "<li><a>Item 3</a></li>" +
            "<li><a>Item 4</a></li>" +
            "<li><a>Item 5</a></li>" +
            "</ul>";

        document.body.innerHTML += html;

        container = document.querySelector("ul")!;
        anchor = document.querySelector("a")!;
    });

    afterAll(() => {
        document.body.innerHTML = "";
    });

    it("should add an event listener", () => {
        const callback = jest.fn();
        delegate(container, "a", "click", callback);

        anchor.click();
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should remove an event listener", () => {
        const callback = jest.fn();
        const spy = jest.spyOn(container, "removeEventListener");

        const delegation = delegate(container, "a", "click", callback);
        delegation.destroy();

        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockRestore();
    });

    it("should use `document` if the element is unspecified", () => {
        const callback = jest.fn();
        (delegate as any)("a", "click", callback);

        anchor.click();
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should remove an event listener the unspecified base (`document`)", () => {
        const callback = jest.fn();
        const spy = jest.spyOn(document, "removeEventListener");

        const delegation = (delegate as any)("a", "click", callback);
        delegation.destroy();

        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockRestore();
    });

    it("should add event listeners to all the elements in a base selector", () => {
        const callback = jest.fn();
        delegate("li", "a", "click", callback);

        const anchors = document.querySelectorAll("a");
        (anchors[0] as HTMLElement).click();
        (anchors[1] as HTMLElement).click();

        expect(callback).toHaveBeenCalledTimes(2);
    });

    it("should remove the event listeners from all the elements in a base selector", () => {
        const callback = jest.fn();
        const items = document.querySelectorAll("li");
        const spies = Array.from(items).map((li) =>
            jest.spyOn(li, "removeEventListener"),
        );

        const delegations = delegate("li", "a", "click", callback);
        (delegations as any[]).forEach((delegation) => {
            delegation.destroy();
        });

        spies.forEach((spy) => {
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockRestore();
        });
    });

    it("should add event listeners to all the elements in a base array", () => {
        const callback = jest.fn();
        const items = document.querySelectorAll("li");
        delegate(Array.from(items), "a", "click", callback);

        const anchors = document.querySelectorAll("a");
        (anchors[0] as HTMLElement).click();
        (anchors[1] as HTMLElement).click();

        expect(callback).toHaveBeenCalledTimes(2);
    });

    it("should remove the event listeners from all the elements in a base array", () => {
        const callback = jest.fn();
        const items = document.querySelectorAll("li");
        const spies = Array.from(items).map((li) =>
            jest.spyOn(li, "removeEventListener"),
        );

        const delegations = delegate(Array.from(items), "a", "click", callback);
        (delegations as any[]).forEach((delegation) => {
            delegation.destroy();
        });

        spies.forEach((spy) => {
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockRestore();
        });
    });
});
