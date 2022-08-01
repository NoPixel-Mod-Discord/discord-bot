module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ["google", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["prettier"],
  rules: {
    "no-console": ["warn", { allow: ["info", "error"] }],
    "prettier/prettier": "warn",
    "require-jsdoc": "off"
  }
};
