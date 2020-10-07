module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ["core-js"],
  globals: {
    'ts-jest': {
      isolatedModules: true
    },
  },
}
