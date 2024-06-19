const core = require('@actions/core')
const exec = require('@actions/exec')
const toolCache = require('@actions/tool-cache')
const fs = require('fs')
const path = require('path')

async function main() {
  prepareLocal()
  const elpVersion = getRequiredInput('elp-version')
  assertArchsPlatforms()
  installElp(elpVersion)
}

main().catch((error) => {
  core.setFailed(error.message)
})

async function installElp(elpVersion) {
  const toolName = 'elp'
  let cachePath = toolCache.find(toolName, elpVersion)

  if (cachePath === '') {
    core.debug(`ELP ${elpVersion} is not cached as a tool`)
    const elpTarGzFile0 = await elpTarGzFile()
    const elpTarGz = `https://github.com/WhatsApp/erlang-language-platform/releases/download/${elpVersion}/${elpTarGzFile0}`
    core.debug(`ELP download URL is '${elpTarGz}'`)
    const file = await toolCache.downloadTool(elpTarGz)
    const targetDir = await toolCache.extractTar(file)
    const target = 'elp'
    cachePath = await toolCache.cacheFile(file, target, toolName, elpVersion)
  } else {
    core.debug(`ELP ${elpVersion} is cached as a tool`)
  }

  const runnerToolPath = path.join(process.env.RUNNER_TEMP, '.setup-elp', 'elp')
  await fs.cp(cachePath, runnerToolPath, { recursive: true })
  await fs.chmod(path.join(runnerToolPath, 'elp'), 0o755)
  core.addPath(runnerToolPath)

  const cmd = 'elp'
  const args = ['version']
  const version = await exec_(cmd, args)
  core.debug(`ELP installed version is '${version}'`)
}

function assertArchsPlatforms() {
  const knownArchsPlatforms = [
    'arm64:darwin',
    'amd64:darwin',
    'arm64:linux',
    'amd64:linux',
  ]
  const archPlatform = `${arch()}:${platform()}`

  if (!knownArchsPlatforms.includes(archPlatform)) {
    throw new Error(
      `Unknown <arch>:<platform> '${archPlatform}'.
      Must be one of ['${knownArchsPlatforms.join("', '")}']`,
    )
  }
  core.debug(`<arch>:<platform> is '${archPlatform}'`)
}

function getRequiredInput(name) {
  return getInput(name, true)
}

function getInput(name, required) {
  const input = core.getInput(name, { required: required })
  core.debug(`input ${name} (required: ${required}) is '${input}'`)
  return input
}

function arch() {
  return process.arch
}

function platform() {
  return process.platform
}

function archToELPArch() {
  const elpArchs = {
    arm64: 'aarch64',
    amd64: 'x86_64',
  }
  const elpArch = elpArchs[arch()]
  core.debug(`ELP arch. is '${elpArch}'`)
  return elpArch
}

function platformToELPPlatform() {
  const elpPlatforms = {
    linux: 'linux',
    darwin: 'macos',
  }
  const elpPlatform = elpPlatforms[platform()]
  core.debug(`ELP platform is '${elpPlatform}'`)
  return elpPlatform
}

function elpPlatformSuffix() {
  const elpPlatformSuffixes = {
    linux: 'unknown-linux-gnu',
    darwin: 'apple-darwin',
  }
  const elpPlatformSuffix = elpPlatformSuffixes[platform()]
  core.debug(`ELP platform suffix is '${elpPlatformSuffix}'`)
  return elpPlatformSuffix
}

async function otpMajorMinor() {
  const cmd = `erl`
  const args = [
    '-eval',
    `
    Root = code:root_dir(),
    OTPRelease = erlang:system_info(otp_release),
    OTPVersionFile = filename:join([Root, "releases", OTPRelease, "OTP_VERSION"]),
    {ok, Version} = file:read_file(OTPVersionFile),
    io:fwrite(Version),
    halt().
    `,
    '-noshell',
  ]
  const otpMajorMinor = exec_(cmd, args)
  core.debug(`Erlang/OTP <major>.<minor> is '${otpMajorMinor}'`)
  return otpMajorMinor
}

async function elpTarGzFile() {
  const platform = platformToELPPlatform()
  const arch = archToELPArch()
  const suffix = elpPlatformSuffix()
  const otp = await otpMajorMinor()
  const elpTarGzFile = `elp-${platform}-${arch}-${suffix}-otp-${otp}.tar.gz`
  core.debug(`ELP .tar.gz is '${elpTarGzFile}'`)
  return elpTarGzFile
}

async function exec_(cmd, args) {
  let output = ''
  await exec.exec(cmd, args, {
    listeners: {
      stdout: (data) => {
        output += data.toString()
      },
    },
    silent: true,
  })
  return output.replace('\n', '')
}

function prepareLocal() {
  process.env.RUNNER_TOOL_CACHE = process.env.RUNNER_TOOL_CACHE || '/tmp'
  process.env.RUNNER_TEMP = process.env.RUNNER_TEMP || '/tmp'
}
