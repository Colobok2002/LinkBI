module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        'react-native/react-native': true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:react-native/all'
        // "google"
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', "LoadAnimations.jsx", "Animations.jsx"],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    settings: {
        react: {
            version: '18.2'
        }
    },
    plugins: [
        'react-refresh',
        'react-native'
    ],
    rules: {
        'react/prop-types': 'off',
        "react-native/no-color-literals": "off",
        "react-native/no-inline-styles": "off",
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        "react-hooks/exhaustive-deps": "off",
        'react-native/no-unused-styles': 'warn',
        'react-native/split-platform-components': 'warn',
        'react-native/no-inline-styles': 'off',
        'react-native/no-raw-text': 'warn',
        'no-console': 'error',
    },
}
