#!/usr/bin/env node

import parseChangelog from 'changelog-parser';
import {argv} from 'yargs';
import semver from 'semver';
import {flatten, groupBy, omit, uniq, uniqBy} from 'lodash';

let regeneratorRuntime = require('regenerator-runtime');

( async() => {


  let result = await parseChangelog("./CHANGELOG.MD");
  let [since] = argv._;

  let typeEx = /^#+ ([a-zA-Zs ]+)[\n]+(.*)/gm;

  let versions = result.versions.filter(({version, body}) => {
    if(version && semver.gt(version, since)) {

      return true;


    }
  });
  
  let parsedChanges = versions.map(({parsed}) => (omit(parsed, '_')));

  const changes = {};
  const categories = uniq(flatten(parsedChanges.map(i => Object.keys(i)))).forEach(cat => {changes[cat] = []});

  parsedChanges.forEach((i) => {
    if(i) {
      Object.keys(i).forEach(key => {
        // console.log('i', changes[key]);
        changes[key] = [...changes[key], ...i[key]];
      });
    }
  });

  Object.keys(changes).forEach(key => {
      console.log(`### ${key}`);
      console.log(changes[key].map(change => `* ${change}`).join('\n'));
    }
  )


  // setTimeout(() => console.log(changes), 3000);

  // console.log(changes);

})();
