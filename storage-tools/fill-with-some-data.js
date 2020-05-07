const fs = require('fs')
const path = require('path')

const books = {
    name: "books",
    list: []
}
const accounts = {
    name: "accounts",
    list: []
}

let filePath;
const folderPath = path.join(__dirname, '..', 'storage')

const booksFileName = 'books.json'
filePath = path.join(folderPath, booksFileName);
fs.writeFileSync(filePath, JSON.stringify(books))
console.log(`File "${booksFileName}" was filled.`)

const accountsFileName = 'accounts.json'
filePath = path.join(folderPath, accountsFileName)
fs.writeFileSync(filePath, JSON.stringify(accounts))
console.log(`File "${accountsFileName}" was filled.`)
