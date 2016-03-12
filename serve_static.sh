
set -e

function cleanup() {
  popd > /dev/null
  exit 1
}
trap 'cleanup' ERR
trap 'cleanup' SIGHUP
trap 'cleanup' SIGINT
trap 'cleanup' SIGTERM

pushd public > /dev/null
python -m SimpleHTTPServer 8000
popd > /dev/null
