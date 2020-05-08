const rimraf = require('rimraf');
const path = require('path')

const storageFolder = path.join(__dirname, '..', 'storage')

rimraf(storageFolder, () => { console.log("Cleaned."); });