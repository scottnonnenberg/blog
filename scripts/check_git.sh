set -e

echo '** checking git status'

if [ -n "`git status --porcelain`" ]; then
  echo "Outstanding changes in repo!"
  echo
  git status
  exit 1
fi

echo
echo "** done"
