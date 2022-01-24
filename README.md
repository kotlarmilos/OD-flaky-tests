# Flaky tests detection

## Description
test
This repository contains nodejs script for detecting Order-Dependent flaky tests using iDFlakies tool. This repository contains `projects` directory for cloning github repositories. Directory `unfixedFlakyTests` contains list of unfixed flaky tests according to the http://mir.cs.illinois.edu/flakytests/unfixed.html. Directory `mockedLogs` contains mocked logs of command `mvn testrunner:testplugin -Ddetector.detector_type=random-class-method -Ddt.randomize.rounds=10 -Ddt.detector.original_order.all_must_pass=false` for faster development. Script downloads https://github.com/idflakies/iDFlakies repository and using `pom-modify/modify-project.sh` injects dependency for flaky tests detection.

## Prerequests
 - Node v9.11.2
 - Java SDK 8
 
## Usage

In order to run script change `projectName` and `projectURL` in `script.js` file and run the following command.

```node script.js```

## Example output log

```
/usr/local/bin/node /Users/miloskotlar/Desktop/ODflakytests/script.js
=================================================================
             Running iDFlakies script for OD tests
=================================================================
               Project Name: openhtmltopdf
               Project URL: https://github.com/danfickle/openhtmltopdf
=================================================================

Latest commit from master branch is 73731543655c75604837a3725883b513938cc33b
Current commit from master branch is 4a0612fab7b3a55e3e11d485233b063006d03b0f

Running iDFlakies script for ID tests. This may take up to several hours.
Analysing results, this may take up to several minutes.

There are still 1 old unfixed flaky tests, 0 new flaky tests, and 34 fixed flaky tests.
Old flaky tests:
com.openhtmltopdf.slf4j.Slf4JLoggerTest.testLogger

New flaky tests:


Fixed flaky tests:
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testBookmarkHeadAfterOverflowPage
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testMetaInformation
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkAreaMultipleBoxes
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkAreaMultipleLine
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkAfterOverflowTarget
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkTransformTarget
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testPr489DiagnosticConsumer
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkAreaTransformRotate
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkAreaAfterOverflowPage
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkOnOverflowTarget
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkSimpleBlock
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testBookmarkHeadNested
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testBookmarkHeadSimple
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testIssue458PageContentRepeatedInMargin
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkAreaTransformNested
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkAreaOverflowPage
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testFormControlText
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testPr492InfiniteLoopBugsInLineBreakingFuzz
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testFormControlOverflowPage
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testInputWithoutNameAttribute
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkAreaPageMarginTransform
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testBookmarkHeadTransform
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkAreaTransformTranslateY
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testBookmarkBodySimple
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkAreaMultiplePage
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkInlineTarget
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testFormControlAfterOverflowPage
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkAreaPageMargin
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testPR480LinkShapes
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testBookmarkHeadOnOverflowPage
com.openhtmltopdf.nonvisualregressiontests.NonVisualRegressionTest.testLinkExternalUrl
com.openhtmltopdf.testcases.ConcateOutputTest.testConcateOutput
com.openhtmltopdf.testcases.TestcaseRunnerTest.runTestcaseRunner
com.openhtmltopdf.freemarker.FreeMarkerGeneratorTest.testFreeMarkerGenerator

Process finished with exit code 0

```

## Further development

This script could be further expanded to iterate through projects and automatically detect changes for flaky tests.
