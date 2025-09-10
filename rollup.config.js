import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import postcssImport from "postcss-import";
import { visualizer } from "rollup-plugin-visualizer";

const packageJson = require("./package.json");
const isProduction = process.env.NODE_ENV === "production";

export default [
	{
		input: "src/index.ts",
		output: [
			{
				file: packageJson.main,
				format: "cjs",
				sourcemap: !isProduction,
			},
			{
				file: packageJson.module,
				format: "esm",
				sourcemap: !isProduction,
			},
		],
		plugins: [
			peerDepsExternal(),
			resolve(),
			commonjs(),
			typescript({ tsconfig: "./tsconfig.json" }),
			terser({
				format: {
					comments: false,
				},
				compress: {
					drop_console: isProduction,
					drop_debugger: isProduction,
					pure_funcs: ["console.info", "console.warn"],
				},
				mangle: {
					toplevel: true,
				},
			}),
			postcss({
				plugins: [postcssImport()],
				inject: true,
				minimize: true,
			}),
			visualizer({
				open: false,
				gzipSize: true,
				brotliSize: true,
				filename: "bundle-analysis.html",
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
