import babel from 'rollup-plugin-babel'

const globals = {
  "log4js2": "log4js",
  "axios": "axios"
}

export default {
  input: "./src/ajax-appender.js",
  output: {
    file: "./bundles/ajax-appender.umd.js",
    format: "umd"
  },
  exports: "named",
  name: "log4js.ajax-appender",
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  external: Object.keys(globals),
}