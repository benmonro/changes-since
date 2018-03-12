#!/bin/bash


yarn
yarn build
yarn std-version
git push --follow-tags origin ${CIRCLE_BRANCH}
npm publish --tag latest
