import pkg from "./package.json" assert { type: "json" };

export default {
    input: "src/delegate.js",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "auto",
        },
        {
            file: pkg.module,
            format: "esm",
            exports: "auto",
        },
        {
            file: "lib/delegate-umd.js",
            format: "umd",
            exports: "auto",
            name: "delegate",
        },
    ],
};
