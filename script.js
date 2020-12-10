const { execSync } = require('child_process');
const Utilities = require('./utilities');

async function main(){
    const projectName = 'openhtmltopdf';
    const projectURL = 'https://github.com/danfickle/openhtmltopdf';
    const unfixedFlakyTestsFilePath = 'unfixedFlakyTests/list.csv';


    console.log('=================================================================');
    console.log(`             Running iDFlakies script for OD tests`);
    console.log('=================================================================');
    console.log(`               Project Name: ${projectName}`);
    console.log(`               Project URL: ${projectURL}`);
    console.log('=================================================================');
    console.log();

    const unfixedFlakyTests = await Utilities.readCSV(unfixedFlakyTestsFilePath);
    const unfixedTests = unfixedFlakyTests.map(x=>x['Fully-Qualified Test Name (packageName.ClassName.methodName)']);
    const commits = Array.from(new Set(unfixedFlakyTests.map(x=>x['SHA Detected'])));
    const latestCommit = execSync(`git ls-remote ${projectURL} | head -1 | sed "s/HEAD//"`).toString().replace('\t\n','');

    console.log(`Latest commit from master branch is ${latestCommit}`);
    console.log(`Current commit from master branch is ${commits}`);
    console.log();

    if (commits.includes(latestCommit)) {
        console.log(`There are no updates on the git repository. There are still ${unfixedFlakyTests.length} flaky tests:`);
        console.log(unfixedTests.join('\n'));
        return 0;
    }

    execSync('rm -rf iDFlakies/');
    execSync(`git clone https://github.com/idflakies/iDFlakies`);

    // patching iFlakes version on maven repository, 1.1 doesn't exist
    Utilities.writeFile('iDFlakies/pom-modify/modify-project.sh',Utilities.readFile('iDFlakies/pom-modify/modify-project.sh').toString().replace('1.1.0','1.0.2'));
    Utilities.writeFile('iDFlakies/pom-modify/PomFile.java',Utilities.readFile('iDFlakies/pom-modify/PomFile.java').toString().replace('1.1','1.0'));

    console.log(`Running iDFlakies script for ID tests. This may take up to several hours.`);
    execSync('rm -rf projects/*');
    execSync(`cd projects && git clone ${projectURL}`);
    execSync(`bash iDFlakies/pom-modify/modify-project.sh projects/${projectName}/`);
    const output = execSync(`cd projects/${projectName} && mvn testrunner:testplugin -Ddetector.detector_type=random-class-method -Ddt.randomize.rounds=10 -Ddt.detector.original_order.all_must_pass=false`).toString();


    // mocking log file
    // const output = Utilities.readFile('mockedLogs/output.log');

    const rePattern = new RegExp(/Found (.*) tests, writing list to(.*)/g);
    let paths = output.match(rePattern);
    paths = paths.map(x=>x.replace(/Found (.*) tests, writing list to /,'').replace(/ (.*)/, ''));


    console.log(`Analysing results, this may take up to several minutes.`);
    console.log();

    let newflakyTests = [];
    for (const p of paths){
        if (Utilities.fileExists(p)){
            const result = Utilities.readFile(p);
            newflakyTests = newflakyTests.concat(result.split('\n').filter((item) => newflakyTests.indexOf(item) < 0 && item !== ''));
        }
    }

    const oldTests = unfixedTests.filter(x=>newflakyTests.includes(x));
    const newTests = newflakyTests.filter(x=>!unfixedTests.includes(x));
    const fixedTests = unfixedTests.filter(x=>!newflakyTests.includes(x));


    console.log(`There are still ${oldTests.length} old unfixed flaky tests, ${newTests.length} new flaky tests, and ${fixedTests.length} fixed flaky tests.`);
    console.log('Old flaky tests:');
    console.log(oldTests.join('\n'));
    console.log();
    console.log('New flaky tests:');
    console.log(newTests.join('\n'));
    console.log();
    console.log('Fixed flaky tests:');
    console.log(fixedTests.join('\n'));

}

main();