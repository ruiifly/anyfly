module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    extends: "eslint:recommended",
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 6
    },
    plugins: ["react", "eslint-plugin-react"],
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"]
    }
};
