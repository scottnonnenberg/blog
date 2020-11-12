set -e

echo '** checking git status'

if [ "$1" != "--force" ]; then
  if [ -n "`git status --porcelain`" ]; then
    echo "Outstanding changes in repo!"
    echo
    git status
    exit 1
  fi
fi

echo
echo "** done"
