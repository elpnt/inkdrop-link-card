module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/react",
  ],
  plugins: ["react", "react-hooks", "prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "2020"
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react/prop-types": "off"
  },
};
