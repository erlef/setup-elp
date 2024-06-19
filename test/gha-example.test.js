const input1 = 'Input One'
const outputsF = 'test/GITHUB_OUTPUT'
const fs = require('fs')
simulateInput('input-1', input1)
prepareForOutput()

function tests() {
  const assert = require('assert')
  require('../src/gha-example')

  const outputs = fs.readFileSync(outputsF, 'utf8')
  const output1 = outputs
    .replace(/<<ghadelimiter_.*\n/, ' :: ')
    .replace(/\nghadelimiter_.*\n/, '')

  assert.equal(output1, 'output-1 :: ' + input1)
}
tests()

function simulateInput(key, value) {
  // Taken from https://github.com/actions/toolkit/blob/361a115e538ac6d8eb06cc47f3fcecce557d04c8/packages/core/src/core.ts#L128C17-L128C65
  process.env[`INPUT_${key.replace(/ /g, '_').toUpperCase()}`] = value
}

function prepareForOutput() {
  try {
    fs.unlinkSync(outputsF)
  } finally {
    fs.openSync(outputsF, 'w')
  }
  process.env['GITHUB_OUTPUT'] = outputsF
}
