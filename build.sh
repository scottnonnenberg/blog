# exit with error if we find outstanding changes in repo

echo '** checking git status'

if [ -n "`git status --porcelain`" ]; then
echo "Outstanding changes in repo!"
echo
git status
exit 1
fi

DIR=`dirname $0`
TARGET=${DIR}/public

if [ -d  ] ; then
  echo
  echo '** removing previous public folder'
  rm -rf ${TARGET}
fi

echo
echo '** building with gatsby'

gatsby build

echo
echo '** compressing files'

find ./public | grep -v \.gz$ | while read FILE;
do
  if [ -f "${FILE}" -a ! -f "${FILE}.gz" ] ; then
    echo "${FILE}"
    gzip -c -- "${FILE}" > "${FILE}.gz"
  fi
done

echo
echo "** done"
