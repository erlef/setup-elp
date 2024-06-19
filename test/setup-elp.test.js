const elpVersion = '2024-06-07'
simulateInput('elp-version', elpVersion)

function tests() {
  require('../src/setup-elp')
}
tests()

function simulateInput(key, value) {
  // Taken from https://github.com/actions/toolkit/blob/361a115e538ac6d8eb06cc47f3fcecce557d04c8/packages/core/src/core.ts#L128C17-L128C65
  process.env[`INPUT_${key.replace(/ /g, '_').toUpperCase()}`] = value
}
