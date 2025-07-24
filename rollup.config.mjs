/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/dot-notation */
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import swc from "@rollup/plugin-swc";
import serve from "rollup-plugin-serve";
import { dts } from "rollup-plugin-dts";
import eslint from "@rollup/plugin-eslint";
import dayjs from "dayjs";
import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const isDev = process.env.NODE_ENV !== "production";

/**
 * @description rollup config function
 * @param {Array} configs config[]
 * @returns
 */
function generateConfig(configs) {
    // prettier-ignore
    const banner = `/*
* delegate.js v${pkg.version}
* Copyright (c) ${dayjs().format("YYYY-MM-DD")}
* Released under the MIT License.
*/`;

    const input = "src/index.ts";
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const externals = Object.keys(pkg?.dependencies || {});

    const defaultConfigs = [
        {
            input,
            output: [
                {
                    file: "dist/delegate.js",
                    format: "umd",
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    name: "delegate",
                    sourcemap: isDev,
                    banner,
                },
            ],
        },
        {
            input,
            output: [
                {
                    file: "dist/index.js",
                    format: "cjs",
                    exports: "named",
                    sourcemap: isDev,
                    banner,
                },
            ],
        },
        {
            input,
            output: [
                {
                    exports: "named",
                    file: "dist/index.mjs",
                    format: "esm",
                    sourcemap: isDev,
                    banner,
                },
            ],
        },
    ].filter(Boolean);

    return [
        ...defaultConfigs.map((entry) => ({
            ...entry,
            external: entry.output[0].format === "umd" ? [] : [...externals],
            plugins: [
                // eslint({
                //   throwOnError: true, // lint 结果有错误将会抛出异常
                //   // throwOnWarning: true,
                //   include: [
                //     "src/**/*.ts",
                //     "src/**/*.js",
                //     "src/**/*.mjs",
                //     "src/**/*.jsx",
                //     "src/**/*.tsx",
                //   ],
                //   exclude: ["node_modules/**", "**/__tests__/**"],
                // }),
                swc({
                    // https://swc.rs/docs/configuration/swcrc
                    swc: {
                        jsc: {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            target:
                                entry.output[0].format === "umd"
                                    ? "es5"
                                    : "es2015",
                        },
                    },
                    include: ["./src/**/*.{ts,js,mjs,tsx,jsx}"],
                }),
                resolve({
                    extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx", ".json"],
                }),
                commonjs({
                    extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx", ".json"],
                }),
                isDev && entry.output[0].format === "umd"
                    ? serve({
                          port: 3000,
                          contentBase: ["demo", "dist"],
                      })
                    : null,
                ...[entry.plugins || []],
            ].filter(Boolean),
        })),
        {
            input,
            output: [{ file: "dist/types/index.d.ts", format: "es" }],
            plugins: [dts()],
            external: [/\.(css|less|scss|sass)$/],
        },
        ...(configs || []),
    ];
}

export default generateConfig();
