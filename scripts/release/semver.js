const shell = require('shelljs')
const semver = require('semver')
const fs = require('node:fs')

const PACKAGE_JSON_FILE = 'package.json'
const ALLOWED = {
  patch: true,
  minor: true,
  major: true,
}

const verifyBuildTypeFromArgs = (buildTypeFromArgs) => {
  if (!ALLOWED[buildTypeFromArgs]) {
    const message = 'Wrong version type'
    const errorMessage = getErrorMessage(message)

    throw new Error(errorMessage)
  }

  return buildTypeFromArgs
}

const getPackageJson = () => {
  const data = String(fs.readFileSync(PACKAGE_JSON_FILE))

  if (!data) {
    const message = 'Invalid package.json file'
    const errorMessage = getErrorMessage(message)

    throw new Error(errorMessage)
  }

  return JSON.parse(data)
}

const getErrorMessage = (message) => {
  const leftSide = '\x1b[31m*'
  const rideSide = '\x1b[0m'
  const errorMessage = `${leftSide} ${message} ${rideSide} \n`

  return errorMessage
}

const getNewVersion = (currentVersion, buildType) => {
  const newVersion = semver.inc(currentVersion, buildType)

  showLog(`New version is ${newVersion}`)

  return newVersion
}

const showLog = (message) => {
  const leftSide = '\x1b[32m*'
  const rideSide = '\x1b[0m'
  const infoMessage = `\n${leftSide} ${message} ${rideSide}`

  console.log(infoMessage)
}

const updatePackageJson = (packageJson) => {
  insertNewVersionToPackageJson(packageJson)
  reformatPackageJson()
}

const insertNewVersionToPackageJson = (packageJson) => {
  const data = JSON.stringify(packageJson)

  fs.writeFileSync('package.json', data)
}

const reformatPackageJson = () => {
  const command = 'yarn format:write-to'
  const prettierConfigPath = './.prettierrc'

  shell.exec(`${command} ${PACKAGE_JSON_FILE} --config ${prettierConfigPath}`)
}

const updateVersionTag = (version) => {
  const releaseVersion = `v-${version}`

  removeOldTags()
  addVersionTag(releaseVersion)
  pushTagToGit(releaseVersion)
}

const removeOldTags = () => {
  const oldTags = getOldTags()
  const command = `git tag -d ${oldTags.join(' ')}`

  shell.exec(command)
}

const getOldTags = () => {
  const command = 'git tag --list'
  const { stdout } = shell.exec(command)
  const oldTags = stdout.split('\n').filter((tag) => Boolean(tag))

  return oldTags
}

const addVersionTag = (version) => {
  const command = `git tag ${version}`

  shell.exec(command)
}

const pushTagToGit = (version) => {
  const command = `git push origin ${version}`

  shell.exec(command)
}

const main = () => {
  try {
    const buildTypeFromArgs = process.argv.slice(2)[0]
    const buildType = verifyBuildTypeFromArgs(buildTypeFromArgs)
    const packageJson = getPackageJson()

    showLog(`Current version is ${packageJson.version}`)

    packageJson.version = getNewVersion(packageJson.version, buildType)

    const { version: newVersion } = packageJson

    updatePackageJson(packageJson)
    updateVersionTag(newVersion)
  } catch (error) {
    console.error(error.message)

    process.exit(1)
  }
}

;(() => main())()
