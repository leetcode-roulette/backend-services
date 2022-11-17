import { pathsToModuleNameMapper } from "ts-jest";
import config from "./tsconfig.json";

const moduleNameMapper = pathsToModuleNameMapper(config.compilerOptions.paths);

export default {
	roots: ["<rootDir>"],
	preset: "ts-jest",
	moduleFileExtensions: [
		"ts", 
		"tsx", 
		"js",
		"jsx",
		"json"
	],
	testMatch: [
		"**/tests/**/*.spec.ts",
		"**/tests/**/*.test.ts",
	],
	testEnvironment: "node",
	moduleNameMapper,
	modulePaths: [config.compilerOptions.baseUrl]
};
