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
    camelcase: "off",
    "new-cap": "off",
    "prettier/prettier": "warn",
    "no-console": ["warn", { allow: ["info", "error"] }]
  }
};
