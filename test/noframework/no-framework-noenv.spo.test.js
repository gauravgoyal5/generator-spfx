/* eslint-env jest, mocha */
'use strict';

const path = require('path');
const rimraf = require('rimraf');

const assert = require('yeoman-assert');
const helpers3 = require('yeoman-test');
const fs = require('fs');

const tempPath = path.join(__dirname, '../../tmp/');
// const tempPath = path.join(__dirname, '../../tmp/noframework');

const spfxGenerators = require('../settings/spfxgenerators');

const localTemp = path.join(tempPath, ''),
    packageFile = path.join(localTemp, 'package.json'),
    yorcFile = path.join(localTemp, '.yo-rc.json');


var runGenerator = (testConfig) => {

    let webPartConfig = {
        componentType: 'webpart',
        componentDescription: 'HelloWorld',
        componentName: 'helloworld',
        solutionName: 'HelloWorld',
    };

    return new Promise(function (resolve, reject) {

        helpers3.setUpTestDirectory(localTemp);

        helpers3.run(path.join(__dirname, '../../app'))
            .inDir(localTemp)
            .withGenerators(
                spfxGenerators
            )
            .withOptions(webPartConfig) // Mock options passed in
            .withLocalConfig({})
            .withPrompts(testConfig)
            .on('error', (err) => {
                console.log('ERROR', err);
                reject();
            })
            .on('end', resolve);
    });
}

describe('SPFx Yeoman - No Framework - Tests ', function () {

    let testComponent = 'WebPart',
        testEnvironment = 'no environment';
        

    // remove afterwards

    describe(`${testComponent}: ${testEnvironment} + jQuery@2`, function () {

        let testConfig = {
            framework: 'noframework',
            jsLibrary: ['jquery'],
            jQueryVersion: 2,
            force: true
        };

        before(function () {
            return runGenerator(testConfig);
        });


        it("No Environment === SPO", function () {
            assert.fileContent(yorcFile, /\"environment\": \"spo\",/);
        })

        it("Is Web Part", function () {
            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/);
        })

        it('package.json exists', function () {

            assert.file(packageFile);

        })

        it('no react', function () {

            assert.noFileContent(packageFile, /react|react-dom/);

        })

        it('no knockout', function () {

            assert.noFileContent(packageFile, /knockout/);

        })

        it('no pnpjs', function () {

            assert.noFileContent(packageFile, /\"@pnp\/pnpjs\"/);

        })

        it('jquery 2.x', function () {

            assert.fileContent(packageFile, /\"jquery\": \"\^2\./);

        })

    })

    describe(`${testComponent}: ${testEnvironment} + jQuery@3`, function () {

        let testConfig = {
            framework: 'noframework',
            jsLibrary: ['jquery'],
            jQueryVersion: 3,
            force: true
        };

        before(function () {
            return runGenerator(testConfig);
        });


        it("No Environment === SPO", function () {
            assert.fileContent(yorcFile, /\"environment\": \"spo\",/);
        })

        it("Is Web Part", function () {
            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/);
        })

        it('package.json exists', function () {

            assert.file(packageFile);

        })

        it('no react', function () {

            assert.noFileContent(packageFile, /react|react-dom/);

        })

        it('no knockout', function () {

            assert.noFileContent(packageFile, /knockout/);

        })

        it('no pnpjs', function () {

            assert.noFileContent(packageFile, /\"@pnp\/pnpjs\"/);

        })

        it('jquery 3.x', function () {

            assert.fileContent(packageFile, /\"jquery\": \"\^3\./);

        })


    });

    describe(`${testComponent}: ${testEnvironment} + jQuery@2 + pnpjs`, function () {

        const helpers = require('yeoman-test');

        let testConfig = {
            framework: 'noframework',
            jsLibrary: ['jquery', 'pnpjs'],
            jQueryVersion: 2,
            force: true
        };

        before(function () {
            return runGenerator(testConfig);
        });


        it("No Environment === SPO", function () {
            assert.fileContent(yorcFile, /\"environment\": \"spo\",/);
        })

        it("Is Web Part", function () {
            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/)
        })

        it('package.json exists', function () {

            assert.file(packageFile);

        })

        it('no react', function () {

            assert.noFileContent(packageFile, /react|react-dom/);

        })

        it('no knockout', function () {

            assert.noFileContent(packageFile, /knockout/);


        })

        it('pnpjs', function () {

            assert.fileContent(packageFile, /\"@pnp\/pnpjs\"/);


        })

        it('jquery 2.x', function () {

            assert.fileContent(packageFile, /\"jquery\": \"\^2\./);

        })

    });


    describe(`${testComponent}: ${testEnvironment} + jQuery@3 + pnpjs`, function () {

        const helpers = require('yeoman-test');

        let testConfig = {
            framework: 'noframework',
            jsLibrary: ['jquery', 'pnpjs'],
            jQueryVersion: 3,
            force: true
        };

        before(function () {
            return runGenerator(testConfig);
        });


        it("No Environment === SPO", function () {
            assert.fileContent(yorcFile, /\"environment\": \"spo\",/);
        })

        it("Is Web Part", function () {
            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/)
        })

        it('package.json exists', function () {

            assert.file(packageFile);

        })

        it('no react', function () {

            assert.noFileContent(packageFile, /react|react-dom/);

        })

        it('no knockout', function () {

            assert.noFileContent(packageFile, /knockout/);

        })

        it('pnpjs', function () {

            assert.fileContent(packageFile, /\"@pnp\/pnpjs\"/);

        })

        it('jquery 3.x', function () {

            assert.fileContent(packageFile, /\"jquery\": \"\^3\./);

        })


    });

    describe(`${testComponent}: ${testEnvironment} + pnpjs`, function () {

        const helpers = require('yeoman-test');

        let testConfig = {
            framework: 'noframework',
            jsLibrary: ['pnpjs'],
            force: true
        };

        before(function () {
            return runGenerator(testConfig);
        });



        it("No Environment === SPO", function () {
            assert.fileContent(yorcFile, /\"environment\": \"spo\",/);
        })

        it("Is Web Part", function () {
            assert.fileContent(yorcFile, /\"componentType\"\: \"webpart\"/);
        })

        it('package.json exists', function () {

            assert.file(packageFile);

        })

        it('no react', function () {

            assert.noFileContent(packageFile, /react|react-dom/);

        })

        it('no knockout', function () {

            assert.noFileContent(packageFile, /knockout/);

        })

        it('pnpjs', function () {

            assert.fileContent(packageFile, /\"@pnp\/pnpjs\"/);

        })

        it('no jquery', function () {

            assert.noFileContent(packageFile, /\"jquery\": \"\^3\./);

        })


    });

})