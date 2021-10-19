const path = require('path');
const fs = require('fs');
const { db } = require('./dbConnect');

/*async function checkIfTableExists(tableName) {
  const results = await db.raw(`SELECT * FROM pg_catalog.pg_tables WHERE tablename LIKE '${tableName}'`);
  if (results.rowCount <= 0) {
    throw new Error(`Table ${tableName} does not exist.`);
  }

  return true;
}*/
async function checkIfTableExists(tableName) {
  const results = await db.raw(`SHOW TABLES LIKE '${tableName}'`);

  if (results[0].length <= 0) {
    throw new Error(`Table ${tableName} does not exist.`);
  }

  return true;
}

async function runSeed(params) {
  return new Promise(async (resolve, reject) => {
    try {
      await db.schema.raw('set foreign_key_checks=0');
      await checkIfTableExists(params.tableName);

      if (params.truncate) {
        await db(params.tableName).truncate();
      }

      await db(params.tableName).insert(params.data);
      await db.schema.raw('set foreign_key_checks=1');

      resolve(true);
    } catch (error) {
      reject(error.message);
    }
  });
}

function getSeedDirPath() {
  return path.resolve(process.cwd(), 'src', 'app', 'database', 'seeds');
}

async function seedProcessor(filename) {
  const filePath = path.join(getSeedDirPath(), `${filename.toLowerCase()}`);
  const seed = require(filePath);
  const fileKeys = Object.keys(seed);

  if (fileKeys.length <= 0) {
    throw new Error(`Seed file ${filename} has no exported member {tableName, data}.`);
  }

  if (!fileKeys.includes('tableName')) {
    throw new Error(
      `Seed file ${filename} does not have the tableName property. Kindly ensure this property is part of its exported member`,
    );
  }

  if (!fileKeys.includes('data')) {
    throw new Error(
      `Seed file ${filename} does not have the data property. Kindly ensure this property is part of its exported member`,
    );
  }

  const isDataFn = typeof seed.data === 'function';
  const seedData = isDataFn ? await seed.data(db) : seed.data;

  if (!Array.isArray(seed.data) && !isDataFn) {
    throw new Error(
      `Seed file ${filename} data must be of type array/function and not ${typeof seed.data}`,
    );
  }

  await runSeed({ truncate: false, ...seed, data: seedData });

  return `Seed file ${filename} ran successfully`;
}

async function listDirFiles(pathDir) {
  return new Promise((resolve, reject) => {
    fs.readdir(pathDir, async (err, files) => {
      if (err) {
        return reject(new Error(`Error reading directory at ${pathDir}.`));
      }

      return resolve(files);
    });
  });
}

function reformFilename(filename) {
  if (filename === 'all') {
    return filename;
  }

  return filename.split(',').map(item => `${item.toLowerCase()}.js`);
}

async function seedHandler(fileName) {
  const seedFileLists = await listDirFiles(getSeedDirPath());
  const runAllSeed = fileName === 'all';
  let validSeedFilesToRun = seedFileLists;

  if (!runAllSeed) {
    let selectedSeedFiles = [];
    for (const item of reformFilename(fileName)) {
      if (!seedFileLists.includes(item)) {
        throw new Error(`Seed file (${fileName}) does not exists.`);
      }

      selectedSeedFiles.push(item);
    }

    validSeedFilesToRun = [...selectedSeedFiles];
  }

  let successMessages = [];
  for await (const file of validSeedFilesToRun) {
    successMessages.push(await seedProcessor(file));
  }

  return successMessages.join('\n');
}

module.exports = { seedHandler };
