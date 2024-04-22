import globals from "globals";
import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactNative from "eslint-plugin-react-native";
import pluginImport from "eslint-plugin-import";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import airbnbConfig from "eslint-config-airbnb";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended});

// Adding React Native specific plugins and configurations
const reactNativeCompat = new FlatCompat({
  plugins: {
    react: pluginReact,
    "react-native": pluginReactNative,
    import: pluginImport,
    "jsx-a11y": pluginJsxA11y
  },
  baseDirectory: __dirname,
  recommendedConfig: {
    ...pluginJs.configs.recommended,
    ...pluginReact.configs.recommended,
    ...pluginReactNative.configs.all,
    ...pluginImport.configs.recommended,
    ...pluginJsxA11y.configs.recommended,
    ...airbnbConfig
  }
});

export default [
  {languageOptions: { globals: globals.browser }},
  ...compat.extends("airbnb"),
  ...reactNativeCompat.extends("plugin:react/recommended", "plugin:react-native/all", "plugin:import/errors", "plugin:jsx-a11y/recommended")
];

