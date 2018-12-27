module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
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
        semi: ["error", "always"],
        "no-console": [
            "error",
            {
                allow: ["info", "warn", "error"]
            }
        ],
        indent: [
            "warn",
            4,
            {
                SwitchCase: 1
            }
        ]
    }
};
