const fs = require('fs')
const path = require('path')

let filePath;
const folderPath = path.join(__dirname, '..', 'storage')

const booksFileName = 'books.json'
filePath = path.join(folderPath, booksFileName);
const booksData = fs.readFileSync(filePath).toString('utf-8')
console.log(`File "${booksFileName}":`)
console.log(JSON.parse(booksData))

console.log('\n\n\n')

const accountsFileName = 'accounts.json'
filePath = path.join(folderPath, accountsFileName)
const accountsData = fs.readFileSync(filePath).toString('utf-8')
console.log(`File "${accountsFileName}":"`)
const accountsJson = JSON.parse(accountsData);
console.log(accountsJson)
console.log('')
