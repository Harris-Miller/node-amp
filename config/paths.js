const path = require('path');
const fs = require('fs');
const url = require('url');

const appDirectory = fs.realpathSync(path.join(__dirname, '..'));
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(thisPath, needsSlash) {
  const hasSlash = thisPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return thisPath.substr(thisPath, thisPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${thisPath}/`;
  }

  return thisPath;
}

const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('src/renderer/build'),
  appPublic: resolveApp('assets'),
  appHtml: resolveApp('src/index.html'),
  appIndexJs: resolveApp('src/renderer/index.jsx'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src/renderer'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json'))
};
