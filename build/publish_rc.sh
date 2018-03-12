#!/bin/bash

set -o errexit

yarn std-version
git push --follow-tags origin ${CIRCLE_BRANCH}
npm publish --tag latest
