const fs = require('fs');
const readFilePromise = fs.promises && fs.promises.readFile || require('util').promisify(fs.readFile);

function requireUncached(module){
    delete require.cache[require.resolve(module)];
    return require(module)
}

function dummyTest(z)
{
    // to ensure that optimizer did not throw out anything
    if(z['name']==='never')
    {
        throw new Error('does not happen');
    }
}
async function testAll() {
    console.time("require");
    const attempts = 1000;
    for (let i = 0; i < attempts; i++) {
        const z = requireUncached('./bigJson.json');
        dummyTest(z);
    }
    console.timeEnd("require");


    console.time("readFileSync");
    for (let i = 0; i < attempts; i++) {
        const z = JSON.parse(fs.readFileSync('./bigJson.json', 'utf8'));
        dummyTest(z);
    }
    console.timeEnd("readFileSync");


    console.time("readFileAsync");
    for (let i = 0; i < attempts; i++) {
        const data = await readFilePromise('./bigJson.json', 'utf8');
        const z = JSON.parse(data);
        dummyTest(z);
    }
    console.timeEnd("readFileAsync");
    console.log();
}

async function runTest() {
    for (let i = 0; i < 3; i++) {
        await testAll();
    }
}

runTest();
