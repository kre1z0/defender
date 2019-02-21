const isDev = process.env.NODE_ENV === "development";

const targets = {
  ie: 11,
  edge: 14,
  firefox: 45,
  chrome: 49,
  safari: 10,
};

const presets = [
  [
    "@babel/preset-env",
    {
      targets,
      useBuiltIns: "usage",
      modules: false,
    },
  ],
  ["@babel/preset-stage-2", { decoratorsLegacy: true }],
  "@babel/preset-react",
];

const plugins = [
  ["babel-plugin-styled-components", { displayName: isDev, ssr: true }],
  "transform-object-assign",
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-transform-runtime",
  "loadable-components/babel",
];

module.exports = {
  plugins,
  presets,
};
