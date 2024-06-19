const core = require('@actions/core')

try {
  const input1 = core.getInput('input-1')
  console.log(`input-1 is ${input1}`)
  core.setOutput('output-1', input1)
} catch (error) {
  core.setFailed(error.message)
}
