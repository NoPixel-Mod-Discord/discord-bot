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
    "prettier/prettier": "warn",
    "no-console": "warn"
  }
};
