import changesSince, {format} from '../src';
import {parse} from 'chast';
import fs from 'fs';
import inspect from 'unist-util-inspect';
describe('changes-since', () => {
    let sampleChangeLog;
    beforeAll(() => {
        sampleChangeLog = fs.readFileSync('./test/SAMPLE_CHANGELOG.md', 'utf8');
    })
    test('filters since 0.0.0 if missing', () => {
        const filtered = changesSince(sampleChangeLog);
        const unfiltered = parse(sampleChangeLog);
        expect(filtered.children.length).toBe(unfiltered.children.length);
    });

    test('since 1.5.0 should have 3 versions', () => {
        const filtered = changesSince(sampleChangeLog, {since:'1.5.0'});
        expect(filtered.children.length).toBe(3);
    });

    test('since 1.5.0 inclusive should have 4 versions', () => {
        const filtered = changesSince(sampleChangeLog, {since:'1.5.0', inclusive:true});

        expect(filtered.children.length).toBe(4);
    })

    test('format groups bug fixes in 2 versions together', () => {
        const formatted = format(changesSince(sampleChangeLog, {since:'1.5.1'}));

        expect(formatted).toEqual(`### Bug Fixes

* not returning a promise from parse anymore. 
* fixed example in README `);
    });


    test('format includes bug fixes and features', () => {
        const formatted = format(changesSince(sampleChangeLog, {since:'1.4.4'}));
console.log(formatted);
        expect(formatted).toEqual(`### Bug Fixes

* not returning a promise from parse anymore. 
* fixed example in README 

### Features

* ast support 
* parse now returns ast. `);
    });
});