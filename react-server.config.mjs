export default {
  root: "src/app",
  export(paths) {
    return [...paths, { path: "/popular"}];
  },
}