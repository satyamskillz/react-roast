import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";

import postcssImport from "postcss-import";

const packageJson = require("./package.json");

export default [
	{
		input: "src/index.ts",
		output: [
			{
				file: packageJson.main,
				format: "cjs",
				sourcemap: true,
			},
			{
				file: packageJson.module,
				format: "esm",
				sourcemap: true,
			},
		],
		plugins: [
			peerDepsExternal(),
			resolve(),
			commonjs(),
			typescript({ tsconfig: "./tsconfig.json" }),
			terser(),
			postcss({
				plugins: [postcssImport()],
				inject: true,
				minimize: true,
			}),
		],
		external: ["react", "react-dom"],
	},
	{
		input: "src/index.ts",
		output: [{ file: packageJson.types }],
		plugins: [dts.default()],
		external: [/\.css$/],
	},
];
