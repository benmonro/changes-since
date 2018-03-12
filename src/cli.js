#!/usr/bin/env node

import { argv } from "yargs";
import fs from "fs";
import { coerce } from "semver";
import changesSince, {format} from "./";

let regeneratorRuntime = require("regenerator-runtime");

let changeLog = fs.readFileSync("./CHANGELOG.MD");

let [since] = argv._;
since = coerce(since);
if (since === null) {
  console.error(`Invalid semver string "${argv._}"`);
} else {
  let changes = changesSince(changeLog, { since });

  console.log(format(changes));
}
